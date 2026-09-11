#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SASS="$ROOT/node_modules/.bin/sass"
DIST="$ROOT/dist"

clean() {
  rm -rf "$DIST"
}

build() {
  mkdir -p "$DIST/nano" "$DIST/micro" "$DIST/lite" "$DIST/standard" "$DIST/full"

  "$SASS" src/tailwind.nano.scss "$DIST/nano/tailwind.nano.css"
  "$SASS" --style=compressed src/tailwind.nano.scss "$DIST/nano/tailwind.nano.min.css"

  "$SASS" src/tailwind.micro.scss "$DIST/micro/tailwind.micro.css"
  "$SASS" --style=compressed src/tailwind.micro.scss "$DIST/micro/tailwind.micro.min.css"

  "$SASS" src/tailwind.lite.scss "$DIST/lite/tailwind.lite.css"
  "$SASS" --style=compressed src/tailwind.lite.scss "$DIST/lite/tailwind.lite.min.css"

  "$SASS" src/tailwind.standard.scss "$DIST/standard/tailwind.standard.css"
  "$SASS" --style=compressed src/tailwind.standard.scss "$DIST/standard/tailwind.standard.min.css"

  "$SASS" src/tailwind.scss "$DIST/full/tailwind.css"
  "$SASS" --style=compressed src/tailwind.scss "$DIST/full/tailwind.min.css"
}

cd "$ROOT"

if [[ "${1:-}" == "clean" ]]; then
  clean
else
  clean
  build
fi