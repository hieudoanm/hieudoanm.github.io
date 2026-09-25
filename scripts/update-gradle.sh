#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require curl
require gradle
require perl
require python3

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console (gradle's messages included).
if [[ "${GRADLE_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/gradle-update-$(date +%Y%m%d-%H%M%S).log"
    export GRADLE_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

# Resolve the newest stable version of a Maven dependency. maven-metadata.xml
# is plain XML, so python3 (stdlib only) does the parsing; results are cached
# per run because the same coordinates repeat across modules.
RESOLVER="$(mktemp "${TMPDIR:-/tmp}/gradle-resolver.XXXXXX.py")"
CACHE_FILE="$(mktemp "${TMPDIR:-/tmp}/gradle-update-cache.XXXXXX")"
trap 'rm -f "$RESOLVER" "$CACHE_FILE"' EXIT

cat > "$RESOLVER" <<'PY'
import re, sys
versions = re.findall(r"<version>([^<]+)</version>", sys.stdin.read())
stable = [
    v for v in versions
    if re.match(r"^[0-9][0-9A-Za-z_.\-]*$", v)
    and not re.search(r"(?i)alpha|beta|rc|snapshot|milestone|eap|m[0-9]", v)
]
def key(v):
    return [int(x) if x.isdigit() else 0 for x in re.findall(r"\d+|[A-Za-z]+", v)]
if stable:
    print(max(stable, key=key))
PY

# Query the repositories a Gradle build would use: Google Maven first for
# androidx/com.android/com.google coordinates, Maven Central otherwise.
resolve_latest() {
    local group="$1" artifact="$2"
    local path="${1//./\/}/${2}" url v
    local -a urls
    if [[ "$group" == androidx.* || "$group" == com.android.* || "$group" == com.google.* ]]; then
        urls=(
            "https://dl.google.com/android/maven2/$path/maven-metadata.xml"
            "https://repo1.maven.org/maven2/$path/maven-metadata.xml"
            "https://plugins.gradle.org/m2/$path/maven-metadata.xml"
        )
    else
        urls=(
            "https://repo1.maven.org/maven2/$path/maven-metadata.xml"
            "https://plugins.gradle.org/m2/$path/maven-metadata.xml"
            "https://dl.google.com/android/maven2/$path/maven-metadata.xml"
        )
    fi
    for url in "${urls[@]}"; do
        v="$(
            curl -fsS --compressed --max-time 30 --retry 2 --retry-delay 1 "$url" 2>/dev/null \
            | python3 "$RESOLVER" || true
        )"
        [[ -n "$v" ]] && { printf '%s' "$v"; return 0; }
    done
    return 1
}

# Cached latest version for a coordinate key ("group:artifact" or plugin id).
latest_of() {
    local key="$1" line="" v
    line="$(grep -m1 -F "${key}=" "$CACHE_FILE" 2>/dev/null || true)"
    if [[ -z "$line" ]]; then
        if v="$(resolve_latest "${key%%:*}" "${key##*:}")"; then
            printf '%s=%s\n' "$key" "$v" >> "$CACHE_FILE"
            line="$key=$v"
        else
            return 1
        fi
    fi
    printf '%s' "${line#*=}"
}

apply_replace() { # file old_text new_text
    perl -0pi -e 's/\Q'"$2"'\E/'"$3"'/g' "$1"
}

ensure_locking() { # file
    if ! grep -q "lockAllConfigurations" "$1"; then
        printf '\ndependencyLocking {\n    lockAllConfigurations()\n}\n' >> "$1"
    fi
}

# 1) Find every build.gradle.kts and pin each direct dependency (and plugin)
#    to the newest stable version. Three declaration styles are handled:
#    - literal  implementation("g:a:1.2.3")
#    - variable implementation("g:a:$someVersion")   -> the val line is bumped
#    - plugin   id("p") version "1.2.3" / kotlin("p") version "1.2.3"
while IFS= read -r manifest; do
    echo
    echo "=================================================="
    echo "Processing $manifest"
    echo "=================================================="

    ensure_locking "$manifest"

    # Triples "group:artifact:version" (version may be a Kotlin $variable).
    coords="$(
        perl -ne 'if(/"([A-Za-z0-9][^\s":]*:[A-Za-z0-9][^\s":]*:([^\s":]+))"/){print "$1\n"}' "$manifest"
    )"
    # Version variables: `val name = "1.2.3"`.
    vars="$(
        perl -ne 'if(/^[ \t]*val\s+([A-Za-z0-9_]+)\s*=\s*"([A-Za-z0-9][A-Za-z0-9_.\-]*)"\s*$/){print "$1=$2\n"}' "$manifest"
    )"
    # Plugin declarations, mapped to their Maven marker coordinate.
    plugins="$(
        perl -e '
            while (<>) {
                while (/((?:id|kotlin)\("[A-Za-z0-9_.\-]+"\))\s+version\s+"([A-Za-z0-9][A-Za-z0-9_.\-]*)"/g) {
                    my ($call, $marker) = ($1, $1);
                    if ($call =~ /^id\("([^"]+)"\)$/)          { $marker = $1; }
                    elsif ($call =~ /^kotlin\("([^"]+)"\)$/)  { $marker = "org.jetbrains.kotlin.$1"; }
                    print "$marker|$call\n";
                }
            }
        ' "$manifest"
    )"

    applied_lit=""
    applied_var=""
    while IFS= read -r triple; do
        [[ -z "$triple" ]] && continue
        g="${triple%%:*}"
        rest="${triple#*:}"
        a="${rest%%:*}"
        v="${rest#*:}"
        key="$g:$a"
        oldv="$v"

        if [[ "$v" == \$* ]]; then
            var="${v:1}"
            if grep -Fq "$var" <<< "$applied_var"; then
                continue
            fi
            decl="$(grep -m1 -F "$var=" <<< "$vars" || true)"
            [[ -z "$decl" ]] && continue
            oldv="${decl#*=}"
            target="val $var = \"$oldv\""
            new_target="val $var = \"NEWVERSION\""
            applied_var+="$var "
        else
            if grep -Fq "$key" <<< "$applied_lit"; then
                continue
            fi
            target="$triple"
            new_target="$g:$a:NEWVERSION"
            applied_lit+="$key "
        fi

        if ! newv="$(latest_of "$key" 2>/dev/null)"; then
            echo "  Skipping $key (no stable version resolved)."
            continue
        fi
        if [[ "$newv" == "$oldv" ]]; then
            echo "  $key already at $newv."
            continue
        fi

        echo "  Pinning $key $oldv -> $newv"
        apply_replace "$manifest" "$target" "${new_target/NEWVERSION/$newv}"
    done <<< "$coords"

    applied_plug=""
    while IFS='|' read -r marker snippet; do
        [[ -z "$marker" ]] && continue
        if grep -Fq "$marker" <<< "$applied_plug"; then
            continue
        fi
        oldv="${snippet##*\"}"
        oldv="${oldv%\"}"
        if ! newv="$(latest_of "$marker" 2>/dev/null)"; then
            echo "  Skipping plugin $marker (no stable version resolved)."
            continue
        fi
        if [[ "$newv" == "$oldv" ]]; then
            echo "  Plugin $marker already at $newv."
            continue
        fi
        applied_plug+="$marker "
        echo "  Pinning plugin $marker $oldv -> $newv"
        new_snippet="$(printf '%s' "$snippet" | perl -pe 's/version\s+"[^"]+"/version "'"$newv"'"/')"
        apply_replace "$manifest" "$snippet" "$new_snippet"
    done <<< "$plugins"
done < <(
    find "$ROOT_DIR" -type f -name build.gradle.kts \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
        -not -path "*/target/*" \
        -not -path "*/.gradle/*" \
    | sort
)

# 2) Enable dependency locking (already done per file) and generate
#    gradle.lockfile for every Gradle project root (dir with settings file).
echo
echo "=================================================="
echo "Generating gradle.lockfile"
echo "=================================================="

[[ -n "${ANDROID_HOME:-}" ]] || export ANDROID_HOME="${ANDROID_HOME:-${HOME}/Library/Android/sdk}"

find "$ROOT_DIR" -type f \( -name settings.gradle.kts -o -name settings.gradle \) \
    -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/target/*" \
| while IFS= read -r settings; do
    root="$(dirname "$settings")"
    echo
    echo "--------------------------------------------------"
    echo "Generating gradle.lockfile for $root"
    echo "--------------------------------------------------"
    if (cd "$root" && if [[ -x ./gradlew ]]; then ./gradlew dependencies --write-locks --no-daemon --console=plain; else gradle dependencies --write-locks --no-daemon --console=plain; fi); then
        echo "  OK: gradle.lockfile generated for $root."
    else
        echo "  WARNING: could not generate lockfile for $root."
    fi
done

echo
echo "Done."