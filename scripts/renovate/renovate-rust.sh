#!/usr/bin/env bash
# renovate-rust.sh: pin direct dependencies, refresh lockfiles, then reconcile
# `rust-version` and report edition drift. Logic lives in lib/; this file only
# sequences the three phases. Two behaviours are opt-in because they change
# public build promises: CARGO_RENOVATE_ADD_MSRV=1 declares a missing
# rust-version, CARGO_RENOVATE_FIX_EDITION=1 migrates editions via cargo fix.

set -euo pipefail

RENOVATE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$RENOVATE_DIR/../.." && pwd)"

# shellcheck source=lib/shell.sh
. "$RENOVATE_DIR/lib/shell.sh"
# shellcheck source=lib/cargo-index.sh
. "$RENOVATE_DIR/lib/cargo-index.sh"
# shellcheck source=lib/cargo-manifest.sh
. "$RENOVATE_DIR/lib/cargo-manifest.sh"
# shellcheck source=lib/cargo-msrv.sh
. "$RENOVATE_DIR/lib/cargo-msrv.sh"

require cargo curl jq python3

banner() {
    printf '\n==================================================\n%s\n==================================================\n' "$1"
}

# pinnable_deps <manifest>: this package's direct dependencies minus anything
# inherited from [workspace.dependencies], as `name|kind`. Re-pinning an
# inherited dependency would unshare it and break the workspace design.
# Returns non-zero when the manifest cannot be resolved at all.
pinnable_deps() {
    local manifest="$1" deps inherited
    deps="$(package_direct_deps "$manifest")" || return 1
    inherited="$(workspace_inherited_deps "$manifest")"
    if [[ -z "$inherited" ]]; then
        printf '%s\n' "$deps"
        return 0
    fi
    while IFS='|' read -r crate kind; do
        if [[ -z "$crate" ]]; then
            continue
        fi
        if grep -Fxq "$crate" <<< "$inherited"; then
            echo "  Skipping $crate (workspace dependency, not pinned)." >&2
            continue
        fi
        printf '%s|%s\n' "$crate" "$kind"
    done <<< "$deps"
}

# pin_direct_deps <package-dir> <deps> <cache-file>: pin each `name|kind` row to
# the latest stable version, preserving the dependency kind.
pin_direct_deps() {
    local dir="$1" cache_file="$3" crate kind version
    while IFS='|' read -r crate kind; do
        if [[ -z "$crate" ]]; then
            continue
        fi
        echo "Checking $crate..."
        version="$(latest_crate_version "$crate" "$cache_file")"

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
            build) (cd "$dir" && cargo add --build "$crate@=$version" >/dev/null) ;;
            dev) (cd "$dir" && cargo add --dev "$crate@=$version" >/dev/null) ;;
            *) (cd "$dir" && cargo add "$crate@=$version" >/dev/null) ;;
        esac
    done <<< "$2"
}

# pin_workspace_deps <manifest> <cache-file>: pin every [workspace.dependencies]
# row to an exact latest version, keeping features and any `package` rename.
pin_workspace_deps() {
    local manifest="$1" cache_file="$2" entries pins="" crate req ver
    entries="$(workspace_dependency_entries "$manifest")"
    if [[ -z "$entries" ]]; then
        return 0
    fi

    while IFS='|' read -r crate req; do
        if [[ -z "$crate" ]]; then
            continue
        fi
        ver="$(latest_crate_version "$crate" "$cache_file")"
        if [[ -z "$ver" || "$ver" == *-* ]]; then
            echo "  Skipping workspace dep $crate (no stable latest resolved)."
            continue
        fi
        if [[ "$req" == "$ver" || "$req" == "=$ver" ]]; then
            echo "  Workspace dep $crate already pinned to =$ver."
            continue
        fi
        echo "  Pinning workspace dep $crate =$ver"
        pins+=$'\n'"$crate=$ver"
    done <<< "$entries"

    if [[ -n "$pins" ]]; then
        write_workspace_dependency_pins "$manifest" "$pins"
    fi
}

# 1) Pin every package's direct dependencies, then its workspace entries.
#    Unresolvable manifests are skipped instead of aborting the whole run.
pin_all_manifests() {
    local manifest deps
    banner "Phase 1: pinning dependencies"
    while IFS= read -r manifest; do
        banner "Processing $manifest"
        if deps="$(pinnable_deps "$manifest")"; then
            if [[ -n "$deps" ]]; then
                pin_direct_deps "$(dirname "$manifest")" "$deps" "$CACHE_FILE"
            else
                echo "  Skipping (no direct dependencies to pin)."
            fi
        else
            echo "  Skipping (could not resolve manifest)."
        fi
        pin_workspace_deps "$manifest" "$CACHE_FILE"
    done < <(find_manifests "$ROOT_DIR")
}

# 2) Regenerate the lockfile once per workspace root. Cargo.lock always lives at
#    the workspace root, never inside a member, so each manifest is mapped to its
#    root and de-duplicated before regenerating.
regenerate_lockfiles() {
    local manifest root
    banner "Phase 2: regenerating Cargo.lock"
    while IFS= read -r manifest; do
        root="$(workspace_root_of "$manifest")"
        if [[ -n "$root" ]]; then
            printf '%s\n' "$root" >> "$ROOT_LIST"
        else
            echo "  WARNING: could not resolve workspace root for $manifest."
        fi
    done < <(find_manifests "$ROOT_DIR")

    while IFS= read -r root; do
        if [[ -z "$root" ]]; then
            continue
        fi
        printf '\n--------------------------------------------------\nRegenerating Cargo.lock for %s\n--------------------------------------------------\n' "$root"
        if (cd "$root" && run_timeout 600 cargo generate-lockfile); then
            echo "  OK: Cargo.lock regenerated for $root."
        else
            echo "  WARNING: could not regenerate lockfile for $root."
        fi
    done < <(sort -u "$ROOT_LIST")
}

# 3) Reconcile `rust-version` and report edition drift. See lib/cargo-msrv.sh for
#    why a false MSRV is corrected but a valid one is never raised, and why
#    edition migration stays opt-in. LATEST_EDITION and the msrv_*/edition_behind
#    counters stay global because lib/cargo-msrv.sh updates them.
reconcile_all_roots() {
    local root
    banner "Phase 3: checking rust-version and edition"
    LATEST_EDITION="$(latest_edition)"
    msrv_raised=0
    msrv_added=0
    edition_behind=0

    echo "Local toolchain: $(rustc --version 2>/dev/null | awk '{print $2}'), newest usable edition: ${LATEST_EDITION:-unknown}"
    echo "CARGO_RENOVATE_ADD_MSRV=${CARGO_RENOVATE_ADD_MSRV:-0}  CARGO_RENOVATE_FIX_EDITION=${CARGO_RENOVATE_FIX_EDITION:-0}"

    while IFS= read -r root; do
        if [[ -n "$root" ]]; then
            reconcile_root "$root"
        fi
    done < <(sort -u "$ROOT_LIST")

    printf '\nDone (raised %s rust-version, added %s, %s edition(s) behind %s).\n' \
        "$msrv_raised" "$msrv_added" "$edition_behind" "${LATEST_EDITION:-unknown}"
}

# CACHE_FILE, ROOT_LIST and LATEST_EDITION stay global because the lib helpers
# read them, so they are created per run rather than at load time.
main() {
    init_transcript CARGO_SCRIPT_LOG_RUN cargo-update
    CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/cargo-update-cache.XXXXXX")"
    ROOT_LIST="$(mktemp "${TMPDIR:-/tmp}/cargo-update-roots.XXXXXX")"
    trap 'rm -f "$CACHE_FILE" "$ROOT_LIST"' EXIT
    pin_all_manifests
    regenerate_lockfiles
    reconcile_all_roots
}

# Sourcing this file exposes the helpers for tests without running an update.
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
