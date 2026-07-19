import logging
import re
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

API_URL = "https://api.github.com/emojis"


def url_to_emoji(url: str) -> str:
    match = re.search(r"/unicode/([a-f0-9\-]+)\.png", url)
    if not match:
        return ""
    codes = match.group(1).split("-")
    try:
        return "".join(chr(int(code, 16)) for code in codes)
    except Exception:
        return ""


def main() -> None:
    logging.info("Fetching emojis from GitHub API …")
    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()

    lines: list[str] = []
    for key, url in sorted(data.items()):
        emoji = url_to_emoji(url)
        if emoji:
            lines.append(f"{emoji} :{key}:")
        else:
            lines.append(f":{key}:")

    TXT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = TXT_DIR / "emojis.txt"
    out_path.write_text("\n".join(lines), encoding="utf-8")
    logging.info(f"Saved {len(lines)} emojis to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
