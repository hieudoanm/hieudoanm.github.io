import logging
from pathlib import Path

import requests

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
TXT_DIR = DATA_DIR / "txt"

TITLES: list[str] = [
    "GM",
    "IM",
    "FM",
    "CM",
    "NM",
    "WGM",
    "WIM",
    "WFM",
    "WCM",
    "WNM",
]
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0"


def main() -> None:
    logging.info("Fetching titled players from chess.com …")

    usernames: list[str] = []
    for title in TITLES:
        url = f"https://api.chess.com/pub/titled/{title}"
        response = requests.get(url, headers={"User-Agent": USER_AGENT})
        response.raise_for_status()
        data: dict = response.json()
        players: list[str] = data.get("players", [])
        usernames.extend(players)
        logging.info(f"  {title}: {len(players)} players")

    TXT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = TXT_DIR / "chess-titles.txt"
    out_path.write_text("\n".join(sorted(usernames)), encoding="utf-8")
    logging.info(
        f"Saved {len(usernames)} titled players to {out_path.relative_to(ROOT)}"
    )


if __name__ == "__main__":
    main()
