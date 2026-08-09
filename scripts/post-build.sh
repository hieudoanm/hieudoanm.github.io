#!/usr/bin/env bash

set -euo pipefail

if [[ "${CI:-}" != "" ]]; then
    echo "Skipping post-build in CI."
    exit 0
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/packages/app/hybrid/hieudoanm"
APP_OUT_DIR="$APP_DIR/out"
DOCS_DIR="$ROOT_DIR/docs"

RESUME_DIR="$ROOT_DIR/packages/app/hybrid/resume"
RESUME_OUT_DIR="$RESUME_DIR/out"
RESUME_DEST_DIR="$DOCS_DIR/downloads/resume"
RESUME_BASE_PATH="/downloads/resume"

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

usage() {
    cat <<'EOF'
Usage: post-build.sh [options]

Builds a static app (if needed) and copies its out/ directory into docs/.

Options:
  --app, -a      Build hieudoanm app and copy out/ -> docs/ (default)
  --resume, -r   Rebuild resume app with BASE_PATH=/downloads/resume and
                 copy out/ -> docs/downloads/resume
  --all          Do both --app and --resume
  --help, -h     Show this help
EOF
}

build_and_copy() {
    local app_dir="$1"
    local out_dir="$2"
    local dest_dir="$3"
    local base_path="${4:-}"

    if [[ -n "$base_path" ]]; then
        echo "Rebuilding in $app_dir with BASE_PATH=$base_path..."
        (
            cd "$app_dir"
            env BASE_PATH="$base_path" pnpm run build
        )
    elif [[ ! -d "$out_dir" ]]; then
        echo "No build output found at $out_dir"
        echo "Running 'pnpm run build' in $app_dir..."
        (
            cd "$app_dir"
            pnpm run build
        )
    fi

    echo "Copying $out_dir -> $dest_dir"
    mkdir -p "$(dirname "$dest_dir")"
    rm -rf "$dest_dir"
    cp -R "$out_dir" "$dest_dir"
    touch "$dest_dir/.nojekyll"
}

require pnpm

do_app=false
do_resume=false
have_flag=false

for arg in "$@"; do
    case "$arg" in
        --app | -a)
            do_app=true
            have_flag=true
            ;;
        --resume | -r)
            do_resume=true
            have_flag=true
            ;;
        --all)
            do_app=true
            do_resume=true
            have_flag=true
            ;;
        --help | -h)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $arg" >&2
            usage >&2
            exit 1
            ;;
    esac
done

if [[ "$have_flag" == false ]]; then
    do_app=true
fi

if [[ "$do_app" == true ]]; then
    build_and_copy "$APP_DIR" "$APP_OUT_DIR" "$DOCS_DIR"
fi

if [[ "$do_resume" == true ]]; then
    build_and_copy "$RESUME_DIR" "$RESUME_OUT_DIR" "$RESUME_DEST_DIR" "$RESUME_BASE_PATH"
fi

echo "Done."

pnpm turbo run build --graph=images/svg/graph.svg
