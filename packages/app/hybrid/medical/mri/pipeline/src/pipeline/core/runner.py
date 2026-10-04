"""Run orchestration: config in, self-describing run folder out.

A stage that cannot run in this build writes an `error` event and stops the run,
rather than reporting success it did not achieve. Everything the workbench reads
- manifest, config, events, metrics, artefacts - is written here, so a run folder
is always complete enough to audit.
"""

import json
from pathlib import Path
from typing import Any

from pipeline.core.events import EventWriter
from pipeline.core.runs import (
    compute_config_hash,
    create_manifest,
    create_run_folder,
    generate_run_id,
    save_config,
    update_manifest_end_time,
)
from pipeline.core.stages_data import model_type_from_config, stage_data, stage_split
from pipeline.core.stages_model import stage_baseline, stage_evaluate, stage_report

BASELINE_STAGES = ("data", "split", "baseline", "evaluate", "report")


def run_experiment(
    config: dict[str, Any],
    output_dir: str,
    run_id: str | None = None,
) -> dict[str, Any]:
    """Execute the configured stages and write one run folder.

    Args:
        config: Validated configuration dictionary
        output_dir: Parent directory for run folders
        run_id: Explicit run id, otherwise generated

    Returns:
        The run summary: id, path, stage outcomes and the aggregated metrics

    Raises:
        CohortError: If the cohort cannot be used as configured
        ValueError: If the configured model has no implementation in this build
    """
    run_id = run_id or generate_run_id()
    run_path = create_run_folder(output_dir, run_id, config)
    save_config(run_path, config)
    manifest = create_manifest(run_path, config, str(config.get("schema_version", "0.1.0")))
    events = EventWriter(run_path)
    events.write_stage_start("run", run_id)

    summary: dict[str, Any] = {
        "run_id": run_id,
        "path": str(run_path),
        "stages": [],
        "metrics": None,
        "data_hash": None,
    }
    try:
        _stages(config, run_path, events, summary)
    except Exception as error:
        events.write_error("run", str(error))
        _finish(run_path, manifest, events, "failed", summary["data_hash"])
        raise
    _finish(run_path, manifest, events, "completed", summary["data_hash"])
    return summary


def _finish(
    run_path: Path,
    manifest: dict[str, Any],
    events: EventWriter,
    status: str,
    data_hash: str | None = None,
) -> None:
    events.write_stage_end("run", "ok" if status == "completed" else "error")
    _write_manifest(run_path, {
        **manifest,
        "status": status,
        "data_hash": data_hash,
    })
    # Last, because it reads the manifest back from disk to stamp the end time.
    update_manifest_end_time(run_path)


def _write_manifest(run_path: Path, manifest: dict[str, Any]) -> None:
    (run_path / "manifest.json").write_text(json.dumps(manifest, indent=2))


def _stages(
    config: dict[str, Any],
    run_path: Path,
    events: EventWriter,
    summary: dict[str, Any],
) -> None:
    """Run every stage in order, recording each outcome in the summary."""
    model_type = model_type_from_config(config)
    cohort, features = stage_data(config, events, summary)
    splitter, lock_box = stage_split(config, cohort, run_path, events, summary)

    development = cohort.drop(index=lock_box.index)
    result = stage_baseline(
        model_type, development, features, splitter, events, summary
    )
    stage_evaluate(
        model_type, development, lock_box, features, splitter, run_path, events, summary
    )
    stage_report(model_type, result, cohort, run_path, events, summary)


def config_hash(config: dict[str, Any]) -> str:
    """Hash of the resolved configuration, for the summary the CLI prints."""
    return compute_config_hash(config)


def stages() -> list[str]:
    """The stages this build implements, in execution order."""
    return list(BASELINE_STAGES)
