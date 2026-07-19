#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require cargo
require jq

find . -type f -name Cargo.toml | while read -r manifest; do
    dir="$(dirname "$manifest")"

    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    (
        cd "$dir"

        cargo metadata --no-deps --format-version 1 \
        | jq -r '
        .packages[0].dependencies[]
        | "\(.name)|\(.kind // "normal")"
        ' \
        | sort -u \
        | while IFS='|' read -r crate kind; do
            echo "Checking $crate..."

            version=$(
                cargo search "$crate" --limit 1 \
                | awk -F'"' '{print $2}'
            )

            if [[ -z "$version" ]]; then
                echo "  Failed to determine latest version, skipping."
                continue
            fi

            echo "  Pinning to =$version"

            case "$kind" in
                build)
                    cargo add --build "$crate@=$version" >/dev/null
                    ;;
                dev)
                    cargo add --dev "$crate@=$version" >/dev/null
                    ;;
                *)
                    cargo add "$crate@=$version" >/dev/null
                    ;;
            esac
        done
    )
done

echo
echo "Done."
