#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require curl
require jq
require python3

# This script lives in scripts/renovate/, so the repo root is two levels up.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console.
if [[ "${PYTHON_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/python-update-$(date +%Y%m%d-%H%M%S).log"
    export PYTHON_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Latest stable version per package, fetched once per run and cached, because
# the same packages repeat (requests, pydantic, numpy...) across the data
# packages.
CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/python-update-cache.XXXXXX")"
trap 'rm -f "$CACHE_FILE"' EXIT

resolve_latest() {
    local name="$1"
    local cached
    if cached="$(grep -m1 "^${name}|" "$CACHE_FILE" 2>/dev/null)"; then
        printf '%s\n' "${cached#*|}"
        return
    fi
    local ver
    ver="$(curl -fsS --compressed --max-time 20 --retry 2 --retry-delay 1 \
        "https://pypi.org/pypi/${name}/json" 2>/dev/null \
        | jq -r '.info.version // empty' 2>/dev/null || true)"
    [[ -n "$ver" ]] && printf '%s|%s\n' "$name" "$ver" >> "$CACHE_FILE"
    printf '%s\n' "$ver"
}

updated=0

# 1) Bump every entry of [project].dependencies to its newest stable version,
#    preserving the constraint operator (==, >=, ~=, ...) and any extras.
while IFS= read -r manifest; do
    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    deps="$(python3 - "$manifest" <<'PY'
import sys, tomllib

with open(sys.argv[1], "rb") as fh:
    project = tomllib.load(fh).get("project") or {}
for spec in project.get("dependencies", []):
    if not isinstance(spec, str):
        continue
    spec = spec.strip()
    print(spec)
PY
)"

    if [[ -z "$deps" ]]; then
        echo "  No [project].dependencies."
        continue
    fi

    edits="{}"
    pending=0
    while IFS= read -r entry; do
        [[ -z "$entry" ]] && continue
        parsed="$(python3 -c '
import re, sys
spec = sys.argv[1]
m = re.match(r"^([A-Za-z0-9][A-Za-z0-9._-]*)(\[[^\]]*\])?([<>]=?|!=|~=|==)([0-9][^,]*)$", spec)
if not m:
    sys.exit(3)
print("|".join((m.group(1), m.group(2) or "", m.group(3), m.group(4).strip())))
' "$entry" 2>/dev/null || true)"

        if [[ -z "$parsed" ]]; then
            echo "  Skipping non-versioned entry: $entry"
            continue
        fi
        IFS='|' read -r name extras op current <<< "$parsed"
        latest="$(resolve_latest "$name")"
        if [[ -z "$latest" ]]; then
            echo "  WARNING: could not resolve latest for $name, skipping."
            continue
        fi
        if [[ "$latest" == "$current" ]]; then
            continue
        fi
        echo "  $name$extras$op$current -> $name$extras$op$latest"
        edits="$(printf '%s' "$edits" | jq --arg k "$name$extras$op$current" --arg v "$name$extras$op$latest" \
            '.[$k] = $v')"
        pending=$((pending + 1))
    done <<< "$deps"

    if [[ "$pending" -eq 0 ]]; then
        echo "  Already at latest."
        continue
    fi

    PYTHON_EDIT_MAP="$edits" python3 - "$manifest" <<'PY'
import json, os, sys

path = sys.argv[1]
replacements = json.loads(os.environ["PYTHON_EDIT_MAP"])
text = open(path).read()
for old, new in replacements.items():
    quoted_old = '"%s"' % old
    quoted_new = '"%s"' % new
    count = text.count(quoted_old)
    if count == 0:
        print("  WARNING: no matching entry for %s in %s" % (old, path), file=sys.stderr)
        continue
    text = text.replace(quoted_old, quoted_new, 1)
open(path, "w").write(text)
PY
    updated=$((updated + pending))
done < <(
    find "$ROOT_DIR" -name pyproject.toml \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/target/*" \
    | sort
)

echo
if command -v uv >/dev/null 2>&1; then
    while IFS= read -r manifest; do
        dir="$(dirname "$manifest")"
        if [[ ! -f "$dir/uv.lock" ]]; then
            continue
        fi
        echo "Regenerating uv.lock for $dir"
        if (cd "$dir" && uv lock >/dev/null 2>&1); then
            echo "  OK: uv.lock is up to date."
        else
            echo "  WARNING: uv lock failed for $dir."
        fi
    done < <(
        find "$ROOT_DIR" -name pyproject.toml \
            -not -path "*/node_modules/*" \
            -not -path "*/.git/*" \
        | sort
    )
else
    echo "  WARNING: uv not installed, uv.lock files left untouched."
fi

echo
echo "Done (bumped $updated dependency version(s))."