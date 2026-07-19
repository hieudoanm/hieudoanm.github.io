#!/usr/bin/env bash
# crates.io index lookups and edition metadata. Sourced, never executed.

# crate_index_path <name>: sparse index CDN path for a crate, whose layout
# depends on name length (1/2/3/more characters).
crate_index_path() {
    local name="$1" len="${#1}"
    case "$len" in
        1) printf '1/%s' "$name" ;;
        2) printf '2/%s' "$name" ;;
        3) printf '3/%s/%s' "${name:0:1}" "$name" ;;
        *) printf '%s/%s/%s' "${name:0:2}" "${name:2:2}" "$name" ;;
    esac
}

# latest_crate_version <crate> <cache-file>: newest stable (never alpha/beta/rc)
# version, read from the sparse index CDN rather than `cargo search`, which can
# report a pre-release as the newest version. Results are memoised in
# <cache-file> because the same crate repeats across manifests.
latest_crate_version() {
    local crate="$1" cache_file="$2" entry path version

    entry="$(grep -m1 "^${crate}=" "$cache_file" 2>/dev/null || true)"
    if [[ -n "$entry" ]]; then
        printf '%s' "${entry#*=}"
        return 0
    fi

    path="$(crate_index_path "$crate")"
    version="$(
        curl -fsS --compressed --max-time 30 --retry 3 --retry-delay 1 \
            -A "renovate-rust.sh (sparse index probe)" \
            "https://index.crates.io/$path" 2>/dev/null \
        | jq -r -s '
            map(select((.yanked | not) and (.vers | contains("-") | not)))
            | max_by(.vers | split("+")[0] | split(".") | map(. | tonumber? // -1))
            | .vers // empty
          ' || true
    )"

    if [[ -n "$version" ]]; then
        printf '%s=%s\n' "$crate" "$version" >> "$cache_file"
    fi
    printf '%s' "$version"
}

# edition_floor <edition>: minimum rustc release able to compile that edition.
# An edition silently raises the compiler floor, so it feeds MSRV arithmetic.
# Extend this table when a new edition ships.
edition_floor() {
    case "$1" in
        2015) printf '1.0.0' ;;
        2018) printf '1.31.0' ;;
        2021) printf '1.56.0' ;;
        2024) printf '1.85.0' ;;
        *) printf '' ;;
    esac
}

# latest_edition: newest edition the local toolchain can compile. Derived from
# `rustc --version` rather than hardcoded, so it tracks whatever is installed.
latest_edition() {
    local rustc_version="" ed floor best=""
    rustc_version="$(rustc --version 2>/dev/null | awk '{print $2}')"
    if [[ -z "$rustc_version" ]]; then
        return 0
    fi
    for ed in 2015 2018 2021 2024; do
        floor="$(edition_floor "$ed")"
        [[ -n "$floor" ]] || continue
        if ! version_lt "$rustc_version" "$floor"; then
            best="$ed"
        fi
    done
    printf '%s' "$best"
}
