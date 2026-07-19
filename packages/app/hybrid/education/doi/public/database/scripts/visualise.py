#!/usr/bin/env python3

import argparse
import html
import math
import sqlite3
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

WIDTH = 1600
HEIGHT = 1000
RADIUS = 10


@dataclass
class Node:
    doi: str
    label: str
    x: float = 0.0
    y: float = 0.0


@dataclass
class Edge:
    source: str
    target: str


def _parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Visualise citation links between works as an SVG image."
    )
    parser.add_argument(
        "-d", "--db", type=Path,
        default=Path(__file__).parent.parent / "doi.db",
        help="SQLite database file (default: database/doi.db)",
    )
    parser.add_argument(
        "-o", "--out", type=Path,
        default=Path(__file__).parent.parent / "images",
        help="Output directory (default: database/images)",
    )
    parser.add_argument(
        "-q", "--query", default=None,
        help="Search query; only render works matching title/author/abstract/doi",
    )
    parser.add_argument(
        "-n", "--max-nodes", type=int, default=200,
        help="Maximum nodes to render (default: 200)",
    )
    parser.add_argument(
        "-f", "--full", action="store_true",
        help="Render every titled work (ignore --max-nodes)",
    )
    return parser.parse_args(argv)


def load_graph(db_path: Path, query: str | None = None) -> tuple[list[Node], list[Edge]]:
    connection = sqlite3.connect(db_path)
    match = ""
    params: tuple[str, ...] = ()
    if query:
        like = f"%{query}%"
        match = " AND (title LIKE ? OR author LIKE ? OR abstract LIKE ? OR doi LIKE ?)"
        params = (like, like, like, like)
    titled = {
        row[0]
        for row in connection.execute(
            "SELECT doi FROM works WHERE title != ''" + match, params
        ).fetchall()
    }
    nodes = [
        Node(doi=row[0], label=row[1])
        for row in connection.execute(
            "SELECT doi, title FROM works WHERE title != ''" + match, params
        ).fetchall()
    ]
    edges = [
        Edge(source=row[0], target=row[1])
        for row in connection.execute(
            """
            SELECT r.workId, r.referencedId
            FROM "references" r
            JOIN works a ON r.workId = a.doi
            JOIN works b ON r.referencedId = b.doi
            WHERE a.title != '' AND b.title != ''
            """
        ).fetchall()
        if row[0] in titled and row[1] in titled and row[0] != row[1]
    ]
    connection.close()
    return nodes, edges


def select(nodes: list[Node], edges: list[Edge], limit: int) -> tuple[list[Node], list[Edge]]:
    if len(nodes) <= limit:
        return nodes, edges
    by_degree: dict[str, int] = {}
    for edge in edges:
        by_degree[edge.source] = by_degree.get(edge.source, 0) + 1
        by_degree[edge.target] = by_degree.get(edge.target, 0) + 1
    keep = set(sorted(by_degree, key=lambda doi: by_degree[doi], reverse=True)[:limit])
    nodes = [node for node in nodes if node.doi in keep]
    edges = [edge for edge in edges if edge.source in keep and edge.target in keep]
    return nodes, edges


def layout(nodes: list[Node], edges: list[Edge]) -> None:
    count = len(nodes)
    if count == 0:
        return
    center_x = WIDTH / 2
    center_y = HEIGHT / 2
    radius = min(WIDTH, HEIGHT) / 2 - RADIUS - 20
    for index, node in enumerate(nodes):
        angle = 2 * math.pi * index / count
        node.x = center_x + radius * math.cos(angle)
        node.y = center_y + radius * math.sin(angle)
    _relax(nodes, edges)


def _relax(nodes: list[Node], edges: list[Edge]) -> None:
    edge_set = {(edge.source, edge.target) for edge in edges}
    center_x = WIDTH / 2
    center_y = HEIGHT / 2
    for _ in range(60):
        dx = [0.0] * len(nodes)
        dy = [0.0] * len(nodes)
        for i in range(len(nodes)):
            for j in range(i + 1, len(nodes)):
                ddx = nodes[j].x - nodes[i].x
                ddy = nodes[j].y - nodes[i].y
                dist = math.hypot(ddx, ddy) + 1e-6
                rep = 3000.0 / (dist * dist)
                push = rep * (ddx / dist), rep * (ddy / dist)
                dx[i] -= push[0]
                dy[i] -= push[1]
                dx[j] += push[0]
                dy[j] += push[1]
            node = nodes[i]
            gx, gy = center_x - node.x, center_y - node.y
            dx[i] += gx * 0.02
            dy[i] += gy * 0.02
        for i in range(len(nodes)):
            for j in range(i + 1, len(nodes)):
                if (
                    (nodes[i].doi, nodes[j].doi) in edge_set
                    or (nodes[j].doi, nodes[i].doi) in edge_set
                ):
                    ddx = nodes[j].x - nodes[i].x
                    ddy = nodes[j].y - nodes[i].y
                    dist = math.hypot(ddx, ddy) + 1e-6
                    force = 0.05 * (dist / 150.0 - 1.0)
                    nodes[i].x += ddx * force * 0.5
                    nodes[i].y += ddy * force * 0.5
                    nodes[j].x -= ddx * force * 0.5
                    nodes[j].y -= ddy * force * 0.5
        for node in nodes:
            node.x = min(max(node.x, RADIUS + 5), WIDTH - RADIUS - 5)
            node.y = min(max(node.y, RADIUS + 5), HEIGHT - RADIUS - 5)


def render(nodes: list[Node], edges: list[Edge]) -> str:
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}">',
        '<rect width="100%" height="100%" fill="#ffffff"/>',
        '<style>',
        ' .edge { stroke: #cbd5e1; stroke-width: 1; }',
        ' .node { fill: #6366f1; }',
        ' .label { font: 10px sans-serif; fill: #334155; text-anchor: middle; }',
        '</style>',
    ]
    for edge in edges:
        source = _find(nodes, edge.source)
        target = _find(nodes, edge.target)
        if source is None or target is None:
            continue
        parts.append(
            f'<line class="edge" x1="{source.x:.1f}" y1="{source.y:.1f}" '
            f'x2="{target.x:.1f}" y2="{target.y:.1f}"/>'
        )
    for node in nodes:
        parts.append(
            f'<circle class="node" cx="{node.x:.1f}" cy="{node.y:.1f}" '
            f'r="{RADIUS}" title="{html.escape(node.label)}"/>'
        )
        parts.append(
            f'<text class="label" x="{node.x:.1f}" y="{node.y + RADIUS + 14:.1f}">'
            f'{html.escape(_truncate(node.label, 24))}</text>'
        )
    parts.append("</svg>")
    return "\n".join(parts)


def _find(nodes: list[Node], doi: str) -> Node | None:
    for node in nodes:
        if node.doi == doi:
            return node
    return None


def _truncate(value: str, limit: int) -> str:
    return value if len(value) <= limit else value[: limit - 1] + "…"


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(list(argv) if argv is not None else sys.argv[1:])
    nodes, edges = load_graph(args.db, args.query)
    if not args.full:
        nodes, edges = select(nodes, edges, args.max_nodes)
    layout(nodes, edges)
    args.out.mkdir(parents=True, exist_ok=True)
    out_path = args.out / "graph.svg"
    out_path.write_text(render(nodes, edges), encoding="utf-8")
    print(f"wrote {out_path} — {len(nodes)} nodes, {len(edges)} edges")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())