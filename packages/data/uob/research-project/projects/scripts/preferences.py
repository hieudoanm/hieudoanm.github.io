"""Expose the scoring inputs the browser needs to recompute results.

The page ships as a static file, so every input the scorer reads must travel in
the payload. This module reads them once at build time; `scoring_js` ports the
same rules to the browser.
"""

from __future__ import annotations

import config
import db


def category_labels(connection, dimension: str) -> list[str]:
    """Return every label of one dimension, in taxonomy order."""
    return [row["name"] for row in db.fetch_all(
        connection, "SELECT name FROM category WHERE dimension = ? ORDER BY sort_order", (dimension,))]


def programme_lists(connection) -> dict[int, list[str]]:
    """Return each project's programmes as a list, not a joined string.

    Programme names contain commas, so the export view's `, ` join cannot be
    split back apart safely.
    """
    result: dict[int, list[str]] = {}
    for row in db.fetch_all(
            connection, "SELECT project_id, programme FROM project_programme ORDER BY project_id, programme"):
        result.setdefault(row["project_id"], []).append(row["programme"])
    return result


def feasibility_by_project(connection) -> dict[int, dict[str, float]]:
    """Return the ratings that were actually entered, keyed by project."""
    result: dict[int, dict[str, float]] = {}
    for row in db.fetch_all(connection, "SELECT project_id, skill_fit, workload_fit, resource_access "
                                         "FROM feasibility_rating"):
        entered = {key: row[key] for key in config.FEASIBILITY_FIELDS if row[key] is not None}
        if entered:
            result[row["project_id"]] = entered
    return result


def attach_project_inputs(connection, projects: list[dict]) -> None:
    """Add the per-project inputs the payload cannot derive on its own."""
    programmes = programme_lists(connection)
    feasibility = feasibility_by_project(connection)
    for project in projects:
        identifier = project["project_id"]
        project["programmes"] = programmes.get(identifier, [])
        project["feasibility"] = feasibility.get(identifier, {})


def browser_config(connection, current: config.Configuration) -> dict:
    """Serialise the configuration the browser needs to rescore locally."""
    return {
        "interest": current.interest,
        "method": current.method,
        "dimension": current.dimension_weight,
        "programme": current.programme,
        "project_types": current.project_types,
        "exclusions": {kind: sorted(values) for kind, values in current.exclusions.items()},
        "subject_categories": category_labels(connection, "subject"),
        "method_categories": category_labels(connection, "method"),
    }
