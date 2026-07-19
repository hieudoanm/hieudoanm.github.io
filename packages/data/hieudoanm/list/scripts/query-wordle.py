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

encrypted = "8cfdb18fe722929be89607beed58bab8aeb32b0939ff96b8"
when = "2025-01-27T12:41:36.901Z"
limit = 1_000_000

url = f"https://www.wordsapi.com/mashape/words?when={when}&encrypted={encrypted}&limit={limit}"


def is_valid_word(word: str) -> bool:
    return len(word) == 5 and word.isalpha()


def main() -> None:
    logging.info(f"Fetching from WordsAPI …")
    response = requests.get(url)
    response.raise_for_status()

    data = response.json()
    results = data.get("results", {})
    total = results.get("total", 0)
    logging.info(f"Total words reported by API: {total}")

    words = results.get("data", [])
    logging.info(f"Retrieved {len(words)} words")

    filtered = sorted(word for word in words if is_valid_word(word))
    logging.info(f"Filtered to {len(filtered)} 5-letter words")

    out_path = TXT_DIR / "wordle.txt"
    out_path.write_text("\n".join(filtered), encoding="utf-8")
    logging.info(f"Saved to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
