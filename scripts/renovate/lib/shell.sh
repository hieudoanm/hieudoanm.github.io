#!/usr/bin/env bash
# Shared shell helpers for the renovate scripts. Sourced, never executed.

# require <command...>: abort unless every named command is on PATH.
require() {
    local cmd
    for cmd in "$@"; do
        command -v "$cmd" >/dev/null 2>&1 || {
            echo "Error: $cmd is not installed."
            exit 1
        }
    done
}

# run_timeout <seconds> <command...>: bound a command that can block on an index
# or git fetch. macOS ships no `timeout(1)`, so use perl's alarm + exec.
run_timeout() {
    local seconds="$1"
    shift
    perl -e 'alarm shift; exec @ARGV' "$seconds" "$@"
}

# version_lt <a> <b>: true when $1 sorts strictly before $2. Callers use it to
# raise a value without ever lowering one that is already at or above target.
# `sort -V` keeps the comparison numeric, so 1.9.0 correctly precedes 1.10.0.
version_lt() {
    [[ "$1" != "$2" && "$(printf '%s\n%s\n' "$1" "$2" | sort -V | head -1)" == "$1" ]]
}

# init_transcript <guard-var> <log-prefix>: mirror all output to
# $ROOT_DIR/logs/<prefix>-<timestamp>.log. Nested invocations inherit the guard
# variable and skip the redirection so a run logs to a single file.
init_transcript() {
    local guard="$1" prefix="$2"
    if [[ "${!guard:-0}" == "1" ]]; then
        return 0
    fi
    mkdir -p "$ROOT_DIR/logs"
    local log_file="$ROOT_DIR/logs/$prefix-$(date +%Y%m%d-%H%M%S).log"
    export "$guard=1"
    echo "Log file: $log_file"
    exec > >(tee -a "$log_file") 2>&1
}
