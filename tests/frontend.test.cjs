const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

const ControlType = { BUTTON: 1, TOGGLE: 2, SLIDER: 3, GROUP: 4, CHOICE: 5 };
function harness(file, extra = '') {
    const effects = [];
    const timers = new Map();
    let nextTimer = 0;
    let hooks = 0;
    let updates = 0;
    const state = {
        visibleMap: new Map(), sliderGroupMap: new Map(), sliderUpdateMap: new Map(),
        setVisibleMap(map) { this.visibleMap = map; },
    };
    const calls = [];
    const api = new Proxy({}, { get: (_, name) => (...args) => {
        calls.push([name, ...args]);
        return Promise.resolve({success: true, result: name === 'getFanCurveItems' ? [] : 0});
    }});
    const exports = {};
    const context = {
        exports, console,
        h: (type, props, ...children) => ({type, props, children}),
        setTimeout: (callback, delay, ...args) => {
            const id = ++nextTimer; timers.set(id, () => callback(...args)); return id;
        },
        clearTimeout: id => timers.delete(id),
        setInterval: callback => { const id = ++nextTimer; timers.set(id, callback); return id; },
        clearInterval: id => timers.delete(id),
        require(name) {
            if (name === 'react') return {
                Fragment: 'fragment',
                useState(value) { hooks++; return [value, () => {updates++;}]; },
                useEffect(callback) { hooks++; effects.push(callback); },
                useRef(value) { hooks++; return {current: value}; },
            };
            if (name === 'decky-frontend-lib') return new Proxy({}, {get: (_, key) => key});
            if (name.endsWith('data-structures/Shortcut')) return {ControlType, LANG: {}};
            if (name.endsWith('ShortcutsState')) return {useShortcutsState: () => state};
            if (name.endsWith('ShortcutManager')) return {ShortcutManager: {launchShortcut: (...args) => calls.push(['launch', ...args])}};
            if (name.endsWith('PyInterop')) return {PyInterop: api};
            throw Error(name);
        },
    };
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8') + extra;
    const {outputText} = ts.transpileModule(source, {compilerOptions: {
        module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.React, jsxFactory: 'h', jsxFragmentFactory: 'Fragment',
    }});
    vm.runInNewContext(outputText, context, {filename: file});
    return {exports, effects, timers, state, calls,
        hookCount: () => hooks, updateCount: () => updates,
        resetHooks() { hooks = 0; effects.length = 0; },
    };
}
function shortcut(overrides = {}) {
    return {id: 'slider', type: ControlType.SLIDER, group: 'power', value: '12',
        min: '5', max: '28', timeout: '1000', scale: '1', name: 'TDP',
        cmd: 'setTDP.sh $v$', name1: '', name2: '', ...overrides};
}

test('hiding and showing a slider keeps the same hook count', () => {
    const h = harness('src/components/ShortcutLanucher.tsx');
    h.exports.ShortcutLauncher({shortcut: shortcut()});
    const hiddenCount = h.hookCount();
    h.resetHooks();
    h.state.visibleMap.set('power', true);
    assert.ok(h.exports.ShortcutLauncher({shortcut: shortcut()}));
    assert.equal(h.hookCount(), hiddenCount);
});

test('invalid numbers use the fallback', () => {
    const h = harness('src/components/ShortcutLanucher.tsx', '\nexport {parseValue};');
    assert.equal(h.exports.parseValue('invalid', 12), 12);
    assert.equal(h.exports.parseValue('Infinity', 12), 12);
    assert.equal(h.exports.parseValue('-1', 12), 12);
    assert.equal(h.exports.parseValue('20W', 12), 20);
});

test('separate shortcuts keep separate debounce timers and immediate execution cancels pending work', () => {
    const h = harness('src/components/ShortcutLanucher.tsx', '\nexport {RunShortcut};');
    const run = value => h.exports.RunShortcut(value, h.state.sliderGroupMap, h.state.sliderUpdateMap);
    run(shortcut({id: 'a'}));
    run(shortcut({id: 'b'}));
    assert.equal(h.timers.size, 2);
    run(shortcut({id: 'a', timeout: '0'}));
    assert.equal(h.timers.size, 1);
    assert.equal(h.calls.filter(c => c[0] === 'launch').length, 1);
});

test('unmount clears pending shortcut execution', () => {
    const h = harness('src/components/ShortcutLanucher.tsx', '\nexport {RunShortcut};');
    h.exports.ShortcutLauncher({shortcut: shortcut()});
    const cleanups = h.effects.map(effect => effect());
    h.exports.RunShortcut(shortcut(), h.state.sliderGroupMap, h.state.sliderUpdateMap);
    cleanups.filter(Boolean).forEach(cleanup => cleanup());
    assert.equal(h.timers.size, 0);
    assert.equal(h.state.sliderUpdateMap.size, 0);
});

test('fan polling stops on unmount and ignores outstanding responses', async () => {
    const h = harness('src/components/canvas.tsx');
    h.exports.FanControl({type: 2});
    const cleanup = h.effects[0]();
    assert.equal(h.timers.size, 1);
    cleanup();
    assert.equal(h.timers.size, 0);
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(h.updateCount(), 0);
});
