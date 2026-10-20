#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PGFY="${PGFY:-../languages/go/bin/pagify}"
[ -x "$PGFY" ] || { echo "pagify binary missing; run: go build -o ../languages/go/bin/pagify ../languages/go"; exit 1; }

for dir in */; do
  name="${dir%/}"
  [ -d "$name/docs" ] || continue
  # Skip notebooks example - handled separately below
  [ "$name" = "notebooks" ] && continue
  echo "== $name =="
  rm -rf "$name/dist"
  "$PGFY" build "$name/docs" --output "$name/dist"
  "$PGFY" graph "$name/docs" --output "$name/dist"
done

# Build notebooks example separately (requires ipynb conversion first)
if [ -d "notebooks/notebooks" ]; then
  echo "== notebooks =="
  rm -rf "notebooks/dist"
  # Remove previously converted markdown files (except index.md)
  for mdfile in notebooks/docs/*.md; do
    [ -f "$mdfile" ] && [ "$(basename "$mdfile")" != "index.md" ] && rm -f "$mdfile"
  done
  "$PGFY" ipynb "notebooks/notebooks"
  # Move converted markdown files to docs directory
  for mdfile in notebooks/notebooks/*.md; do
    [ -f "$mdfile" ] && mv "$mdfile" notebooks/docs/
  done
  "$PGFY" build "notebooks/docs" --output "notebooks/dist"
  "$PGFY" graph "notebooks/docs" --output "notebooks/dist"
fi
