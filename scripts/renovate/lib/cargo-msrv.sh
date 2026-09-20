#!/usr/bin/env bash
# rust-version / edition reconciliation. Sourced, never executed.
#
# Accumulators are set by the calling driver, which owns their lifetime and
# prints the totals. They are the one piece of shared state in the script and
# exist only so these functions stay free of output plumbing.

# msrv_raised   manifests whose false rust-version was corrected
# msrv_added    manifests given a rust-version under CARGO_RENOVATE_ADD_MSRV
# edition_behind manifests on an edition older than the toolchain supports

# workspace_msrv_rows <workspace-root>: one row per local (non-vendored) package
# in the workspace, as manifest_path <TAB> edition <TAB> declared_msrv <TAB>
# dep_floor. A single full resolve serves every member because they share one
# graph and one lockfile. "-" means the value is absent.
workspace_msrv_rows() {
    (
        cd "$1" \
        && run_timeout 600 cargo metadata --format-version 1 2>/dev/null
    ) | jq -r '
        def vkey: split("+")[0] | split(".") | map(tonumber? // 0);
        ( .packages | map({ key: .id, value: (.rust_version // null) }) | from_entries ) as $rv
        | ( reduce (.resolve.nodes // [])[] as $n
            ({}; .[$n.id] = ($n.deps // [])) ) as $depsof
        | .packages[]
        | select(.source == null)
        | . as $p
        | ( [ ($depsof[$p.id] // [])[]?.pkg | $rv[.] ]
            | map(select(. != null))
            | max_by(vkey) ) as $req
        | "\($p.manifest_path)\t\($p.edition)\t\($p.rust_version // "-")\t\($req // "-")"
      ' 2>/dev/null
}

# msrv_floor <edition> <dep_floor>: the lowest rustc that can actually build the
# package, i.e. the higher of the edition's compiler floor and the strictest
# rust_version among its resolved dependencies. Empty when neither is known.
msrv_floor() {
    local ed_floor
    ed_floor="$(edition_floor "$1")"
    if [[ -n "$ed_floor" ]] && { [[ -z "$2" ]] || version_lt "$2" "$ed_floor"; }; then
        printf '%s' "$ed_floor"
    else
        printf '%s' "$2"
    fi
}

# reconcile_msrv <manifest> <edition> <declared> <floor>
#
# `rust-version` is an MSRV, a promise about which compilers may build the crate,
# so it is never raised to the latest toolchain here. A declared value below the
# floor is factually unbuildable and is corrected; a value above the floor is a
# deliberate stronger promise and is left alone. A missing value is only
# declared under CARGO_RENOVATE_ADD_MSRV, because adding one is a new promise
# rather than a correction.
reconcile_msrv() {
    local manifest="$1" edition="$2" declared="$3" floor="$4"

    if [[ "$declared" == "-" ]]; then
        if [[ "${CARGO_RENOVATE_ADD_MSRV:-0}" != "1" ]]; then
            echo "  No rust-version in ${manifest#"$ROOT_DIR"/} but $floor is required (edition $edition). Re-run with CARGO_RENOVATE_ADD_MSRV=1 to declare it."
            return 0
        fi
        if set_package_key "$manifest" rust-version "$floor"; then
            echo "  Added rust-version = \"$floor\" to ${manifest#"$ROOT_DIR"/} (needed by edition $edition and its dependencies)."
            msrv_added=$((msrv_added + 1))
        else
            echo "  WARNING: could not add rust-version to $manifest."
        fi
        return 0
    fi

    if ! version_lt "$declared" "$floor"; then
        return 0
    fi

    echo "  Raising rust-version in ${manifest#"$ROOT_DIR"/}: $declared -> $floor (edition $edition and its dependencies require it)."
    if set_package_key "$manifest" rust-version "$floor"; then
        msrv_raised=$((msrv_raised + 1))
    else
        echo "  WARNING: could not update rust-version in $manifest."
    fi
}

# migrate_edition <manifest> <workspace-root>: rewrite sources for the target
# edition, then re-check the whole workspace so a change that breaks a sibling
# member is caught here rather than in CI.
migrate_edition() {
    (cd "$(dirname "$1")" && run_timeout 900 cargo fix --edition --allow-no-vcs --all-targets) \
    && (cd "$2" && run_timeout 900 cargo check --workspace --all-targets >/dev/null 2>&1)
}

# check_edition_drift <manifest> <edition> <latest> <workspace-root>
#
# Editions are never rewritten automatically: 2021 -> 2024 changes semantics (RPIT
# lifetime capture, `if let` temporaries, match ergonomics, `unsafe` attributes),
# so migrating source needs `cargo fix --edition` plus a test run. Drift is
# reported; CARGO_RENOVATE_FIX_EDITION opts into migrating.
check_edition_drift() {
    local manifest="$1" edition="$2" latest="$3" short
    if [[ -z "$latest" || ! "$edition" =~ ^[0-9]{4}$ || "$edition" -ge "$latest" ]]; then
        return 0
    fi

    short="${manifest#"$ROOT_DIR"/}"
    edition_behind=$((edition_behind + 1))

    if [[ "${CARGO_RENOVATE_FIX_EDITION:-0}" != "1" ]]; then
        echo "  Edition $edition is behind $latest in $short. Re-run with CARGO_RENOVATE_FIX_EDITION=1 to migrate with cargo fix."
        return 0
    fi

    echo "  Migrating $short from edition $edition to $latest via cargo fix..."
    if migrate_edition "$manifest" "$4"; then
        echo "    OK: migrated and the workspace still checks."
    else
        echo "    WARNING: cargo fix --edition or the follow-up check failed; review $short manually."
    fi
}

# reconcile_root <workspace-root>: apply reconcile_msrv and check_edition_drift to
# every local package in one workspace.
reconcile_root() {
    local root="$1" rows manifest edition declared dep_floor floor
    rows="$(workspace_msrv_rows "$root")"
    if [[ -z "$rows" ]]; then
        echo "  WARNING: could not resolve the dependency graph for $root."
        return 0
    fi

    while IFS=$'\t' read -r manifest edition declared dep_floor; do
        if [[ -z "$manifest" ]]; then
            continue
        fi
        if [[ "$dep_floor" == "-" ]]; then
            dep_floor=""
        fi
        floor="$(msrv_floor "$edition" "$dep_floor")"
        [[ -n "$floor" ]] || continue

        reconcile_msrv "$manifest" "$edition" "$declared" "$floor"
        check_edition_drift "$manifest" "$edition" "$LATEST_EDITION" "$root"
    done <<< "$rows"
}
