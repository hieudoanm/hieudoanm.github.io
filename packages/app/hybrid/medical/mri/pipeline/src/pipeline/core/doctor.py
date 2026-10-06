"""System health checks and dependency verification."""

import importlib
import importlib.util
import platform
import sys
from pathlib import Path
from typing import Any


def get_python_version() -> str:
    """Get Python version."""
    return f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"


def get_platform_info() -> dict[str, str]:
    """Get platform information."""
    return {
        "system": platform.system(),
        "machine": platform.machine(),
        "processor": platform.processor(),
    }


def _torch_or_none() -> Any:
    """Import torch if it is installed, otherwise return None.

    torch is an optional extra, so it is resolved by name rather than with a
    top-level `import torch`: a plain import is unresolvable for the type checker
    on a machine that only installed the base dependencies.
    """
    if importlib.util.find_spec("torch") is None:
        return None
    return importlib.import_module("torch")


def get_device_info() -> dict[str, Any]:
    """Get device information (CUDA, MPS, CPU)."""
    device_info: dict[str, Any] = {
        "platform": platform.system(),
        "available_devices": ["cpu"],
        "recommended_device": "cpu",
    }

    torch = _torch_or_none()
    if torch is None:
        device_info["cuda_available"] = False
        device_info["torch_installed"] = False
        device_info["mps_available"] = False
        return device_info

    # CUDA
    if torch.cuda.is_available():
        device_info["available_devices"].append("cuda")
        device_info["cuda_available"] = True
        device_info["cuda_device_count"] = torch.cuda.device_count()
        device_info["cuda_device_name"] = torch.cuda.get_device_name(0)
        device_info["recommended_device"] = "cuda"
    else:
        device_info["cuda_available"] = False

    # MPS (Apple Silicon)
    if hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        device_info["available_devices"].append("mps")
        device_info["mps_available"] = True
        if device_info["recommended_device"] == "cpu":
            device_info["recommended_device"] = "mps"
    else:
        device_info["mps_available"] = False

    return device_info


def check_dependencies() -> dict[str, Any]:
    """Check if required dependencies are installed."""
    dependencies: dict[str, bool] = {
        "numpy": False,
        "pandas": False,
        "pydantic": False,
        "typer": False,
        "yaml": False,  # PyYAML imports as yaml
    }

    optional_dependencies: dict[str, bool] = {
        "torch": False,
        "nibabel": False,
        "nilearn": False,
        "scikit-learn": False,
        "xgboost": False,
    }

    for dep in dependencies:
        try:
            __import__(dep)
            dependencies[dep] = True
        except ImportError:
            pass

    # Rename yaml back to pyyaml for display
    if "yaml" in dependencies:
        dependencies["pyyaml"] = dependencies.pop("yaml")

    for dep in optional_dependencies:
        try:
            __import__(dep)
            optional_dependencies[dep] = True
        except ImportError:
            pass

    return {
        "required": dependencies,
        "optional": optional_dependencies,
    }


def check_paths(data_path: str = "data/") -> dict[str, Any]:
    """Check if required paths exist and are accessible."""
    path_info: dict[str, Any] = {
        "data_path": str(Path(data_path).absolute()),
        "data_path_exists": Path(data_path).exists(),
        "data_path_readable": False,
        "cwd": str(Path.cwd()),
    }

    if Path(data_path).exists():
        path_info["data_path_readable"] = Path(data_path).is_dir()

    return path_info


def check_system(verbose: bool = False) -> dict[str, Any]:
    """Run full system check."""
    system_info: dict[str, Any] = {
        "python_version": get_python_version(),
        "platform": get_platform_info(),
        "device": get_device_info(),
        "dependencies": check_dependencies(),
        "paths": check_paths(),
    }

    if verbose:
        system_info["sys_path"] = sys.path

    return system_info
