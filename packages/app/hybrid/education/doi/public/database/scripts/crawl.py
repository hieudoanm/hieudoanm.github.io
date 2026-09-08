#!/usr/bin/env python3

import argparse
import json
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any

CROSSREF_ENDPOINT = "https://api.crossref.org/works/{doi}"


@dataclass
class Reference:
    doi: str
    title: str
    year: str


@dataclass
class Work:
    doi: str
    title: str
    author: str
    year: str
    abstract: str
    type: str
    references: list[Reference]


class CrossrefClient:
    def __init__(self, mailto: str, delay: float, timeout: float) -> None:
        self._headers = {
            "User-Agent": f"doi-crawler/1.0 (mailto:{mailto})",
            "Accept": "application/json",
        }
        self._delay = delay
        self._timeout = timeout
        self._last_request = 0.0

    def fetch(self, doi: str) -> Work | None:
        url = CROSSREF_ENDPOINT.format(doi=_quote(doi))
        request = urllib.request.Request(url, headers=self._headers)
        self._throttle()
        try:
            with urllib.request.urlopen(request, timeout=self._timeout) as response:
                data = json.loads(response.read())
        except urllib.error.HTTPError as err:
            if 400 <= err.code < 500:
                return None
            raise
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
            return None
        return _to_work(doi, data)

    def _throttle(self) -> None:
        elapsed = time.monotonic() - self._last_request
        if elapsed < self._delay:
            time.sleep(self._delay - elapsed)
        self._last_request = time.monotonic()


def _quote(doi: str) -> str:
    return urllib.parse.quote(doi.strip(), safe="")


def _to_work(doi: str, data: dict[str, Any]) -> Work | None:
    message = data.get("message")
    if not isinstance(message, dict):
        return None
    title = _join_list(message.get("title"))
    year = _year(message)
    abstract = str(message.get("abstract") or "").strip()
    work_type = str(message.get("type") or "").strip()
    authors = [
        " ".join(part for part in _author_parts(author) if part)
        for author in message.get("author") or []
        if isinstance(author, dict)
    ]
    author = "; ".join(part for part in authors if part)
    references = [
        Reference(
            doi=str(ref["DOI"]),
            title=str(ref.get("article-title") or "").strip(),
            year=str(ref.get("year") or "").strip(),
        )
        for ref in message.get("reference") or []
        if isinstance(ref, dict) and ref.get("DOI")
    ]
    return Work(
        doi=doi,
        title=title,
        author=author,
        year=year,
        abstract=abstract,
        type=work_type,
        references=references,
    )


def _year(message: dict[str, Any]) -> str:
    for key in ("issued", "published-print", "published-online", "created"):
        date = message.get(key)
        if not isinstance(date, dict):
            continue
        parts = date.get("date-parts")
        if isinstance(parts, list) and parts and isinstance(parts[0], list) and parts[0]:
            return str(parts[0][0])
    return ""


def _join_list(values: Any) -> str:
    if isinstance(values, list):
        return " ".join(str(value).strip() for value in values if str(value).strip())
    return str(values or "").strip()


def _author_parts(author: dict[str, Any]) -> tuple[str, str]:
    name = str(author.get("name") or "").strip()
    if name:
        return (name, "")
    given = str(author.get("given") or "").strip()
    family = str(author.get("family") or "").strip()
    suffix = str(author.get("suffix") or "").strip()
    if suffix:
        return (given, f"{family}, {suffix}")
    return (given, family)


class WorkStore:
    def __init__(self, db_path: Path) -> None:
        self._path = db_path
        self._conn = sqlite3.connect(db_path)
        self._conn.execute("PRAGMA foreign_keys = ON")
        self._conn.execute(
            """
            CREATE TABLE IF NOT EXISTS works (
                doi TEXT PRIMARY KEY,
                title TEXT,
                author TEXT,
                year TEXT,
                abstract TEXT,
                type TEXT
            )
            """
        )
        self._migrate()
        self._conn.execute(
            """
            CREATE TABLE IF NOT EXISTS "references" (
                workId TEXT NOT NULL,
                referencedId TEXT NOT NULL,
                PRIMARY KEY (workId, referencedId),
                FOREIGN KEY (workId) REFERENCES works(doi) ON DELETE CASCADE,
                FOREIGN KEY (referencedId) REFERENCES works(doi) ON DELETE RESTRICT
            )
            """
        )
        self._conn.commit()

    def _migrate(self) -> None:
        columns = {
            row[1] for row in self._conn.execute("PRAGMA table_info(works)").fetchall()
        }
        if "type" not in columns:
            self._conn.execute("ALTER TABLE works ADD COLUMN type TEXT")
            self._conn.commit()

    def dois(self) -> set[str]:
        rows = self._conn.execute("SELECT doi FROM works").fetchall()
        return {row[0] for row in rows}

    def stubs(self) -> list[str]:
        rows = self._conn.execute(
            "SELECT doi FROM works WHERE title = ''"
        ).fetchall()
        return [row[0] for row in rows]

    def save(self, work: Work) -> int:
        self._upsert_work(work)
        stored = 0
        seen: set[str] = set()
        for reference in work.references:
            doi = _normalize(reference.doi)
            if not doi or doi in seen or doi == work.doi:
                continue
            seen.add(doi)
            self._upsert_stub(doi, reference.title, reference.year)
            cursor = self._conn.execute(
                """
                INSERT OR IGNORE INTO "references" (workId, referencedId)
                VALUES (?, ?)
                """,
                (work.doi, doi),
            )
            stored += cursor.rowcount
        self._conn.commit()
        return stored

    def _upsert_work(self, work: Work) -> None:
        self._conn.execute(
            """
            INSERT INTO works (doi, title, author, year, abstract, type)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(doi) DO UPDATE SET
                title = excluded.title,
                author = excluded.author,
                year = excluded.year,
                abstract = excluded.abstract,
                type = excluded.type
            """,
            (
                work.doi,
                work.title,
                work.author,
                work.year,
                work.abstract,
                work.type,
            ),
        )

    def update(self, work: Work) -> None:
        self._upsert_work(work)
        self._conn.commit()

    def _upsert_stub(self, doi: str, title: str = "", year: str = "") -> None:
        self._conn.execute(
            """
            INSERT INTO works (doi, title, author, year, abstract, type)
            VALUES (?, ?, '', ?, '', '')
            ON CONFLICT(doi) DO UPDATE SET
                title = CASE WHEN works.title = '' THEN excluded.title ELSE works.title END,
                year = CASE WHEN works.year = '' THEN excluded.year ELSE works.year END
            """,
            (doi, title, year),
        )

    def close(self) -> None:
        self._conn.close()


def _parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Crawl Crossref works starting from a DOI, following "
        "references, and store doi/title/author/abstract/type in SQLite."
    )
    parser.add_argument("doi", help="Starting DOI, e.g. 10.1038/nature12373")
    parser.add_argument(
        "-o",
        "--out",
        type=Path,
        default=Path(__file__).parent.with_name("doi.db"),
        help="SQLite output file (default: data/doi.db)",
    )
    parser.add_argument(
        "-m", "--mailto", default="developers@example.com",
        help="E-mail for the Crossref polite pool (recommended)",
    )
    parser.add_argument(
        "-d", "--delay", type=float, default=0.5,
        help="Seconds between API requests (default: 0.5)",
    )
    parser.add_argument(
        "-t", "--timeout", type=float, default=15.0,
        help="Per-request timeout in seconds (default: 15)",
    )
    parser.add_argument(
        "-l", "--level", type=int, choices=range(0, 11), default=0,
        help="Crawl depth: 0 = starting work + its references, "
        "1 = + references of references, ... up to 10 (default: 0)",
    )
    parser.add_argument(
        "--no-follow-references", action="store_true",
        help="Only fetch the starting DOI without crawling references",
    )
    parser.add_argument(
        "--no-backfill", action="store_true",
        help="Skip filling empty-title stub works from Crossref after the crawl",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(list(argv) if argv is not None else sys.argv[1:])
    store = WorkStore(args.out)
    client = CrossrefClient(args.mailto, args.delay, args.timeout)
    visited: set[str] = set()
    queue: list[tuple[str, int]] = [(_normalize(args.doi), 0)]
    max_depth = args.level + 1
    start = time.monotonic()

    print(f"🚀 Launching crawl from {args.doi} -> {args.out}")
    print(
        f"📦 Level {args.level} (max depth {max_depth}), "
        f"⏱  {args.delay}s between requests"
    )

    try:
        while queue:
            doi, depth = queue.pop(0)
            if not doi or doi in visited:
                continue
            if depth > max_depth:
                continue
            visited.add(doi)
            work = client.fetch(doi)
            if work is None:
                print(f"⏭️  skipped {doi} (no record returned)")
                continue
            stored = store.save(work)
            refs = len(work.references)
            print(f"[visited {len(visited):>3}] ✨ {work.doi} 🧬 {refs} refs")
            print(f"    ➕ {stored} new reference edges stored")
            print(f"    📝 {work.title}")
            print("    ────────────────")
            if args.no_follow_references or depth >= max_depth:
                continue
            for reference in work.references:
                normalized = _normalize(reference.doi)
                if normalized and normalized not in visited:
                    queue.append((normalized, depth + 1))
        if not args.no_backfill:
            _backfill(store, client)
    finally:
        store.close()

    elapsed = time.monotonic() - start
    print("")
    print(f"🏁 Crawl complete in {elapsed:.1f}s — visited {len(visited)} works")
    print(f"💾 Saved to {args.out}")
    return 0


def _backfill(store: WorkStore, client: CrossrefClient) -> None:
    stubs = store.stubs()
    print(f"\n🗂️  Backfilling {len(stubs)} empty-title stub works...")
    filled = 0
    for article in stubs:
        work = client.fetch(article)
        if work is None:
            continue
        store.update(work)
        filled += 1
        if filled % 25 == 0 or filled == len(stubs):
            print(f"    ✅ backfilled {filled}/{len(stubs)}")
    print(f"✨ Backfill done: {filled} filled, {len(stubs) - filled} still empty")


def _normalize(doi: str) -> str:
    return doi.strip().lower()


if __name__ == "__main__":
    raise SystemExit(main())
