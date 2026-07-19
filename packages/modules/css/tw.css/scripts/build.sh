#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SASS="$ROOT/node_modules/.bin/sass"
DIST="$ROOT/dist"

# Each tier compiles one entry into dist/<dir>/<stem>.css and .min.css.
# `full` is the only tier whose output directory differs from its entry stem.
TIER_DIRS=(nano micro lite standard full)
ENTRY_STEMS=(tailwind.nano tailwind.micro tailwind.lite tailwind.standard tailwind)

clean() {
  rm -rf "$DIST"
}

build() {
  local index dir stem
  for index in "${!TIER_DIRS[@]}"; do
    dir="${TIER_DIRS[$index]}"
    stem="${ENTRY_STEMS[$index]}"
    mkdir -p "$DIST/$dir"

    "$SASS" --source-map "src/$stem.scss" "$DIST/$dir/$stem.css"
    "$SASS" --source-map --style=compressed "src/$stem.scss" "$DIST/$dir/$stem.min.css"
  done
}

cd "$ROOT"

if [[ "${1:-}" == "clean" ]]; then
  clean
else
  clean
  build
fi