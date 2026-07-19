import asyncio
import csv
import json
import logging
import os
import random
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path

import httpx

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
CSV_DIR = DATA_DIR / "csv"
TIMESTAMPS_PATH = DATA_DIR / "chess-players-timestamps.json"

TITLES: list[str] = [
    "GM", "IM", "FM", "CM", "NM",
    "WGM", "WIM", "WFM", "WCM", "WNM",
]
USER_AGENT = "Mozilla/5.0"
MAX_CONCURRENCY = 8
REQUEST_DELAY = 0.15
STALE_AFTER = timedelta(weeks=1)


_last_request_time: float = 0.0
_rate_lock = asyncio.Lock()


async def rate_limit() -> None:
    global _last_request_time
    async with _rate_lock:
        now = time.monotonic()
        wait = REQUEST_DELAY - (now - _last_request_time)
        _last_request_time = now + max(wait, 0)
    if wait > 0:
        await asyncio.sleep(wait)


async def safe_get(client: httpx.AsyncClient, url: str) -> dict:
    for attempt in range(6):
        await rate_limit()
        r = await client.get(url)
        if r.status_code == 429:
            retry_after = r.headers.get("Retry-After")
            wait = (
                int(retry_after)
                if retry_after
                else (2**attempt) + random.uniform(0.5, 1.5)
            )
            logger.warning(
                f"429 on {url} → sleeping {wait:.2f}s (attempt {attempt + 1})"
            )
            await asyncio.sleep(wait)
            continue
        r.raise_for_status()
        return r.json()
    raise RuntimeError(f"Exceeded retries for: {url}")


async def process_player(
    client: httpx.AsyncClient,
    semaphore: asyncio.Semaphore,
    username: str,
) -> dict | None:
    async with semaphore:
        profile_url = f"https://api.chess.com/pub/player/{username}"
        stats_url = f"https://api.chess.com/pub/player/{username}/stats"

        player, stats = await asyncio.gather(
            safe_get(client, profile_url),
            safe_get(client, stats_url),
        )

    try:
        joined = (
            time.strftime(
                "%Y-%m-%dT%H:%M:%SZ", time.gmtime(int(player.get("joined", 0)))
            )
            if player.get("joined")
            else ""
        )
    except (ValueError, TypeError, OSError):
        joined = ""

    return {
        "id": player.get("player_id", ""),
        "name": player.get("name", ""),
        "username": username,
        "title": player.get("title", ""),
        "country": player.get("country", ""),
        "location": player.get("location", ""),
        "joined": joined,
        "status": player.get("status", ""),
        "verified": player.get("verified", False),
        "league": player.get("league", ""),
        "bullet_rating_last": stats.get("chess_bullet", {}).get("last", {}).get("rating", ""),
        "bullet_rating_best": stats.get("chess_bullet", {}).get("best", {}).get("rating", ""),
        "bullet_record_win": stats.get("chess_bullet", {}).get("record", {}).get("win", ""),
        "bullet_record_draw": stats.get("chess_bullet", {}).get("record", {}).get("draw", ""),
        "bullet_record_loss": stats.get("chess_bullet", {}).get("record", {}).get("loss", ""),
        "blitz_rating_last": stats.get("chess_blitz", {}).get("last", {}).get("rating", ""),
        "blitz_rating_best": stats.get("chess_blitz", {}).get("best", {}).get("rating", ""),
        "blitz_record_win": stats.get("chess_blitz", {}).get("record", {}).get("win", ""),
        "blitz_record_draw": stats.get("chess_blitz", {}).get("record", {}).get("draw", ""),
        "blitz_record_loss": stats.get("chess_blitz", {}).get("record", {}).get("loss", ""),
        "rapid_rating_last": stats.get("chess_rapid", {}).get("last", {}).get("rating", ""),
        "rapid_rating_best": stats.get("chess_rapid", {}).get("best", {}).get("rating", ""),
        "rapid_record_win": stats.get("chess_rapid", {}).get("record", {}).get("win", ""),
        "rapid_record_draw": stats.get("chess_rapid", {}).get("record", {}).get("draw", ""),
        "rapid_record_loss": stats.get("chess_rapid", {}).get("record", {}).get("loss", ""),
    }


def load_timestamps() -> dict[str, str]:
    if TIMESTAMPS_PATH.exists():
        with open(TIMESTAMPS_PATH, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_timestamps(timestamps: dict[str, str]) -> None:
    TIMESTAMPS_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(TIMESTAMPS_PATH, "w", encoding="utf-8") as f:
        json.dump(timestamps, f, indent=2)


def get_pending(
    usernames: list[str], timestamps: dict[str, str]
) -> tuple[list[str], int]:
    stale_cutoff = (datetime.now(tz=timezone.utc) - STALE_AFTER).isoformat()
    pending = [u for u in usernames if timestamps.get(u, "") < stale_cutoff]
    skipped = len(usernames) - len(pending)
    return pending, skipped


async def main() -> None:
    CSV_DIR.mkdir(parents=True, exist_ok=True)

    logger.info("Fetching titled usernames from chess.com …")
    usernames: list[str] = []
    for title in TITLES:
        url = f"https://api.chess.com/pub/titled/{title}"
        r = httpx.get(url, headers={"User-Agent": USER_AGENT})
        r.raise_for_status()
        players = r.json().get("players", [])
        usernames.extend(players)
        logger.info(f"  {title}: {len(players)} players")

    usernames = list(dict.fromkeys(usernames))
    logger.info(f"Total unique titled players: {len(usernames)}")

    timestamps = load_timestamps()
    pending, skipped = get_pending(usernames, timestamps)
    logger.info(
        f"Total={len(usernames)} | "
        f"Fresh/skipped={skipped} | "
        f"Pending={len(pending)}"
    )

    if not pending:
        logger.info("All players are up to date. Nothing to do.")
        return

    semaphore = asyncio.Semaphore(MAX_CONCURRENCY)
    timeout = httpx.Timeout(30.0)

    failed = 0
    saved = 0
    now_iso = datetime.now(tz=timezone.utc).isoformat()

    csv_path = CSV_DIR / "chess-players.csv"
    csv_path.parent.mkdir(parents=True, exist_ok=True)

    async with httpx.AsyncClient(
        headers={"User-Agent": USER_AGENT},
        timeout=timeout,
        limits=httpx.Limits(max_connections=100, max_keepalive_connections=50),
    ) as client:
        tasks = [process_player(client, semaphore, u) for u in pending]

        f = open(csv_path, "w", newline="", encoding="utf-8")
        writer = None
        for coro in asyncio.as_completed(tasks):
            try:
                result = await coro
                if result:
                    if writer is None:
                        writer = csv.DictWriter(f, fieldnames=list(result.keys()))
                        writer.writeheader()
                    writer.writerow(result)
                    f.flush()
                    timestamps[result["username"]] = now_iso
                    saved += 1
            except Exception as e:
                failed += 1
                logger.error(f"Task failed: {e}")

        f.close()

    save_timestamps(timestamps)

    logger.info(
        f"Saved {saved} players to {csv_path.relative_to(ROOT)} "
        f"(failed={failed}, skipped={skipped})"
    )


if __name__ == "__main__":
    asyncio.run(main())
