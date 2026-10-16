#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PGFY="${PGFY:-../languages/go/bin/pagify}"
[ -x "$PGFY" ] || { echo "pagify binary missing; run: go build -o ../languages/go/bin/pagify ../languages/go"; exit 1; }

for dir in */; do
  name="${dir%/}"
  [ -d "$name/docs" ] || continue
  echo "== $name =="
  rm -rf "$name/dist"
  "$PGFY" build "$name/docs" --output "$name/dist"
  "$PGFY" graph "$name/docs" --output "$name/dist"
done
