#!/usr/bin/env python3
"""Generate screenshots of pagify prototypes."""
from pathlib import Path

HTML_DIR = Path(__file__).resolve().parent / "html"


def main() -> int:
    for html in sorted(HTML_DIR.glob("*.html")):
        print(f"Would screenshot {html.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
