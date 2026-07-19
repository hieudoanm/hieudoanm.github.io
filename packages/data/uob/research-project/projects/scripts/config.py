"""Read and reload the typed configuration tables in the store."""

from __future__ import annotations

import hashlib
import json
import sqlite3
from dataclasses import dataclass, field

import config_inputs as C
import db
import taxonomy as T


@dataclass
class Configuration:
    """Everything the scorer needs, already validated and resolved."""

    # One weight per category, already reduced from the ranking: 5 for the
    # top choice down to 1 for the fifth, and 0 for everything past that.
    interest: dict[str, float] = field(default_factory=dict)
    method: dict[str, float] = field(default_factory=dict)
    dimension_weight: dict[str, float] = field(default_factory=dict)
    programme: str = ""
    project_types: list[str] = field(default_factory=list)
    exclusions: dict[str, set[str]] = field(default_factory=dict)
    feasibility: dict[int, dict[str, float]] = field(default_factory=dict)
    digest: str = ""


CONFIG_TABLES = ("interest", "method_preference", "category_weight", "dimension_weight",
                 "programme", "skill", "skill_goal", "project_type_preference", "exclusion",
                 "feasibility_rating")


FEASIBILITY_FIELDS = C.FEASIBILITY_FIELDS
PROFILE = C.PROFILE


def config_digest(connection, config: Configuration | None = None) -> str:
    """Hash every configuration row so runs can be compared by config.

    The derived rank weights are hashed too: changing how weights are computed
    changes every score, so it has to look like a configuration change.
    """
    payload = {table: [list(row) for row in db.fetch_all(connection, f"SELECT * FROM {table}")]
               for table in CONFIG_TABLES}
    if config is not None:
        payload["derived_weights"] = [sorted(config.interest.items()),
                                      sorted(config.method.items())]
    return hashlib.sha256(json.dumps(payload, sort_keys=True, default=str).encode()).hexdigest()[:16]


def load_configuration(connection) -> Configuration:
    """Reload every configuration table from the CSVs and return the result."""
    for table in CONFIG_TABLES:
        db.clear_table(connection, table)
    C.load_preferences(connection)
    C.load_weights(connection)
    C.load_dimensions(connection)
    C.load_settings(connection)
    C.load_feasibility(connection)
    connection.commit()
    current = read_configuration(connection)
    store_ranked_weights(connection, current)
    connection.commit()
    return current


def store_ranked_weights(connection, config: Configuration) -> None:
    """Write the derived ranking onto the preference rows.

    The CSV priority only fixes the default order, so SQL consumers need the
    resolved weight stored next to it or they would re-derive a different one.
    """
    ids = {(row["name"], row["dimension"]): row["id"]
           for row in db.fetch_all(connection, "SELECT id, name, dimension FROM category")}
    for table, dimension, weights in (("interest", "subject", config.interest),
                                      ("method_preference", "method", config.method)):
        for name, weight in weights.items():
            connection.execute(f"UPDATE {table} SET ranked_weight = ? WHERE category_id = ?",
                               (weight, ids[(name, dimension)]))


def exclusion_rules(connection) -> dict[str, set[str]]:
    """Group configured exclusions by kind, case-folded for comparison."""
    rules: dict[str, set[str]] = {}
    for row in db.fetch_all(connection, "SELECT kind, value FROM exclusion"):
        rules.setdefault(row["kind"], set()).add(row["value"].casefold())
    return rules


MAX_RANKED = 3


def ranked_weights(ordered: list[str]) -> dict[str, float]:
    """Weight categories by their position in the ranking.

    First choice counts 3, second 2, third 1. Anything past the top three weighs
    0, which keeps it out of the matches and the contributions while leaving it
    visible in the interface, so a short profile stays possible.
    """
    return {name: float(max(MAX_RANKED - rank, 0)) for rank, name in enumerate(ordered)}


def ranked_order(priorities: dict[str, float]) -> list[str]:
    """Return the categories the user ranked, strongest first.

    Ties fall back to the name so the browser port of this ranking cannot
    disagree about which categories survived the cut.
    """
    return [name for name, _ in sorted(priorities.items(), key=lambda item: (-item[1], item[0]))]


def read_configuration(connection) -> Configuration:
    """Read the stored configuration back into scorer-friendly dictionaries."""
    names = {(row["id"], row["dimension"]): row["name"]
             for row in db.fetch_all(connection, "SELECT id, name, dimension FROM category")}
    config = Configuration(
        interest={names[(r["category_id"], "subject")]: r["priority"]
                  for r in db.fetch_all(connection, "SELECT category_id, priority FROM interest")},
        method={names[(r["category_id"], "method")]: r["priority"]
                for r in db.fetch_all(connection, "SELECT category_id, priority FROM method_preference")},
        dimension_weight={r["dimension"]: r["weight"] for r in db.fetch_all(
            connection, "SELECT dimension, weight FROM dimension_weight")},
        programme=db.scalar(connection, "SELECT name FROM programme LIMIT 1") or "",
        project_types=[r["name"] for r in db.fetch_all(
            connection, "SELECT name FROM project_type_preference ORDER BY name")],
        exclusions=exclusion_rules(connection),
    )
    config.interest = ranked_weights(ranked_order(config.interest))
    config.method = ranked_weights(ranked_order(config.method))
    config.feasibility = {
        row["project_id"]: {key: row[key] for key in FEASIBILITY_FIELDS if row[key] is not None}
        for row in db.fetch_all(connection, "SELECT project_id, skill_fit, workload_fit, resource_access "
                                            "FROM feasibility_rating")
    }
    if not any(value > 0 for value in config.interest.values()):
        raise ValueError(f"Add at least one positive interest priority to {PROFILE}")
    config.digest = config_digest(connection, config)
    return config
