#!/usr/bin/env python3
"""Generate docs/DOWNLOADS.md for every hybrid app.

Reads `src-tauri/tauri.conf.json` (productName) and the app's CI workflow
(releaseName tag), then writes a standardized DOWNLOADS.md. Asset URLs are
version-less — the release workflow strips versions from filenames.

Usage:
    python3 packages/app/hybrid/scripts/generate-downloads-md.py [--check]
"""

import argparse
import json
import re
import sys
from pathlib import Path

HYBRID_ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = HYBRID_ROOT.parents[2]
WORKFLOWS = REPO_ROOT / ".github" / "workflows"

WEB_URL_OVERRIDES = {
    "utilities/docs": "https://hieudoanm.github.io/",
}

TITLE_OVERRIDES = {
    "keynotes": "Open Keynotes",
}


def to_title(slug: str) -> str:
    if slug in TITLE_OVERRIDES:
        return TITLE_OVERRIDES[slug]
    return "-".join(word.capitalize() for word in slug.split("-"))


def read_existing_title(docs_path: Path, slug: str) -> str:
    if docs_path.exists():
        lines = docs_path.read_text().splitlines()
        if lines:
            match = re.match(r"^# (.+) \(Downloads\)$", lines[0])
            if match:
                return match.group(1)
    return to_title(slug)


def read_product_name(app_dir: Path) -> str:
    conf_path = app_dir / "src-tauri" / "tauri.conf.json"
    with conf_path.open() as file:
        return json.load(file)["productName"]


def read_release_tag(app_dir: Path) -> str:
    relative = app_dir.relative_to(HYBRID_ROOT).as_posix()
    workflow = WORKFLOWS / f"ci-app-hybrid-{relative.replace('/', '-')}.yaml"
    if not workflow.exists():
        raise FileNotFoundError(f"No CI workflow for {relative}: {workflow}")
    for line in workflow.read_text().splitlines():
        match = re.match(r"\s*releaseName:\s*(\S+)", line)
        if match:
            return match.group(1)
    raise ValueError(f"releaseName not found in {workflow}")


def render(title: str, product: str, tag: str, web_url: str, package: str) -> str:
    base = f"https://github.com/hieudoanm/hieudoanm.github.io/releases/download/{tag}"
    return f"""# {title} (Downloads)

## Web

Open <{web_url}> in any modern browser. The web build is a static export and
installs as a PWA — offline-capable after the first visit.

## Platforms

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]: {base}/app-universal-release.apk
[download-aab]: {base}/app-universal-release.aab
[download-app-image]: {base}/{product}_amd64.AppImage
[download-deb]: {base}/{product}_amd64.deb
[download-dmg]: {base}/{product}_aarch64.dmg
[download-msi]: {base}/{product}_x64.msi

## Notes

1. `.aab` is a Google Play upload artifact — to install directly on a device,
   use the `.apk`.
2. macOS builds are Apple Silicon only (`aarch64`).

## Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]: {base}/SHA256SUMS.txt

## Source

- [Source code](https://github.com/hieudoanm/hieudoanm.github.io/tree/master/{package})
- [Releases](https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/{tag})
"""


def discover_apps() -> list[Path]:
    return sorted(
        path.parent.parent
        for path in HYBRID_ROOT.glob("*/*/docs/DOWNLOADS.md")
        if (path.parent.parent / "src-tauri" / "tauri.conf.json").exists()
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check", action="store_true", help="Exit non-zero if files would change"
    )
    args = parser.parse_args()

    changed: list[Path] = []
    for app_dir in discover_apps():
        relative = app_dir.relative_to(REPO_ROOT).as_posix()
        key = app_dir.relative_to(HYBRID_ROOT).as_posix()
        title = read_existing_title(app_dir / "docs" / "DOWNLOADS.md", app_dir.name)
        content = render(
            title=title,
            product=read_product_name(app_dir),
            tag=read_release_tag(app_dir),
            web_url=WEB_URL_OVERRIDES.get(key, f"https://hieudoanm.github.io/downloads/{app_dir.name}/"),
            package=relative,
        )
        docs_path = app_dir / "docs" / "DOWNLOADS.md"
        if not docs_path.exists() or docs_path.read_text() != content:
            changed.append(docs_path)
            if not args.check:
                docs_path.write_text(content)

    for path in changed:
        print(f"{'would update' if args.check else 'updated'}: {path.relative_to(REPO_ROOT)}")
    print(f"{len(changed)} file(s) {'stale' if args.check else 'written'}")
    return 1 if args.check and changed else 0


if __name__ == "__main__":
    sys.exit(main())
