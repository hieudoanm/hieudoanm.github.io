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

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console.
if [[ "${NODE_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/node-update-$(date +%Y%m%d-%H%M%S).log"
    export NODE_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Resolve the newest stable Node.js release from the official release index.
# Pre-release builds (e.g. "v27.0.0-nightly*", "v25.0.0-rc.1") carry a "-" and
# are excluded; the winner is the highest semver, printed without the leading
# "v" to match the format already used across the repo's .nvmrc files.
LATEST="$(
    curl -fsS --compressed --max-time 30 --retry 3 --retry-delay 1 \
        https://nodejs.org/dist/index.json 2>/dev/null \
    | jq -r '
        [ .[].version | select(test("-") | not) ]
        | max_by(. | sub("^v"; "") | split(".") | map(tonumber))
        | sub("^v"; "")
      ' || true
)"

if [[ -z "$LATEST" ]]; then
    echo "Error: could not resolve the latest Node.js version." >&2
    exit 1
fi
echo "Latest stable Node.js: $LATEST"
echo

count=0
while IFS= read -r file; do
    old="$(tr -d '[:space:]' < "$file")"
    if [[ "$old" == "$LATEST" ]]; then
        echo "  $file already at $LATEST."
        continue
    fi
    printf '%s\n' "$LATEST" > "$file"
    echo "  Pinning $file $old -> $LATEST"
    count=$((count + 1))
done < <(
    find "$ROOT_DIR" \( -name .nvmrc -o -name .node-version \) \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/target/*" \
    | sort
)

echo
echo "Done (updated $count file(s))."