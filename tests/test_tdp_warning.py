import ast
import json
import os
import pathlib
import tempfile
import types
import unittest
from unittest.mock import Mock, patch
from test_runtime import runtime
from test_shortcut_persistence import plugin


class WarningTests(unittest.TestCase):
    def test_automatic_tdp_commands_wait_for_persisted_acknowledgment(self):
        method = next(node for node in plugin.body if isinstance(node, ast.FunctionDef) and node.name == '_runProgram')
        caps = dict(tdp='ryzenadj', controllers=['hhd'])
        run = Mock(return_value=types.SimpleNamespace(returncode=0))
        namespace = dict(log=lambda _: None, is_tdp_command=runtime.is_tdp_command,
                         detect=lambda: caps.copy(), TDP_WARNING_KEY=runtime.TDP_WARNING_KEY,
                         CAPABILITIES=caps.copy(), supported=runtime.supported,
                         resolve=lambda command: command, os=os, CONFIG_DIR='/tmp/test-gameassist',
                         subprocess=types.SimpleNamespace(run=run))
        exec(compile(ast.Module(body=[method], type_ignores=[]), '<TDP execution>', 'exec'), namespace)
        class FakePlugin:
            acknowledged = ''
            def _getGlobalSetting(self, _, key):
                return self.acknowledged
        fake = FakePlugin()
        self.assertFalse(namespace['_runProgram'](fake, '@gameassist/setTDP.sh 12'))
        run.assert_not_called()
        fake.acknowledged = '1'
        self.assertTrue(namespace['_runProgram'](fake, '@gameassist/setTDP.sh 12'))
        run.assert_called_once()

    def test_resume_obeys_the_same_saved_warning_confirmation(self):
        namespace = {'__name__': 'restore_test'}
        with patch.dict('sys.modules', runtime=runtime):
            exec(compile((pathlib.Path(__file__).resolve().parents[1] / 'backend/restore.py').read_text(), '<restore>', 'exec'), namespace)
        caps = dict(tdp='ryzenadj', controllers=['hhd'])
        namespace['detect'] = lambda: caps
        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, GAMEASSIST_CONFIG_DIR=directory), patch.object(namespace['subprocess'], 'run') as run:
            config = pathlib.Path(directory)
            (config / 'tdp.txt').write_text('12')
            namespace['restore']()
            run.assert_not_called()
            (config / 'setting.json').write_text(json.dumps({'Settings': {runtime.TDP_WARNING_KEY: '1'}}))
            namespace['restore']()
            run.assert_called_once()


if __name__ == '__main__':
    unittest.main()
