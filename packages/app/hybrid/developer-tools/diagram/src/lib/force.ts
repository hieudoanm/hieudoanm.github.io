import { nodeHeight, nodeWidth } from '@/lib/measure';
import type { Diagram, EdgePath, Layout, PositionedNode } from '@/lib/types';

const PAD = 48;
const IDEAL_EDGE = 130;
const ITERATIONS = 260;
const GRAVITY = 0.06;
const LOOP_SIZE = 30;

interface Vec {
  x: number;
  y: number;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const distance = (a: Vec, b: Vec): number =>
  Math.max(Math.hypot(a.x - b.x, a.y - b.y), 0.001);

const layoutForce = (diagram: Diagram): Layout => {
  if (diagram.nodes.length === 0) {
    return {
      kind: 'flow',
      mode: 'force',
      direction: 'horizontal',
      nodes: [],
      edges: [],
      width: PAD * 2,
      height: PAD * 2,
    };
  }

  const grid = Math.ceil(Math.sqrt(diagram.nodes.length));
  const positioned: PositionedNode[] = diagram.nodes.map((node, index) => ({
    ...node,
    width: nodeWidth(node.label, node.icon),
    height: nodeHeight(node),
    x: PAD + (index % grid) * 160,
    y: PAD + Math.floor(index / grid) * 120,
  }));

  const area = Math.max(positioned.length * IDEAL_EDGE * IDEAL_EDGE, 1);
  const k = Math.sqrt(area / positioned.length);

  for (let iteration = 0; iteration < ITERATIONS; iteration += 1) {
    const temperature = Math.max(20, 120 * (1 - iteration / ITERATIONS));
    const forces: Vec[] = positioned.map(() => ({ x: 0, y: 0 }));

    for (let i = 0; i < positioned.length; i += 1) {
      for (let j = i + 1; j < positioned.length; j += 1) {
        const a = positioned[i];
        const b = positioned[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = distance(a, b);
        const repulsion = (k * k) / dist;
        const fx = (dx / dist) * repulsion;
        const fy = (dy / dist) * repulsion;
        forces[i].x -= fx;
        forces[i].y -= fy;
        forces[j].x += fx;
        forces[j].y += fy;
      }
    }

    for (const edge of diagram.edges) {
      const source = positioned.find((node) => node.id === edge.source);
      const target = positioned.find((node) => node.id === edge.target);
      if (!source || !target || source === target) continue;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = distance(source, target);
      const spring = (dist - IDEAL_EDGE) / dist;
      const fx = dx * spring;
      const fy = dy * spring;
      const si = positioned.indexOf(source);
      const ti = positioned.indexOf(target);
      forces[si].x += fx;
      forces[si].y += fy;
      forces[ti].x -= fx;
      forces[ti].y -= fy;
    }

    for (const node of positioned) {
      const force = forces[positioned.indexOf(node)];
      force.x -= (node.x - PAD) * GRAVITY;
      force.y -= (node.y - PAD) * GRAVITY;
    }

    for (let i = 0; i < positioned.length; i += 1) {
      const force = forces[i];
      const magnitude = Math.hypot(force.x, force.y);
      if (magnitude === 0) continue;
      const capped = Math.min(magnitude, temperature);
      positioned[i].x += (force.x / magnitude) * capped;
      positioned[i].y += (force.y / magnitude) * capped;
    }
  }

  const nodes = positioned.map((node) => ({
    ...node,
    x: clamp(node.x, PAD, node.x),
    y: clamp(node.y, PAD, node.y),
  }));

  const minX = Math.min(...nodes.map((node) => node.x - node.width / 2));
  const minY = Math.min(...nodes.map((node) => node.y - node.height / 2));
  const shiftX = minX < PAD ? PAD - minX : 0;
  const shiftY = minY < PAD ? PAD - minY : 0;
  const shifted = nodes.map((node) => ({
    ...node,
    x: node.x + shiftX,
    y: node.y + shiftY,
  }));

  const edges: EdgePath[] = diagram.edges
    .map((edge) => buildForceEdge(edge, shifted))
    .filter((edge): edge is EdgePath => edge !== null);

  const maxX = Math.max(...shifted.map((node) => node.x + node.width / 2));
  const maxY = Math.max(...shifted.map((node) => node.y + node.height / 2));

  return {
    kind: 'flow',
    mode: 'force',
    direction: 'horizontal',
    nodes: shifted,
    edges,
    width: maxX + PAD,
    height: maxY + PAD,
  };
};

const buildForceEdge = (
  edge: Diagram['edges'][number],
  nodes: PositionedNode[]
): EdgePath | null => {
  const source = nodes.find((node) => node.id === edge.source);
  const target = nodes.find((node) => node.id === edge.target);
  if (!source || !target) return null;

  if (source.id === target.id) {
    const y0 = source.y - source.height / 2 - 6;
    const path = `M ${source.x} ${y0} A ${LOOP_SIZE} ${LOOP_SIZE} 0 1 1 ${source.x + 0.01} ${y0}`;
    return { edge, path, labelX: source.x, labelY: y0 - LOOP_SIZE - 6 };
  }

  const path = `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
  return {
    edge,
    path,
    labelX: (source.x + target.x) / 2,
    labelY: (source.y + target.y) / 2 - 8,
  };
};

export default layoutForce;
