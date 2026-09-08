#!/usr/bin/env python3

import argparse
import sqlite3
import sys
from pathlib import Path
from typing import Any

SEPARATOR = "\n\n------------------------------\n\n"
BAR_WIDTH = 24


def _parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Analyse the crawled citation network in a SQLite database."
    )
    parser.add_argument(
        "-d", "--db", type=Path,
        default=Path(__file__).parent.parent / "doi.db",
        help="SQLite database file (default: database/doi.db)",
    )
    parser.add_argument(
        "-q", "--query", default=None,
        help="Search query; restrict analysis to works matching title/author/abstract/doi",
    )
    parser.add_argument(
        "-t", "--top", type=int, default=10,
        help="Number of entries in the top-N listings (default: 10)",
    )
    return parser.parse_args(argv)


def load(db_path: Path) -> sqlite3.Connection:
    return sqlite3.connect(db_path)


def _prepare(connection: sqlite3.Connection, query: str | None) -> None:
    connection.execute("CREATE TEMP TABLE matched (doi TEXT PRIMARY KEY)")
    if query:
        like = f"%{query}%"
        connection.execute(
            """
            INSERT INTO matched
            SELECT doi FROM works
            WHERE title LIKE ? OR author LIKE ? OR abstract LIKE ? OR doi LIKE ?
            """,
            (like, like, like, like),
        )
    else:
        connection.execute("INSERT INTO matched SELECT doi FROM works")
    connection.commit()


def report(connection: sqlite3.Connection, top: int, query: str | None) -> str:
    total = connection.execute("SELECT COUNT(*) FROM matched").fetchone()[0]
    label = f" — matching '{query}'" if query else ""
    title = f"CITATION NETWORK ANALYSIS — {total} works{label}"
    banner = f"{'═' * 60}\n  {title}\n{'═' * 60}"
    sections = [
        _overview(connection),
        _year_summary(connection),
        _year_distribution(connection),
        _top_cited(connection, top),
        _top_citing(connection, top),
        _top_authors(connection, top),
    ]
    return banner + SEPARATOR + SEPARATOR.join(sections)


def _scalar(connection: sqlite3.Connection, aggregate: str) -> int | str | None:
    return connection.execute(
        f"SELECT {aggregate} FROM works WHERE title != '' AND year != '' "
        "AND doi IN (SELECT doi FROM matched)"
    ).fetchone()[0]


def _overview(connection: sqlite3.Connection) -> str:
    total = connection.execute("SELECT COUNT(*) FROM matched").fetchone()[0]
    titled = connection.execute(
        "SELECT COUNT(*) FROM works WHERE title != '' AND doi IN (SELECT doi FROM matched)"
    ).fetchone()[0]
    stubs = total - titled
    references = connection.execute(
        """
        SELECT COUNT(*)
        FROM "references" r
        JOIN matched a ON a.doi = r.workId
        JOIN matched b ON b.doi = r.referencedId
        """
    ).fetchone()[0]
    authors = connection.execute(
        "SELECT COUNT(DISTINCT author) FROM works "
        "WHERE author != '' AND doi IN (SELECT doi FROM matched)"
    ).fetchone()[0]
    density = references / titled if titled else 0.0
    title_pct = 100 * titled / total if total else 0.0
    stub_pct = 100 * stubs / total if total else 0.0
    lines = ["OVERVIEW", "-" * 60]
    lines.append(f"  Matched works       {total:>6}")
    lines.append(f"  Titled works        {titled:>6}  ({title_pct:.0f}%)")
    lines.append(f"  Stubs (untitled)    {stubs:>6}  ({stub_pct:.0f}%)")
    lines.append(f"  Reference edges     {references:>6}")
    lines.append(f"  Distinct authors    {authors:>6}")
    lines.append(f"  Avg refs per titled {density:>6.1f}")
    return "\n".join(lines)


def _year_summary(connection: sqlite3.Connection) -> str:
    earliest = _scalar(connection, "MIN(year)")
    latest = _scalar(connection, "MAX(year)")
    span = _int(latest) - _int(earliest) if earliest and latest else 0
    lines = ["YEAR SPAN", "-" * 60]
    lines.append(f"  Earliest  {earliest}")
    lines.append(f"  Latest    {latest}")
    lines.append(f"  Span      {span} year(s)")
    return "\n".join(lines)


def _int(year: int | str | None) -> int:
    try:
        return int(year)
    except (TypeError, ValueError):
        return 0


def _year_distribution(connection: sqlite3.Connection) -> str:
    rows = connection.execute(
        """
        SELECT year, COUNT(*)
        FROM works
        WHERE title != '' AND year != '' AND doi IN (SELECT doi FROM matched)
        GROUP BY year
        ORDER BY year
        """
    ).fetchall()
    values = [row[1] for row in rows]
    peak = max(values, default=0)
    lines = ["YEAR DISTRIBUTION (titled works)", "-" * 60]
    for year, count in rows:
        bar = _bar(count, peak)
        lines.append(f"  {year}  {bar}  {count}")
    return "\n".join(lines)


def _top_cited(connection: sqlite3.Connection, top: int) -> str:
    rows = connection.execute(
        """
        SELECT r.referencedId, w.title, w.year, COUNT(*) AS times
        FROM "references" r
        JOIN works w ON w.doi = r.referencedId
        JOIN matched a ON a.doi = r.workId
        JOIN matched b ON b.doi = r.referencedId
        WHERE w.title != ''
        GROUP BY r.referencedId
        ORDER BY times DESC
        LIMIT ?
        """,
        (top,),
    ).fetchall()
    return _ranking("MOST CITED (in-degree)", rows, top)


def _top_citing(connection: sqlite3.Connection, top: int) -> str:
    rows = connection.execute(
        """
        SELECT r.workId, w.title, w.year, COUNT(*) AS times
        FROM "references" r
        JOIN works w ON w.doi = r.workId
        JOIN matched a ON a.doi = r.workId
        JOIN matched b ON b.doi = r.referencedId
        WHERE w.title != ''
        GROUP BY r.workId
        ORDER BY times DESC
        LIMIT ?
        """,
        (top,),
    ).fetchall()
    return _ranking("MOST CITING (out-degree)", rows, top)


def _ranking(title: str, rows: list[Any], top: int) -> str:
    peak = rows[0][3] if rows else 0
    lines = [f"{title} (top {top})", "-" * 60]
    for rank, (doi, work_title, year, count) in enumerate(rows, start=1):
        bar = _bar(count, peak)
        lines.append(
            f"  {rank:>2}. {bar} {count:>3}  {year}  {doi}"
        )
        lines.append(f"      └ {_short_title(work_title)}")
    return "\n".join(lines)


def _top_authors(connection: sqlite3.Connection, top: int) -> str:
    rows = connection.execute(
        """
        SELECT author, COUNT(*) AS count
        FROM works
        WHERE author != '' AND doi IN (SELECT doi FROM matched)
        GROUP BY author
        ORDER BY count DESC
        LIMIT ?
        """,
        (top,),
    ).fetchall()
    peak = rows[0][1] if rows else 0
    lines = [f"AUTHOR DISTRIBUTION (top {top})", "-" * 60]
    for author, count in rows:
        bar = _bar(count, peak)
        lines.append(f"  {bar} {count:>3}  {_short_title(author, 60)}")
    return "\n".join(lines)


def _bar(value: int, peak: int) -> str:
    if not peak:
        return " " * BAR_WIDTH
    filled = round(BAR_WIDTH * value / peak)
    return "█" * filled + "░" * (BAR_WIDTH - filled)


def _short_title(title: str, limit: int = 60) -> str:
    return title if len(title) <= limit else title[: limit - 1] + "…"


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(list(argv) if argv is not None else sys.argv[1:])
    connection = load(args.db)
    _prepare(connection, args.query)
    print(report(connection, args.top, args.query))
    connection.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())