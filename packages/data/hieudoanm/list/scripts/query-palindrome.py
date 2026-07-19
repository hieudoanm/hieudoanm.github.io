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
    return len(word) > 1 and word.isalpha()


def is_palindrome(word: str) -> bool:
    return word == word[::-1]


def is_emordnilap(word: str, word_set: set) -> bool:
    reversed_word = word[::-1]
    return reversed_word in word_set and reversed_word != word


def main() -> None:
    logging.info("Fetching from WordsAPI …")
    response = requests.get(url)
    response.raise_for_status()

    data = response.json()
    results = data.get("results", {})
    total = results.get("total", 0)
    logging.info(f"Total words reported by API: {total}")

    words = results.get("data", [])
    logging.info(f"Retrieved {len(words)} words")

    word_set = set(words)
    valid = [w for w in words if is_valid_word(w)]
    logging.info(f"Filtered to {len(valid)} valid words")

    palindromes = [w for w in valid if is_palindrome(w)]
    logging.info(f"Found {len(palindromes)} palindromes")

    emordnilaps = [w for w in valid if is_emordnilap(w, word_set)]
    logging.info(f"Found {len(emordnilaps)} emordnilaps")

    TXT_DIR.mkdir(parents=True, exist_ok=True)

    for name, entries in [("palindromes", palindromes), ("emordnilaps", emordnilaps)]:
        out_path = TXT_DIR / f"{name}.txt"
        out_path.write_text("\n".join(sorted(entries)), encoding="utf-8")
        logging.info(f"Saved {len(entries)} to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
