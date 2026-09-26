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
if [[ "${NPM_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/npm-update-$(date +%Y%m%d-%H%M%S).log"
    export NPM_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Latest stable version per package, fetched once per run and cached, because
# the same packages repeat across the workspace (react, typescript, jest...).
CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/npm-update-cache.XXXXXX")"
trap 'rm -f "$CACHE_FILE"' EXIT

# Resolve the newest stable version of a package from the npm registry. The
# name is URL-encoded so scoped names (`@scope/name`) survive the path.
resolve_latest() {
    local name="$1"
    local cached
    if cached="$(grep -m1 "^${name}|" "$CACHE_FILE" 2>/dev/null)"; then
        printf '%s\n' "${cached#*|}"
        return
    fi
    local encoded ver
    encoded="$(printf '%s' "$name" | jq -sRr @uri)"
    ver="$(curl -fsS --compressed --max-time 20 --retry 2 --retry-delay 1 \
        "https://registry.npmjs.org/${encoded}/latest" 2>/dev/null \
        | jq -r '.version // empty' 2>/dev/null || true)"
    [[ -n "$ver" ]] && printf '%s|%s\n' "$name" "$ver" >> "$CACHE_FILE"
    printf '%s\n' "$ver"
}

updated=0

# 1) Bump every dependency in the four dependency sections to its newest stable
#    version. The repo pins deps as exact versions, so a bare `1.2.3` is
#    rewritten to the bare latest; an explicit range prefix (^, ~, >=) is kept
#    and only its version part is bumped.
while IFS= read -r manifest; do
    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    specs="$(python3 - "$manifest" <<'PY'
import json, re, sys

data = json.load(open(sys.argv[1]))
for section in ("dependencies", "devDependencies", "optionalDependencies", "peerDependencies"):
    for name, spec in (data.get(section) or {}).items():
        if not isinstance(spec, str):
            continue
        m = re.match(r"^(\^|~|>=|<=|>|<|==|~>|=)?\s*(\d+\.\d+\.\d+)$", spec.strip())
        if m:
            print("%s|%s|%s" % (name, m.group(1) or "", m.group(2)))
PY
)"

    edits="{}"
    pending=0
    while IFS='|' read -r pkg prefix old; do
        [[ -z "$pkg" ]] && continue
        latest="$(resolve_latest "$pkg")"
        if [[ -z "$latest" ]]; then
            echo "  WARNING: could not resolve latest for $pkg, skipping."
            continue
        fi
        if [[ "$latest" == "$old" ]]; then
            continue
        fi
        echo "  $pkg: $prefix$old -> $prefix$latest"
        edits="$(printf '%s' "$edits" | jq --arg k "$pkg" --arg p "$prefix" --arg o "$old" --arg n "$latest" \
            '.[$k] = {"prefix": $p, "old": $o, "new": $n}')"
        pending=$((pending + 1))
    done <<< "$specs"

    if [[ "$pending" -eq 0 ]]; then
        echo "  Already at latest."
        continue
    fi

    NPM_EDIT_MAP="$edits" python3 - "$manifest" <<'PY'
import json, os, re, sys

path = sys.argv[1]
edits = json.loads(os.environ["NPM_EDIT_MAP"])
text = open(path).read()
for key, spec in edits.items():
    pattern = re.compile(r'("' + re.escape(key) + r'"\s*:\s*)"' + re.escape(spec["prefix"] + spec["old"]) + r'"')
    text, count = pattern.subn(
        lambda m: m.group(1) + '"' + spec["prefix"] + spec["new"] + '"', text
    )
    if count == 0:
        print("  WARNING: no matching line for %s in %s" % (key, path), file=sys.stderr)
open(path, "w").write(text)
PY
    updated=$((updated + pending))
done < <(
    find "$ROOT_DIR" -name package.json \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/target/*" \
    | sort
)

echo
if command -v pnpm >/dev/null 2>&1; then
    echo "Regenerating pnpm-lock.yaml..."
    if (cd "$ROOT_DIR" && pnpm install --lockfile-only >/dev/null 2>&1); then
        echo "  OK: pnpm-lock.yaml is up to date."
    else
        echo "  WARNING: pnpm install --lockfile-only failed."
    fi
else
    echo "  WARNING: pnpm not installed, pnpm-lock.yaml left untouched."
fi

echo
echo "Done (bumped $updated dependency version(s))."