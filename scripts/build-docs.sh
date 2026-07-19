#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HYBRID_DIR="$ROOT_DIR/packages/app/hybrid"
DOCS_DIR="$ROOT_DIR/docs"
ROOT_APP="utilities/docs"

build_app() {
    local app_path="$1"
    local app_dir="$HYBRID_DIR/$app_path"
    local app_name="${app_path##*/}"

    if [[ ! -f "$app_dir/package.json" ]] || [[ ! -f "$app_dir/next.config.ts" ]]; then
        echo "Skipping $app_path: not a Next.js app."
        return
    fi

    local out_dir="$app_dir/out"
    local base_path=""
    local dest_dir="$DOCS_DIR"

    if [[ "$app_path" != "$ROOT_APP" ]]; then
        base_path="/free/$app_name"
        dest_dir="$DOCS_DIR/free/$app_name"
    fi

    if [[ -n "$base_path" ]]; then
        echo "Rebuilding $app_path with BASE_PATH=$base_path..."
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
    local apps=()
    for category_dir in "$HYBRID_DIR"/*/; do
        [[ ! -d "$category_dir" ]] && continue
        local category="${category_dir%/}"
        category="${category##*/}"
        [[ "$category" == "docs" ]] && continue
        for app_dir in "$category_dir"*/; do
            [[ ! -d "$app_dir" ]] && continue
            local app_name="${app_dir%/}"
            app_name="${app_name##*/}"
            apps+=("$category/$app_name")
        done
    done
    for app_path in "${apps[@]}"; do
        if [[ "$app_path" == "$ROOT_APP" ]]; then
            build_app "$app_path"
        fi
    done
    for app_path in "${apps[@]}"; do
        if [[ "$app_path" != "$ROOT_APP" ]]; then
            build_app "$app_path"
        fi
    done
    verify_free
}

verify_free() {
    local missing=()
    for category_dir in "$HYBRID_DIR"/*/; do
        [[ ! -d "$category_dir" ]] && continue
        local category="${category_dir%/}"
        category="${category##*/}"
        [[ "$category" == "docs" ]] && continue
        for app_dir in "$category_dir"*/; do
            [[ ! -d "$app_dir" ]] && continue
            local app_name="${app_dir%/}"
            app_name="${app_name##*/}"
            [[ "$category/$app_name" == "$ROOT_APP" ]] && continue
            if [[ ! -f "$app_dir/package.json" ]] || [[ ! -f "$app_dir/next.config.ts" ]]; then
                continue
            fi
            if [[ ! -d "$DOCS_DIR/free/$app_name" ]]; then
                missing+=("$category/$app_name")
            fi
        done
    done
    if [[ ${#missing[@]} -gt 0 ]]; then
        echo "Error: missing build outputs in $DOCS_DIR/free: ${missing[*]}" >&2
        echo "Each Next.js app in $HYBRID_DIR (except '$ROOT_APP') must be copied there." >&2
        exit 1
    fi
}

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed." >&2
        exit 1
    }
}

build_workspace_deps() {
    local modules=()
    while IFS= read -r name; do
        modules+=("$name")
    done < <(python3 - "$HYBRID_DIR" <<'PY'
import json
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
seen = set()
for pf in sorted(root.rglob("package.json")):
    pkg = json.loads(pf.read_text())
    for section in ("dependencies", "optionalDependencies", "peerDependencies", "devDependencies"):
        for name, ver in (pkg.get(section) or {}).items():
            if isinstance(ver, str) and ver.startswith("workspace:") and name not in seen:
                seen.add(name)
                print(name)
PY
    )
    if [[ ${#modules[@]} -eq 0 ]]; then
        return
    fi

    echo "Building workspace dependencies: ${modules[*]}..."
    local args=()
    local name
    for name in "${modules[@]}"; do
        args+=(--filter="$name")
    done
    (cd "$ROOT_DIR" && pnpm turbo run build "${args[@]}")
}

require pnpm

build_workspace_deps

build_all_apps

echo "Done."

if [[ "${CI:-}" == "" ]]; then
    pnpm turbo run build --graph=images/svg/graph.svg
fi
