#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STORE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CSV_DIR="$STORE_DIR/src/data/csv"
APPS_CSV="apps.csv"

# Which store pages to capture per sectionId from src/data/csv/apps.csv.
# Sections missing from this list are reported and skipped.
SECTION_PAGES="${SECTION_PAGES:-hybrid=home,about,downloads,version
extensions=home
headless=home
native=home}"
SECTION_SPECS="$(printf '%s\n' "$SECTION_PAGES" | sed '/^[[:space:]]*$/d')"
SOURCE_SECTIONS="$(printf '%s\n' "$SECTION_SPECS" | cut -d'=' -f1 | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$' | sort -u | tr '\n' ' ')"
SOURCE_PAGES="$(printf '%s\n' "$SECTION_SPECS" | cut -d'=' -f2- | tr ',' '\n' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | grep -v '^$' | sort -u | tr '\n' ' ')"
OUT_DIR="$STORE_DIR/public/screenshots"
VIEWPORT="${VIEWPORT:-1280,720}"
WAIT_MS="${WAIT_MS:-2000}"
BROWSER="${BROWSER:-firefox}"

usage() {
    cat <<'EOF'
Usage: screenshots.sh [options] [OUT_DIR]

Capture 1280x720 screenshots of every store page into
OUT_DIR/<appId>/<page>.png.

Source: src/data/csv/apps.csv — one row per app. Each row's
sectionId selects which pages are captured, via SECTION_PAGES.

    hybrid=home,about,downloads,version
    extensions=home
    headless=home
    native=home

Default output: public/screenshots

Page flags (combinable; default is --all):
    --all         capture every page listed in SECTION_PAGES
    --<page>      capture only <page> for the sections that declare it.
                  Page flags are derived from the SECTION_PAGES lists
                  (e.g. --home, --about, --downloads, --version).

Section flags (combinable):
    --<section>   capture only apps whose sectionId matches (e.g.
                  --hybrid, --extensions, --headless, --native).
                  Section flags are derived from SECTION_PAGES.

Environment:
    VIEWPORT       viewport size (default 1280,720)
    WAIT_MS        wait after navigation in ms (default 2000)
    BROWSER        chromium | firefox | webkit | chrome | msedge (default firefox)
    SECTION_PAGES  newline-separated "sectionId=page1,page2" list (default above)
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
SELECTED_SECTIONS=""

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
            elif [[ " $SOURCE_SECTIONS " == *" $name "* ]]; then
                SELECTED_SECTIONS="$SELECTED_SECTIONS $name"
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

if [[ "$CAPTURE_ALL" -eq 1 ]]; then
    PAGES="$SOURCE_PAGES"
else
    PAGES="$SELECTED_PAGES"
    if [[ -z "$PAGES" ]]; then
        PAGES="$SOURCE_PAGES"
    fi
fi
PAGES="$(printf '%s\n' "$PAGES" | sed 's/^ *//; s/ *$//')"

if [[ -n "$SELECTED_SECTIONS" ]]; then
    FILTERED=""
    while IFS= read -r spec; do
        [[ -z "$spec" ]] && continue
        section="${spec%%=*}"
        if [[ " $SELECTED_SECTIONS " == *" $section "* ]]; then
            FILTERED="$FILTERED$spec"$'\n'
        fi
    done <<< "$SECTION_SPECS"
    SECTION_SPECS="$FILTERED"
fi

require node
require python3

if [[ ! -f "$CSV_DIR/$APPS_CSV" ]]; then
    printf 'Error: CSV not found: %s\n' "$CSV_DIR/$APPS_CSV" >&2
    exit 1
fi

mkdir -p "$OUT_DIR"

TARGETS="$(mktemp)"
trap 'rm -f "$TARGETS"' EXIT

PAGES="$PAGES" SECTION_SPECS="$SECTION_SPECS" python3 - "$CSV_DIR/$APPS_CSV" > "$TARGETS" <<'PY'
import csv
import os
import sys

pages = set(os.environ["PAGES"].split())

# "sectionId=page1,page2" -> {sectionId: {page, ...}}
sections = {}
for line in os.environ["SECTION_SPECS"].splitlines():
    line = line.strip()
    if not line or "=" not in line:
        continue
    section, _, valid = line.partition("=")
    sections[section.strip()] = {p.strip() for p in valid.split(",") if p.strip()}

seen_sections = set()
with open(sys.argv[1], encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        app_id = (row.get("appId") or "").strip()
        href = (row.get("href") or "").strip()
        section = (row.get("sectionId") or "").strip()
        if not app_id or not href or not section:
            continue
        if section not in sections:
            seen_sections.add(section)
            continue
        wanted = sections[section] & pages
        if not wanted:
            continue
        # Some hrefs already end in "/" (headless), so normalise before
        # appending a page to avoid a double slash.
        base = href.rstrip("/")
        for name in sorted(wanted):
            suffix = "" if name == "home" else "/" + name
            print(f"{app_id}\t{name}\t{base}{suffix}")

if seen_sections:
    known = ", ".join(sorted(sections))
    print(
        f"Warning: skipping sectionId(s) with no SECTION_PAGES entry: "
        f"{', '.join(sorted(seen_sections))}. Known sections: {known}",
        file=sys.stderr,
    )
PY

TARGET_COUNT="$(grep -c . "$TARGETS" || true)"
if [[ "$TARGET_COUNT" -eq 0 ]]; then
    printf 'Error: no pages selected. Try --all, or check SECTION_PAGES.\n' >&2
    exit 1
fi

# Report the pages actually targeted, not the union across all sections.
TARGET_PAGES="$(cut -f2 "$TARGETS" | sort -u | tr '\n' ' ')"
printf 'Capturing %s page(s): %s\n' "$TARGET_COUNT" "$TARGET_PAGES"
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
    const skippedUrls = [];
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
                    skippedUrls.push(target.url);
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
        console.log(`Skipped ${skipped} screenshot(s) (HTTP 404):`);
        for (const url of skippedUrls) {
            console.log(`  ${url}`);
        }
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
