#!/bin/sh
# Export brand raster assets from SVG sources.
set -e

SVG_DIR="$(dirname "$0")/svg"
IMG_DIR="$(dirname "$0")/images"

mkdir -p "$IMG_DIR"

for svg in "$SVG_DIR"/*.svg; do
  name="$(basename "$svg" .svg)"
  # Placeholder: rasterise with an SVG toolchain when available.
  : > "$IMG_DIR/$name.png"
done
