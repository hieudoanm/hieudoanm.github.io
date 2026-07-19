#!/usr/bin/env bash
# renovate-node.sh: pin the Node.js runtime and every npm dependency. These were
# separate scripts covering one ecosystem with an identical preamble, so they are
# merged here as two phases and share lib/shell.sh.

set -euo pipefail

RENOVATE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$RENOVATE_DIR/../.." && pwd)"

# shellcheck source=lib/shell.sh
. "$RENOVATE_DIR/lib/shell.sh"

require curl jq python3

# Progress messages in the phase helpers go to stderr while only the count
# reaches stdout, so a caller can capture the count without losing the transcript.

# latest_node_release: newest stable Node.js release from the official index,
# printed without the leading "v" to match the repo's .nvmrc files. Pre-release
# builds ("v27.0.0-nightly*", "v25.0.0-rc.1") carry a "-" and are excluded.
latest_node_release() {
    curl -fsS --compressed --max-time 30 --retry 3 --retry-delay 1 \
        https://nodejs.org/dist/index.json 2>/dev/null \
    | jq -r '
        [ .[].version | select(test("-") | not) ]
        | max_by(. | sub("^v"; "") | split(".") | map(tonumber))
        | sub("^v"; "")
      ' || true
}

# pin_runtime_files <version>: write <version> into every .nvmrc and
# .node-version in the tree. Prints how many files changed.
pin_runtime_files() {
    local version="$1" file old count=0
    while IFS= read -r file; do
        old="$(tr -d '[:space:]' < "$file")"
        if [[ "$old" == "$version" ]]; then
            echo "  $file already at $version." >&2
            continue
        fi
        printf '%s\n' "$version" > "$file"
        echo "  Pinning $file $old -> $version" >&2
        count=$((count + 1))
    done < <(find "$ROOT_DIR" \( -name .nvmrc -o -name .node-version \) \
        -not -path "*/node_modules/*" -not -path "*/.git/*" \
        -not -path "*/target/*" | sort)
    printf '%s' "$count"
}

# latest_package_version <name>: newest stable version of an npm package, cached
# because the same packages repeat across the workspace. The name is URL-encoded
# so scoped names (@scope/name) survive the path.
latest_package_version() {
    local name="$1" cached encoded ver
    if cached="$(grep -m1 "^${name}|" "$CACHE_FILE" 2>/dev/null)"; then
        printf '%s\n' "${cached#*|}"
        return
    fi
    encoded="$(printf '%s' "$name" | jq -sRr @uri)"
    ver="$(curl -fsS --compressed --max-time 20 --retry 2 --retry-delay 1 \
        "https://registry.npmjs.org/${encoded}/latest" 2>/dev/null \
        | jq -r '.version // empty' 2>/dev/null || true)"
    if [[ -n "$ver" ]]; then
        printf '%s|%s\n' "$name" "$ver" >> "$CACHE_FILE"
    fi
    printf '%s\n' "$ver"
}

# manifest_specs <manifest>: `name|prefix|old` for every dependency in the four
# dependency sections that carries a plain semver requirement. A range
# (^1.2.3, >=1.2.3) is included with its prefix recorded; url, git and workspace
# specs are ignored because those are not version bumps.
manifest_specs() {
    python3 - "$1" <<'PY'
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
}

# apply_spec_edits <manifest> <edits-json>: rewrite each pinned requirement in
# place. The text is patched rather than re-serialised, so formatting and key
# order in the file survive.
apply_spec_edits() {
    SPEC_EDITS="$2" python3 - "$1" <<'PY'
import json, os, re, sys

path = sys.argv[1]
edits = json.loads(os.environ["SPEC_EDITS"])
text = open(path).read()
for key, spec in edits.items():
    pattern = re.compile(r'("' + re.escape(key) + r'"\s*:\s*)"' + re.escape(spec["prefix"] + spec["old"]) + '"')
    text, count = pattern.subn(
        lambda m: m.group(1) + '"' + spec["prefix"] + spec["new"] + '"', text
    )
    if count == 0:
        print("  WARNING: no matching line for %s in %s" % (key, path), file=sys.stderr)
open(path, "w").write(text)
PY
}

# bump_manifest_deps <manifest>: raise every eligible dependency to its newest
# stable version and print how many were bumped. The repo pins exact versions, so
# a bare "1.2.3" is rewritten bare; an explicit range prefix is kept and only its
# version part moves.
bump_manifest_deps() {
    local manifest="$1" specs pkg prefix old latest edits="{}" pending=0
    specs="$(manifest_specs "$manifest")"
    while IFS='|' read -r pkg prefix old; do
        if [[ -z "$pkg" ]]; then
            continue
        fi
        latest="$(latest_package_version "$pkg")"
        if [[ -z "$latest" ]]; then
            echo "  WARNING: could not resolve latest for $pkg, skipping." >&2
            continue
        fi
        if [[ "$latest" == "$old" ]]; then
            continue
        fi
        echo "  $pkg: $prefix$old -> $prefix$latest" >&2
        edits="$(printf '%s' "$edits" | jq --arg k "$pkg" --arg p "$prefix" \
            --arg o "$old" --arg n "$latest" '.[$k] = {"prefix": $p, "old": $o, "new": $n}')"
        pending=$((pending + 1))
    done <<< "$specs"

    if [[ "$pending" -eq 0 ]]; then
        echo "  Already at latest." >&2
        printf '0'
        return
    fi
    apply_spec_edits "$manifest" "$edits"
    printf '%s' "$pending"
}

# Phase 1: Node.js runtime pins, i.e. every .nvmrc and .node-version.
phase_runtime_pins() {
    local latest count
    banner "Phase 1: Node.js runtime"
    latest="$(latest_node_release)"
    if [[ -z "$latest" ]]; then
        echo "Error: could not resolve the latest Node.js version." >&2
        exit 1
    fi
    echo "Latest stable Node.js: $latest"
    count="$(pin_runtime_files "$latest")"
    printf 'Done (updated %s runtime file(s)).\n' "$count"
}

# Phase 2: npm dependency pins, then refresh the lockfile so it matches.
phase_package_pins() {
    local manifest bumps=0
    banner "Phase 2: npm dependencies"
    while IFS= read -r manifest; do
        banner "Processing $manifest"
        bumps=$((bumps + $(bump_manifest_deps "$manifest")))
    done < <(find "$ROOT_DIR" -name package.json \
        -not -path "*/node_modules/*" -not -path "*/.git/*" \
        -not -path "*/target/*" | sort)

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
    printf 'Done (bumped %s dependency version(s)).\n' "$bumps"
}

# CACHE_FILE stays a global because latest_package_version reads it; it is
# created per run rather than at load time so sourcing this file has no effects.
main() {
    init_transcript NODE_SCRIPT_LOG_RUN node-update
    CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/node-update-cache.XXXXXX")"
    trap 'rm -f "$CACHE_FILE"' EXIT
    phase_runtime_pins
    phase_package_pins
}

# Sourcing this file exposes the helpers for tests without running an update.
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
