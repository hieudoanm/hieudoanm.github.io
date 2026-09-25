#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed." >&2
        exit 1
    }
}

require cargo

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console so both stdout and stderr (including cargo's messages)
# are captured. Nested invocations (e.g. from cargo-update.sh) inherit
# CARGO_SCRIPT_LOG_RUN and skip this redirection.
if [[ "${CARGO_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/cargo-lock-$(date +%Y%m%d-%H%M%S).log"
    export CARGO_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Collect every Cargo.toml that owns a lockfile:
#  - manifests declaring their own [workspace] are roots (kept);
#  - manifests inside an ancestor [workspace] are members (skipped, they share
#    the workspace root's lockfile, even if not yet registered in members);
#  - everything else is a standalone package (kept).
roots=()

while IFS= read -r manifest; do
    dir="$(dirname "$manifest")"

    if [[ -f "$dir/Cargo.toml" ]] && grep -q '^\[workspace\]' "$dir/Cargo.toml"; then
        roots+=("$dir")
        continue
    fi

    skip=false
    d="$(dirname "$dir")"
    while [[ -n "$d" && "$d" != "/" ]]; do
        if [[ -f "$d/Cargo.toml" ]] && grep -q '^\[workspace\]' "$d/Cargo.toml"; then
            skip=true
            break
        fi
        d="$(dirname "$d")"
    done
    [[ "$skip" == true ]] && continue

    roots+=("$dir")
done < <(find "$ROOT_DIR" -type f -name Cargo.toml \
    \( -not -path "$ROOT_DIR/.git/*" \) \
    \( -not -path "*/target/*" \) \
    \( -not -path "*/node_modules/*" \))

if [[ ${#roots[@]} -eq 0 ]]; then
    echo "No Cargo.toml found under $ROOT_DIR."
    exit 0
fi

for root in "${roots[@]}"; do
    echo
    echo "=================================================="
    echo "Locking $root"
    echo "=================================================="
    (cd "$root" && cargo generate-lockfile)
done

echo
echo "Done."