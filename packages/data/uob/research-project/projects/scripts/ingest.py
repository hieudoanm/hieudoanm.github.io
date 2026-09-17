"""Load taxonomy, supervisors and projects into the store."""

from __future__ import annotations

import csv

import db
import taxonomy as T


SUPERVISOR_SEED = db.DATA_DIR / "csv" / "projects_supervisors.csv"
PROJECT_FILES = "project-*.md"


def sync_taxonomy(connection) -> None:
    """Mirror the keyword taxonomy into the store, replacing previous rules."""
    db.clear_table(connection, "category_keyword")
    db.clear_table(connection, "category")
    for order, (name, dimension, pattern) in enumerate(T.category_specs()):
        connection.execute(
            "INSERT INTO category (name, dimension, sort_order) VALUES (?, ?, ?)",
            (name, dimension, order),
        )
        connection.execute(
            "INSERT INTO category_keyword (category_id, pattern) "
            "SELECT id, ? FROM category WHERE name = ? AND dimension = ?",
            (pattern, name, dimension),
        )
    connection.commit()


def category_ids(connection) -> dict[tuple[str, str], int]:
    """Return a (name, dimension) to id lookup."""
    return {(row["name"], row["dimension"]): row["id"]
            for row in db.fetch_all(connection, "SELECT id, name, dimension FROM category")}


def focus_status(focus: str) -> str:
    """Classify research focus so unverified text is never scored as a mismatch."""
    if not focus.strip():
        return "missing"
    lowered = focus.casefold()
    return "unverified" if any(marker in lowered for marker in T.UNVERIFIED_MARKERS) else "verified"


def seed_supervisors(connection) -> int:
    """Upsert the curated supervisor seed, keeping ids and links stable.

    The CSV is authoritative, so editing it takes effect on the next build
    without a reset. Matching on name keeps `supervisor_category` and
    `project_supervisor` rows pointing at the same supervisor.
    """
    with SUPERVISOR_SEED.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))
    for row in rows:
        focus = (row.get("research_focus") or "").strip()
        connection.execute(
            "INSERT INTO supervisor (name, email, website, research_focus, focus_status) "
            "VALUES (?, ?, ?, ?, ?) "
            "ON CONFLICT(name) DO UPDATE SET email=excluded.email, website=excluded.website, "
            "research_focus=excluded.research_focus, focus_status=excluded.focus_status",
            ((row.get("name") or "").strip(), (row.get("birmingham_email") or "").strip() or None,
             (row.get("birmingham_website") or "").strip() or None, focus, focus_status(focus)),
        )
    connection.commit()
    classify_supervisor_focus(connection)
    return len(rows)


def classify_supervisor_focus(connection) -> None:
    """Assign subject categories to each verified supervisor research focus."""
    db.clear_table(connection, "supervisor_category")
    ids = category_ids(connection)
    supervisors = db.fetch_all(connection, "SELECT id, research_focus FROM supervisor")
    for supervisor in supervisors:
        if focus_status(supervisor["research_focus"] or "") != "verified":
            continue
        for name, evidence in T.classify(supervisor["research_focus"], T.labels_for("subject")).items():
            connection.execute(
                "INSERT OR REPLACE INTO supervisor_category (supervisor_id, category_id, evidence) "
                "VALUES (?, ?, ?)",
                (supervisor["id"], ids[(name, "subject")], evidence),
            )
    connection.commit()


def supervisor_id_for(connection, name: str, cache: dict[str, int]) -> int:
    """Resolve a supervisor name to an id, creating the row when unknown."""
    if name not in cache:
        row = db.fetch_one(connection, "SELECT id FROM supervisor WHERE name = ?", (name,))
        cache[name] = row["id"] if row else connection.execute(
            "INSERT INTO supervisor (name, focus_status) VALUES (?, 'missing')", (name,)
        ).lastrowid
    return cache[name]


def project_row(connection, fields: dict[str, str], path, cache: dict[str, int]) -> int:
    """Insert one project with its supervisors, programmes and labels."""
    values = {column: T.source_value(fields, heading)
              for heading, column in T.PROJECT_FIELD_MAP.items()}
    cursor = connection.execute(
        "INSERT INTO project (source_code, title, summary, topic, methodology, project_type, "
        "ethics_status, ethics_note, supervisor_field, programmes_raw, optional_modules, "
        "recommended_practical, recommended_data_module, skills_requirements, seed_references, "
        "comments, source_file) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        (values["source_code"], values["title"], values["summary"], values["topic"],
         values["methodology"], values["project_type"], values["ethics_status"],
         values["ethics_note"], values["supervisor_field"], values["programmes_raw"],
         values["optional_modules"], values["recommended_practical"],
         values["recommended_data_module"], values["skills_requirements"],
         values["seed_references"], values["comments"], path.name),
    )
    project_id = cursor.lastrowid
    link_supervisors(connection, project_id, values["supervisor_field"], cache)
    link_programmes(connection, project_id, values["programmes_raw"])
    classify_project(connection, project_id, fields)
    return project_id


def link_supervisors(connection, project_id: int, value: str, cache: dict[str, int]) -> None:
    """Attach every listed supervisor, preserving source order."""
    for ordinal, name in enumerate(T.supervisor_names(value), start=1):
        connection.execute(
            "INSERT OR REPLACE INTO project_supervisor (project_id, supervisor_id, ordinal) "
            "VALUES (?, ?, ?)",
            (project_id, supervisor_id_for(connection, name, cache), ordinal),
        )


def link_programmes(connection, project_id: int, value: str) -> None:
    """Store one row per programme named in the source field."""
    for programme in T.split_programmes(value):
        connection.execute(
            "INSERT OR IGNORE INTO project_programme (project_id, programme) VALUES (?, ?)",
            (project_id, programme),
        )


def classify_project(connection, project_id: int, fields: dict[str, str]) -> None:
    """Label a project from its title, summary, topic and methodology."""
    ids = category_ids(connection)
    for heading in T.PROJECT_EVIDENCE_FIELDS:
        text = T.source_value(fields, heading)
        if not text:
            continue
        for dimension in ("subject", "method"):
            for name, evidence in T.classify(text, T.labels_for(dimension)).items():
                insert_label(connection, project_id, ids[(name, dimension)], evidence, heading)


def insert_label(connection, project_id: int, category_id: int, evidence: str, heading: str) -> None:
    """Store a label, keeping the earliest evidence found for it."""
    connection.execute(
        "INSERT INTO project_category (project_id, category_id, evidence, source_field) "
        "VALUES (?, ?, ?, ?) ON CONFLICT (project_id, category_id) DO NOTHING",
        (project_id, category_id, evidence, heading),
    )


def ingest_projects(connection) -> int:
    """Replace all project facts from the Markdown source directory."""
    for table in ("project_category", "project_programme", "project_supervisor", "project"):
        db.clear_table(connection, table)
    paths = sorted(T.SOURCE_DIR.glob(PROJECT_FILES))
    if not paths:
        raise FileNotFoundError(f"No project Markdown files found in {T.SOURCE_DIR}")
    cache: dict[str, int] = {}
    for path in paths:
        project_row(connection, T.parse_project(path), path, cache)
    connection.commit()
    return len(paths)


def main() -> None:
    """Load taxonomy, supervisors and projects into a fresh store."""
    with db.session() as connection:
        sync_taxonomy(connection)
        supervisors = seed_supervisors(connection)
        projects = ingest_projects(connection)
        classify_supervisor_focus(connection)
        print(f"Loaded {supervisors} supervisors and {projects} projects into {db.DATABASE}")


if __name__ == "__main__":
    main()
