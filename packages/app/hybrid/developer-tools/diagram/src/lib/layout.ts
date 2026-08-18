import { ICON_SIZE, ICON_GAP, nodeHeight, nodeWidth } from '@/lib/measure';
import { layoutSequence } from '@/lib/sequence';
import layoutForce from '@/lib/force';
import { layoutTimeline } from '@/lib/timeline';
import { layoutVenn } from '@/lib/venn';
import type {
  Diagram,
  DiagramEdge,
  DiagramNode,
  DiagramSubgraph,
  EdgePath,
  Layout,
  LayoutDirection,
  PositionedNode,
  PositionedSubgraph,
} from '@/lib/types';

export {
  ICON_SIZE,
  ICON_GAP,
  nodeIconCenterX,
  nodeLabelCenterX,
} from '@/lib/measure';

const PAD = 48;
const RANK_GAP = 160;
const COL_GAP = 56;
const EDGE_BEND = 40;
const LOOP_SIZE = 36;
const SUBGRAPH_PAD = 18;
const SUBGRAPH_HEADER = 26;

export const CLOUD_PATH =
  'M 0 -0.9 C -0.35 -0.9, -0.55 -0.55, -0.62 -0.3 C -0.95 -0.25, -1 -0.15, -1 0.05 C -1 0.55, -0.6 0.9, 0 0.9 C 0.6 0.9, 1 0.55, 1 0.05 C 1 -0.15, 0.95 -0.25, 0.62 -0.3 C 0.55 -0.55, 0.35 -0.9, 0 -0.9 Z';

export const NOTE_PATH =
  'M -1 1 L -1 -1 L 0.5 -1 L 1 -0.5 L 1 1 Z M 0.5 -1 L 0.5 -0.5 L 1 -0.5';

export const noteTransform = (node: PositionedNode): string =>
  `translate(${node.x} ${node.y}) scale(${node.width / 2} ${node.height / 2})`;

export const cloudTransform = noteTransform;

export interface ActorParts {
  cx: number;
  cy: number;
  r: number;
  lines: { x1: number; y1: number; x2: number; y2: number }[];
}

export const actorParts = (node: PositionedNode): ActorParts => {
  const { x, y, width, height } = node;
  return {
    cx: x,
    cy: y - height * 0.18,
    r: Math.min(width, height) * 0.09,
    lines: [
      { x1: x, y1: y - height * 0.05, x2: x, y2: y + height * 0.14 },
      {
        x1: x,
        y1: y - height * 0.02,
        x2: x - width * 0.28,
        y2: y + height * 0.12,
      },
      {
        x1: x,
        y1: y - height * 0.02,
        x2: x + width * 0.28,
        y2: y + height * 0.12,
      },
      {
        x1: x,
        y1: y + height * 0.14,
        x2: x - width * 0.2,
        y2: y + height * 0.45,
      },
      {
        x1: x,
        y1: y + height * 0.14,
        x2: x + width * 0.2,
        y2: y + height * 0.45,
      },
    ],
  };
};

export const computeLayout = (
  diagram: Diagram,
  direction: LayoutDirection = 'horizontal'
): Layout => {
  if (diagram.kind === 'sequence') return layoutSequence(diagram);
  if (diagram.kind === 'timeline') return layoutTimeline(diagram);
  if (diagram.kind === 'venn') return layoutVenn(diagram);
  if ((diagram.layoutMode ?? 'layered') === 'force')
    return layoutForce(diagram);
  return layoutFlow(diagram, direction);
};

const layoutFlow = (diagram: Diagram, direction: LayoutDirection): Layout => {
  if (diagram.nodes.length === 0) {
    return {
      kind: 'flow',
      direction,
      nodes: [],
      edges: [],
      width: PAD * 2,
      height: PAD * 2,
      subgraphs: [],
      subgraphDefs: diagram.subgraphs,
    };
  }

  const positioned: PositionedNode[] = diagram.nodes.map((node) => ({
    ...node,
    x: 0,
    y: 0,
    width: nodeWidth(node.label, node.icon),
    height: nodeHeight(node),
  }));

  const hasSubgraphs = diagram.subgraphs.length > 0;
  const ranks = hasSubgraphs
    ? computeClusterRanks(diagram)
    : computeRanks(diagram.nodes, diagram.edges);

  const rankColumns = new Map<number, PositionedNode[]>();
  for (const node of positioned) {
    const rank = ranks[node.id];
    const column = rankColumns.get(rank) ?? [];
    column.push(node);
    rankColumns.set(rank, column);
  }

  const rankEntries = [...rankColumns.entries()].sort(([a], [b]) => a - b);

  const columnHeight = (column: PositionedNode[]): number =>
    column.reduce((sum, node) => sum + node.height, 0) +
    COL_GAP * Math.max(column.length - 1, 0);

  const maxHeight = Math.max(
    ...rankEntries.map(([, column]) => columnHeight(column))
  );

  let cursorX = PAD;
  for (const [, column] of rankEntries) {
    const slotWidth = Math.max(...column.map((node) => node.width));
    let cursorY = (maxHeight - columnHeight(column)) / 2;
    column.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    for (const node of column) {
      node.x = cursorX + slotWidth / 2;
      node.y = cursorY + node.height / 2;
      cursorY += node.height + COL_GAP;
    }
    cursorX += slotWidth + RANK_GAP;
  }

  if (direction === 'vertical') {
    for (const node of positioned) {
      const nextX = node.y;
      node.y = node.x;
      node.x = nextX;
      const nextWidth = node.height;
      node.height = node.width;
      node.width = nextWidth;
    }
  }

  if (!hasSubgraphs) {
    const edges: EdgePath[] = diagram.edges
      .map((edge) => buildEdgePath(edge, positioned, direction))
      .filter((edge): edge is EdgePath => edge !== null);

    const width =
      direction === 'vertical' ? maxHeight + PAD * 2 : cursorX + PAD;
    const height =
      direction === 'vertical' ? cursorX + PAD : maxHeight + PAD * 2;

    return { kind: 'flow', direction, nodes: positioned, edges, width, height };
  }

  const { nodes, edges, subgraphs, width, height } = finalizeFlow(
    positioned,
    diagram,
    direction
  );
  return {
    kind: 'flow',
    direction,
    nodes,
    edges,
    subgraphs,
    subgraphDefs: diagram.subgraphs,
    width,
    height,
  };
};

const computeRanks = (
  nodes: DiagramNode[],
  edges: DiagramEdge[]
): Record<string, number> => {
  const initial: Record<string, number> = {};
  for (const node of nodes) initial[node.id] = node.rank ?? 0;
  return longestPath(
    nodes.map((node) => node.id),
    edges,
    initial
  );
};

const longestPath = (
  ids: string[],
  edges: DiagramEdge[],
  initial: Record<string, number> = {}
): Record<string, number> => {
  const ranks: Record<string, number> = {};
  for (const id of ids) ranks[id] = initial[id] ?? 0;
  for (const edge of edges) {
    if (!(edge.source in ranks)) ranks[edge.source] = 0;
    if (!(edge.target in ranks)) ranks[edge.target] = 0;
  }

  for (let pass = 0; pass < ids.length + edges.length; pass += 1) {
    let changed = false;
    for (const edge of edges) {
      if (edge.source === edge.target) continue;
      const from = ranks[edge.source];
      const to = ranks[edge.target];
      if (to <= from) {
        ranks[edge.target] = from + 1;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return ranks;
};

const computeClusterRanks = (diagram: Diagram): Record<string, number> => {
  const subById = new Map(
    diagram.subgraphs.map((subgraph) => [subgraph.id, subgraph])
  );
  const nodeById = new Map(diagram.nodes.map((node) => [node.id, node]));

  const topLevelId = (direct: string | undefined): string | undefined => {
    let id = direct;
    if (!id) return id;
    while (subById.get(id)?.parent !== undefined) {
      id = subById.get(id)!.parent!;
    }
    return id;
  };

  const groups = new Map<string, string[]>();
  for (const node of diagram.nodes) {
    const groupId = topLevelId(node.group) ?? node.id;
    const list = groups.get(groupId) ?? [];
    list.push(node.id);
    groups.set(groupId, list);
  }

  const groupRanks: Record<string, number> = {};
  for (const groupId of groups.keys()) groupRanks[groupId] = 0;

  for (let pass = 0; pass < groups.size + diagram.edges.length; pass += 1) {
    let changed = false;
    for (const edge of diagram.edges) {
      const from = topLevelId(nodeById.get(edge.source)?.group) ?? edge.source;
      const to = topLevelId(nodeById.get(edge.target)?.group) ?? edge.target;
      if (from === to) continue;
      if (groupRanks[to] <= groupRanks[from]) {
        groupRanks[to] = groupRanks[from] + 1;
        changed = true;
      }
    }
    if (!changed) break;
  }

  const ranks: Record<string, number> = {};
  for (const [groupId, ids] of groups) {
    const base = groupRanks[groupId] ?? 0;
    const internalEdges = diagram.edges.filter((edge) => {
      const from = topLevelId(nodeById.get(edge.source)?.group) ?? edge.source;
      const to = topLevelId(nodeById.get(edge.target)?.group) ?? edge.target;
      return from === groupId && to === groupId;
    });
    const initial: Record<string, number> = {};
    const hints = ids
      .map((id) => nodeById.get(id)?.rank ?? 0)
      .sort((a, b) => a - b);
    const minHint = hints[0] ?? 0;
    for (const id of ids) {
      const hint = nodeById.get(id)?.rank ?? 0;
      initial[id] = hint - minHint;
    }
    const internal = longestPath(ids, internalEdges, initial);
    for (const id of ids) ranks[id] = base + (internal[id] ?? 0);
  }
  return ranks;
};

export const applyManualPositions = (
  layout: Layout,
  overrides: Record<string, { x: number; y: number }>
): Layout => {
  const ids = new Set(Object.keys(overrides));
  if (layout.kind !== 'flow' || layout.mode === 'force' || ids.size === 0) {
    return layout;
  }

  const nodes = layout.nodes.map((node) =>
    overrides[node.id]
      ? { ...node, x: overrides[node.id].x, y: overrides[node.id].y }
      : node
  );

  const {
    nodes: shifted,
    edges,
    subgraphs,
    width,
    height,
  } = finalizeFlow(
    nodes,
    {
      subgraphs: layout.subgraphDefs ?? [],
      edges: layout.edges.map(({ edge }) => edge),
    },
    layout.direction
  );

  return {
    ...layout,
    nodes: shifted,
    edges,
    subgraphs,
    width,
    height,
  };
};

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const unionBounds = (
  nodes: PositionedNode[],
  boxes: PositionedSubgraph[]
): Bounds => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const node of nodes) {
    minX = Math.min(minX, node.x - node.width / 2);
    minY = Math.min(minY, node.y - node.height / 2);
    maxX = Math.max(maxX, node.x + node.width / 2);
    maxY = Math.max(maxY, node.y + node.height / 2);
  }
  for (const box of boxes) {
    minX = Math.min(minX, box.x - box.width / 2);
    minY = Math.min(minY, box.y - box.height / 2);
    maxX = Math.max(maxX, box.x + box.width / 2);
    maxY = Math.max(maxY, box.y + box.height / 2);
  }
  return { minX, minY, maxX, maxY };
};

const finalizeFlow = (
  positioned: PositionedNode[],
  diagram: Pick<Diagram, 'subgraphs' | 'edges'>,
  direction: LayoutDirection
): {
  nodes: PositionedNode[];
  edges: EdgePath[];
  subgraphs: PositionedSubgraph[];
  width: number;
  height: number;
} => {
  let nodes = positioned;
  let boxes = computeSubgraphBoxes(nodes, diagram.subgraphs);
  const bounds = unionBounds(nodes, boxes);
  const shiftX = bounds.minX < PAD ? PAD - bounds.minX : 0;
  const shiftY = bounds.minY < PAD ? PAD - bounds.minY : 0;
  if (shiftX || shiftY) {
    nodes = nodes.map((node) => ({
      ...node,
      x: node.x + shiftX,
      y: node.y + shiftY,
    }));
    boxes = computeSubgraphBoxes(nodes, diagram.subgraphs);
  }

  const edges: EdgePath[] = diagram.edges
    .map((edge) => buildEdgePath(edge, nodes, direction))
    .filter((edge): edge is EdgePath => edge !== null);
  const boundsFinal = unionBounds(nodes, boxes);
  return {
    nodes,
    edges,
    subgraphs: boxes,
    width: boundsFinal.maxX + PAD,
    height: boundsFinal.maxY + PAD,
  };
};

export const computeSubgraphBoxes = (
  nodes: PositionedNode[],
  subgraphs: DiagramSubgraph[]
): PositionedSubgraph[] => {
  const depth = (subgraph: DiagramSubgraph): number =>
    subgraph.parent === undefined
      ? 0
      : 1 +
        depth(subgraphs.find((candidate) => candidate.id === subgraph.parent)!);
  const ordered = [...subgraphs].sort((a, b) => depth(b) - depth(a));

  const boxes = new Map<string, PositionedSubgraph>();
  for (const subgraph of ordered) {
    const members = nodes.filter((node) => node.group === subgraph.id);
    const childBoxes = subgraphs
      .filter((candidate) => candidate.parent === subgraph.id)
      .map((child) => boxes.get(child.id))
      .filter((box): box is PositionedSubgraph => box !== undefined);
    if (members.length === 0 && childBoxes.length === 0) continue;

    const bounds = unionBounds(members, childBoxes);
    const width = bounds.maxX - bounds.minX + SUBGRAPH_PAD * 2;
    const height =
      bounds.maxY - bounds.minY + SUBGRAPH_PAD * 2 + SUBGRAPH_HEADER;
    boxes.set(subgraph.id, {
      id: subgraph.id,
      label: subgraph.label,
      color: subgraph.color,
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2 + SUBGRAPH_HEADER / 2,
      width,
      height,
    });
  }

  return subgraphs
    .map((subgraph) => boxes.get(subgraph.id))
    .filter((box): box is PositionedSubgraph => box !== undefined);
};

const buildEdgePath = (
  edge: DiagramEdge,
  nodes: PositionedNode[],
  direction: LayoutDirection
): EdgePath | null => {
  const source = nodes.find((node) => node.id === edge.source);
  const target = nodes.find((node) => node.id === edge.target);
  if (!source || !target) return null;

  if (source.id === target.id) {
    return buildSelfLoop(edge, source, direction);
  }

  const forward =
    direction === 'vertical' ? target.y > source.y : target.x > source.x;

  let start: { x: number; y: number };
  let end: { x: number; y: number };
  let c1: { x: number; y: number };
  let c2: { x: number; y: number };

  if (forward) {
    if (direction === 'vertical') {
      start = { x: source.x, y: source.y + source.height / 2 };
      end = { x: target.x, y: target.y - target.height / 2 };
      const midY = start.y + (end.y - start.y) * 0.5;
      c1 = { x: start.x, y: midY };
      c2 = { x: end.x, y: midY };
    } else {
      start = { x: source.x + source.width / 2, y: source.y };
      end = { x: target.x - target.width / 2, y: target.y };
      const midX = start.x + (end.x - start.x) * 0.5;
      c1 = { x: midX, y: start.y };
      c2 = { x: midX, y: end.y };
    }
  } else if (direction === 'vertical') {
    start = { x: source.x - source.width / 2, y: source.y };
    end = { x: target.x - target.width / 2, y: target.y };
    c1 = { x: start.x - EDGE_BEND, y: start.y + (end.y - start.y) * 0.5 };
    c2 = { x: end.x - EDGE_BEND, y: end.y - (end.y - start.y) * 0.5 };
  } else {
    start = { x: source.x, y: source.y + source.height / 2 };
    end = { x: target.x, y: target.y + target.height / 2 };
    c1 = { x: start.x + (end.x - start.x) * 0.5, y: start.y + EDGE_BEND };
    c2 = { x: end.x - (end.x - start.x) * 0.5, y: end.y + EDGE_BEND };
  }

  const path = [
    `M ${start.x} ${start.y}`,
    `C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
  ].join(' ');

  const label = bezierPoint(start, c1, c2, end, 0.5);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const perpendicular = { x: -dy / length, y: dx / length };
  const labelX = label.x + perpendicular.x * 10;
  const labelY = label.y + perpendicular.y * 10;

  return { edge, path, labelX, labelY };
};

const buildSelfLoop = (
  edge: DiagramEdge,
  source: PositionedNode,
  direction: LayoutDirection
): EdgePath => {
  if (direction === 'vertical') {
    const x0 = source.x + source.width / 2 + 6;
    const path = `M ${x0} ${source.y} A ${LOOP_SIZE} ${LOOP_SIZE} 0 1 1 ${x0} ${source.y + 0.01}`;
    return { edge, path, labelX: x0 + LOOP_SIZE + 6, labelY: source.y };
  }
  const y0 = source.y - source.height / 2 - 6;
  const path = `M ${source.x} ${y0} A ${LOOP_SIZE} ${LOOP_SIZE} 0 1 1 ${source.x + 0.01} ${y0}`;
  return { edge, path, labelX: source.x, labelY: y0 - LOOP_SIZE - 6 };
};

const bezierPoint = (
  p0: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
): { x: number; y: number } => {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * c1.x + c * c2.x + d * p3.x,
    y: a * p0.y + b * c1.y + c * c2.y + d * p3.y,
  };
};
