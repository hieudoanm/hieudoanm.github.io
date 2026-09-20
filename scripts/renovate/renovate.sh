#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require bash
require mktemp
require date
require tee

# This script lives in scripts/renovate/, so the repo root is two levels up and
# its siblings sit alongside it rather than one level up.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SCRIPTS_DIR="$ROOT_DIR/scripts/renovate"

usage() {
    printf '%s\n' \
        "Usage: renovate.sh [--list] [--only name[,name...]] [script...]" \
        "" \
        "Aggregated dependency update across the repo: runs every" \
        "scripts/renovate-*.sh (except this orchestrator) in alphabetical" \
        "order, giving each one its own log plus one shared transcript." \
        "" \
        "Options:" \
        "  --list            List the scripts that would run and exit." \
        "  --only names      Run only the named scripts, e.g. --only go,docker." \
        "  script...         Run only the named scripts (same as --only)."
}

discover_scripts() {
    local scripts=()
    shopt -s nullglob
    for candidate in "$SCRIPTS_DIR"/renovate-*.sh; do
        [[ "$candidate" != "$0" ]] && scripts+=("$candidate")
    done
    printf '%s\n' "${scripts[@]}"
}

select_scripts() {
    local wanted="$1"
    local name base
    for script in "${@:2}"; do
        if [[ -n "$wanted" ]]; then
            name="${script##*/}"
            base="${name#renovate-}"
            base="${base%.sh}"
            case ",$wanted," in
                *",$base,"*) printf '%s\n' "$script" ;;
            esac
        else
            printf '%s\n' "$script"
        fi
    done
}

main() {
    local only="" want_list=0
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --list) want_list=1 ;;
            --only)
                [[ $# -lt 2 ]] && { usage >&2; exit 2; }
                only="$2"
                shift
                ;;
            --help|-h) usage; exit 0 ;;
            -*) usage >&2; exit 2 ;;
            *) only="${only:+$only,}$1" ;;
        esac
        shift
    done

    local all_scripts=()
    while IFS= read -r script; do
        [[ -n "$script" ]] && all_scripts+=("$script")
    done < <(discover_scripts)

    if [[ "$want_list" -eq 1 ]]; then
        if [[ "${#all_scripts[@]}" -eq 0 ]]; then
            echo "No renovate-*.sh scripts found."
            exit 0
        fi
        printf '%s\n' "${all_scripts[@]}"
        exit 0
    fi

    if [[ "${#all_scripts[@]}" -eq 0 ]]; then
        echo "No renovate-*.sh scripts found in $SCRIPTS_DIR."
        exit 0
    fi

    local -a run_scripts=()
    while IFS= read -r script; do
        run_scripts+=("$script")
    done < <(select_scripts "$only" "${all_scripts[@]}")

    if [[ "${#run_scripts[@]}" -eq 0 ]]; then
        printf '%s\n' \
            "No scripts matched '$only'." \
            "Available: ${all_scripts[*]##*/}"
        exit 2
    fi

    if [[ -n "$only" ]]; then
        echo "Ordered to run only: ${run_scripts[*]##*/}"
    else
        echo "Running ${#run_scripts[@]} renovate-*.sh scripts."
    fi

    # Transcript of the whole batch lives under $ROOT_DIR/logs; every script's
    # own output lands here once, alongside the one this runner prints. The
    # individual scripts still write their dedicated logs themselves.
    mkdir -p "$ROOT_DIR/logs"
    local all_log="$ROOT_DIR/logs/renovate-all-$(date +%Y%m%d-%H%M%S).log"
    echo "Log file: $all_log"
    exec > >(tee -a "$all_log") 2>&1

    local ok=0 failed=()
    local name start elapsed
    for script in "${run_scripts[@]}"; do
        name="${script##*/}"
        start="$(date +%s)"
        echo
        echo "=================================================================="
        echo "=== $name"
        echo "=================================================================="
        if bash "$script"; then
            ok=$((ok + 1))
            printf -- '--- OK: %s (after %ss)\n' "$name" "$(( $(date +%s) - start ))"
        else
            failed+=("${script##*/}")
            printf -- '--- FAILED: %s (after %ss)\n' "$name" "$(( $(date +%s) - start ))"
        fi
    done

    printf '\n%s\n' "==================== SUMMARY ===================="
    printf 'Succeeded: %d/%d\n' "$ok" "${#run_scripts[@]}"
    if [[ "${#failed[@]}" -gt 0 ]]; then
        printf 'Failed:   %s\n' "${failed[*]}"
        exit 1
    fi
    printf '%s\n' "All good."
    exit 0
}

main "$@"