import importlib
import importlib.util
import pathlib
import sys

_parent = pathlib.Path(__file__).parent

for _dir in _parent.iterdir():
    if not _dir.is_dir() or _dir.name.startswith("_") or _dir.name == "__pycache__":
        continue
    _init = _dir / "__init__.py"
    if not _init.exists():
        continue
    _module_name = _dir.name.replace(".", "_").replace("-", "_")
    _spec = importlib.util.spec_from_file_location(_module_name, _init)
    if _spec is not None and _spec.loader is not None:
        _mod = importlib.util.module_from_spec(_spec)
        _mod.__package__ = _module_name
        _mod.__path__ = [str(_dir)]
        sys.modules[_module_name] = _mod
        _spec.loader.exec_module(_mod)
        for _attr in dir(_mod):
            if not _attr.startswith("_"):
                globals()[_attr] = getattr(_mod, _attr)
