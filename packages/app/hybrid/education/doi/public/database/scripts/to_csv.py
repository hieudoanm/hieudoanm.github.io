#!/usr/bin/env python3

import argparse
import csv
import sqlite3
import sys
from pathlib import Path


def _table_names(connection: sqlite3.Connection) -> list[str]:
    rows = connection.execute(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    ).fetchall()
    return [row[0] for row in rows]


def convert(db_path: Path, out_dir: Path) -> list[tuple[str, int]]:
    connection = sqlite3.connect(db_path)
    summary: list[tuple[str, int]] = []
    for table in _table_names(connection):
        columns = [row[1] for row in connection.execute(f'PRAGMA table_info("{table}")')]
        quoted = ", ".join(f'"{col}"' for col in columns)
        rows = connection.execute(f"SELECT {quoted} FROM \"{table}\"").fetchall()
        _write(out_dir / f"{db_path.stem}.{table}.csv", columns, rows)
        summary.append((table, len(rows)))
    connection.close()
    return summary


def _write(path: Path, columns: list[str], rows: list[tuple[str, ...]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(columns)
        writer.writerows(rows)


def _parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert every table in each doi.db into doi.<table>.csv files."
    )
    parser.add_argument("dbs", nargs="+", type=Path, help="SQLite files to convert")
    parser.add_argument(
        "-o",
        "--out",
        type=Path,
        default=Path(__file__).parent.with_name("csv"),
        help="Output directory (default: database/csv)",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(list(argv) if argv is not None else sys.argv[1:])
    for db_path in args.dbs:
        if not db_path.exists():
            print(f"Skipping {db_path}: not found", file=sys.stderr)
            continue
        summary = convert(db_path, args.out)
        for table, count in summary:
            print(f"wrote {db_path.stem}.{table}.csv ({count} rows) -> {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())