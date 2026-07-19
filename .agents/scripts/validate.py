#!/usr/bin/env python3
"""Validate agent guidance metadata, local links, workflow routes, and index."""

from __future__ import annotations

import re
import sys
from os import walk
from pathlib import Path
from urllib.parse import unquote, urlsplit


REPO = Path(__file__).resolve().parents[2]
AGENTS = REPO / ".agents"
TREE = AGENTS / "TREE.md"
MARKDOWN_LINK = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
ROUTE = re.compile(r"\.skills/[A-Za-z0-9_./-]+")


def frontmatter_errors(path: Path, names: set[str]) -> list[str]:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"\A---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        return [f"{path.relative_to(REPO)}: missing YAML frontmatter"]

    metadata = match.group(1)
    fields = {}
    for line in metadata.splitlines():
        field = re.match(r"^([a-z_]+):\s*(.*)$", line)
        if field:
            fields[field.group(1)] = field.group(2).strip().strip("\"'")

    errors = []
    for key in ("name", "description", "type"):
        if not fields.get(key):
            errors.append(f"{path.relative_to(REPO)}: missing metadata field '{key}'")
    if not re.search(r"^tags:\s*\n(?:[ \t]+-[^\n]+\n?)+", metadata, re.MULTILINE):
        errors.append(f"{path.relative_to(REPO)}: missing non-empty tags")

    name = fields.get("name")
    if name:
        if name in names:
            errors.append(f"{path.relative_to(REPO)}: duplicate metadata name '{name}'")
        names.add(name)
    return errors


def link_errors(path: Path) -> list[str]:
    errors = []
    text = path.read_text(encoding="utf-8")
    for raw_target in MARKDOWN_LINK.findall(text):
        target = raw_target.strip().split("#", 1)[0]
        if not target:
            continue
        parsed = urlsplit(target)
        if parsed.scheme or parsed.netloc:
            continue
        resolved = (path.parent / unquote(parsed.path)).resolve()
        if not resolved.exists():
            errors.append(f"{path.relative_to(REPO)}: broken link '{raw_target}'")
    return errors


def inbound_agent_link_errors() -> list[str]:
    errors = []
    ignored_dirs = {
        ".git",
        ".next",
        ".turbo",
        ".venv",
        "build",
        "coverage",
        "dist",
        "node_modules",
        "vendor",
    }
    for directory, subdirs, filenames in walk(REPO):
        subdirs[:] = [name for name in subdirs if name not in ignored_dirs]
        source_dir = Path(directory)
        if source_dir == AGENTS:
            subdirs.clear()
            continue
        for filename in filenames:
            if not filename.endswith(".md"):
                continue
            source = source_dir / filename
            if source == REPO / "AGENTS.md":
                continue
            text = source.read_text(encoding="utf-8")
            for raw_target in MARKDOWN_LINK.findall(text):
                target = raw_target.strip().split("#", 1)[0]
                if not target:
                    continue
                parsed = urlsplit(target)
                if parsed.scheme or parsed.netloc:
                    continue
                resolved = (source.parent / unquote(parsed.path)).resolve()
                if AGENTS in resolved.parents and not resolved.exists():
                    errors.append(
                        f"{source.relative_to(REPO)}: broken agent link '{raw_target}'"
                    )
    return errors


def tree_errors() -> list[str]:
    errors = []
    tree = TREE.read_text(encoding="utf-8")
    listed = {
        unquote(urlsplit(target).path.removeprefix("./"))
        for target in MARKDOWN_LINK.findall(tree)
        if not urlsplit(target).scheme
    }
    indexed_paths = (
        path for path in AGENTS.rglob("*") if "__pycache__" not in path.parts
    )
    actual = {
        path.relative_to(AGENTS).as_posix() for path in indexed_paths if path.is_file()
    }
    if listed != actual:
        for path in sorted(actual - listed):
            errors.append(f"TREE.md: missing Markdown entry '{path}'")
        for path in sorted(listed - actual):
            errors.append(f"TREE.md: unexpected Markdown entry '{path}'")

    counts = re.search(r"(\d+) directories, (\d+) files\s*$", tree)
    actual_counts = (
        sum(path.is_dir() for path in AGENTS.rglob("*") if "__pycache__" not in path.parts),
        sum(path.is_file() for path in AGENTS.rglob("*") if "__pycache__" not in path.parts),
    )
    if not counts or tuple(map(int, counts.groups())) != actual_counts:
        errors.append(
            f"TREE.md: footer count does not match {actual_counts[0]} directories, "
            f"{actual_counts[1]} files"
        )
    return errors


def main() -> int:
    errors = []
    markdown_files = sorted(AGENTS.rglob("*.md"))
    names: set[str] = set()
    for path in markdown_files:
        errors.extend(link_errors(path))
        if path != TREE:
            errors.extend(frontmatter_errors(path, names))

    root_guidance = REPO / "AGENTS.md"
    if root_guidance.exists():
        errors.extend(link_errors(root_guidance))
    errors.extend(inbound_agent_link_errors())

    for workflow in (AGENTS / "workflows").rglob("*.md"):
        text = workflow.read_text(encoding="utf-8")
        for route in ROUTE.findall(text):
            route = route.rstrip(".,;:")
            if not (REPO / route).exists():
                errors.append(f"{workflow.relative_to(REPO)}: missing skill route '{route}'")

    errors.extend(tree_errors())
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(
        f"Validated {len(markdown_files) - 1} agent documents, local links, "
        "workflow routes, and TREE.md."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
