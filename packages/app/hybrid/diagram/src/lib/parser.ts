import type {
  Diagram,
  DiagramEdge,
  DiagramNode,
  IconName,
  NodeShape,
  ParseError,
  ParseResult,
} from '@/lib/types';
import { ICON_NAMES, isIconName } from '@/lib/icons';

export const SHAPES: readonly NodeShape[] = [
  'rect',
  'round',
  'ellipse',
  'diamond',
  'cylinder',
];

const NODE_ID_PATTERN = /^[A-Za-z0-9_-]+$/;

const normalizeShape = (value: string): NodeShape | null =>
  (SHAPES as readonly string[]).includes(value) ? (value as NodeShape) : null;

export const parseDiagram = (text: string): ParseResult => {
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  const errors: ParseError[] = [];
  const seen: Set<string> = new Set();
  let title = '';

  text.split(/\r?\n/).forEach((raw, index) => {
    const line = index + 1;
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (trimmed.startsWith('title:')) {
      title = trimmed.slice('title:'.length).trim();
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

  return { diagram: { title, nodes, edges }, errors };
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
  let icon: IconName | undefined;
  if (shapeMatch) {
    label = (shapeMatch[1] ?? '').trim();
    const attributes = shapeMatch[2].split(',').map((part) => part.trim());
    for (const attribute of attributes) {
      if (!attribute) continue;
      const iconMatch = attribute.match(/^icon=(.+)$/);
      if (iconMatch) {
        const name = iconMatch[1].trim();
        if (!isIconName(name)) {
          return new Error(
            `Unknown icon "${name}". Valid icons: ${ICON_NAMES.join(', ')}`
          );
        }
        icon = name;
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
  return { id, label, shape, icon, line: lineNumber };
};

const parseEdge = (
  line: string,
  index: number,
  lineNumber: number
): DiagramEdge | Error => {
  const rest = line.slice('edge'.length).trim();
  const normalized = rest.startsWith(':') ? rest.slice(1).trim() : rest;
  const arrow = normalized.indexOf('->');
  if (arrow <= 0) {
    return new Error('Expected "edge <from> -> <to>: <label>"');
  }
  const source = normalized.slice(0, arrow).trim();
  const targetPart = normalized.slice(arrow + 2).trim();
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
  if (source === target) {
    return new Error(`Edge cannot point to itself ("${source}")`);
  }
  return {
    id: `${source}->${target}#${index}`,
    source,
    target,
    label,
    line: lineNumber,
  };
};

export const diagramToText = (diagram: Diagram): string => {
  const lines: string[] = [];
  if (diagram.title) {
    lines.push(`title: ${diagram.title}`);
    lines.push('');
  }
  for (const node of diagram.nodes) {
    lines.push(`node ${node.id}: ${node.label}${nodeSuffix(node)}`);
  }
  if (diagram.edges.length > 0) {
    lines.push('');
  }
  for (const edge of diagram.edges) {
    lines.push(
      `edge ${edge.source} -> ${edge.target}${edge.label ? `: ${edge.label}` : ''}`
    );
  }
  return lines.join('\n');
};

const nodeSuffix = (node: Pick<DiagramNode, 'shape' | 'icon'>): string => {
  const parts: string[] = [];
  if (node.shape !== 'rect') parts.push(node.shape);
  if (node.icon) parts.push(`icon=${node.icon}`);
  return parts.length > 0 ? ` [${parts.join(', ')}]` : '';
};
