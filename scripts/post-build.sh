#!/usr/bin/env bash

set -euo pipefail

if [[ "${CI:-}" != "" ]]; then
    echo "Skipping post-build in CI."
    exit 0
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HYBRID_DIR="$ROOT_DIR/packages/app/hybrid"
DOCS_DIR="$ROOT_DIR/docs"
ROOT_APP="docs"

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

usage() {
    cat <<'EOF'
Usage: post-build.sh [options]

Builds hybrid apps and copies their out/ directories into docs/.

The docs app is copied to docs/ (site root). Every other app in
packages/app/hybrid is built with BASE_PATH=/downloads/<name> and copied to
docs/downloads/<name>.

Options:
  --all           Build and copy all apps in packages/app/hybrid (default)
  --app, -a       Only build/copy the docs app to docs/
  --name <app>    Only build/copy a specific app in packages/app/hybrid
  --help, -h      Show this help
EOF
}

build_app() {
    local app_name="$1"
    local app_dir="$HYBRID_DIR/$app_name"

    if [[ ! -f "$app_dir/package.json" ]] || [[ ! -f "$app_dir/next.config.ts" ]]; then
        echo "Skipping $app_name: not a Next.js app."
        return
    fi

    local out_dir="$app_dir/out"
    local base_path=""
    local dest_dir="$DOCS_DIR"

    if [[ "$app_name" != "$ROOT_APP" ]]; then
        base_path="/downloads/$app_name"
        dest_dir="$DOCS_DIR/downloads/$app_name"
    fi

    if [[ -n "$base_path" ]]; then
        echo "Rebuilding $app_name with BASE_PATH=$base_path..."
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

build_all_apps() {
    for app_dir in "$HYBRID_DIR"/*/; do
        local app_name="${app_dir%/}"
        app_name="${app_name##*/}"
        build_app "$app_name"
    done
}

require pnpm

do_all=false
have_flag=false
app_names=()

while [[ $# -gt 0 ]]; do
    case "$1" in
        --all)
            do_all=true
            have_flag=true
            shift
            ;;
        --app | -a)
            app_names+=("$ROOT_APP")
            have_flag=true
            shift
            ;;
        --name)
            if [[ $# -lt 2 ]]; then
                echo "Error: --name requires an app name." >&2
                exit 1
            fi
            app_names+=("$2")
            have_flag=true
            shift 2
            ;;
        --help | -h)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            usage >&2
            exit 1
            ;;
    esac
done

if [[ "$have_flag" == false ]]; then
    do_all=true
fi

if [[ "$do_all" == true ]]; then
    build_all_apps
elif [[ ${#app_names[@]} -gt 0 ]]; then
    for app_name in "${app_names[@]}"; do
        build_app "$app_name"
    done
fi

echo "Done."

pnpm turbo run build --graph=images/svg/graph.svg
