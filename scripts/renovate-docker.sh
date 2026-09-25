#!/usr/bin/env bash

set -euo pipefail

require() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "Error: $1 is not installed."
        exit 1
    }
}

require python3

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Log a timestamped transcript of the run under $ROOT_DIR/logs, mirroring all
# output to the console.
if [[ "${DOCKER_SCRIPT_LOG_RUN:-0}" != "1" ]]; then
    LOG_DIR="$ROOT_DIR/logs"
    mkdir -p "$LOG_DIR"
    LOG_FILE="$LOG_DIR/docker-update-$(date +%Y%m%d-%H%M%S).log"
    export DOCKER_SCRIPT_LOG_RUN=1
    echo "Log file: $LOG_FILE"
    exec > >(tee -a "$LOG_FILE") 2>&1
fi

python3 - "$ROOT_DIR" <<'PY'
import json
import os
import re
import sys
import urllib.parse
import urllib.request

ROOT = sys.argv[1]

NUM = re.compile(r"^(\d+(?:\.\d+)*)(.*)$")
ARG = re.compile(r"^[ \t]*ARG[ \t]+([A-Za-z_][A-Za-z0-9_]*)=(.*)$")
FROM = re.compile(r"^FROM[ \t]+([A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)*)(?::([^ \t]+))?")
VAR = re.compile(r"\$\{([A-Za-z_][A-Za-z0-9_]*)\}|\$([A-Za-z_][A-Za-z0-9_]*)")

hub_cache = {}

def hub_tags(repo, prefix):
    key = (repo, prefix)
    if key in hub_cache:
        return hub_cache[key]
    names = []
    url = "https://hub.docker.com/v2/repositories/%s/tags?page_size=100&name=%s" % (
        repo, urllib.parse.quote(prefix))
    for _ in range(6):
        try:
            with urllib.request.urlopen(url, timeout=20) as resp:
                data = json.load(resp)
        except Exception:
            break
        names.extend(tag["name"] for tag in data.get("results", []))
        url = data.get("next")
        if not url:
            break
    hub_cache[key] = names
    return names

def parts(v):
    return [int(p) for p in v.split(".")]

def greater(a, b):
    pa, pb = parts(a), parts(b)
    n = max(len(pa), len(pb))
    return (pa + [0] * (n - len(pa))) > (pb + [0] * (n - len(pb)))

def latest_patch(repo, cur, suffix):
    comps = parts(cur)
    keep = comps[:-1] if len(comps) >= 2 else comps[:1]
    prefix = ".".join(str(p) for p in keep)
    best = None
    for name in hub_tags(repo, prefix):
        m = NUM.match(name)
        if not m:
            continue
        ver, suf = m.group(1), m.group(2)
        if suf != suffix:
            continue
        vp = parts(ver)
        if len(vp) <= len(keep) or vp[:len(keep)] != keep:
            continue
        if greater(ver, cur) and (best is None or greater(ver, best)):
            best = ver
    return best, prefix

def walk():
    for root, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in ("node_modules", ".git", "target", ".build")]
        for f in sorted(files):
            yield os.path.join(root, f)

updated = 0
changed = 0

for path in walk():
    base = os.path.basename(path)
    if base == "Dockerfile" or base.startswith("Dockerfile."):
        compose = False
    elif base in ("docker-compose.yml", "docker-compose.yaml"):
        compose = True
    else:
        continue

    text = open(path).read()
    args = {}
    for line in text.split("\n"):
        m = ARG.match(line)
        if m:
            args[m.group(1)] = m.group(2)

    arg_bump = {}
    edits = {}  # unique old target -> new target, applied across the whole file
    for line in text.split("\n"):
        if compose:
            m = re.match(r"^[ \t]*image:[ \t]*(.*)$", line)
            if not m or ":" not in m.group(1):
                continue
            img, tag = m.group(1).strip().rsplit(":", 1)
            if VAR.search(tag):
                continue
        else:
            m = FROM.match(line)
            if not m or not m.group(2):
                continue
            img, tag = m.group(1), m.group(2)

        full = tag
        mv = VAR.search(tag)
        if mv:
            key = mv.group(1) or mv.group(2)
            value = args.get(key)
            if not value:
                continue
            full = value + tag[mv.end():]
        mn = NUM.match(full)
        if not mn:
            continue
        cur, suffix = mn.group(1), mn.group(2)
        repo = img if "/" in img else "library/" + img
        new, _ = latest_patch(repo, cur, suffix)
        if not new:
            print("  %s: %s stays at %s%s (no newer patch)." % (path, img, cur, suffix))
            continue
        if mv:
            key = mv.group(1) or mv.group(2)
            if arg_bump.get(key) is None or greater(new, arg_bump[key]):
                arg_bump[key] = new
        else:
            edits[img + ":" + full] = img + ":" + new + suffix
            print("  %s: %s:%s%s -> %s%s" % (path, img, cur, suffix, new, suffix))
            updated += 1

    applied = 0
    for key, new in arg_bump.items():
        pattern = re.compile(r"^[ \t]*ARG[ \t]+" + re.escape(key) + r"=[ \t]*\d+(?:\.\d+)*", re.M)
        text, n = pattern.subn(lambda m: re.sub(r"\d+(?:\.\d+)*$", new, m.group(0)), text)
        if n == 0:
            print("  WARNING: no ARG line matched for %s in %s" % (key, path), file=sys.stderr)
            continue
        print("  %s: ARG %s -> %s" % (path, key, new))
        applied += n
    for old_ref, new_ref in edits.items():
        if old_ref not in text:
            print("  WARNING: no match for %s in %s" % (old_ref, path), file=sys.stderr)
            continue
        text = text.replace(old_ref, new_ref)
        applied += text.count(new_ref)

    if applied > 0:
        open(path, "w").write(text)
        changed += 1

print()
print("Done (%d Dockerfile/compose image references updated across %d file(s))."
      % (updated, changed))
PY