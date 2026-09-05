#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STORE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CSV_FILE="$STORE_DIR/src/data/csv/hybrid.csv"
OUT_DIR="$STORE_DIR/public/screenshots"
VIEWPORT="${VIEWPORT:-1280,720}"
WAIT_MS="${WAIT_MS:-2000}"
BROWSER="${BROWSER:-firefox}"

usage() {
    cat <<'EOF'
Usage: screenshots.sh [options] [OUT_DIR]

Capture 1280x720 screenshots of every hybrid app web page into
OUT_DIR/<app>/{home,about,downloads,version}.png.

Default output: public/screenshots

Page flags (combinable; default is --all):
    --all         capture all pages (home, about, downloads, version)
    --about       capture only the about page
    --downloads   capture only the downloads page
    --version     capture only the version page

Environment:
    VIEWPORT   viewport size (default 1280,720)
    WAIT_MS    wait after navigation in ms (default 2000)
    BROWSER    chromium | firefox | webkit | chrome | msedge (default firefox)
EOF
}

require() {
    command -v "$1" >/dev/null 2>&1 || {
        printf 'Error: %s is not installed.\n' "$1" >&2
        exit 1
    }
}

CAPTURE_ALL=0
CAPTURE_ABOUT=0
CAPTURE_DOWNLOADS=0
CAPTURE_VERSION=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --all) CAPTURE_ALL=1 ;;
        --about) CAPTURE_ABOUT=1 ;;
        --downloads) CAPTURE_DOWNLOADS=1 ;;
        --version) CAPTURE_VERSION=1 ;;
        -h | --help)
            usage
            exit 0
            ;;
        -*)
            printf 'Error: unknown option %s\n' "$1" >&2
            usage >&2
            exit 1
            ;;
        *) OUT_DIR="$1" ;;
    esac
    shift
done

if [[ "$CAPTURE_ALL" -eq 0 && "$CAPTURE_ABOUT" -eq 0 &&
    "$CAPTURE_DOWNLOADS" -eq 0 && "$CAPTURE_VERSION" -eq 0 ]]; then
    CAPTURE_ALL=1
fi

PAGES=""
if [[ "$CAPTURE_ALL" -eq 1 ]]; then
    PAGES="home about downloads version"
else
    [[ "$CAPTURE_ABOUT" -eq 1 ]] && PAGES="$PAGES about"
    [[ "$CAPTURE_DOWNLOADS" -eq 1 ]] && PAGES="$PAGES downloads"
    [[ "$CAPTURE_VERSION" -eq 1 ]] && PAGES="$PAGES version"
fi
PAGES="$(printf '%s\n' "$PAGES" | sed 's/^ *//; s/ *$//')"

require node

if [[ ! -f "$CSV_FILE" ]]; then
    printf 'Error: CSV not found at %s\n' "$CSV_FILE" >&2
    exit 1
fi

mkdir -p "$OUT_DIR"

TARGETS="$(mktemp)"
trap 'rm -f "$TARGETS"' EXIT

PAGES="$PAGES" python3 - "$CSV_FILE" > "$TARGETS" <<'PY'
import csv
import os
import sys

pages = set(os.environ["PAGES"].split())

SUFFIXES = {
    "home": "",
    "about": "/about",
    "downloads": "/downloads",
    "version": "/version",
}

with open(sys.argv[1], encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        app_id = (row.get("appId") or "").strip()
        href = (row.get("href") or "").strip()
        if not app_id or not href:
            continue
        for name, suffix in SUFFIXES.items():
            if name in pages:
                print(f"{app_id}\t{name}\t{href}{suffix}")
PY

printf 'Capturing pages: %s\n' "$PAGES"
printf 'Launching %s\n' "$BROWSER"
OUT_DIR="$OUT_DIR" WAIT_MS="$WAIT_MS" VIEWPORT="$VIEWPORT" BROWSER="$BROWSER" node - "$TARGETS" <<'JS'
const fs = require("fs");
const path = require("path");
const pw = require("@playwright/test");

async function main() {
    const outDir = process.env.OUT_DIR;
    const waitMs = Number(process.env.WAIT_MS || 2000);
    const [width, height] = String(process.env.VIEWPORT || "1280,720")
        .split(/[,\s]+/)
        .map(Number);
    const browserName = String(process.env.BROWSER || "firefox").toLowerCase();

    const known = {
        chromium: "chromium",
        chrome: "chromium",
        firefox: "firefox",
        ff: "firefox",
        webkit: "webkit",
        msedge: "chromium",
        edge: "chromium",
    };
    const type = known[browserName];
    if (!type) {
        console.error(`Error: unsupported browser "${browserName}". Use chromium, firefox or webkit.`);
        process.exit(1);
    }

    const launchOptions = {};
    if (browserName === "chrome" || browserName === "msedge" || browserName === "edge") {
        launchOptions.channel = browserName === "chrome" ? "chrome" : "msedge";
    }

    const targetsFile = process.argv[2];
    const targets = fs
        .readFileSync(targetsFile, "utf8")
        .split("\n")
        .filter(Boolean)
        .map((line) => {
            const [appId, name, url] = line.split("\t");
            return { appId, name, url };
        });

    const browser = await pw[type].launch(launchOptions);
    let failures = 0;
    try {
        const context = await browser.newContext({ viewport: { width, height } });
        const page = await context.newPage();
        for (const target of targets) {
            const dir = path.join(outDir, target.appId);
            const out = path.join(dir, `${target.name}.png`);
            console.log(`Capturing ${target.url} -> ${out}`);
            try {
                await page.goto(target.url);
                if (waitMs > 0) {
                    await page.waitForTimeout(waitMs);
                }
                fs.mkdirSync(dir, { recursive: true });
                await page.screenshot({ path: out });
            } catch (err) {
                failures += 1;
                console.error(`Error: failed to capture ${target.url}`);
                console.error(String(err.message || err).split("\n")[0]);
            }
        }
    } finally {
        await browser.close();
    }

    console.log(`\nCaptured ${targets.length - failures} screenshots into ${outDir}`);
    if (failures > 0) {
        console.error(`Failed to capture ${failures} screenshots.`);
        process.exit(1);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
JS