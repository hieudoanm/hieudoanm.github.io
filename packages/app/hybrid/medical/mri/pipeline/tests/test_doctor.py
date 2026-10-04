"""Tests for system health checks."""

import builtins
from typing import Any

import pytest

from pipeline.core import check_dependencies, check_system, get_device_info
from pipeline.core.doctor import check_paths


class _Cuda:
    """Stand-in for torch.cuda."""

    def __init__(self, available: bool) -> None:
        self._available = available

    def is_available(self) -> bool:
        return self._available

    def device_count(self) -> int:
        return 2

    def get_device_name(self, index: int) -> str:
        return "Fake GPU"


class _Mps:
    """Stand-in for torch.backends.mps."""

    def __init__(self, available: bool) -> None:
        self._available = available

    def is_available(self) -> bool:
        return self._available


class _Backends:
    def __init__(self, mps_available: bool) -> None:
        self.mps = _Mps(mps_available)


class FakeTorch:
    """Only the surface `get_device_info` reads."""

    def __init__(self, cuda_available: bool, mps_available: bool) -> None:
        self.cuda = _Cuda(cuda_available)
        self.backends = _Backends(mps_available)


def test_check_system():
    """Test that system check returns expected structure."""
    system_info = check_system()

    assert "python_version" in system_info
    assert "platform" in system_info
    assert "device" in system_info
    assert "dependencies" in system_info
    assert "paths" in system_info


def test_check_system_verbose_includes_sys_path():
    """Verbose mode adds the interpreter path list."""
    system_info = check_system(verbose=True)

    assert "sys_path" in system_info


def test_get_device_info():
    """Test that device info returns expected structure."""
    device_info = get_device_info()

    assert "available_devices" in device_info
    assert "recommended_device" in device_info
    assert "cpu" in device_info["available_devices"]


def test_check_dependencies():
    """Test that dependency check returns expected structure."""
    deps = check_dependencies()

    assert "required" in deps
    assert "optional" in deps
    assert isinstance(deps["required"], dict)
    assert isinstance(deps["optional"], dict)

    # Check that required dependencies are tracked
    for dep in ["numpy", "pandas", "pydantic", "typer"]:
        assert dep in deps["required"]
    # pyyaml is displayed as pyyaml but imported as yaml
    assert "pyyaml" in deps["required"]


def test_get_device_info_without_torch(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr("pipeline.core.doctor._torch_or_none", lambda: None)

    device_info = get_device_info()

    assert device_info["torch_installed"] is False
    assert device_info["recommended_device"] == "cpu"
    assert device_info["available_devices"] == ["cpu"]


def test_get_device_info_prefers_cuda(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr(
        "pipeline.core.doctor._torch_or_none",
        lambda: FakeTorch(cuda_available=True, mps_available=True),
    )

    device_info = get_device_info()

    assert "cuda" in device_info["available_devices"]
    assert device_info["cuda_available"] is True
    assert device_info["recommended_device"] == "cuda"


def test_get_device_info_prefers_mps_when_no_cuda(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr(
        "pipeline.core.doctor._torch_or_none",
        lambda: FakeTorch(cuda_available=False, mps_available=True),
    )

    device_info = get_device_info()

    assert device_info["cuda_available"] is False
    assert device_info["mps_available"] is True
    assert device_info["recommended_device"] == "mps"


def test_get_device_info_reports_no_accelerator(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr(
        "pipeline.core.doctor._torch_or_none",
        lambda: FakeTorch(cuda_available=False, mps_available=False),
    )

    device_info = get_device_info()

    assert device_info["available_devices"] == ["cpu"]
    assert device_info["recommended_device"] == "cpu"
    assert device_info["mps_available"] is False


def test_torch_or_none_returns_the_module_when_present(monkeypatch: pytest.MonkeyPatch):
    """When torch resolves, the device probe reads it instead of reporting absent."""
    import pipeline.core.doctor as doctor

    def fake_find_spec(name: str) -> object:
        return object()

    def fake_import_module(name: str) -> FakeTorch:
        return FakeTorch(cuda_available=False, mps_available=False)

    monkeypatch.setattr(doctor.importlib.util, "find_spec", fake_find_spec)
    monkeypatch.setattr(doctor.importlib, "import_module", fake_import_module)

    device_info = get_device_info()

    assert device_info["cuda_available"] is False
    assert device_info["mps_available"] is False


def test_check_dependencies_records_a_missing_dependency(monkeypatch: pytest.MonkeyPatch):
    real_import = builtins.__import__

    def fake_import(name: str, *args: Any, **kwargs: Any) -> Any:
        if name in {"numpy", "torch"}:
            raise ImportError(f"no {name}")
        return real_import(name, *args, **kwargs)

    monkeypatch.setattr(builtins, "__import__", fake_import)

    deps = check_dependencies()

    assert deps["required"]["numpy"] is False
    assert deps["optional"]["torch"] is False
    assert deps["required"]["pyyaml"] is True


def test_check_paths_reports_a_missing_directory():
    path_info = check_paths("a/definitely/absent/dir")

    assert path_info["data_path_exists"] is False
    assert path_info["data_path_readable"] is False
