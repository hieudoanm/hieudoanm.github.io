#!/usr/bin/env bash
# Cargo.toml queries and edits. Sourced, never executed.

# find_manifests <root>: every Cargo.toml in the tree, excluding build output,
# vendored dependencies and VCS metadata.
find_manifests() {
    find "$1" -type f -name Cargo.toml \
        -not -path "*/target/*" \
        -not -path "*/node_modules/*" \
        -not -path "*/.git/*" \
    | sort
}

# workspace_root_of <manifest>: the workspace root directory, or empty when the
# manifest cannot be resolved.
workspace_root_of() {
    local dir
    dir="$(dirname "$1")"
    (
        cd "$dir" \
        && run_timeout 60 cargo metadata --no-deps --format-version 1 2>/dev/null \
        | jq -r '.workspace_root // empty'
    ) || true
}

# package_direct_deps <manifest>: this package's own registry dependencies as
# `name|kind`. Selected by manifest path so a workspace member is never confused
# with the workspace root; path/git and platform-specific entries are dropped.
package_direct_deps() {
    local manifest="$1" dir
    dir="$(dirname "$manifest")"
    (
        cd "$dir" && run_timeout 60 cargo metadata --no-deps --format-version 1 2>/dev/null
    ) | jq -r --arg mf "$manifest" '
        .packages[] | select(.manifest_path == $mf) | .dependencies[]
        | select((.source // "") | startswith("registry+"))
        | select(.target == null)
        | "\(.name)|\(.kind // "normal")"
    ' | sort -u
}

# workspace_inherited_deps <manifest>: names this manifest inherits from
# [workspace.dependencies] via `{ workspace = true }`. Re-pinning those would
# unshare them and break the workspace design, so they are filtered out.
# Note: `[ \t]` is used instead of `\s`, which macOS /usr/bin/awk cannot parse.
workspace_inherited_deps() {
    awk '
        /^[ \t]*\[workspace\.dependencies\]/ { in_ws = 1; next }
        /^[ \t]*\[/                          { in_ws = 0 }
        in_ws                                { next }
        /^[ \t]*[A-Za-z0-9_-]+[ \t]*=[ \t]*\{/ && /workspace[ \t]*=[ \t]*true/ {
            sub(/[ \t]*=.*/, ""); gsub(/[ \t]/, ""); print
            next
        }
        /^[ \t]*[A-Za-z0-9_-]+[ \t]*\.[ \t]*workspace[ \t]*=[ \t]*true/ {
            sub(/\..*/, "", $1); print $1
        }
    ' "$1" | sort -u
}

# workspace_dependency_entries <manifest>: `crate|requirement` for every
# [workspace.dependencies] row. Virtual workspaces have no package section, so
# `cargo metadata --no-deps` never surfaces these to the per-package phase.
# A `package = "..."` rename is unwrapped, since resolution follows the real
# crate name.
workspace_dependency_entries() {
    python3 - "$1" <<'PY'
import re, sys

text = open(sys.argv[1]).read()
head = re.search(r"^[ \t]*\[[ \t]*workspace[ \t]*\.[ \t]*dependencies[ \t]*\]", text, re.M)
if not head:
    sys.exit(0)
rest = text[head.end():]
nxt = re.search(r"^[ \t]*\[", rest, re.M)
body = rest[:nxt.start()] if nxt else rest

entry = re.compile(r"^([ \t]*)([A-Za-z0-9_.-]+)([ \t]*=[ \t]*)(\"[^\"]*\"|\{[^\}]*?\})", re.M)
for em in entry.finditer(body):
    key, val = em.group(2), em.group(4)
    lookup = key
    pm = re.search(r"package[ \t]*=[ \t]*\"?([A-Za-z0-9_.-]+)\"?", val)
    if pm:
        lookup = pm.group(1)
    req = None
    vm = re.search(r"\bversion[ \t]*=[ \t]*\"([^\"]+)\"", val)
    if vm:
        req = vm.group(1)
    elif val.startswith('"'):
        req = val[1:-1].strip()
    if req and req[:1].isdigit():
        print("%s|%s" % (lookup, req))
PY
}

# write_workspace_dependency_pins <manifest> <newline-separated crate=version>:
# rewrite [workspace.dependencies] requirements to exact pins (`=x.y.z`),
# preserving features and any rename. Keys arrive via the environment so the
# mapping needs no shell quoting.
write_workspace_dependency_pins() {
    WS_PINS="$2" python3 - "$1" <<'PY'
import os, re, sys

keys = {}
for line in os.environ.get("WS_PINS", "").splitlines():
    line = line.strip()
    if not line or "=" not in line:
        continue
    k, v = line.split("=", 1)
    keys[k] = v

path = sys.argv[1]
text = open(path).read()
head = re.search(r"^[ \t]*\[[ \t]*workspace[ \t]*\.[ \t]*dependencies[ \t]*\]", text, re.M)
if not head:
    sys.exit(0)
rest = text[head.end():]
nxt = re.search(r"^[ \t]*\[", rest, re.M)
body_abs_start = head.end()
body_abs_end = body_abs_start + (nxt.start() if nxt else len(rest))
body = text[body_abs_start:body_abs_end]

entry = re.compile(r"^([ \t]*)([A-Za-z0-9_.-]+)([ \t]*=[ \t]*)(\"[^\"]*\"|\{[^\}]*?\})", re.M)

def repl(em):
    pre, key, assign, val = em.group(1), em.group(2), em.group(3), em.group(4)
    lookup = key
    pm = re.search(r"package[ \t]*=[ \t]*\"?([A-Za-z0-9_.-]+)\"?", val)
    if pm:
        lookup = pm.group(1)
    req = None
    vm = re.search(r"\bversion[ \t]*=[ \t]*\"([^\"]+)\"", val)
    if vm:
        req = vm.group(1)
    elif val.startswith('"'):
        req = val[1:-1].strip()
    new = keys.get(lookup)
    if new and req and req != "=" + new:
        if val.startswith('"'):
            val = '"=%s"' % new
        else:
            val = re.sub(re.escape(req), "=%s" % new, val, count=1)
    return pre + key + assign + val

open(path, "w").write(text[:body_abs_start] + entry.sub(repl, body) + text[body_abs_end:])
PY
}

# set_package_key <manifest> <key> <value>: set a quoted key inside [package],
# inserting it after `edition` when absent. Edits are confined to that table, so
# a dependency literally named `edition` or `rust-version` is never touched.
# Exits non-zero for a virtual manifest, which has no [package].
set_package_key() {
    python3 - "$1" "$2" "$3" <<'PY'
import re, sys

path, key, val = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path).read()

head = re.search(r"^\[package\][ \t]*$", text, re.M)
if not head:
    sys.exit(1)

rest = text[head.end():]
nxt = re.search(r"^\[", rest, re.M)
end = head.end() + (nxt.start() if nxt else len(rest))
body = text[head.end():end]

kv = re.compile(r'^(%s[ \t]*=[ \t]*)"[^"]*"' % re.escape(key), re.M)
if kv.search(body):
    body = kv.sub(lambda m: '%s"%s"' % (m.group(1), val), body, count=1)
else:
    anchor = re.search(r'^edition[ \t]*=[ \t]*"[^"]*"', body, re.M)
    if not anchor:
        sys.exit(1)
    body = body[:anchor.end()] + '\n%s = "%s"' % (key, val) + body[anchor.end():]

open(path, "w").write(text[:head.end()] + body + text[end:])
PY
}
