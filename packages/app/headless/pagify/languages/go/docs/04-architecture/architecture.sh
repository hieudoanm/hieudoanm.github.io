#!/bin/sh
# Render Mermaid diagrams to SVG/PNG for the architecture docs.
# Requires the mmdc (mermaid-cli) toolchain.
set -e

MMD_DIR="$(dirname "$0")/mmd"
SVG_DIR="$(dirname "$0")/svg"
IMG_DIR="$(dirname "$0")/images"

mkdir -p "$SVG_DIR" "$IMG_DIR"

for mmd in "$MMD_DIR"/*.mmd; do
  name="$(basename "$mmd" .mmd)"
  mmdc -i "$mmd" -o "$SVG_DIR/$name.svg" || true
done
