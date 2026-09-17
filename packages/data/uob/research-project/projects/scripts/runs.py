"""Load project facts and record a scored run in the store."""

from __future__ import annotations

import sqlite3
from datetime import UTC, datetime

import config
import db
import export
import loaders
import scoring


def score_projects(projects: list[dict], current: config.Configuration) -> list[dict]:
    """Score, exclude and rank the projects, best fit first."""
    kept = [project for project in projects if not scoring.is_excluded(project, current)]
    if not kept:
        raise ValueError("The current profile exclusions removed every project")
    enabled = loaders.feasibility_enabled(kept, current)
    rows = []
    for project in kept:
        scores = scoring.dimension_scores(project, current, enabled)
        total, active = scoring.combine(scores, current)
        rows.append({"project": project, "scores": scores, "total": total, "active": active})
    rows.sort(key=lambda row: (-row["total"], row["project"]["title"].casefold()))
    for position, row in enumerate(rows, start=1):
        row["rank"] = position
    return rows


def start_run(connection: sqlite3.Connection, config: config.Configuration, active: list[str],
              note: str = "") -> int:
    """Open a run row so scores from different configurations stay comparable."""
    cursor = connection.execute(
        "INSERT INTO score_run (created_at, label, config_hash, active_dimensions, note) "
        "VALUES (?, ?, ?, ?, ?)",
        (datetime.now(UTC).isoformat(timespec="seconds"), config.digest, config.digest,
         "; ".join(active), note or None),
    )
    return cursor.lastrowid


def write_run(connection: sqlite3.Connection, run_id: int, rows: list[dict],
              current: config.Configuration) -> None:
    """Store per-project scores, the contributions behind them and supervisor scores."""
    category_ids = {(row["name"], row["dimension"]): row["id"]
                    for row in db.fetch_all(connection, "SELECT id, name, dimension FROM category")}
    for row in rows:
        store_project_score(connection, run_id, row)
        store_scopes(connection, run_id, row, current, category_ids)
    store_supervisor_scores(connection, run_id, rows, current)


def store_project_score(connection: sqlite3.Connection, run_id: int, row: dict) -> None:
    """Insert the dimension scores and review fields for one project."""
    scores = row["scores"]
    project = row["project"]
    connection.execute(
        "INSERT INTO project_score (run_id, project_id, total, rank, interest_match, method_match, "
        "supervisor_focus_match, feasibility, programme_fit, project_type_fit, "
        "information_completeness, requirement_review) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        (run_id, project["id"], row["total"], row["rank"], scores[scoring.INTEREST],
         scores[scoring.METHOD], scores[scoring.SUPERVISOR_FOCUS], scores[scoring.FEASIBILITY],
         scores[scoring.PROGRAMME], scores[scoring.PROJECT_TYPE],
         scoring.information_completeness(project), scoring.requirement_review(project)),
    )


def scopes_for(project: dict) -> list[tuple[str, set[str]]]:
    """Pair each scoring scope with the labels it considers."""
    return [("project", set(project["subjects"])), ("method", set(project["methods"])),
            ("supervisor", loaders.verified_focus(project))]


def store_scopes(connection: sqlite3.Connection, run_id: int, row: dict,
                 current: config.Configuration, category_ids: dict) -> None:
    """Record the matches and weighted contributions behind each scope's score."""
    project = row["project"]
    for scope, labels in scopes_for(project):
        weights = scope_weights(scope, current)
        if not any(weights.values()):
            continue
        _, matched, contributions = scoring.preference_scores(labels, weights)
        for name in matched:
            insert_fact(connection, "score_match", run_id, project["id"], scope,
                        category_ids[(name, "subject" if scope != "method" else "method")])
        for name, value in contributions.items():
            insert_fact(connection, "score_contribution", run_id, project["id"], scope,
                        category_ids[(name, "subject" if scope != "method" else "method")], value)


def scope_weights(scope: str, current: config.Configuration) -> dict:
    """Return the ranked weights that apply to one scope."""
    return current.method if scope == "method" else current.interest


def insert_fact(connection: sqlite3.Connection, table: str, run_id: int, project_id: int,
                scope: str, category_id: int, value: float | None = None) -> None:
    """Insert one match or contribution row."""
    if value is None:
        connection.execute(
            f"INSERT OR REPLACE INTO {table} (run_id, project_id, scope, category_id) VALUES (?,?,?,?)",
            (run_id, project_id, scope, category_id))
    else:
        connection.execute(
            f"INSERT OR REPLACE INTO {table} (run_id, project_id, scope, category_id, contribution) "
            "VALUES (?,?,?,?,?)", (run_id, project_id, scope, category_id, value))


def store_supervisor_scores(connection: sqlite3.Connection, run_id: int, rows: list[dict],
                            current: config.Configuration) -> None:
    """Store each supervisor's own focus alignment for the leaderboard."""
    scores: dict[int, float] = {}
    counts: dict[int, int] = {}
    for row in rows:
        for entry in row["project"]["supervisor_details"]:
            counts[entry["id"]] = counts.get(entry["id"], 0) + 1
            if entry["focus_status"] != "verified":
                continue
            value = scoring.preference_scores(entry["categories"], current.interest)[0] or 0.0
            scores[entry["id"]] = max(scores.get(entry["id"], 0.0), value)
    for supervisor_id, count in counts.items():
        connection.execute(
            "INSERT OR REPLACE INTO supervisor_score (run_id, supervisor_id, focus_match, project_count) "
            "VALUES (?, ?, ?, ?)", (run_id, supervisor_id, scores.get(supervisor_id), count))


def main() -> None:
    """Reload configuration, score every project, record the run and export it."""
    with db.session() as connection:
        current = config.load_configuration(connection)
        rows = score_projects(loaders.load_projects(connection), current)
        run_id = start_run(connection, current, rows[0]["active"])
        write_run(connection, run_id, rows, current)
        counts = export.write_csv_exports(connection)
    summary = " ".join(f"{count} {name}" for name, count in counts.items())
    print(f"Scored {len(rows)} projects into run {run_id} (config {current.digest})")
    print(f"Exports: {summary} -> {export.CSV_DIR}")


if __name__ == "__main__":
    main()
