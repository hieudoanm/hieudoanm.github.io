#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STORE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CSV_DIR="$STORE_DIR/src/data/csv"
CSV_SOURCES="${CSV_SOURCES:-hybrid.csv|home,about,downloads,version
extensions.csv|home
native.csv|home
headless.csv|home}"
SOURCE_SPECS="$(printf '%s\n' "$CSV_SOURCES" | sed '/^[[:space:]]*$/d')"
SOURCE_PAGES="$(printf '%s\n' "$SOURCE_SPECS" | cut -d'|' -f2- | tr ',' '\n' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$' | sort -u | tr '\n' ' ')"
SOURCE_FILES="$(printf '%s\n' "$SOURCE_SPECS" | cut -d'|' -f1 | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$' | sort -u | sed 's/\.csv$//' | tr '\n' ' ')"
OUT_DIR="$STORE_DIR/public/screenshots"
VIEWPORT="${VIEWPORT:-1280,720}"
WAIT_MS="${WAIT_MS:-2000}"
BROWSER="${BROWSER:-firefox}"

usage() {
    cat <<'EOF'
Usage: screenshots.sh [options] [OUT_DIR]

Capture 1280x720 screenshots of every app web page into
OUT_DIR/<app>/{home,about,downloads,version}.png.

Sources (set CSV_SOURCES to override):
    hybrid.csv      home, about, downloads, version pages
    extensions.csv  landing page (home)
    native.csv      landing page (home)
    headless.csv    landing page (home)

Default output: public/screenshots

Page flags (combinable; default is --all):
    --all         capture every page listed in the sources
    --<page>      capture only <page> for the sources that declare it.
                  Page flags are derived from the CSV_SOURCES page
                  lists (e.g. --home, --about, --downloads, --version
                  with the default sources).

File flags (combinable; default is all CSV files):
    --<file>      capture only the apps from <file>, using the CSV
                  basename without .csv (e.g. --hybrid, --extensions,
                  --native, --headless). File flags are derived from
                  CSV_SOURCES.

Environment:
    VIEWPORT     viewport size (default 1280,720)
    WAIT_MS      wait after navigation in ms (default 2000)
    BROWSER      chromium | firefox | webkit | chrome | msedge (default firefox)
    CSV_SOURCES  newline-separated "file.csv|page1,page2" list (default above)
EOF
}

require() {
    command -v "$1" >/dev/null 2>&1 || {
        printf 'Error: %s is not installed.\n' "$1" >&2
        exit 1
    }
}

CAPTURE_ALL=0
SELECTED_PAGES=""
SELECTED_FILES=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --all) CAPTURE_ALL=1 ;;
        -h | --help)
            usage
            exit 0
            ;;
        --*)
            name="${1#--}"
            if [[ " $SOURCE_PAGES " == *" $name "* ]]; then
                SELECTED_PAGES="$SELECTED_PAGES $name"
            elif [[ " $SOURCE_FILES " == *" $name "* ]]; then
                SELECTED_FILES="$SELECTED_FILES $name"
            else
                printf 'Error: unknown option %s\n' "$1" >&2
                usage >&2
                exit 1
            fi
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

if [[ -n "$SELECTED_FILES" ]]; then
    FILTERED=""
    while IFS= read -r spec; do
        [[ -z "$spec" ]] && continue
        file="${spec%%|*}"
        file="${file%.csv}"
        if [[ " $SELECTED_FILES " == *" $file "* ]]; then
            FILTERED="$FILTERED$spec"$'\n'
        fi
    done <<< "$SOURCE_SPECS"
    CSV_SOURCES="$FILTERED"
fi

if [[ "$CAPTURE_ALL" -eq 1 ]]; then
    PAGES="$SOURCE_PAGES"
else
    PAGES="$SELECTED_PAGES"
    if [[ -z "$PAGES" ]]; then
        PAGES="$SOURCE_PAGES"
    fi
fi
PAGES="$(printf '%s\n' "$PAGES" | sed 's/^ *//; s/ *$//')"

require node

missing=()
local_csv=""
while IFS= read -r spec; do
    [[ -z "$spec" ]] && continue
    local_csv="${spec%%|*}"
    if [[ ! -f "$CSV_DIR/$local_csv" ]]; then
        missing+=("$local_csv")
    fi
done <<< "$CSV_SOURCES"
if [[ ${#missing[@]} -gt 0 ]]; then
    printf 'Error: CSV not found: %s\n' "${missing[*]}" >&2
    exit 1
fi

mkdir -p "$OUT_DIR"

TARGETS="$(mktemp)"
trap 'rm -f "$TARGETS"' EXIT

PAGES="$PAGES" CSV_SOURCES="$CSV_SOURCES" python3 - "$CSV_DIR" > "$TARGETS" <<'PY'
import csv
import os
import sys

pages = set(os.environ["PAGES"].split())
csv_dir = sys.argv[1]


def suffix(name):
    return "" if name == "home" else "/" + name


for spec in os.environ["CSV_SOURCES"].splitlines():
    spec = spec.strip()
    if not spec:
        continue
    rel_path, _, valid = spec.partition("|")
    valid_pages = {p.strip() for p in valid.split(",") if p.strip()}
    csv_path = os.path.join(csv_dir, rel_path)
    try:
        f = open(csv_path, encoding="utf-8", newline="")
    except OSError as err:
        print(f"Warning: skipping {rel_path}: {err}", file=sys.stderr)
        continue
    with f:
        for row in csv.DictReader(f):
            app_id = (row.get("appId") or "").strip()
            href = (row.get("href") or "").strip()
            if not app_id or not href:
                continue
            for name in pages:
                if name not in valid_pages:
                    continue
                print(f"{app_id}\t{name}\t{href}{suffix(name)}")
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
    let skipped = 0;
    try {
        const context = await browser.newContext({ viewport: { width, height } });
        const page = await context.newPage();
        for (const target of targets) {
            const dir = path.join(outDir, target.appId);
            const out = path.join(dir, `${target.name}.png`);
            try {
                const res = await page.goto(target.url);
                if (res && res.status() === 404) {
                    skipped += 1;
                    console.log(`Skipping ${target.url} (HTTP 404)`);
                    continue;
                }
                console.log(`Capturing ${target.url} -> ${out}`);
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

    const captured = targets.length - failures - skipped;
    console.log(`\nCaptured ${captured} screenshots into ${outDir}`);
    if (skipped > 0) {
        console.log(`Skipped ${skipped} screenshots (HTTP 404).`);
    }
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