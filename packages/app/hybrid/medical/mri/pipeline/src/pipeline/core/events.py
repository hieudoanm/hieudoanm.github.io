"""JSONL event writer for pipeline runs."""

import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional
from contextlib import contextmanager


class EventWriter:
    """Writer for JSONL events."""
    
    def __init__(self, run_path: Path):
        """Initialize event writer for a run."""
        self.run_path = run_path
        self.events_path = run_path / "events.jsonl"
        self._file = None
    
    def write_event(self, event: Dict[str, Any]) -> None:
        """Write a single event to the JSONL file."""
        event["timestamp"] = datetime.now().isoformat()
        
        with open(self.events_path, "a") as f:
            f.write(json.dumps(event) + "\n")
    
    def write_stage_start(self, stage: str, run_id: str) -> None:
        """Write a stage start event."""
        self.write_event({
            "type": "stage_start",
            "stage": stage,
            "run_id": run_id,
        })
    
    def write_stage_end(self, stage: str, status: str = "ok") -> None:
        """Write a stage end event."""
        self.write_event({
            "type": "stage_end",
            "stage": stage,
            "status": status,
        })
    
    def write_progress(
        self,
        stage: str,
        seed: Optional[int] = None,
        fold: Optional[int] = None,
        epoch: Optional[int] = None,
        loss: Optional[float] = None,
        **kwargs: Any,
    ) -> None:
        """Write a progress event."""
        event = {
            "type": "progress",
            "stage": stage,
        }
        
        if seed is not None:
            event["seed"] = seed
        if fold is not None:
            event["fold"] = fold
        if epoch is not None:
            event["epoch"] = epoch
        if loss is not None:
            event["loss"] = loss
        
        event.update(kwargs)
        self.write_event(event)
    
    def write_metric(
        self,
        stage: str,
        name: str,
        value: float,
        fold: Optional[int] = None,
        **kwargs: Any,
    ) -> None:
        """Write a metric event.

        `stage` is required, not optional: the workbench deserialises a metric
        event with a missing stage as a parse error and drops it silently.
        """
        event = {
            "type": "metric",
            "stage": stage,
            "name": name,
            "value": value,
        }
        
        if fold is not None:
            event["fold"] = fold
        
        event.update(kwargs)
        self.write_event(event)
    
    def write_error(self, stage: str, error: str, **kwargs: Any) -> None:
        """Write an error event."""
        event = {
            "type": "error",
            "stage": stage,
            "error": error,
        }
        event.update(kwargs)
        self.write_event(event)
    
    @contextmanager
    def stage_context(self, stage: str, run_id: str):
        """Context manager for a stage that writes start/end events."""
        self.write_stage_start(stage, run_id)
        try:
            yield
            self.write_stage_end(stage, "ok")
        except Exception as e:
            self.write_error(stage, str(e))
            self.write_stage_end(stage, "error")
            raise


def read_events(run_path: Path) -> list[Dict[str, Any]]:
    """Read all events from a run's events.jsonl file."""
    events_path = run_path / "events.jsonl"
    if not events_path.exists():
        return []
    
    events = []
    with open(events_path, "r") as f:
        for line in f:
            if line.strip():
                events.append(json.loads(line))
    
    return events


def filter_events_by_type(events: list[Dict[str, Any]], event_type: str) -> list[Dict[str, Any]]:
    """Filter events by type."""
    return [e for e in events if e.get("type") == event_type]


def filter_events_by_stage(events: list[Dict[str, Any]], stage: str) -> list[Dict[str, Any]]:
    """Filter events by stage."""
    return [e for e in events if e.get("stage") == stage]
