#!/bin/sh
# Validate the OpenAPI document against a local toolchain if available.
set -e

SPEC="$(dirname "$0")/backend/openapi.yaml"

if command -v spectral >/dev/null 2>&1; then
  spectral lint "$SPEC"
else
  echo "spectral not installed; skipping OpenAPI lint"
fi
