"""Exercise the backend save method without loading Linux hardware or Decky."""
import ast
import json
import pathlib
import tempfile
import unittest
from test_runtime import runtime

source = ast.parse((pathlib.Path(__file__).resolve().parents[1] / 'main.py').read_text(encoding='utf-8'))
plugin = next(node for node in source.body if isinstance(node, ast.ClassDef) and node.name == 'Plugin')
save_method = next(node for node in plugin.body if isinstance(node, ast.FunctionDef) and node.name == '_setShortcuts')
namespace = dict(json=json, exists=lambda path: pathlib.Path(path).exists(),
                 supported=runtime.supported, Shortcut=lambda value: dict(value))
exec(compile(ast.Module(body=[save_method], type_ignores=[]), '<save method>', 'exec'), namespace)

class PersistenceTests(unittest.TestCase):
    def test_hidden_entries_survive_edit_but_visible_deletion_is_kept(self):
        with tempfile.TemporaryDirectory() as directory:
            path = pathlib.Path(directory) / 'items.json'
            path.write_text(json.dumps({
                'hidden': dict(name='GPU', cmd='@gameassist/setGPU.sh 900'),
                'hidden-choice': dict(name='Choice', cmd1='echo ok', cmd6='@gameassist/setTDP.sh 12'),
                'visible-deleted': dict(name='Old command', cmd='echo old'),
                'visible-edited': dict(name='Command', cmd='echo before'),
            }))
            class FakePlugin:
                shortcutsItemPath = str(path)
                def saveShortcuts(self, _):
                    path.write_text(json.dumps(self.shortcutsItemMap))
            namespace['CAPABILITIES'] = dict(tdp='', gpu=False, cpu=False, smt=False, boost=False, policy=False)
            fake = FakePlugin()
            namespace['_setShortcuts'](fake, [dict(id='visible-edited', cmd='echo after')])
            saved = json.loads(path.read_text())
            self.assertEqual(saved['hidden']['cmd'], '@gameassist/setGPU.sh 900')
            self.assertEqual(saved['hidden-choice']['cmd6'], '@gameassist/setTDP.sh 12')
            self.assertEqual(saved['visible-edited']['cmd'], 'echo after')
            self.assertNotIn('visible-deleted', saved)

    def test_commands_in_later_choices_are_preserved(self):
        caps = dict(tdp='', gpu=False, cpu=False, smt=False, boost=False, policy=False)
        self.assertFalse(runtime.supported('echo hello @gameassist/setTDP.sh 12', caps))

if __name__ == '__main__':
    unittest.main()
