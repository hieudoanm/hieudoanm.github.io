#!/usr/bin/env python3

import argparse
import logging
import sys
import time
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from crawl import (  # type: ignore[import-not-found]  # noqa: E402
    WorkStore,
    _fetch_with_retry,
)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Backfill empty type values from Crossref in batches."
    )
    parser.add_argument(
        "-o",
        "--out",
        type=Path,
        default=ROOT / "doi.db",
        help="SQLite output file (default: database/doi.db)",
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
        "-b", "--batch", type=int, default=5,
        help="Rows per commit batch (default: 5)",
    )
    args = parser.parse_args(list(argv) if argv is not None else sys.argv[1:])

    store = WorkStore(args.out)
    client = _client(args.mailto, args.delay)
    start = time.monotonic()

    dois = [
        row[0]
        for row in store._conn.execute(
            "SELECT doi FROM works WHERE type IS NULL OR type = ''"
        ).fetchall()
    ]
    total = len(dois)
    log.info("Found %d works with empty type (NULL or '')", total)

    filled = 0
    not_found = 0
    for i in range(0, total, args.batch):
        batch = dois[i : i + args.batch]
        for doi in batch:
            work = _fetch_with_retry(client, doi)
            if work is None or not work.type:
                not_found += 1
                continue
            store.update(work)
            filled += 1
        store._conn.commit()
        log.info(
            "Backfilled %d/%d (filled %d, still missing %d)",
            min(i + args.batch, total),
            total,
            filled,
            not_found,
        )

    elapsed = time.monotonic() - start
    log.info(
        "Done in %.1fs: %d filled, %d had no type, %d remaining",
        elapsed,
        filled,
        not_found,
        total - filled - not_found,
    )
    store.close()
    return 0


def _client(mailto: str, delay: float):
    from crawl import CrossrefClient  # noqa: E402

    return CrossrefClient(mailto, delay=delay, timeout=15.0)


if __name__ == "__main__":
    raise SystemExit(main())