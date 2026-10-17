import importlib.util
import pathlib
import sys
import types
import unittest
from unittest.mock import patch

# Windows has no pwd module; discovery tests do not use the real user database.
if sys.platform == 'win32':
    sys.modules.setdefault('pwd', types.ModuleType('pwd'))
spec = importlib.util.spec_from_file_location('runtime', pathlib.Path(__file__).resolve().parents[1] / 'backend/runtime.py')
runtime = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runtime)

class RuntimeTests(unittest.TestCase):
    def test_legacy_commands_are_resolved_without_losing_arguments(self):
        result = runtime.resolve('/usr/share/GameAssist/setTDP.sh 12')
        self.assertTrue(result.startswith('bash '))
        self.assertTrue(result.endswith('setTDP.sh 12') or result.endswith("setTDP.sh' 12"))
        self.assertEqual(runtime.resolve('echo hello'), 'echo hello')

    def test_missing_hardware_is_hidden_but_custom_commands_survive(self):
        caps = dict(tdp='', gpu=False, cpu=False, smt=False, boost=False, policy=False)
        self.assertFalse(runtime.supported('/usr/share/GameAssist/setGPU.sh 1000', caps))
        self.assertFalse(runtime.supported('resetAdvCPU.sh', caps))
        self.assertTrue(runtime.supported('echo hello', caps))

    def test_intel_rapl_detection_and_cpu_dependency(self):
        def content(path):
            return 'GenuineIntel' if path == '/proc/cpuinfo' else ''
        with patch.object(runtime, 'read', side_effect=content), patch.object(runtime.shutil, 'which', return_value=None), patch.object(runtime.pathlib.Path, 'exists', return_value=True), patch.object(runtime.pathlib.Path, 'glob', return_value=[]):
            caps = runtime.detect()
        self.assertEqual(caps['tdp'], 'intel-rapl')
        self.assertFalse(caps['cpu'])
        self.assertFalse(caps['gpu'])

    def test_active_hhd_keeps_power_controller(self):
        with patch.object(runtime, 'read', return_value='GenuineIntel'), patch.object(runtime.shutil, 'which', return_value='/bin/tool'), patch.object(runtime.pathlib.Path, 'exists', return_value=True), patch.object(runtime.pathlib.Path, 'glob', return_value=[]), patch.object(runtime.subprocess, 'run', return_value=types.SimpleNamespace(returncode=0)):
            caps = runtime.detect()
        self.assertEqual(caps['tdp'], 'intel-rapl')
        self.assertIn('hhd', caps['controllers'])

    def test_tdp_is_visible_without_backend_but_not_executable(self):
        caps = dict(tdp='', gpu=False, cpu=False, smt=False, boost=False, policy=False)
        self.assertTrue(runtime.visible('@gameassist/setTDP.sh 12', caps))
        self.assertFalse(runtime.supported('@gameassist/setTDP.sh 12', caps))
        self.assertFalse(runtime.visible('@gameassist/setGPU.sh 900', caps))

if __name__ == '__main__':
    unittest.main()
