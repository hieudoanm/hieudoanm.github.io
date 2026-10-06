"""Lock-box test set access counter and logger."""

import json
from datetime import datetime
from pathlib import Path
from typing import Any


class LockBoxLogger:
    """Logger for lock-box test set access."""

    def __init__(self, log_path: str):
        """Initialize lock-box logger.
        
        Args:
            log_path: Path to the lock-box access log file
        """
        self.log_path = Path(log_path)
        self.log_path.parent.mkdir(parents=True, exist_ok=True)

        # Load existing log if it exists
        if self.log_path.exists():
            with open(self.log_path) as f:
                loaded = json.load(f)
        else:
            loaded = None

        # The log holds an int and a list under different keys, so it is typed
        # loosely on purpose: a narrow union would make `self.log["accesses"]`
        # look like an int to the checker and reject the append below.
        self.log: dict[str, Any] = loaded if isinstance(loaded, dict) else {
            "access_count": 0,
            "accesses": [],
        }

    def log_access(
        self,
        run_id: str,
        purpose: str,
        model_name: str | None = None,
        **kwargs: Any,
    ) -> int:
        """Log an access to the lock-box test set.
        
        Args:
            run_id: ID of the run accessing the lock-box
            purpose: Purpose of the access (e.g., "evaluation", "final_test")
            model_name: Name of the model being evaluated
            **kwargs: Additional metadata
        
        Returns:
            The access count after this access
        """
        # Ensure access_count is an int
        count = self.log.get("access_count", 0)
        if not isinstance(count, int):
            count = 0
        count += 1
        self.log["access_count"] = count

        access_entry: dict[str, Any] = {
            "access_number": count,
            "timestamp": datetime.now().isoformat(),
            "run_id": run_id,
            "purpose": purpose,
            "model_name": model_name,
        }
        access_entry.update(kwargs)

        self.log["accesses"].append(access_entry)

        # Save to disk
        self._save()

        return count

    def get_access_count(self) -> int:
        """Get the current access count."""
        count = self.log["access_count"]
        return count if isinstance(count, int) else 0

    def get_access_history(self) -> list[dict[str, Any]]:
        """Get the full access history."""
        history = self.log["accesses"]
        return history if isinstance(history, list) else []

    def _save(self) -> None:
        """Save log to disk."""
        with open(self.log_path, "w") as f:
            json.dump(self.log, f, indent=2)

    def reset(self) -> None:
        """Reset the log (use with caution)."""
        self.log = {
            "access_count": 0,
            "accesses": [],
        }
        self._save()


def get_default_lockbox_log_path(output_dir: str) -> str:
    """Get the default path for the lock-box access log.
    
    Args:
        output_dir: Output directory for runs
    
    Returns:
        Path to lock-box access log
    """
    return str(Path(output_dir) / "lockbox_access_log.json")
