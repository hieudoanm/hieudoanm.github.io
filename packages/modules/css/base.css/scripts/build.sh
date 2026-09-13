#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SASS="$ROOT/node_modules/.bin/sass"
DIST="$ROOT/dist"

clean() {
  rm -rf "$DIST"
}

build() {
  mkdir -p "$DIST"

  "$SASS" src/base.scss "$DIST/base.css"
  "$SASS" --style=compressed src/base.scss "$DIST/base.min.css"
}

cd "$ROOT"

if [[ "${1:-}" == "clean" ]]; then
  clean
else
  clean
  build
fi