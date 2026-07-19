#!/usr/bin/env bash

set -euo pipefail

if [[ "${CI:-}" != "" ]]; then
    echo "Skipping post-build in CI."
    exit 0
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HDM_DIR="$ROOT_DIR/packages/app/hybrid/hieudoanm"
OUT_DIR="$HDM_DIR/out"
DOCS_DIR="$ROOT_DIR/docs"

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require pnpm

if [[ ! -d "$OUT_DIR" ]]; then
    echo "No build output found at $OUT_DIR"
    echo "Running 'pnpm run build' in $HDM_DIR..."
    (
        cd "$HDM_DIR"
        pnpm run build
    )
fi

echo "Copying $OUT_DIR -> $DOCS_DIR"
rm -rf "$DOCS_DIR"
cp -R "$OUT_DIR" "$DOCS_DIR"
touch "$DOCS_DIR/.nojekyll"
echo "Done."

pnpm turbo run build --graph=images/svg/graph.svg
