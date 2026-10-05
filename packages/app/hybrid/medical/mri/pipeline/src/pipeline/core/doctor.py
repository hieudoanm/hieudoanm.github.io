"""System health checks and dependency verification."""

import sys
import platform
from typing import Dict, Any, Optional
from pathlib import Path


def get_python_version() -> str:
    """Get Python version."""
    return f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"


def get_platform_info() -> Dict[str, str]:
    """Get platform information."""
    return {
        "system": platform.system(),
        "machine": platform.machine(),
        "processor": platform.processor(),
    }


def get_device_info() -> Dict[str, Any]:
    """Get device information (CUDA, MPS, CPU)."""
    device_info = {
        "platform": platform.system(),
        "available_devices": ["cpu"],
        "recommended_device": "cpu",
    }
    
    # Try to detect CUDA
    try:
        import torch
        if torch.cuda.is_available():
            device_info["available_devices"].append("cuda")
            device_info["cuda_available"] = True
            device_info["cuda_device_count"] = torch.cuda.device_count()
            device_info["cuda_device_name"] = torch.cuda.get_device_name(0)
            device_info["recommended_device"] = "cuda"
        else:
            device_info["cuda_available"] = False
    except ImportError:
        device_info["cuda_available"] = False
        device_info["torch_installed"] = False
    
    # Try to detect MPS (Apple Silicon)
    try:
        import torch
        if hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
            device_info["available_devices"].append("mps")
            device_info["mps_available"] = True
            if device_info["recommended_device"] == "cpu":
                device_info["recommended_device"] = "mps"
        else:
            device_info["mps_available"] = False
    except ImportError:
        device_info["mps_available"] = False
    
    return device_info


def check_dependencies() -> Dict[str, Any]:
    """Check if required dependencies are installed."""
    dependencies = {
        "numpy": False,
        "pandas": False,
        "pydantic": False,
        "typer": False,
        "yaml": False,  # PyYAML imports as yaml
    }
    
    optional_dependencies = {
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


def check_paths(data_path: str = "data/") -> Dict[str, Any]:
    """Check if required paths exist and are accessible."""
    path_info = {
        "data_path": str(Path(data_path).absolute()),
        "data_path_exists": Path(data_path).exists(),
        "data_path_readable": False,
        "cwd": str(Path.cwd()),
    }
    
    if Path(data_path).exists():
        path_info["data_path_readable"] = Path(data_path).is_dir()
    
    return path_info


def check_system(verbose: bool = False) -> Dict[str, Any]:
    """Run full system check."""
    system_info = {
        "python_version": get_python_version(),
        "platform": get_platform_info(),
        "device": get_device_info(),
        "dependencies": check_dependencies(),
        "paths": check_paths(),
    }
    
    if verbose:
        system_info["sys_path"] = sys.path
    
    return system_info
