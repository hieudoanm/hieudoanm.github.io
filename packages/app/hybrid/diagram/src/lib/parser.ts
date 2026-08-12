import type {
  Diagram,
  DiagramEdge,
  DiagramKind,
  DiagramNode,
  IconName,
  NodeShape,
  ParseError,
  ParseResult,
} from '@/lib/types';
import {
  GLYPH_PATTERN,
  GLYPH_PREFIX,
  ICON_NAMES,
  isIconName,
} from '@/lib/icons';

export const SHAPES: readonly NodeShape[] = [
  'rect',
  'round',
  'ellipse',
  'diamond',
  'cylinder',
  'hexagon',
  'parallelogram',
  'cloud',
  'note',
  'actor',
];

export const KINDS: readonly DiagramKind[] = ['flow', 'sequence'];

const NODE_ID_PATTERN = /^[A-Za-z0-9_-]+$/;
const RANK_PATTERN = /^rank=(\d+)$/;

const normalizeShape = (value: string): NodeShape | null =>
  (SHAPES as readonly string[]).includes(value) ? (value as NodeShape) : null;

export const parseDiagram = (text: string): ParseResult => {
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  const errors: ParseError[] = [];
  const seen: Set<string> = new Set();
  let title = '';
  let kind: DiagramKind = 'flow';

  text.split(/\r?\n/).forEach((raw, index) => {
    const line = index + 1;
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (trimmed.startsWith('title:')) {
      title = trimmed.slice('title:'.length).trim();
      return;
    }

    if (trimmed.startsWith('kind:')) {
      const value = trimmed.slice('kind:'.length).trim();
      if (!(KINDS as readonly string[]).includes(value)) {
        errors.push({
          line,
          message: `Unknown kind "${value}". Valid kinds: ${KINDS.join(', ')}`,
        });
        return;
      }
      kind = value as DiagramKind;
      return;
    }

    if (trimmed.startsWith('node')) {
      const node = parseNode(trimmed, line);
      if (node instanceof Error) {
        errors.push({ line, message: node.message });
      } else if (seen.has(node.id)) {
        errors.push({ line, message: `Duplicate node "${node.id}"` });
      } else {
        seen.add(node.id);
        nodes.push(node);
      }
      return;
    }

    if (trimmed.startsWith('edge')) {
      const edge = parseEdge(trimmed, edges.length, line);
      if (edge instanceof Error) {
        errors.push({ line, message: edge.message });
      } else {
        edges.push(edge);
      }
      return;
    }

    errors.push({ line, message: `Unrecognized line "${trimmed}"` });
  });

  const byId: Map<string, DiagramNode> = new Map(
    nodes.map((node) => [node.id, node])
  );
  for (const edge of edges) {
    for (const id of [edge.source, edge.target]) {
      if (!byId.has(id)) {
        const node: DiagramNode = {
          id,
          label: id,
          shape: 'rect',
          line: edge.line,
        };
        byId.set(id, node);
        nodes.push(node);
      }
    }
  }

  return { diagram: { title, nodes, edges, kind }, errors };
};

const parseNode = (line: string, lineNumber: number): DiagramNode | Error => {
  const rest = line.slice('node'.length).trim();
  const colon = rest.indexOf(':');
  if (colon < 0) {
    return new Error('Expected "node <id>: <label>"');
  }
  const id = rest.slice(0, colon).trim();
  if (!id) {
    return new Error('Node id is required');
  }
  const right = rest.slice(colon + 1).trim();
  if (!NODE_ID_PATTERN.test(id)) {
    return new Error(`Invalid node id "${id}"`);
  }
  const shapeMatch = right.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
  let label = right;
  let shape: NodeShape = 'rect';
  let icon: IconName | 'glyph' | undefined;
  let glyph: string | undefined;
  let rank: number | undefined;
  if (shapeMatch) {
    label = (shapeMatch[1] ?? '').trim();
    const attributes = shapeMatch[2].split(',').map((part) => part.trim());
    for (const attribute of attributes) {
      if (!attribute) continue;
      const iconMatch = attribute.match(/^icon=(.+)$/);
      if (iconMatch) {
        const parsed = parseIcon(iconMatch[1].trim());
        if (parsed instanceof Error) return parsed;
        icon = parsed.name;
        glyph = parsed.glyph;
        continue;
      }
      const rankMatch = attribute.match(RANK_PATTERN);
      if (rankMatch) {
        rank = Number(rankMatch[1]);
        continue;
      }
      const parsedShape = normalizeShape(attribute);
      if (!parsedShape) {
        return new Error(
          `Unknown shape "${attribute}". Valid shapes: ${SHAPES.join(', ')}`
        );
      }
      shape = parsedShape;
    }
  }
  if (!label) {
    return new Error(`Node "${id}" needs a label`);
  }
  return { id, label, shape, icon, glyph, rank, line: lineNumber };
};

const parseIcon = (
  value: string
): { name: IconName | 'glyph'; glyph?: string } | Error => {
  if (value.startsWith(GLYPH_PREFIX)) {
    const glyph = value.slice(GLYPH_PREFIX.length).trim();
    if (!glyph || !GLYPH_PATTERN.test(glyph)) {
      return new Error(
        `Invalid custom glyph "${glyph}". Use SVG path data, e.g. icon=glyph:M10 20 L20 5`
      );
    }
    return { name: 'glyph', glyph };
  }
  if (!isIconName(value)) {
    return new Error(
      `Unknown icon "${value}". Valid icons: ${ICON_NAMES.join(', ')}`
    );
  }
  return { name: value };
};

const parseEdge = (
  line: string,
  index: number,
  lineNumber: number
): DiagramEdge | Error => {
  const rest = line.slice('edge'.length).trim();
  const normalized = rest.startsWith(':') ? rest.slice(1).trim() : rest;
  const arrow = normalized.indexOf('->');
  const dash = normalized.indexOf('--');
  const useArrow = arrow > 0 && (dash < 0 || arrow < dash);
  const position = useArrow ? arrow : dash;
  if (position <= 0) {
    return new Error('Expected "edge <from> -> <to>: <label>" or "--"');
  }
  const connector = useArrow ? '->' : '--';
  const source = normalized.slice(0, position).trim();
  const targetPart = normalized.slice(position + connector.length).trim();
  const colon = targetPart.indexOf(':');
  let target = targetPart;
  let label = '';
  if (colon >= 0) {
    target = targetPart.slice(0, colon).trim();
    label = targetPart.slice(colon + 1).trim();
  }
  if (!source || !target) {
    return new Error('Edge needs both a <from> and a <to>');
  }
  return {
    id: `${source}${connector}${target}#${index}`,
    source,
    target,
    label,
    directed: useArrow,
    line: lineNumber,
  };
};

export const diagramToText = (diagram: Diagram): string => {
  const lines: string[] = [];
  if (diagram.title) {
    lines.push(`title: ${diagram.title}`);
    lines.push('');
  }
  if (diagram.kind === 'sequence') {
    lines.push('kind: sequence');
    lines.push('');
  }
  for (const node of diagram.nodes) {
    lines.push(`node ${node.id}: ${node.label}${nodeSuffix(node)}`);
  }
  if (diagram.edges.length > 0) {
    lines.push('');
  }
  for (const edge of diagram.edges) {
    const connector = edge.directed ? '->' : '--';
    lines.push(
      `edge ${edge.source} ${connector} ${edge.target}${edge.label ? `: ${edge.label}` : ''}`
    );
  }
  return lines.join('\n');
};

const nodeSuffix = (
  node: Pick<DiagramNode, 'shape' | 'rank' | 'icon' | 'glyph'>
): string => {
  const parts: string[] = [];
  if (node.shape !== 'rect') parts.push(node.shape);
  if (node.rank !== undefined) parts.push(`rank=${node.rank}`);
  if (node.icon === 'glyph' && node.glyph) {
    parts.push(`icon=${GLYPH_PREFIX}${node.glyph}`);
  } else if (node.icon) {
    parts.push(`icon=${node.icon}`);
  }
  return parts.length > 0 ? ` [${parts.join(', ')}]` : '';
};
