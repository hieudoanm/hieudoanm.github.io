#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require cargo
require curl
require jq

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console so both stdout and stderr (including cargo's messages)
# are captured. Nested invocations (e.g. of cargo-lock.sh) inherit
# CARGO_SCRIPT_LOG_RUN and skip this redirection.
if [[ "${CARGO_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/cargo-update-$(date +%Y%m%d-%H%M%S).log"
    export CARGO_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Resolve the latest stable version (never alpha/beta/rc) from the sparse
# index CDN (the same feed cargo uses), which is not rate-limited like the
# crates.io API. Results are cached per run because crates repeat across
# manifests.
crate_index_path() {
    local name="$1" len="${#1}"
    case "$len" in
        1) printf '1/%s' "$name" ;;
        2) printf '2/%s' "$name" ;;
        3) printf '3/%s/%s' "${name:0:1}" "$name" ;;
        *) printf '%s/%s/%s' "${name:0:2}" "${name:2:2}" "$name" ;;
    esac
}

CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/cargo-update-cache.XXXXXX")"
trap 'rm -f "$CACHE_FILE"' EXIT

# 1) Find every Cargo.toml and pin each package's direct dependencies to the
#    latest version. Unresolvable manifests (e.g. unregistered crates under a
#    workspace) are skipped instead of aborting the whole run.
while IFS= read -r manifest; do
    dir="$(dirname "$manifest")"

    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    # List only this package's own direct dependencies, selected by manifest
    # path so a workspace member is never confused with the workspace root.
    if ! deps="$(
        (cd "$dir" && cargo metadata --no-deps --format-version 1 2>/dev/null) \
        | jq -r --arg mf "$manifest" '
            .packages[] | select(.manifest_path == $mf) | .dependencies[]
            | select((.source // "") | startswith("registry+"))
            | select(.target == null)
            | "\(.name)|\(.kind // "normal")"
        ' \
        | sort -u
    )"; then
        echo "  Skipping (could not resolve manifest)."
        continue
    fi

    if [[ -z "$deps" ]]; then
        echo "  Skipping (no direct dependencies)."
        continue
    fi

    # Dependencies inherited from [workspace.dependencies] via `{ workspace = true }`
    # must not be re-pinned (that would unshare them and break the workspace design).
    # Note: `[ \t]` is used instead of `\s`, which macOS /usr/bin/awk does not support.
    inherited="$(
        awk '
            /^[ \t]*\[workspace\.dependencies\]/ { in_ws = 1; next }
            /^[ \t]*\[/                          { in_ws = 0 }
            in_ws                                { next }
            /^[ \t]*[A-Za-z0-9_-]+[ \t]*=[ \t]*\{/ && /workspace[ \t]*=[ \t]*true/ {
                sub(/[ \t]*=.*/, ""); gsub(/[ \t]/, ""); print
                next
            }
            /^[ \t]*[A-Za-z0-9_-]+[ \t]*\.[ \t]*workspace[ \t]*=[ \t]*true/ {
                sub(/\..*/, "", $1); print $1
            }
        ' "$manifest" | sort -u
    )"

    if [[ -n "$inherited" ]]; then
        deps="$(
            while IFS='|' read -r crate kind; do
                if grep -Fxq "$crate" <<< "$inherited"; then
                    echo "  Skipping $crate (workspace dependency, not pinned)." >&2
                    continue
                fi
                printf '%s|%s\n' "$crate" "$kind"
            done <<< "$deps"
        )"
    fi

    while IFS='|' read -r crate kind; do
        echo "Checking $crate..."

        # Resolve the latest stable version (never alpha/beta/rc) from the
        # sparse index CDN rather than `cargo search`, which can report a
        # pre-release as the newest version.
        version=""
        if entry="$(grep -m1 "^${crate}=" "$CACHE_FILE" 2>/dev/null || true)"; then
            version="${entry#*=}"
        fi

        if [[ -z "$version" ]]; then
            path="$(crate_index_path "$crate")"
            version="$(
                curl -fsS --compressed --max-time 30 --retry 3 --retry-delay 1 \
                    -A "cargo-update.sh (sparse index probe)" \
                    "https://index.crates.io/$path" 2>/dev/null \
                | jq -r -s '
                    map(select((.yanked | not) and (.vers | contains("-") | not)))
                    | max_by(.vers | split("+")[0] | split(".") | map(. | tonumber? // -1))
                    | .vers // empty
                  ' || true
            )"
            [[ -n "$version" ]] && printf '%s=%s\n' "$crate" "$version" >> "$CACHE_FILE"
        fi

        if [[ "$version" == *-* ]]; then
            echo "  Skipping (latest stable is a pre-release: $version)."
            continue
        fi

        if [[ -z "$version" ]]; then
            echo "  Failed to determine latest version, skipping."
            continue
        fi

        echo "  Pinning to =$version"

        case "$kind" in
            build)
                (cd "$dir" && cargo add --build "$crate@=$version" >/dev/null)
                ;;
            dev)
                (cd "$dir" && cargo add --dev "$crate@=$version" >/dev/null)
                ;;
            *)
                (cd "$dir" && cargo add "$crate@=$version" >/dev/null)
                ;;
        esac
    done <<< "$deps"
done < <(
    find "$ROOT_DIR" -type f -name Cargo.toml \
        -not -path "*/target/*" \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
    | sort
)

# 2) Regenerate every lockfile (shared cargo-lock.sh discovers the roots that
#    own a lockfile and skips workspace members).
echo
echo "=================================================="
echo "Regenerating lockfiles"
echo "=================================================="
if [[ -x "$ROOT_DIR/scripts/cargo-lock.sh" ]]; then
    "$ROOT_DIR/scripts/cargo-lock.sh"
else
    echo "Error: scripts/cargo-lock.sh not found." >&2
    exit 1
fi

echo
echo "Done."