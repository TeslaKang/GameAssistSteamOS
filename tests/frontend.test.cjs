const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

const ControlType = { BUTTON: 1, TOGGLE: 2, SLIDER: 3, GROUP: 4, CHOICE: 5 };
function harness(file, extra = '', options = {}) {
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
    const modals = [];
    const api = new Proxy({}, { get: (_, name) => (...args) => {
        calls.push([name, ...args]);
        if (options.api && options.api[name]) return options.api[name](...args);
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
                createElement: (type, props, ...children) => ({type, props, children}),
                useState(value) { hooks++; return [value, () => {updates++;}]; },
                useEffect(callback) { hooks++; effects.push(callback); },
                useRef(value) { hooks++; return {current: value}; },
            };
            if (name === 'decky-frontend-lib') return new Proxy({}, {get: (_, key) => key === 'showModal' ? modal => modals.push(modal) : key});
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
    return {exports, effects, timers, state, calls, modals,
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

test('HHD confirmation is shared, saved once and survives a new frontend instance', async () => {
    let acknowledged = false;
    const options = {api: {
        getTdpStatus: async () => ({success: true, result: {available: true, hhd: true, acknowledged}}),
        setGlobalSetting: async (key, value) => {
            assert.equal(key, 'hhdTdpWarningAcknowledged');
            acknowledged = value === '1';
            return {success: true};
        },
        runProgram: async () => ({success: true, result: true}),
    }};
    const h = harness('src/lib/ShortcutManager.ts', '', options);
    const manager = h.exports.ShortcutManager;
    const first = manager.launchShortcut('@gameassist/setTDP.sh 12', 'TDP');
    const second = manager.confirmTdp();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(h.modals.length, 1);
    assert.equal(h.calls.filter(c => c[0] === 'runProgram').length, 0);
    h.modals[0].props.onOK();
    assert.equal(await first, true);
    assert.equal(await second, true);
    assert.equal(acknowledged, true);
    const reloaded = harness('src/lib/ShortcutManager.ts', '', options);
    assert.equal(await reloaded.exports.ShortcutManager.launchShortcut('@gameassist/setTDP.sh 15', 'TDP'), true);
    assert.equal(reloaded.modals.length, 0);
});

test('cancelling HHD warning does not save acknowledgment or change TDP', async () => {
    const h = harness('src/lib/ShortcutManager.ts', '', {api: {
        getTdpStatus: async () => ({success: true, result: {available: true, hhd: true, acknowledged: false}}),
    }});
    const pending = h.exports.ShortcutManager.launchShortcut('setTDP.sh 12', 'TDP');
    await new Promise(resolve => setImmediate(resolve));
    h.modals[0].props.onCancel();
    assert.equal(await pending, false);
    assert.equal(h.calls.some(c => c[0] === 'runProgram' || c[0] === 'setGlobalSetting'), false);
});

test('no HHD needs no warning and a missing backend gives an explanation', async () => {
    for (const available of [true, false]) {
        const h = harness('src/lib/ShortcutManager.ts', '', {api: {
            getTdpStatus: async () => ({success: true, result: {available, hhd: false, acknowledged: false}}),
            runProgram: async () => ({success: true, result: true}),
        }});
        assert.equal(await h.exports.ShortcutManager.launchShortcut('setTDP.sh 12', 'TDP'), available);
        assert.equal(h.modals.length, 0);
        assert.equal(h.calls.some(c => c[0] === 'runProgram'), available);
        assert.equal(h.calls.some(c => c[0] === 'toast'), !available);
    }
});
