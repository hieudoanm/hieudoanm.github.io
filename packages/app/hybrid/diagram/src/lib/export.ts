import { saveAs } from 'file-saver';
import { ICON_BODY } from '@/lib/icons';
import { ICON_SIZE, nodeIconCenterX, nodeLabelCenterX } from '@/lib/layout';
import type { Layout, PositionedNode } from '@/lib/types';
import { escapeXml } from '@/lib/xml';

const COLORS = {
  background: '#0b0f14',
  nodeFill: '#111820',
  nodeStroke: '#22c55e',
  nodeText: '#e6edf3',
  edge: '#3a4550',
  edgeLabel: '#94a3b8',
  title: '#e6edf3',
};

const FONT = 'Inter, system-ui, sans-serif';

export const downloadDiagram = (text: string, name: string): void => {
  saveAs(
    new Blob([text], { type: 'text/plain;charset=utf-8' }),
    `${safeName(name)}.diagram`
  );
};

export const buildSvg = (layout: Layout, title: string): string => {
  const { nodes, edges, width, height } = layout;
  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `  <rect width="100%" height="100%" fill="${COLORS.background}"/>`,
    '  <defs>',
    '    <marker id="diagram-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">',
    `      <path d="M 0 0 L 10 5 L 0 10 z" fill="${COLORS.edge}"/>`,
    '    </marker>',
    '  </defs>',
  ];
  if (title) {
    parts.push(
      `  <text x="48" y="30" fill="${COLORS.title}" font-family="${FONT}" font-size="18" font-weight="600">${escapeXml(title)}</text>`
    );
  }
  for (const { path, edge, labelX, labelY } of edges) {
    parts.push(
      `  <path d="${path}" fill="none" stroke="${COLORS.edge}" stroke-width="1.5" marker-end="url(#diagram-arrow)"/>`
    );
    if (edge.label) {
      parts.push(
        `  <text x="${labelX}" y="${labelY}" fill="${COLORS.edgeLabel}" font-family="${FONT}" font-size="12" text-anchor="middle" paint-order="stroke" stroke="${COLORS.background}" stroke-width="4">${escapeXml(edge.label)}</text>`
      );
    }
  }
  for (const node of nodes) {
    parts.push(nodeShape(node));
    if (node.icon) {
      parts.push(
        `  <svg aria-hidden="true" data-icon="${node.icon}" fill="none" stroke="${COLORS.nodeStroke}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24" width="${ICON_SIZE}" height="${ICON_SIZE}" x="${nodeIconCenterX(node) - ICON_SIZE / 2}" y="${node.y - ICON_SIZE / 2}">${ICON_BODY[node.icon]}</svg>`
      );
    }
    parts.push(
      `  <text x="${nodeLabelCenterX(node)}" y="${node.y}" fill="${COLORS.nodeText}" font-family="${FONT}" font-size="13" text-anchor="middle" dominant-baseline="middle">${escapeXml(node.label)}</text>`
    );
  }
  parts.push('</svg>');
  return parts.join('\n');
};

export const downloadSvg = (
  layout: Layout,
  title: string,
  name: string
): void => {
  const svg = buildSvg(layout, title);
  saveAs(
    new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
    `${safeName(name)}.svg`
  );
};

const safeName = (name: string): string =>
  name.replace(/[^a-z0-9_-]+/gi, '_').toLowerCase() || 'diagram';

const nodeShape = (node: PositionedNode): string => {
  const { x, y, width, height, shape } = node;
  const rx = width / 2;
  const ry = height / 2;
  const fill = `fill="${COLORS.nodeFill}" stroke="${COLORS.nodeStroke}" stroke-width="1.5"`;
  switch (shape) {
    case 'round':
      return `  <rect x="${x - rx}" y="${y - ry}" width="${width}" height="${height}" rx="24" ${fill}/>`;
    case 'ellipse':
      return `  <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${fill}/>`;
    case 'diamond':
      return `  <polygon points="${x},${y - ry} ${x + rx},${y} ${x},${y + ry} ${x - rx},${y}" ${fill}/>`;
    case 'cylinder':
      return [
        `  <rect x="${x - rx}" y="${y - ry + 8}" width="${width}" height="${height - 16}" ${fill}/>`,
        `  <ellipse cx="${x}" cy="${y - ry + 8}" rx="${rx}" ry="8" fill="${COLORS.nodeFill}" stroke="${COLORS.nodeStroke}" stroke-width="1.5"/>`,
        `  <ellipse cx="${x}" cy="${y + ry - 8}" rx="${rx}" ry="8" fill="none" stroke="${COLORS.nodeStroke}" stroke-width="1.5"/>`,
      ].join('\n');
    default:
      return `  <rect x="${x - rx}" y="${y - ry}" width="${width}" height="${height}" rx="6" ${fill}/>`;
  }
};
