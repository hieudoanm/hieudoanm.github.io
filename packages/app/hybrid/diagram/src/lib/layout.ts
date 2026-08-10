import type {
  Diagram,
  DiagramEdge,
  DiagramNode,
  EdgePath,
  IconName,
  Layout,
  PositionedNode,
} from '@/lib/types';

const PAD = 48;
const RANK_GAP = 160;
const COL_GAP = 56;
const NODE_MIN_WIDTH = 120;
const NODE_HEIGHT = 52;
const TALL_NODE_HEIGHT = 68;
const EDGE_BEND = 40;
export const ICON_SIZE = 18;
export const ICON_GAP = 8;

const isTallShape = (shape: PositionedNode['shape']): boolean =>
  shape === 'ellipse' || shape === 'diamond' || shape === 'cylinder';

const textWidth = (label: string): number => label.length * 8;

const nodeWidth = (label: string, icon?: IconName): number =>
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

export const computeLayout = (diagram: Diagram): Layout => {
  if (diagram.nodes.length === 0) {
    return { nodes: [], edges: [], width: PAD * 2, height: PAD * 2 };
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

  const edges: EdgePath[] = diagram.edges
    .map((edge) => buildEdgePath(edge, positioned, ranks))
    .filter((edge): edge is EdgePath => edge !== null);

  const width = cursorX + PAD;
  const height = maxHeight + PAD * 2;

  return { nodes: positioned, edges, width, height };
};

const computeRanks = (
  nodes: DiagramNode[],
  edges: DiagramEdge[]
): Record<string, number> => {
  const ranks: Record<string, number> = {};
  for (const node of nodes) ranks[node.id] = 0;
  for (const edge of edges) {
    if (!(edge.source in ranks)) ranks[edge.source] = 0;
    if (!(edge.target in ranks)) ranks[edge.target] = 0;
  }

  for (let pass = 0; pass < nodes.length; pass += 1) {
    let changed = false;
    for (const edge of edges) {
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

const buildEdgePath = (
  edge: DiagramEdge,
  nodes: PositionedNode[],
  ranks: Record<string, number>
): EdgePath | null => {
  const source = nodes.find((node) => node.id === edge.source);
  const target = nodes.find((node) => node.id === edge.target);
  if (!source || !target) return null;

  const sourceRank = ranks[source.id];
  const targetRank = ranks[target.id];

  let start: { x: number; y: number };
  let end: { x: number; y: number };
  let c1: { x: number; y: number };
  let c2: { x: number; y: number };

  if (targetRank > sourceRank) {
    start = { x: source.x + source.width / 2, y: source.y };
    end = { x: target.x - target.width / 2, y: target.y };
    const midX = start.x + (end.x - start.x) * 0.5;
    c1 = { x: midX, y: start.y };
    c2 = { x: midX, y: end.y };
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
