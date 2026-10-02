"""Parse the hand-edited configuration CSVs into typed store tables."""

from __future__ import annotations

import csv
import hashlib
import json
import math
from dataclasses import dataclass, field
from pathlib import Path

import db
import taxonomy as T


CSV_DIR = db.DATA_DIR / "csv"
PROFILE = CSV_DIR / "projects_profile.csv"
CATEGORY_WEIGHTS = CSV_DIR / "projects_weights.csv"
METHOD_WEIGHTS = CSV_DIR / "projects_method_weights.csv"
DIMENSION_WEIGHTS = CSV_DIR / "ranking_weights.csv"
FEASIBILITY = CSV_DIR / "projects_feasibility.csv"

EXCLUSION_KINDS = {
    "exclude category": "category",
    "exclude project type": "project_type",
    "exclude ethics status": "ethics_status",
}
FEASIBILITY_FIELDS = ("skill_fit", "workload_fit", "resource_access")


@dataclass
class Configuration:
    """Everything the scorer needs, already validated and resolved."""

    interest: dict[str, float] = field(default_factory=dict)
    method: dict[str, float] = field(default_factory=dict)
    dimension_weight: dict[str, float] = field(default_factory=dict)
    programme: str = ""
    project_types: list[str] = field(default_factory=list)
    exclusions: dict[str, set[str]] = field(default_factory=dict)
    feasibility: dict[int, dict[str, float]] = field(default_factory=dict)
    digest: str = ""


def read_rows(path: Path) -> list[dict[str, str]]:
    """Read a CSV and fail clearly when it is missing or empty."""
    if not path.is_file():
        raise FileNotFoundError(f"{path} is missing")
    with path.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))
    if not rows:
        raise ValueError(f"{path} has no data rows")
    return rows


def number(value: str, label: str) -> float:
    """Parse a finite number with the failing label in the error."""
    try:
        parsed = float(value)
    except (TypeError, ValueError) as error:
        raise ValueError(f"Invalid number for {label}: {value!r}") from error
    if not math.isfinite(parsed):
        raise ValueError(f"Value for {label} must be finite")
    return parsed


def nonnegative(value: str, label: str) -> float:
    """Parse a finite, non-negative multiplier."""
    parsed = number(value, label)
    if parsed < 0:
        raise ValueError(f"Value for {label} must be non-negative")
    return parsed


def resolve_category(connection, name: str, dimension: str) -> int:
    """Resolve a label name within one dimension, or explain what is valid."""
    row = db.fetch_one(connection, "SELECT id FROM category WHERE name = ? AND dimension = ?",
                       (name, dimension))
    if row is None:
        raise ValueError(f"Unknown {dimension} category {name!r}. "
                         f"Valid names: {', '.join(sorted(T.category_names(dimension)))}")
    return row["id"]


def load_preferences(connection) -> None:
    """Read interest and method preferences from the profile CSV."""
    for row in read_rows(PROFILE):
        kind = (row.get("Profile type") or "").strip().casefold()
        value = (row.get("Value") or "").strip()
        raw_priority = (row.get("Priority") or "").strip()
        if not value or not raw_priority:
            continue
        priority = nonnegative(raw_priority, f"{kind} preference {value!r}")
        if not 0 <= priority <= 5:
            raise ValueError(f"Priority for {value!r} must be between 0 and 5")
        table = "interest" if kind == "interest" else "method_preference" if kind == "method" else None
        if table:
            dimension = "subject" if kind == "interest" else "method"
            connection.execute(
                f"INSERT INTO {table} (category_id, priority, notes) VALUES (?, ?, ?)",
                (resolve_category(connection, value, dimension), priority, (row.get("Notes") or "").strip() or None),
            )


def load_weights(connection) -> None:
    """Read subject and method multipliers into one typed table."""
    for path, dimension in ((CATEGORY_WEIGHTS, "subject"), (METHOD_WEIGHTS, "method")):
        for row in read_rows(path):
            name = (row.get("Category") or "").strip()
            if not name:
                raise ValueError(f"{path} has a blank Category")
            connection.execute(
                "INSERT OR REPLACE INTO category_weight (category_id, weight) VALUES (?, ?)",
                (resolve_category(connection, name, dimension),
                 nonnegative(row.get("Weight", ""), f"{dimension} weight for {name!r}")),
            )


def load_dimensions(connection) -> None:
    """Read the score dimension weights."""
    for row in read_rows(DIMENSION_WEIGHTS):
        dimension = (row.get("Dimension") or "").strip()
        if not dimension:
            raise ValueError(f"{DIMENSION_WEIGHTS} has a blank Dimension")
        connection.execute(
            "INSERT OR REPLACE INTO dimension_weight (dimension, weight, notes) VALUES (?, ?, ?)",
            (dimension, nonnegative(row.get("Weight", ""), f"dimension {dimension!r}"),
             (row.get("Notes") or "").strip() or None),
        )


def load_settings(connection) -> None:
    """Read programme, skills, goals, project types and exclusions."""
    for row in read_rows(PROFILE):
        kind = (row.get("Profile type") or "").strip().casefold()
        value = (row.get("Value") or "").strip()
        priority = (row.get("Priority") or "").strip()
        if kind == "programme" and value:
            connection.execute("INSERT OR IGNORE INTO programme (name) VALUES (?)", (value,))
        elif kind == "current skill" and value:
            rating = number(priority, f"skill {value!r}") if priority else None
            connection.execute("INSERT INTO skill (name, rating) VALUES (?, ?)", (value, rating))
        elif kind == "skill goal" and value:
            goal_priority = nonnegative(priority, f"skill goal {value!r}") if priority else None
            connection.execute("INSERT INTO skill_goal (name, priority) VALUES (?, ?)",
                               (value, goal_priority))
        elif kind == "project type" and value:
            for item in value.split(";"):
                if item.strip():
                    connection.execute("INSERT OR IGNORE INTO project_type_preference (name) VALUES (?)",
                                       (item.strip(),))
        elif kind in EXCLUSION_KINDS:
            for item in value.split(";"):
                if item.strip():
                    connection.execute("INSERT OR IGNORE INTO exclusion (kind, value) VALUES (?, ?)",
                                       (EXCLUSION_KINDS[kind], item.strip()))


def load_feasibility(connection) -> None:
    """Read manual 1-5 ratings, keyed by store project id."""
    ids = {row["source_code"]: row["id"] for row in db.fetch_all(connection, "SELECT id, source_code FROM project")}
    for row in read_rows(FEASIBILITY):
        code = (row.get("Project ID") or "").strip()
        if not code:
            raise ValueError(f"{FEASIBILITY} has a blank Project ID")
        if code not in ids:
            raise ValueError(f"{FEASIBILITY} refers to an unknown project: {code!r}")
        ratings = {}
        for source, column in (("Skill fit (1-5)", "skill_fit"), ("Workload fit (1-5)", "workload_fit"),
                               ("Resource access (1-5)", "resource_access")):
            raw = (row.get(source) or "").strip()
            if not raw:
                continue
            value = number(raw, f"{code}: {source}")
            if not 1 <= value <= 5:
                raise ValueError(f"{code}: {source} must be between 1 and 5")
            ratings[column] = value
        connection.execute(
            "INSERT OR REPLACE INTO feasibility_rating "
            "(project_id, skill_fit, workload_fit, resource_access, notes) VALUES (?,?,?,?,?)",
            (ids[code], ratings.get("skill_fit"), ratings.get("workload_fit"),
             ratings.get("resource_access"), (row.get("Notes") or "").strip() or None),
        )
