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
require python3

# This script lives in scripts/renovate/, so the repo root is two levels up.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console so both stdout and stderr (including cargo's messages)
# are captured. Nested invocations inherit CARGO_SCRIPT_LOG_RUN and skip this
# redirection.
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

# Bound slow cargo invocations (`metadata`, `generate-lockfile` can block on
# index or git fetches). macOS has no `timeout`, so use perl's alarm + exec.
run_timeout() {
    local seconds="$1"
    shift
    perl -e 'alarm shift; exec @ARGV' "$seconds" "$@"
}

CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/cargo-update-cache.XXXXXX")"
ROOT_LIST="$(mktemp "${TMPDIR:-/tmp}/cargo-update-roots.XXXXXX")"
trap 'rm -f "$CACHE_FILE" "$ROOT_LIST"' EXIT

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
        (cd "$dir" && run_timeout 60 cargo metadata --no-deps --format-version 1 2>/dev/null) \
        | jq -r --arg mf "$manifest" '
            .packages[] | select(.manifest_path == $mf) | .dependencies[]
            | select((.source // "") | startswith("registry+"))
            | select(.target == null)
            | "\(.name)|\(.kind // "normal")"
        ' \
        | sort -u
    )"; then
        echo "  Skipping (could not resolve manifest)."
        deps=""
    fi

    if [[ -z "$deps" ]]; then
        echo "  Skipping (no direct dependencies)."
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

    if [[ -n "$deps" ]]; then
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
    fi

    # Workspace-root manifests centralise shared constraints under
    # [workspace.dependencies]; members reference them via `{ workspace = true }`.
    # Virtual workspaces have no package section, so `cargo metadata --no-deps`
    # never surfaces these rows to the package phase above. Pin each entry to the
    # latest stable version exactly (`=x.y.z`), preserving features and any
    # `package` rename (resolution follows the real crate name).
    ws_entries="$(python3 - "$manifest" <<'PY'
import re, sys

text = open(sys.argv[1]).read()
head = re.search(r"^[ \t]*\[[ \t]*workspace[ \t]*\.[ \t]*dependencies[ \t]*\]", text, re.M)
if not head:
    sys.exit(0)
rest = text[head.end():]
nxt = re.search(r"^[ \t]*\[", rest, re.M)
body = rest[:nxt.start()] if nxt else rest

entry = re.compile(r"^([ \t]*)([A-Za-z0-9_.-]+)([ \t]*=[ \t]*)(\"[^\"]*\"|\{[^\}]*?\})", re.M)
for em in entry.finditer(body):
    key, val = em.group(2), em.group(4)
    lookup = key
    pm = re.search(r"package[ \t]*=[ \t]*\"?([A-Za-z0-9_.-]+)\"?", val)
    if pm:
        lookup = pm.group(1)
    req = None
    vm = re.search(r"\bversion[ \t]*=[ \t]*\"([^\"]+)\"", val)
    if vm:
        req = vm.group(1)
    elif val.startswith('"'):
        req = val[1:-1].strip()
    if req and req[:1].isdigit():
        print("%s|%s" % (lookup, req))
PY
)"

    if [[ -n "$ws_entries" ]]; then
        WS_KEYS=""
        while IFS='|' read -r ws_crate ws_req; do
            [[ -z "$ws_crate" ]] && continue

            ws_ver=""
            if entry="$(grep -m1 "^${ws_crate}=" "$CACHE_FILE" 2>/dev/null || true)"; then
                ws_ver="${entry#*=}"
            fi
            if [[ -z "$ws_ver" ]]; then
                path="$(crate_index_path "$ws_crate")"
                ws_ver="$(
                    curl -fsS --compressed --max-time 30 --retry 3 --retry-delay 1 \
                        -A "cargo-update.sh (sparse index probe)" \
                        "https://index.crates.io/$path" 2>/dev/null \
                    | jq -r -s '
                        map(select((.yanked | not) and (.vers | contains("-") | not)))
                        | max_by(.vers | split("+")[0] | split(".") | map(. | tonumber? // -1))
                        | .vers // empty
                      ' || true
                )"
                [[ -n "$ws_ver" ]] && printf '%s=%s\n' "$ws_crate" "$ws_ver" >> "$CACHE_FILE"
            fi

            if [[ -z "$ws_ver" || "$ws_ver" == *-* ]]; then
                echo "  Skipping workspace dep $ws_crate (no stable latest resolved)."
                continue
            fi
            if [[ "$ws_req" == "$ws_ver" || "$ws_req" == "=$ws_ver" ]]; then
                echo "  Workspace dep $ws_crate already pinned to =$ws_ver."
                continue
            fi

            echo "  Pinning workspace dep $ws_crate =$ws_ver"
            WS_KEYS+=$'\n'"$ws_crate=$ws_ver"
        done <<< "$ws_entries"

        if [[ -n "$WS_KEYS" ]]; then
            WS_KEYS="$WS_KEYS" python3 - "$manifest" <<'PY'
import os, re, sys

keys = {}
for line in os.environ.get("WS_KEYS", "").splitlines():
    line = line.strip()
    if not line or "=" not in line:
        continue
    k, v = line.split("=", 1)
    keys[k] = v

path = sys.argv[1]
text = open(path).read()
head = re.search(r"^[ \t]*\[[ \t]*workspace[ \t]*\.[ \t]*dependencies[ \t]*\]", text, re.M)
if not head:
    sys.exit(0)
rest = text[head.end():]
nxt = re.search(r"^[ \t]*\[", rest, re.M)
body_abs_start = head.end()
body_abs_end = body_abs_start + (nxt.start() if nxt else len(rest))
body = text[body_abs_start:body_abs_end]

entry = re.compile(r"^([ \t]*)([A-Za-z0-9_.-]+)([ \t]*=[ \t]*)(\"[^\"]*\"|\{[^\}]*?\})", re.M)

def repl(em):
    pre, key, assign, val = em.group(1), em.group(2), em.group(3), em.group(4)
    lookup = key
    pm = re.search(r"package[ \t]*=[ \t]*\"?([A-Za-z0-9_.-]+)\"?", val)
    if pm:
        lookup = pm.group(1)
    req = None
    vm = re.search(r"\bversion[ \t]*=[ \t]*\"([^\"]+)\"", val)
    if vm:
        req = vm.group(1)
    elif val.startswith('"'):
        req = val[1:-1].strip()
    new = keys.get(lookup)
    if new and req and req != "=" + new:
        if val.startswith('"'):
            val = '"=%s"' % new
        else:
            val = re.sub(re.escape(req), "=%s" % new, val, count=1)
    return pre + key + assign + val

open(path, "w").write(text[:body_abs_start] + entry.sub(repl, body) + text[body_abs_end:])
PY
        fi
    fi
done < <(
    find "$ROOT_DIR" -type f -name Cargo.toml \
        -not -path "*/target/*" \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
    | sort
)

# 2) Regenerate the lockfile for every workspace root. Cargo.lock always lives
#    at the workspace root (never inside a member package), so discover each
#    manifest's workspace root via `cargo metadata` and regenerate once per
#    root so the locks reflect the manifests freshly pinned in step 1.
echo
echo "=================================================="
echo "Regenerating Cargo.lock"
echo "=================================================="

while IFS= read -r manifest; do
    dir="$(dirname "$manifest")"
    root="$(
        cd "$dir" \
        && run_timeout 60 cargo metadata --no-deps --format-version 1 2>/dev/null \
        | jq -r '.workspace_root // empty'
    )" || root=""
    if [[ -n "$root" ]]; then
        printf '%s\n' "$root" >> "$ROOT_LIST"
    else
        echo "  WARNING: could not resolve workspace root for $manifest."
    fi
done < <(
    find "$ROOT_DIR" -type f -name Cargo.toml \
        -not -path "*/target/*" \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
    | sort
)

while IFS= read -r root; do
    [[ -z "$root" ]] && continue
    echo
    echo "--------------------------------------------------"
    echo "Regenerating Cargo.lock for $root"
    echo "--------------------------------------------------"
    if (cd "$root" && run_timeout 600 cargo generate-lockfile); then
        echo "  OK: Cargo.lock regenerated for $root."
    else
        echo "  WARNING: could not regenerate lockfile for $root."
    fi
done < <(sort -u "$ROOT_LIST")

echo
echo "Done."