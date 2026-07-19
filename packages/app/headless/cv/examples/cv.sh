#!/usr/bin/env bash
set -euo pipefail

# Regenerate the CV examples from examples/cv.yaml:
#   - examples/cv.md
#   - examples/themes/<style>/<template>.pdf  (64 templates)
#
# Usage: ./cv.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GO_DIR="$(cd "$SCRIPT_DIR/../languages/go" && pwd)"
BIN="$GO_DIR/bin/cv"
INPUT="$SCRIPT_DIR/cv.yaml"

if [ ! -f "$INPUT" ]; then
  echo "cv.sh: missing $INPUT" >&2
  exit 1
fi

echo "cv.sh: building $BIN" >&2
(cd "$GO_DIR" && make build)

# Markdown example.
"$BIN" md -i "$INPUT" -o "$SCRIPT_DIR/cv.md"

# One PDF per template. Templates resolve relative to the Go module directory.
cd "$GO_DIR"
for template in templates/*/*.html; do
  theme="${template#templates/}"
  theme="${theme%.html}"

  # Skip scaffolding directories (e.g. templates/_probe).
  case "$theme" in _*/*) continue ;; esac

  output="$SCRIPT_DIR/themes/$theme.pdf"

  mkdir -p "$(dirname "$output")"
  "$BIN" pdf -i "$INPUT" -t "$theme" -o "$output"
done

echo "cv.sh: wrote cv.md and $(find "$SCRIPT_DIR/themes" -name '*.pdf' | wc -l | tr -d ' ') theme PDFs"
