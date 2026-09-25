#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require go
require perl

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console.
if [[ "${GOMOD_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/gomod-update-$(date +%Y%m%d-%H%M%S).log"
    export GOMOD_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Latest stable tagged version of a module is fetched once per run and cached,
# because the same import paths (cobra, fx, etc.) repeat across modules.
CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/gomod-update-cache.XXXXXX")"
trap 'rm -f "$CACHE_FILE"' EXIT

updated=0

# 1) Find every go.mod and bump each *direct* dependency to its newest stable
#    tagged release (module paths declared in a `replace` directive are kept as
#    written, since they resolve to that destination). Preserves pseudo-version
#    pins to a commit only when the module has no stable tags at all.
while IFS= read -r manifest; do
    dir="$(dirname "$manifest")"

    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    # Modules on the left-hand side of a `replace` directive win over any
    # remote version and must not be renovated (e.g. a local y replace target).
    replaced="$(
        perl -ne '
            if (/^replace[ \t]+([^ \t]+)[ \t]+[^ \t]+[ \t]+=>/) { print "$1\n" }
            elsif (/^replace[ \t]+([^ \t]+)[ \t]+=>/) { print "$1\n" }
        ' "$manifest" | sort -u
    )"

    # Direct requires only: inside a require block or a bare `require a b` line,
    # skipping anything carrying the `// indirect` marker.
    deps="$(
        perl -ne '
            if (/^require[ \t]*\(/) { $in = 1; next; }
            if ($in && /^\s*\)/)    { $in = 0; next; }
            if (/\/\/[ \t]*indirect/) { next; }
            if (!$in && /^require[ \t]+(\S+)[ \t]+(v\S+)/) { print "$1|$2\n"; next; }
            if ($in && /^\s*([^ \t]+)[ \t]+(v\S+)/) { print "$1|$2\n"; }
        ' "$manifest" | sort -u
    )"

    applies=""
    while IFS='|' read -r key oldv; do
        [[ -z "$key" ]] && continue

        if grep -Fq "$key" <<< "$replaced"; then
            echo "  Skipping $key (replaced locally)."
            continue
        fi
        if grep -Fq "$key" <<< "$applies"; then
            continue
        fi

        line="$(grep -m1 -F "${key}=" "$CACHE_FILE" 2>/dev/null || true)"
        if [[ -z "$line" ]]; then
            latest="$(
                (cd "$dir" && go list -m -versions "$key" 2>/dev/null) \
                | tr ' ' '\n' \
                | grep -E '^v[0-9]+(\.[0-9]+)*$' \
                | tail -1 || true
            )"
            if [[ -n "$latest" ]]; then
                printf '%s=%s\n' "$key" "$latest" >> "$CACHE_FILE"
                line="$key=$latest"
            fi
        else
            latest="${line#*=}"
        fi

        if [[ -z "$latest" ]]; then
            echo "  Skipping $key (no stable version resolved)."
            continue
        fi
        if [[ "$latest" == "$oldv" ]]; then
            echo "  $key already at $oldv."
            continue
        fi

        applies+="$key "
        echo "  Pinning $key $oldv -> $latest"
        if (cd "$dir" && go get "$key@$latest" >/dev/null 2>&1); then
            updated=$((updated + 1))
        else
            echo "  WARNING: go get failed for $key@$latest."
        fi
    done <<< "$deps"

    # 2) Regenerate go.mod / go.sum (Go's lockfile) for this module.
    echo "  Regenerating go.sum..."
    if (cd "$dir" && go mod tidy >/dev/null 2>&1); then
        echo "  OK: go.sum regenerated for $dir."
    else
        echo "  WARNING: go mod tidy failed for $dir."
    fi
done < <(
    find "$ROOT_DIR" -type f -name go.mod \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/target/*" \
    | sort
)

echo
echo "Done (updated $updated dependency pins)."