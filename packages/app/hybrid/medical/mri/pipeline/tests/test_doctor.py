"""Tests for system health checks."""

from pipeline.core import check_dependencies, check_system, get_device_info


def test_check_system():
    """Test that system check returns expected structure."""
    system_info = check_system()

    assert "python_version" in system_info
    assert "platform" in system_info
    assert "device" in system_info
    assert "dependencies" in system_info
    assert "paths" in system_info


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
