import type {
  Diagram,
  DiagramEdge,
  DiagramNode,
  EdgePath,
  Layout,
  LayoutDirection,
  Lifeline,
  PositionedNode,
} from '@/lib/types';

const PAD = 48;
const RANK_GAP = 160;
const COL_GAP = 56;
const NODE_MIN_WIDTH = 120;
const NODE_HEIGHT = 52;
const TALL_NODE_HEIGHT = 68;
const EDGE_BEND = 40;
const LOOP_SIZE = 36;
const SEQUENCE_HEADER_HEIGHT = 44;
const SEQUENCE_HEADER_Y = 60;
const SEQUENCE_COL_GAP = 90;
const SEQUENCE_FIRST_ROW_Y = 116;
const SEQUENCE_ROW_GAP = 40;
const SEQUENCE_BOTTOM_PAD = 60;
export const ICON_SIZE = 18;
export const ICON_GAP = 8;

const isTallShape = (shape: PositionedNode['shape']): boolean =>
  shape === 'ellipse' ||
  shape === 'diamond' ||
  shape === 'cylinder' ||
  shape === 'hexagon' ||
  shape === 'note' ||
  shape === 'actor' ||
  shape === 'cloud';

const textWidth = (label: string): number => label.length * 8;

const nodeWidth = (
  label: string,
  icon: PositionedNode['icon'] | undefined
): number =>
  Math.max(
    NODE_MIN_WIDTH,
    textWidth(label) + 44 + (icon ? ICON_SIZE + ICON_GAP : 0)
  );

const nodeHeight = (node: Pick<PositionedNode, 'shape'>): number =>
  isTallShape(node.shape) ? TALL_NODE_HEIGHT : NODE_HEIGHT;

const nodeContentWidth = (
  node: Pick<PositionedNode, 'label' | 'icon'>
): number => textWidth(node.label) + (node.icon ? ICON_SIZE + ICON_GAP : 0);

const contentLeft = (node: PositionedNode): number =>
  node.x - nodeContentWidth(node) / 2;

export const nodeIconCenterX = (node: PositionedNode): number =>
  contentLeft(node) + ICON_SIZE / 2;

export const nodeLabelCenterX = (node: PositionedNode): number =>
  contentLeft(node) +
  (node.icon ? ICON_SIZE + ICON_GAP : 0) +
  textWidth(node.label) / 2;

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
    };
  }

  const positioned: PositionedNode[] = diagram.nodes.map((node) => ({
    ...node,
    x: 0,
    y: 0,
    width: nodeWidth(node.label, node.icon),
    height: nodeHeight(node),
  }));

  const ranks = computeRanks(diagram.nodes, diagram.edges);

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

  const edges: EdgePath[] = diagram.edges
    .map((edge) => buildEdgePath(edge, positioned, direction))
    .filter((edge): edge is EdgePath => edge !== null);

  const width = direction === 'vertical' ? maxHeight + PAD * 2 : cursorX + PAD;
  const height = direction === 'vertical' ? cursorX + PAD : maxHeight + PAD * 2;

  return { kind: 'flow', direction, nodes: positioned, edges, width, height };
};

const computeRanks = (
  nodes: DiagramNode[],
  edges: DiagramEdge[]
): Record<string, number> => {
  const ranks: Record<string, number> = {};
  for (const node of nodes) ranks[node.id] = node.rank ?? 0;
  for (const edge of edges) {
    if (!(edge.source in ranks)) ranks[edge.source] = 0;
    if (!(edge.target in ranks)) ranks[edge.target] = 0;
  }

  for (let pass = 0; pass < nodes.length + edges.length; pass += 1) {
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

export const applyManualPositions = (
  layout: Layout,
  overrides: Record<string, { x: number; y: number }>
): Layout => {
  const ids = new Set(Object.keys(overrides));
  if (layout.kind !== 'flow' || ids.size === 0) return layout;

  const nodes = layout.nodes.map((node) =>
    overrides[node.id]
      ? { ...node, x: overrides[node.id].x, y: overrides[node.id].y }
      : node
  );

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

  const shiftX = minX < PAD ? PAD - minX : 0;
  const shiftY = minY < PAD ? PAD - minY : 0;
  const shifted = nodes.map((node) =>
    shiftX || shiftY
      ? { ...node, x: node.x + shiftX, y: node.y + shiftY }
      : node
  );

  const edges: EdgePath[] = layout.edges
    .map(({ edge }) => buildEdgePath(edge, shifted, layout.direction))
    .filter((edge): edge is EdgePath => edge !== null);

  const width = maxX - minX + shiftX + PAD * 2;
  const height = maxY - minY + shiftY + PAD * 2;

  return { ...layout, nodes: shifted, edges, width, height };
};

const layoutSequence = (diagram: Diagram): Layout => {
  if (diagram.nodes.length === 0) {
    return {
      kind: 'sequence',
      direction: 'horizontal',
      nodes: [],
      edges: [],
      lifelines: [],
      width: PAD * 2,
      height: PAD * 2,
    };
  }

  const positioned: PositionedNode[] = [];
  let cursorX = PAD;
  for (const node of diagram.nodes) {
    const width = Math.max(NODE_MIN_WIDTH, nodeWidth(node.label, node.icon));
    positioned.push({
      ...node,
      x: cursorX + width / 2,
      y: SEQUENCE_HEADER_Y,
      width,
      height: SEQUENCE_HEADER_HEIGHT,
    });
    cursorX += width + SEQUENCE_COL_GAP;
  }

  const edges: EdgePath[] = diagram.edges
    .map((edge, index) => buildSequenceEdge(edge, index, positioned))
    .filter((edge): edge is EdgePath => edge !== null);

  const lastY =
    edges.length > 0
      ? SEQUENCE_FIRST_ROW_Y + (edges.length - 1) * SEQUENCE_ROW_GAP
      : SEQUENCE_FIRST_ROW_Y - SEQUENCE_ROW_GAP;

  const lifelines: Lifeline[] = positioned.map((node) => ({
    x: node.x,
    top: SEQUENCE_HEADER_Y + SEQUENCE_HEADER_HEIGHT / 2 + 8,
    bottom: lastY + SEQUENCE_ROW_GAP,
  }));

  return {
    kind: 'sequence',
    direction: 'horizontal',
    nodes: positioned,
    edges,
    width: cursorX - SEQUENCE_COL_GAP + PAD,
    height: lastY + SEQUENCE_ROW_GAP + SEQUENCE_BOTTOM_PAD,
    lifelines,
  };
};

const buildSequenceEdge = (
  edge: DiagramEdge,
  index: number,
  positioned: PositionedNode[]
): EdgePath | null => {
  const source = positioned.find((node) => node.id === edge.source);
  const target = positioned.find((node) => node.id === edge.target);
  if (!source || !target) return null;

  const y = SEQUENCE_FIRST_ROW_Y + index * SEQUENCE_ROW_GAP;

  if (source.id === target.id) {
    const x0 = source.x + source.width / 2 + 6;
    const path = `M ${x0} ${y} A 16 16 0 1 1 ${x0} ${y + 0.01}`;
    return { edge, path, labelX: x0 + 24, labelY: y };
  }

  const path = `M ${source.x} ${y} L ${target.x} ${y}`;
  return {
    edge,
    path,
    labelX: (source.x + target.x) / 2,
    labelY: y - 10,
  };
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
