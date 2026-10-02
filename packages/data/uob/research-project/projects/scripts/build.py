"""Run the whole pipeline in order: ingest, configure, score, export, dashboard."""

from __future__ import annotations

import config
import dashboard
import db
import export
import ingest
import loaders
import runs


def main() -> None:
    """Rebuild the store from source text, then regenerate every artefact."""
    with db.session() as connection:
        ingest.sync_taxonomy(connection)
        ingest.seed_supervisors(connection)
        projects = ingest.ingest_projects(connection)
        ingest.classify_supervisor_focus(connection)
        current = config.load_configuration(connection)
        rows = runs.score_projects(loaders.load_projects(connection), current)
        run_id = runs.start_run(connection, current, rows[0]["active"])
        runs.write_run(connection, run_id, rows, current)
        supervisors = export.write_csv_exports(connection)
    dashboard.build_dashboard()
    counts = " ".join(f"{count} {name}" for name, count in supervisors.items())
    print(f"Rebuilt {projects} projects into run {run_id} (config {current.digest})")
    print(f"Exports: {counts} -> {export.CSV_DIR}")


if __name__ == "__main__":
    main()
