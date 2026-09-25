#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require curl
require jq
require perl
require mktemp

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console.
if [[ "${GHACTIONS_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/ghactions-update-$(date +%Y%m%d-%H%M%S).log"
    export GHACTIONS_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Latest release tag per action repo, fetched once per run and cached; the same
# action repos recur across the ci-*.yaml templates.
CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/ghactions-update-cache.XXXXXX")"
trap 'rm -f "$CACHE_FILE"' EXIT

# An optional GitHub token raises the API rate limit; Renovate's own docs
# recommend a read-only github.com PAT in RENOVATE_GITHUB_COM_TOKEN.
AUTH=()
if [[ -n "${RENOVATE_GITHUB_COM_TOKEN:-}" ]]; then
    AUTH=(--header "Authorization: Bearer $RENOVATE_GITHUB_COM_TOKEN")
elif [[ -n "${GITHUB_TOKEN:-}" ]]; then
    AUTH=(--header "Authorization: Bearer $GITHUB_TOKEN")
fi

resolve_latest() {
    local owner_repo="$1"
    local cached
    if cached="$(grep -m1 "^${owner_repo}|" "$CACHE_FILE" 2>/dev/null)"; then
        printf '%s\n' "${cached#*|}"
        return
    fi
    local tag
    tag="$(curl -fsS --compressed --max-time 20 --retry 2 --retry-delay 1 \
        ${AUTH[@]+"${AUTH[@]}"} \
        "https://api.github.com/repos/${owner_repo}/releases/latest" 2>/dev/null \
        | jq -r '.tag_name // empty' 2>/dev/null || true)"
    [[ -n "$tag" ]] && printf '%s|%s\n' "$owner_repo" "$tag" >> "$CACHE_FILE"
    printf '%s\n' "$tag"
}

updated=0
processed=0

while IFS= read -r workflow; do
    echo
    echo "=================================================="
    echo "Processing $workflow"
    echo "=================================================="

    refs="$(perl -ne '
        while (/\buses:[ \t]+([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)@([^ \t\r\n]+)/g) {
            my ($owner_repo, $ref) = ($1, $2);
            next if $owner_repo =~ m{^\./};
            next unless $ref =~ m{^v?\d+(\.\d+)*$};
            print "$owner_repo|$ref\n";
        }
    ' "$workflow" | sort -u)"

    if [[ -z "$refs" ]]; then
        echo "  No version-pinned actions."
        continue
    fi

    pending=""
    while IFS='|' read -r owner_repo ref; do
        [[ -z "$owner_repo" ]] && continue
        latest="$(resolve_latest "$owner_repo")"
        processed=$((processed + 1))
        if [[ -z "$latest" ]]; then
            echo "  WARNING: could not resolve latest for $owner_repo, skipping."
            continue
        fi
        if [[ "$latest" == "$ref" ]]; then
            continue
        fi
        echo "  $owner_repo@$ref -> @$latest"
        pending="${pending}${owner_repo}|${ref}|${latest}\n"
        updated=$((updated + 1))
    done <<< "$refs"

    if [[ -n "$pending" ]]; then
        edits_file="$(mktemp "${TMPDIR:-/tmp}/ghactions-edits.XXXXXX")"
        printf '%b' "$pending" > "$edits_file"
        GHACTIONS_EDITS="$edits_file" perl - "$workflow" <<'PL'
use strict;
use warnings;

my ($workflow) = @ARGV;
open(my $eh, "<", $ENV{GHACTIONS_EDITS}) or die "cannot open edits: $!";
open(my $fh, "<", $workflow) or die "cannot open $workflow: $!";
my $text = do { local $/; <$fh> };
close $fh;

while (my $line = <$eh>) {
    chomp $line;
    my ($owner_repo, $old, $new) = split /\|/, $line, 3;
    my $key = quotemeta("$owner_repo\@$old");
    my $val = "$owner_repo\@$new";
    $text =~ s/$key\b/$val/g;
}

open(my $out, ">", $workflow) or die "cannot write $workflow: $!";
print $out $text;
close $out;
PL
        rm -f "$edits_file"
    fi
done < <(
    find "$ROOT_DIR/.github/workflows" -type f \( -name '*.yaml' -o -name '*.yml' \) \
    | sort
)

echo
echo "Done ($updated action version(s) bumped across $processed checked)."