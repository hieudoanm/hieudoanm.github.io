#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require swift
require git
require perl
require python3

# This script lives in scripts/renovate/, so the repo root is two levels up.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console (swift's messages included).
if [[ "${SWIFT_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/swift-update-$(date +%Y%m%d-%H%M%S).log"
    export SWIFT_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Resolve the newest stable version of a Swift package. A version is stable if
# it is a plain semver tag (optionally leading "v") without a pre-release
# marker; the max is chosen by numeric comparison. Tags are read from git
# ls-remote (no API key needed) and cached per run because the same packages
# repeat across manifests.
RESOLVER="$(mktemp "${TMPDIR:-/tmp}/swift-resolver.XXXXXX.py")"
CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/swift-update-cache.XXXXXX")"
trap 'rm -f "$RESOLVER" "$CACHE_FILE"' EXIT

cat > "$RESOLVER" <<'PY'
import re, sys
seen = set()
stable = set()
for line in sys.stdin.read().splitlines():
    tag = line.strip()
    m = re.match(r"^v?([0-9][0-9A-Za-z_.\-]*)$", tag)
    if not m:
        continue
    v = m.group(1)
    if v in seen:
        continue
    seen.add(v)
    if re.search(r"(?i)(alpha|beta|rc|pre|snapshot|milestone|dev)[._-]|[._-]m[0-9]|-.*\d$", v):
        continue
    stable.add(v)
if not stable:
    sys.exit(0)
def key(v):
    return [int(part) if part.isdigit() else part for part in re.findall(r"\d+|[A-Za-z]+", v)]
print(max(stable, key=key))
PY

resolve_latest() { # owner repo
    local v
    v="$(
        git ls-remote --tags --refs "https://github.com/$1/$2.git" 2>/dev/null \
        | awk '{ sub(/^refs\/tags\//, "", $2); print $2 }' \
        | python3 "$RESOLVER" || true
    )"
    [[ -n "$v" ]] && { printf '%s' "$v"; return 0; }
    return 1
}

# Cached latest version for a "owner/repo" key.
latest_of() {
    local key="$1" line="" v
    line="$(grep -m1 -F "${key}=" "$CACHE_FILE" 2>/dev/null || true)"
    if [[ -z "$line" ]]; then
        if v="$(resolve_latest "${key%%/*}" "${key#*/}")"; then
            printf '%s=%s\n' "$key" "$v" >> "$CACHE_FILE"
            line="$key=$v"
        else
            return 1
        fi
    fi
    printf '%s' "${line#*=}"
}

apply_replace() { # file old_text new_text
    perl -0pi -e 's/\Q'"$2"'\E/'"$3"'/g' "$1"
}

# 1) Find every Swift package manifest and bump each remote dependency to the
#    newest stable version, preserving the original constraint kind
#    (from/exact/upToNextMajor/upToNextMinor). Non-versioned requirements
#    (branch/revision), local path packages and non-GitHub URLs are skipped.
while IFS= read -r manifest; do
    grep -q 'swift-tools-version' "$manifest" || continue
    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    deps="$(
        perl -0777 -ne '
            while (/\.package\(((?:[^()"]|"[^"]*")*)\)/g) {
                my $s = $1;
                next unless $s =~ /url:\s*"https?:\/\/github\.com\/([^\/]+)\/([^\/".]+)(?:\.git)?"/;
                my ($owner, $repo) = ($1, $2);
                my ($kind, $expr, $oldv);
                if ($s =~ /(from|exact):\s*"([0-9][^"]*)"/) {
                    ($kind, $oldv) = ($1, $2);
                    $expr = "$1: \"$2\"";
                } elsif ($s =~ /\.upToNext(Major|Minor)\(from:\s*"([0-9][^"]*)"/) {
                    ($kind, $oldv) = ("upToNext$1", $2);
                    $expr = ".upToNext$1(from: \"$2\")";
                } elsif ($s =~ /\.exact\("([0-9][^"]*)"/) {
                    ($kind, $oldv) = ("exact", $1);
                    $expr = ".exact(\"$1\")";
                } elsif ($s =~ /(branch|revision):\s*"/) {
                    next;
                } else {
                    next;
                }
                print "$owner/$repo|$kind|$expr|$oldv\n";
            }
        ' "$manifest"
    )"

    applied=""
    while IFS='|' read -r key kind expr oldv; do
        [[ -z "$key" ]] && continue
        if grep -Fq "$key" <<< "$applied"; then
            continue
        fi
        applied+="$key "

        if ! newv="$(latest_of "$key" 2>/dev/null)"; then
            echo "  Skipping $key (no stable version resolved)."
            continue
        fi
        if [[ "$newv" == "$oldv" ]]; then
            echo "  $key already at $newv."
            continue
        fi

        case "$kind" in
            from)           new_expr="from: \"$newv\"" ;;
            exact)          new_expr="exact: \"$newv\"" ;;
            upToNextMajor)  new_expr=".upToNextMajor(from: \"$newv\")" ;;
            upToNextMinor)  new_expr=".upToNextMinor(from: \"$newv\")" ;;
        esac
        echo "  Pinning $key $oldv -> $newv"
        apply_replace "$manifest" "$expr" "$new_expr"
    done <<< "$deps"
done < <(
    find "$ROOT_DIR" -type f -name Package.swift \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/.build/*" \
        -not -path "*/target/*" \
        -not -path "*/DerivedData/*" \
    | sort
)

# 2) Regenerate the lockfile (`Package.resolved`, SwiftPM's equivalent of
#    Cargo.lock / gradle.lockfile) for every package whose manifest declares
#    dependencies.
echo
echo "=================================================="
echo "Generating Package.resolved"
echo "=================================================="

find "$ROOT_DIR" -type f -name Package.swift \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/.build/*" \
    -not -path "*/target/*" \
    -not -path "*/DerivedData/*" \
| while IFS= read -r manifest; do
    grep -q 'swift-tools-version' "$manifest" || continue
    root="$(dirname "$manifest")"
    echo
    echo "--------------------------------------------------"
    echo "Generating Package.resolved for $root"
    echo "--------------------------------------------------"
    if (cd "$root" && swift package resolve --package-path . ) && [[ -f "$root/Package.resolved" ]]; then
        echo "  OK: Package.resolved generated for $root."
    elif [[ -f "$root/Package.resolved" ]]; then
        echo "  OK: Package.resolved already present for $root."
    else
        echo "  WARNING: package declares no dependencies; no Package.resolved needed for $root."
    fi
done

echo
echo "Done."