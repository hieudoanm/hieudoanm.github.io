"""Load project facts and their labels from the store."""

from __future__ import annotations

import sqlite3

import config
import db


def load_projects(connection: sqlite3.Connection) -> list[dict]:
    """Assemble every project with its labels, supervisors and programmes."""
    projects = [dict(row) for row in db.fetch_all(connection, "SELECT * FROM project ORDER BY source_code")]
    by_id = {project["id"]: project for project in projects}
    for project in projects:
        project.update(subjects=[], methods=[], evidence=[], supervisors=[], supervisor_details=[],
                       programmes=[])
    attach_labels(connection, by_id)
    attach_supervisors(connection, by_id)
    return projects


def attach_labels(connection: sqlite3.Connection, by_id: dict[int, dict]) -> None:
    """Add category names, triggering phrases and programme names to each project."""
    rows = db.fetch_all(connection, "SELECT pc.project_id, c.name, c.dimension, pc.evidence, pc.source_field "
                                     "FROM project_category pc JOIN category c ON c.id = pc.category_id")
    for row in rows:
        key = "subjects" if row["dimension"] == "subject" else "methods"
        by_id[row["project_id"]][key].append(row["name"])
        by_id[row["project_id"]]["evidence"].append(
            f"{row['name']}: {row['evidence']} ({row['source_field']})")
    for row in db.fetch_all(connection, "SELECT project_id, programme FROM project_programme"):
        by_id[row["project_id"]]["programmes"].append(row["programme"])


def attach_supervisors(connection: sqlite3.Connection, by_id: dict[int, dict]) -> None:
    """Add ordered supervisors with contact details and their verified focus labels."""
    focus = supervisor_focus(connection)
    rows = db.fetch_all(connection, "SELECT x.project_id, x.ordinal, s.id, s.name, s.email, s.website, "
                                     "s.research_focus, s.focus_status FROM project_supervisor x "
                                     "JOIN supervisor s ON s.id = x.supervisor_id "
                                     "ORDER BY x.project_id, x.ordinal")
    for row in rows:
        project = by_id[row["project_id"]]
        project["supervisors"].append(row["name"])
        project["supervisor_details"].append({
            "id": row["id"], "name": row["name"], "email": row["email"], "website": row["website"],
            "research_focus": row["research_focus"], "focus_status": row["focus_status"],
            "categories": focus.get(row["id"], set()),
        })


def supervisor_focus(connection: sqlite3.Connection) -> dict[int, set[str]]:
    """Return verified subject labels per supervisor id."""
    rows = db.fetch_all(connection, "SELECT sc.supervisor_id, c.name FROM supervisor_category sc "
                                     "JOIN supervisor s ON s.id = sc.supervisor_id "
                                     "JOIN category c ON c.id = sc.category_id "
                                     "WHERE s.focus_status = 'verified' AND c.dimension = 'subject'")
    focus: dict[int, set[str]] = {}
    for row in rows:
        focus.setdefault(row["supervisor_id"], set()).add(row["name"])
    return focus


def feasibility_enabled(projects: list[dict], cfg: config.Configuration) -> bool:
    """Only score feasibility when every project has all three ratings."""
    return all(len(cfg.feasibility.get(project["id"], {})) == len(config.FEASIBILITY_FIELDS)
               for project in projects)


def verified_focus(project: dict) -> set[str]:
    """Union the verified focus labels of a project's supervisors."""
    verified = [entry for entry in project["supervisor_details"] if entry["focus_status"] == "verified"]
    return set().union(*(entry["categories"] for entry in verified)) if verified else set()
