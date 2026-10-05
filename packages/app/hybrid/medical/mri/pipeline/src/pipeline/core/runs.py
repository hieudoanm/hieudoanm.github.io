"""Run folder and manifest management."""

import json
import hashlib
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional
import subprocess
import sys


def generate_run_id() -> str:
    """Generate a unique run ID."""
    import time
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    microseconds = int(time.time() * 1_000_000) % 1_000_000
    return f"r_{timestamp}_{microseconds}"


def get_git_commit() -> Optional[str]:
    """Get the current git commit hash."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            capture_output=True,
            text=True,
            check=True,
        )
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def get_git_branch() -> Optional[str]:
    """Get the current git branch."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            check=True,
        )
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def compute_file_hash(file_path: Path) -> str:
    """Compute SHA256 hash of a file."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def compute_config_hash(config: Dict[str, Any]) -> str:
    """Compute hash of configuration dict."""
    config_str = json.dumps(config, sort_keys=True)
    return hashlib.sha256(config_str.encode()).hexdigest()


def create_run_folder(
    output_dir: str,
    run_id: Optional[str] = None,
    config: Optional[Dict[str, Any]] = None,
) -> Path:
    """Create a run folder with manifest."""
    if run_id is None:
        run_id = generate_run_id()
    
    run_path = Path(output_dir) / run_id
    run_path.mkdir(parents=True, exist_ok=True)
    
    return run_path


def create_manifest(
    run_path: Path,
    config: Dict[str, Any],
    schema_version: str = "0.1.0",
) -> Dict[str, Any]:
    """Create and save manifest for a run."""
    manifest = {
        "schema_version": schema_version,
        "git_commit": get_git_commit(),
        "git_branch": get_git_branch(),
        "config_hash": compute_config_hash(config),
        "data_hash": None,  # To be filled when data is loaded
        "seeds": config.get("split", {}).get("seed", 42),
        "device": config.get("run", {}).get("device", "auto"),
        "start_time": datetime.now().isoformat(),
        "end_time": None,
        "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
        "library_versions": get_library_versions(),
    }
    
    manifest_path = run_path / "manifest.json"
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    
    return manifest


def update_manifest_end_time(run_path: Path) -> None:
    """Update the end time in the manifest."""
    manifest_path = run_path / "manifest.json"
    if manifest_path.exists():
        with open(manifest_path, "r") as f:
            manifest = json.load(f)
        
        manifest["end_time"] = datetime.now().isoformat()
        
        with open(manifest_path, "w") as f:
            json.dump(manifest, f, indent=2)


def get_library_versions() -> Dict[str, str]:
    """Get versions of key libraries."""
    versions = {}
    
    libraries = [
        "numpy",
        "pandas",
        "pydantic",
        "torch",
        "sklearn",
        "nibabel",
        "nilearn",
    ]
    
    for lib in libraries:
        try:
            module = __import__(lib)
            versions[lib] = getattr(module, "__version__", "unknown")
        except ImportError:
            versions[lib] = "not installed"
    
    return versions


def save_config(run_path: Path, config: Dict[str, Any]) -> None:
    """Save resolved configuration to run folder."""
    config_path = run_path / "config.yaml"
    try:
        import yaml
        with open(config_path, "w") as f:
            yaml.dump(config, f, default_flow_style=False)
    except ImportError:
        # Fallback to JSON if yaml is not available
        config_path_json = run_path / "config.json"
        with open(config_path_json, "w") as f:
            json.dump(config, f, indent=2)


def load_manifest(run_path: Path) -> Dict[str, Any]:
    """Load manifest from run folder."""
    manifest_path = run_path / "manifest.json"
    with open(manifest_path, "r") as f:
        return json.load(f)


def list_runs(output_dir: str) -> list[Dict[str, Any]]:
    """List all runs in the output directory."""
    runs_dir = Path(output_dir)
    if not runs_dir.exists():
        return []
    
    runs = []
    for run_path in sorted(runs_dir.iterdir()):
        if run_path.is_dir() and run_path.name.startswith("r_"):
            try:
                manifest = load_manifest(run_path)
                runs.append({
                    "run_id": run_path.name,
                    "path": str(run_path),
                    "manifest": manifest,
                })
            except (FileNotFoundError, json.JSONDecodeError):
                continue
    
    return runs
