"""Write the CSV exports that make the store reviewable in a diff."""

from __future__ import annotations

import csv
import re
import sqlite3
from pathlib import Path

import db


CSV_DIR = db.DATA_DIR / "csv"
CATEGORIES = CSV_DIR / "projects_categories.csv"
RANKINGS = CSV_DIR / "projects_rankings.csv"
SUPERVISORS = CSV_DIR / "supervisors_alignment.csv"

WHITESPACE = re.compile(r"\s+")

# Prose columns are collapsed to one line; identifiers and codes are never
# touched, because normalising them would change the key itself.
PROSE_COLUMNS = {"topic", "methodology", "skills_requirements", "recommended_practical",
                 "recommended_data_module", "optional_modules", "category_evidence",
                 "method_evidence", "supervisor_research_focus", "requirement_review",
                 "research_focus", "project_titles"}

# View column -> CSV header. Keeps friendly headers out of the SQL views.
CATEGORY_COLUMNS = (
    ("source_code", "Project ID"), ("title", "Project title"), ("supervisors", "Supervisor"),
    ("project_type", "Project Type"), ("ethics_status", "Ethical approval status"),
    ("programmes", "relevant programmes"), ("topic", "Topic"), ("methodology", "Methodology"),
    ("skills_requirements", "Skills & requirements"),
    ("recommended_practical", "Recommended practical"),
    ("recommended_data_module", "Recommended data science module"),
    ("optional_modules", "Optional modules"), ("categories", "Categories"), ("methods", "Methods"),
    ("category_evidence", "Category evidence"), ("method_evidence", "Method evidence"),
    ("category_count", "Category count"), ("method_count", "Method count"),
    ("source_file", "Source file"),
)

RANKING_COLUMNS = (
    ("rank", "Rank"), ("total", "Score"), ("interest_match", "Interest fit (%)"),
    ("method_match", "Method fit (%)"), ("supervisor_focus_match", "Supervisor focus fit (%)"),
    ("feasibility", "Feasibility (%)"),
    ("information_completeness", "Information completeness (%)"),
    ("programme_fit", "Programme fit (%)"), ("project_type_fit", "Project type fit (%)"),
    ("active_dimensions", "Active dimensions"),
    ("matching_interests", "Matching interests"), ("matching_methods", "Matching methods"),
    ("matching_supervisor_focus", "Matching supervisor focus"),
    ("project_contributions", "Weighted category contributions"),
    ("supervisor_contributions", "Weighted supervisor focus contributions"),
    ("supervisor_research_focus", "Supervisor research focus"),
    ("supervisor_focus_status", "Supervisor focus status"),
    ("supervisor_emails", "Supervisor email"), ("supervisor_websites", "Supervisor website"),
    ("requirement_review", "Requirement review"),
) + CATEGORY_COLUMNS

SUPERVISOR_COLUMNS = (
    ("name", "Supervisor"), ("focus_match", "Supervisor focus fit (%)"),
    ("project_count", "Projects supervised"), ("focus_categories", "Focus categories"),
    ("focus_status", "Focus status"), ("email", "Email"), ("website", "Website"),
    ("research_focus", "Research focus"), ("project_titles", "Project titles"),
)

SCORE_COLUMNS = ("rank", "total", "interest_match", "method_match", "supervisor_focus_match",
                 "feasibility", "information_completeness", "programme_fit", "project_type_fit")


def write_csv(path: Path, columns: tuple[tuple[str, str], ...], rows: list[dict]) -> None:
    """Write selected view columns as UTF-8 CSV."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as output:
        writer = csv.writer(output)
        writer.writerow([header for _, header in columns])
        for row in rows:
            writer.writerow([format_cell(row.get(name), name in PROSE_COLUMNS)
                             for name, _ in columns])


def format_cell(value, collapse: bool = False) -> str:
    """Render one value for CSV, collapsing prose to a single line."""
    if value is None:
        return ""
    if isinstance(value, float):
        return f"{value:.1f}" if abs(value) <= 100 else f"{value:.2f}"
    text = str(value)
    return WHITESPACE.sub(" ", text).strip() if collapse else text


def rows_of(connection: sqlite3.Connection, view: str, order: str) -> list[dict]:
    """Read a view into dictionaries."""
    return [dict(row) for row in db.fetch_all(connection, f"SELECT * FROM {view} ORDER BY {order}")]


def write_categories(connection: sqlite3.Connection) -> int:
    """Write the categorized project export."""
    rows = rows_of(connection, "v_project_export", "source_code")
    rows = [{**row, "category_review": "review_inferred_labels" if row["categories"]
             else "no_keyword_match_review_required"} for row in rows]
    columns = CATEGORY_COLUMNS + (("category_review", "Category review"),)
    write_csv(CATEGORIES, columns, rows)
    return len(rows)


def write_rankings(connection: sqlite3.Connection) -> int:
    """Write the ranking export for the most recent run."""
    rows = rows_of(connection, "v_ranking_export", "rank")
    run = db.fetch_one(connection, "SELECT active_dimensions FROM latest_run")
    for row in rows:
        row["active_dimensions"] = run["active_dimensions"] if run else ""
    write_csv(RANKINGS, RANKING_COLUMNS, rows)
    return len(rows)


def write_supervisors(connection: sqlite3.Connection) -> int:
    """Write the supervisor alignment export used by the leaderboard."""
    rows = rows_of(connection, "v_supervisor_score",
                   "focus_match IS NULL, focus_match DESC, project_count DESC, name")
    write_csv(SUPERVISORS, SUPERVISOR_COLUMNS, rows)
    return len(rows)


def write_csv_exports(connection: sqlite3.Connection) -> dict[str, int]:
    """Write every CSV export and report how many rows each got."""
    return {"categories": write_categories(connection),
            "rankings": write_rankings(connection),
            "supervisors": write_supervisors(connection)}
