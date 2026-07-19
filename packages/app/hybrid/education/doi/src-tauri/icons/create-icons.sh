#!/bin/bash
# Generate the Tauri icon set from the web app icon.
# Usage: ./create-icons.sh
set -euo pipefail

SOURCE="../../public/icons/icon.svg"
TMP_PNG=".icon-1024.png"

rsvg-convert -w 1024 -h 1024 -b none "$SOURCE" -o "$TMP_PNG"
pnpm tauri icon "$TMP_PNG"
rm -f "$TMP_PNG"