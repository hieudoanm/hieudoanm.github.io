"""SQLite access helpers for the research project store."""

from __future__ import annotations

import sqlite3
from collections.abc import Iterable, Iterator, Sequence
from contextlib import contextmanager
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "data"
PUBLIC = ROOT / "public"
DATABASE = PUBLIC / "research.sqlite"
SCHEMA = Path(__file__).parent / "schema.sql"
SCHEMA_VERSION = "1"


def connect(path: Path = DATABASE, read_only: bool = False) -> sqlite3.Connection:
    """Open the store, applying the schema when writing."""
    if read_only and not path.is_file():
        raise FileNotFoundError(f"{path} is missing; run `make rank` first")
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    if not read_only:
        ensure_schema(connection)
    return connection


def ensure_schema(connection: sqlite3.Connection) -> None:
    """Create tables, views and indexes if they are not there yet."""
    connection.executescript(SCHEMA.read_text(encoding="utf-8"))
    connection.execute(
        "INSERT INTO schema_meta (key, value) VALUES ('schema_version', ?) "
        "ON CONFLICT (key) DO UPDATE SET value = excluded.value",
        (SCHEMA_VERSION,),
    )
    connection.commit()


@contextmanager
def session(path: Path = DATABASE, read_only: bool = False) -> Iterator[sqlite3.Connection]:
    """Open a connection, commit on success, and always close it."""
    connection = connect(path, read_only=read_only)
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def insert_many(connection: sqlite3.Connection, statement: str, rows: Iterable[Sequence]) -> None:
    """Insert rows in one transaction, skipping the write when there are none."""
    batch = list(rows)
    if batch:
        connection.executemany(statement, batch)


def scalar(connection: sqlite3.Connection, statement: str, parameters: Sequence = ()):
    """Return the first column of the first row, or None when there is no row."""
    row = connection.execute(statement, parameters).fetchone()
    return None if row is None else row[0]


def fetch_all(connection: sqlite3.Connection, statement: str, parameters: Sequence = ()) -> list[sqlite3.Row]:
    """Run a query and return every row."""
    return connection.execute(statement, parameters).fetchall()


def fetch_one(connection: sqlite3.Connection, statement: str, parameters: Sequence = ()):
    """Run a query and return its single row, or None."""
    return connection.execute(statement, parameters).fetchone()


def clear_table(connection: sqlite3.Connection, table: str) -> None:
    """Empty one table so an ingest can replace it wholesale."""
    connection.execute(f"DELETE FROM {table}")


def reset_facts(connection: sqlite3.Connection) -> None:
    """Drop derived facts, keeping taxonomy, entities and configuration."""
    for table in ("score_match", "score_contribution", "project_score", "supervisor_score", "score_run"):
        clear_table(connection, table)
    connection.commit()
