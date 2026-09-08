#!/usr/bin/env python3

import argparse
import json
import logging
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import deque
from dataclasses import dataclass
from pathlib import Path
from typing import Any

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

CROSSREF_ENDPOINT = "https://api.crossref.org/works/{doi}"
SEARCH_ENDPOINT = "https://api.crossref.org/works"
SEARCH_SELECT = "DOI"
MAX_RETRIES = 3


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
        start = time.monotonic()
        try:
            with urllib.request.urlopen(request, timeout=self._timeout) as response:
                data = json.loads(response.read())
        except urllib.error.HTTPError as err:
            if 400 <= err.code < 500:
                return None
            raise
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
            return None
        elapsed = time.monotonic() - start
        if elapsed > 2.0:
            log.warning("Slow fetch %s: %.1fs", doi, elapsed)
        return _to_work(doi, data)

    def _throttle(self) -> None:
        elapsed = time.monotonic() - self._last_request
        if elapsed < self._delay:
            time.sleep(self._delay - elapsed)
        self._last_request = time.monotonic()

    def search(self, query: str, rows: int, cursor: str = "*") -> tuple[list[str], str | None]:
        params = {
            "query.title": query,
            "rows": str(rows),
            "select": SEARCH_SELECT,
            "cursor": cursor,
        }
        url = SEARCH_ENDPOINT + "?" + urllib.parse.urlencode(params)
        request = urllib.request.Request(url, headers=self._headers)
        self._throttle()
        start = time.monotonic()
        try:
            with urllib.request.urlopen(request, timeout=self._timeout) as response:
                data = json.loads(response.read())
        except urllib.error.HTTPError as err:
            if 400 <= err.code < 500:
                log.warning("Search query rejected by Crossref: HTTP %d", err.code)
                return [], None
            raise
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
            return [], None
        elapsed = time.monotonic() - start
        if elapsed > 2.0:
            log.warning("Slow search %.1fs", elapsed)
        message = data.get("message")
        if not isinstance(message, dict):
            return [], None
        dois = [
            str(item["DOI"])
            for item in message.get("items") or []
            if isinstance(item, dict) and item.get("DOI")
        ]
        next_cursor = message.get("next-cursor")
        return dois, str(next_cursor) if next_cursor else None


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
            year = parts[0][0]
            if year:
                return str(year).strip()
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
        description="Crawl Crossref: given a DOI, follow its references and "
        "store doi/title/author/abstract/type in SQLite; or given "
        "--query, store the list of matching works."
    )
    parser.add_argument("identifier", help="Starting DOI (e.g. 10.1038/nature12373) or title query")
    parser.add_argument(
        "-q",
        "--query",
        action="store_true",
        help="Treat identifier as a title query, store the matching works "
        "without crawling references",
    )
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
    parser.add_argument(
        "--backfill-batch", type=int, default=5,
        help="Number of stubs to backfill per batch (default: 5)",
    )
    parser.add_argument(
        "-r", "--rows", type=int, default=100,
        help="Results per search page (default: 100, query mode only)",
    )
    parser.add_argument(
        "-n", "--limit", type=int, default=0,
        help="Stop after this many works (default: 0 = no limit, query mode only)",
    )
    return parser.parse_args(argv)


def _metadata_path(db_path: Path) -> Path:
    return db_path.parent / "metadata.json"


def _write_metadata(db_path: Path, store: WorkStore) -> None:
    stubs = store.stubs()
    dois = store.dois()
    years = [
        row[0]
        for row in store._conn.execute(
            "SELECT DISTINCT year FROM works WHERE year != ''"
        ).fetchall()
        if row[0] and row[0].isdigit()
    ]
    authors = [
        row[0]
        for row in store._conn.execute(
            "SELECT DISTINCT author FROM works WHERE author != ''"
        ).fetchall()
        if row[0]
    ]
    edges = store._conn.execute('SELECT COUNT(*) FROM "references"').fetchone()[0]
    meta = {
        "total_works": len(dois),
        "titled_works": len(dois) - len(stubs),
        "stub_works": len(stubs),
        "reference_edges": edges,
        "distinct_authors": len(authors),
        "year_min": min(years) if years else "",
        "year_max": max(years) if years else "",
    }
    path = _metadata_path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    log.info("Metadata written to %s", path)


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(list(argv) if argv is not None else sys.argv[1:])
    store = WorkStore(args.out)
    client = CrossrefClient(args.mailto, args.delay, args.timeout)

    seeds = [_normalize(args.identifier)]
    if args.query:
        seeds = _search_seed_dois(client, args)

    visited: set[str] = set()
    queue: deque[tuple[str, int]] = deque((doi, 0) for doi in seeds)
    max_depth = args.level + 1
    start = time.monotonic()

    log.info("Launching crawl from %d seed(s) -> %s", len(seeds), args.out)
    log.info(
        "Level %d (max depth %d), %.1fs between requests",
        args.level,
        max_depth,
        args.delay,
    )

    try:
        while queue:
            doi, depth = queue.popleft()
            if not doi or doi in visited:
                continue
            if depth > max_depth:
                continue
            visited.add(doi)
            work = _fetch_with_retry(client, doi)
            if work is None:
                log.warning("Skipped %s (no record returned)", doi)
                continue
            stored = store.save(work)
            refs = len(work.references)
            log.info(
                "[%3d] %s | %d refs | +%d edges",
                len(visited),
                work.doi,
                refs,
                stored,
            )
            log.info("  %s", work.title)
            if args.no_follow_references or depth >= max_depth:
                continue
            for reference in work.references:
                normalized = _normalize(reference.doi)
                if normalized and normalized not in visited:
                    queue.append((normalized, depth + 1))
        if not args.no_backfill:
            _backfill(store, client, args.backfill_batch)
    finally:
        elapsed = time.monotonic() - start
        stubs_remaining = len(store.stubs())
        _write_metadata(args.out, store)
        store.close()

    log.info(
        "Crawl complete in %.1fs — visited %d works, %d stubs remaining",
        elapsed,
        len(visited),
        stubs_remaining,
    )
    log.info("Saved to %s", args.out)
    return 0


def _search_seed_dois(
    client: CrossrefClient, args: argparse.Namespace
) -> list[str]:
    query = args.identifier.strip()
    log.info("Searching Crossref for %r", query)
    cursor: str | None = "*"
    seeds: list[str] = []
    pages = 0
    while cursor:
        dois, cursor = _search_page_with_retry(client, query, args.rows, cursor)
        if not dois:
            break
        for doi in dois:
            normalized = _normalize(doi)
            if normalized in seeds:
                continue
            seeds.append(normalized)
            log.info("Seed [%d] %s", len(seeds), doi)
            if args.limit and len(seeds) >= args.limit:
                cursor = None
                break
        pages += 1
    if not seeds:
        log.warning("No works matched query %r — nothing to crawl", query)
    return seeds


def _search_page_with_retry(
    client: CrossrefClient, query: str, rows: int, cursor: str
) -> tuple[list[str], str | None]:
    for attempt in range(MAX_RETRIES):
        dois, next_cursor = client.search(query, rows, cursor)
        if dois or next_cursor is None:
            return dois, next_cursor
        if attempt < MAX_RETRIES - 1:
            wait = 2 ** attempt
            log.warning(
                "Retry %d/%d for search %r in %ds", attempt + 1, MAX_RETRIES, query, wait
            )
            time.sleep(wait)
    return [], None


def _backfill(
    store: WorkStore, client: CrossrefClient, batch_size: int = 5
) -> None:
    stubs = store.stubs()
    total = len(stubs)
    log.info("Backfilling %d stubs in batches of %d", total, batch_size)
    filled = 0
    for i in range(0, total, batch_size):
        batch = stubs[i : i + batch_size]
        for article in batch:
            work = _fetch_with_retry(client, article)
            if work is None:
                continue
            store.update(work)
            filled += 1
        store._conn.commit()
        log.info(
            "Backfilled %d/%d (filled %d)",
            min(i + batch_size, total),
            total,
            filled,
        )
    log.info("Backfill done: %d filled, %d still empty", filled, total - filled)


def _normalize(doi: str) -> str:
    return doi.strip().lower()


def _fetch_with_retry(
    client: CrossrefClient, doi: str, max_retries: int = MAX_RETRIES
) -> Work | None:
    for attempt in range(max_retries):
        work = client.fetch(doi)
        if work is not None:
            return work
        if attempt < max_retries - 1:
            wait = 2 ** attempt
            log.warning(
                "Retry %d/%d for %s in %ds", attempt + 1, max_retries, doi, wait
            )
            time.sleep(wait)
    return None


if __name__ == "__main__":
    raise SystemExit(main())
