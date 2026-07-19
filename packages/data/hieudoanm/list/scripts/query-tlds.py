import requests
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
TXT_DIR = DATA_DIR / "txt"

URL = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt"


def main() -> None:
    response = requests.get(URL, timeout=10)
    response.raise_for_status()

    out_path = TXT_DIR / "top-level-domains.txt"
    out_path.write_text(response.text, encoding="utf-8")
    print(f"TLD list saved to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
