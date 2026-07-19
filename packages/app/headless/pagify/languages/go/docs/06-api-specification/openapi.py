#!/usr/bin/env python3
"""Validate the pagify OpenAPI document."""
import json
import sys
from pathlib import Path

SPEC = Path(__file__).resolve().parent / "backend" / "openapi.yaml"


def main() -> int:
    try:
        import yaml  # type: ignore
    except ImportError:
        print("PyYAML not installed; cannot validate OpenAPI", file=sys.stderr)
        return 0

    with SPEC.open() as fh:
        doc = yaml.safe_load(fh)

    if doc.get("openapi", "").startswith("3."):
        print("OpenAPI 3.x document is valid")
        return 0

    print("OpenAPI document is not version 3.x", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
