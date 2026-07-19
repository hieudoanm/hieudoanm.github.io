import { maxLineWidth } from '@/lib/measure';
import type { Diagram, Layout, PositionedNode } from '@/lib/types';

const PAD = 48;
const MIN_RADIUS = 46;
const RING_FACTOR = 1.15;

const circleRadius = (label: string): number =>
  Math.max(MIN_RADIUS, maxLineWidth(label) / 2 + 26);

export const layoutVenn = (diagram: Diagram): Layout => {
  if (diagram.nodes.length === 0) {
    return {
      kind: 'venn',
      direction: 'horizontal',
      nodes: [],
      edges: [],
      width: PAD * 2,
      height: PAD * 2,
    };
  }

  const count = diagram.nodes.length;
  const radii = diagram.nodes.map((node) => circleRadius(node.label));
  const maxRadius = Math.max(...radii);
  const ring = count > 1 ? maxRadius * RING_FACTOR : 0;

  const raw: PositionedNode[] = diagram.nodes.map((node, index) => {
    const radius = radii[index];
    const angle = count === 1 ? 0 : (index / count) * Math.PI * 2 - Math.PI / 2;
    return {
      ...node,
      x: ring * Math.cos(angle),
      y: ring * Math.sin(angle),
      width: radius * 2,
      height: radius * 2,
    };
  });

  const minX = Math.min(...raw.map((node) => node.x - node.width / 2));
  const minY = Math.min(...raw.map((node) => node.y - node.height / 2));
  const shiftX = PAD - minX;
  const shiftY = PAD - minY;
  const nodes = raw.map((node) => ({
    ...node,
    x: node.x + shiftX,
    y: node.y + shiftY,
  }));

  const maxX = Math.max(...nodes.map((node) => node.x + node.width / 2));
  const maxY = Math.max(...nodes.map((node) => node.y + node.height / 2));

  return {
    kind: 'venn',
    direction: 'horizontal',
    nodes,
    edges: [],
    width: maxX + PAD,
    height: maxY + PAD,
  };
};
