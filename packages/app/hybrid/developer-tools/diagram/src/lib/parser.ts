import { COLOR_NAMES, isColorName } from '@/lib/colors';
import { isValidDate } from '@/lib/dates';
import type {
  ColorName,
  Diagram,
  DiagramEdge,
  DiagramKind,
  DiagramNode,
  DiagramSubgraph,
  EdgeStyle,
  IconName,
  LayoutMode,
  NodeShape,
  ParseError,
  ParseResult,
  SequenceActivation,
  SequenceDivider,
  SequenceFragment,
  SequenceFragmentType,
  SequenceNote,
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

export const KINDS: readonly DiagramKind[] = [
  'flow',
  'sequence',
  'timeline',
  'venn',
];

export const FRAGMENT_TYPES: readonly SequenceFragmentType[] = [
  'alt',
  'opt',
  'loop',
  'par',
];

const NODE_ID_PATTERN = /^[A-Za-z0-9_-]+$/;
const RANK_PATTERN = /^rank=(\d+)$/;

const normalizeShape = (value: string): NodeShape | null =>
  (SHAPES as readonly string[]).includes(value) ? (value as NodeShape) : null;

const parseColor = (value: string): ColorName | Error => {
  if (!isColorName(value)) {
    return new Error(
      `Unknown color "${value}". Valid colors: ${COLOR_NAMES.join(', ')}`
    );
  }
  return value;
};

const unescapeLabel = (label: string): string => label.replace(/\\n/g, '\n');

const escapeLabel = (label: string): string => label.replace(/\n/g, '\\n');

type OpenScope =
  | { type: 'subgraph'; subgraph: DiagramSubgraph }
  | {
      type: 'fragment';
      id: string;
      fragmentType: SequenceFragmentType;
      label: string;
      line: number;
      edgeStart: number;
      parent?: string;
      dividers: { label: string; edgeIndex: number }[];
    };

interface OpenFragment extends Extract<OpenScope, { type: 'fragment' }> {}

export const parseDiagram = (text: string): ParseResult => {
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  const subgraphs: DiagramSubgraph[] = [];
  const fragments: SequenceFragment[] = [];
  const dividers: SequenceDivider[] = [];
  const activations: SequenceActivation[] = [];
  const notes: SequenceNote[] = [];
  const errors: ParseError[] = [];
  const seen: Set<string> = new Set();
  const stack: OpenScope[] = [];
  const openActivations = new Map<string, number>();
  let fragmentCount = 0;
  let title = '';
  let kind: DiagramKind = 'flow';
  let layoutMode: LayoutMode | undefined;

  const innermostSubgraph = (): DiagramSubgraph | undefined => {
    for (let index = stack.length - 1; index >= 0; index -= 1) {
      const scope = stack[index];
      if (scope.type === 'subgraph') return scope.subgraph;
    }
    return undefined;
  };

  const innermostFragment = (): OpenFragment | undefined => {
    for (let index = stack.length - 1; index >= 0; index -= 1) {
      const scope = stack[index];
      if (scope.type === 'fragment') return scope;
    }
    return undefined;
  };

  const closeFragment = (open: OpenFragment): void => {
    const edgeEnd = Math.max(open.edgeStart, edges.length - 1);
    fragments.push({
      id: open.id,
      type: open.fragmentType,
      label: open.label,
      line: open.line,
      edgeStart: open.edgeStart,
      edgeEnd,
      parent: open.parent,
    });
    for (const divider of open.dividers) {
      dividers.push({
        id: `divider-${dividers.length}`,
        fragmentId: open.id,
        edgeIndex: divider.edgeIndex,
        label: divider.label,
      });
    }
  };

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

    if (trimmed.startsWith('layout-mode:')) {
      const value = trimmed.slice('layout-mode:'.length).trim();
      if (value !== 'layered' && value !== 'force') {
        errors.push({
          line,
          message:
            'Unknown layout mode "${value}". Valid modes: layered, force',
        });
        return;
      }
      layoutMode = value;
      return;
    }

    if (trimmed.startsWith('subgraph')) {
      const subgraph = parseSubgraph(trimmed, line);
      if (subgraph instanceof Error) {
        errors.push({ line, message: subgraph.message });
      } else if (seen.has(subgraph.id)) {
        errors.push({ line, message: `Duplicate subgraph "${subgraph.id}"` });
      } else {
        seen.add(subgraph.id);
        subgraph.parent = innermostSubgraph()?.id;
        subgraphs.push(subgraph);
        stack.push({ type: 'subgraph', subgraph });
      }
      return;
    }

    if (trimmed.startsWith('fragment')) {
      const fragment = parseFragment(trimmed, line);
      if (fragment instanceof Error) {
        errors.push({ line, message: fragment.message });
      } else {
        const parent = innermostFragment();
        fragmentCount += 1;
        stack.push({
          type: 'fragment',
          id: `fragment-${fragmentCount}`,
          fragmentType: fragment.type,
          label: fragment.label,
          line,
          edgeStart: edges.length,
          parent: parent?.id,
          dividers: [],
        });
      }
      return;
    }

    if (trimmed.startsWith('divider')) {
      const open = innermostFragment();
      if (!open) {
        errors.push({ line, message: "'divider' outside a fragment" });
        return;
      }
      const label = trimmed.slice('divider'.length).trim();
      open.dividers.push({ label, edgeIndex: edges.length });
      return;
    }

    if (trimmed.startsWith('activate')) {
      const participant = trimmed.slice('activate'.length).trim();
      if (!participant) {
        errors.push({ line, message: 'activate needs a participant id' });
      } else if (openActivations.has(participant)) {
        errors.push({
          line,
          message: `Activation "${participant}" is already open`,
        });
      } else {
        openActivations.set(participant, edges.length);
      }
      return;
    }

    if (trimmed.startsWith('deactivate')) {
      const participant = trimmed.slice('deactivate'.length).trim();
      const start = openActivations.get(participant);
      if (start === undefined) {
        errors.push({ line, message: `No open activation "${participant}"` });
      } else {
        openActivations.delete(participant);
        activations.push({
          participant,
          edgeStart: start,
          edgeEnd: Math.max(start, edges.length - 1),
        });
      }
      return;
    }

    if (trimmed.startsWith('note')) {
      const note = parseNote(trimmed, line, notes.length);
      if (note instanceof Error) {
        errors.push({ line, message: note.message });
      } else {
        notes.push(note);
      }
      return;
    }

    if (trimmed === 'end') {
      const scope = stack.pop();
      if (!scope) {
        errors.push({
          line,
          message: "Unexpected 'end' without an open subgraph",
        });
      } else if (scope.type === 'fragment') {
        closeFragment(scope);
      }
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
        node.group = innermostSubgraph()?.id;
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

  if (stack.length > 0) {
    const open = stack[stack.length - 1];
    if (open.type === 'fragment') {
      errors.push({
        line: open.line,
        message: `Unclosed fragment "${open.fragmentType}: ${open.label}"`,
      });
    } else {
      errors.push({
        line: open.subgraph.line,
        message: `Unclosed subgraph "${open.subgraph.id}"`,
      });
    }
  }

  for (const participant of openActivations.keys()) {
    errors.push({ line: 0, message: `Unclosed activation "${participant}"` });
  }

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

  return {
    diagram: {
      title,
      nodes,
      edges,
      kind,
      subgraphs,
      layoutMode,
      fragments,
      dividers,
      activations,
      notes,
    },
    errors,
  };
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
  let color: ColorName | undefined;
  let start: string | undefined;
  let end: string | undefined;
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
      const colorMatch = attribute.match(/^color=(.+)$/);
      if (colorMatch) {
        const parsed = parseColor(colorMatch[1].trim());
        if (parsed instanceof Error) return parsed;
        color = parsed;
        continue;
      }
      const startMatch = attribute.match(/^start=(\S+)$/);
      if (startMatch) {
        if (!isValidDate(startMatch[1])) {
          return new Error(
            `Invalid start date "${startMatch[1]}". Expected YYYY-MM-DD`
          );
        }
        start = startMatch[1];
        continue;
      }
      const endMatch = attribute.match(/^end=(\S+)$/);
      if (endMatch) {
        if (!isValidDate(endMatch[1])) {
          return new Error(
            `Invalid end date "${endMatch[1]}". Expected YYYY-MM-DD`
          );
        }
        end = endMatch[1];
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
  return {
    id,
    label: unescapeLabel(label),
    shape,
    icon,
    glyph,
    rank,
    color,
    start,
    end,
    line: lineNumber,
  };
};

const parseSubgraph = (
  line: string,
  lineNumber: number
): DiagramSubgraph | Error => {
  const rest = line.slice('subgraph'.length).trim();
  const colon = rest.indexOf(':');
  if (colon < 0) {
    return new Error('Expected "subgraph <id>: <label>"');
  }
  const id = rest.slice(0, colon).trim();
  if (!id) {
    return new Error('Subgraph id is required');
  }
  if (!NODE_ID_PATTERN.test(id)) {
    return new Error(`Invalid subgraph id "${id}"`);
  }
  const right = rest.slice(colon + 1).trim();
  const shapeMatch = right.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
  let label = right;
  let color: ColorName | undefined;
  if (shapeMatch) {
    label = (shapeMatch[1] ?? '').trim();
    for (const attribute of shapeMatch[2]
      .split(',')
      .map((part) => part.trim())) {
      if (!attribute) continue;
      const colorMatch = attribute.match(/^color=(.+)$/);
      if (colorMatch) {
        const parsed = parseColor(colorMatch[1].trim());
        if (parsed instanceof Error) return parsed;
        color = parsed;
        continue;
      }
      return new Error(
        `Unknown subgraph attribute "${attribute}". Valid attributes: color=<name>`
      );
    }
  }
  if (!label) label = id;
  return { id, label, color, line: lineNumber };
};

const parseFragment = (
  line: string,
  lineNumber: number
): { type: SequenceFragmentType; label: string } | Error => {
  const rest = line.slice('fragment'.length).trim();
  const colon = rest.indexOf(':');
  if (colon < 0) {
    return new Error('Expected "fragment <type>: <label>"');
  }
  const type = rest.slice(0, colon).trim();
  if (!(FRAGMENT_TYPES as readonly string[]).includes(type)) {
    return new Error(
      `Unknown fragment type "${type}". Valid types: ${FRAGMENT_TYPES.join(', ')}`
    );
  }
  const label = rest.slice(colon + 1).trim();
  return { type: type as SequenceFragmentType, label };
};

const parseNote = (
  line: string,
  lineNumber: number,
  index: number
): SequenceNote | Error => {
  const rest = line.slice('note'.length).trim();
  const overMatch = rest.match(/^over\s+(\S+)\s*:\s*(.+)$/);
  if (overMatch) {
    return {
      id: `note-${index}`,
      text: overMatch[2].trim(),
      line: lineNumber,
      over: overMatch[1],
    };
  }
  const text = rest.startsWith(':') ? rest.slice(1).trim() : rest;
  if (!text) {
    return new Error('Note needs text. Use "note: <text>"');
  }
  return { id: `note-${index}`, text, line: lineNumber };
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
  const targetStyle = target.match(/^(\S+)\s*\[([^\]]+)\]\s*$/);
  let style: EdgeStyle | undefined;
  if (targetStyle) {
    target = targetStyle[1].trim();
    const parsed = parseEdgeStyle(targetStyle[2]);
    if (parsed instanceof Error) return parsed;
    style = parsed;
  } else {
    const labelMatch = label.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
    if (labelMatch) {
      const parsed = parseEdgeStyle(labelMatch[2]);
      if (parsed instanceof Error) return parsed;
      style = parsed;
      label = (labelMatch[1] ?? '').trim();
    }
  }
  return {
    id: `${source}${connector}${target}#${index}`,
    source,
    target,
    label,
    directed: useArrow,
    line: lineNumber,
    style,
  };
};

const parseEdgeStyle = (raw: string): EdgeStyle | Error => {
  const style: EdgeStyle = {};
  for (const attribute of raw.split(',').map((part) => part.trim())) {
    if (!attribute) continue;
    if (attribute === 'dashed') {
      style.dashed = true;
      continue;
    }
    if (attribute === 'dotted') {
      style.dotted = true;
      continue;
    }
    const colorMatch = attribute.match(/^color=(.+)$/);
    if (colorMatch) {
      const parsed = parseColor(colorMatch[1].trim());
      if (parsed instanceof Error) return parsed;
      style.color = parsed;
      continue;
    }
    const widthMatch = attribute.match(/^width=(\d+(?:\.\d+)?)$/);
    if (widthMatch) {
      style.width = Number(widthMatch[1]);
      continue;
    }
    if (
      attribute === 'arrow=no' ||
      attribute === 'arrow=none' ||
      attribute === 'arrow=off'
    ) {
      style.arrow = false;
      continue;
    }
    return new Error(
      `Unknown edge attribute "${attribute}". Valid attributes: dashed, dotted, color=<name>, width=<n>, arrow=no`
    );
  }
  return style;
};

export const diagramToText = (diagram: Diagram): string => {
  const lines: string[] = [];
  if (diagram.title) {
    lines.push(`title: ${diagram.title}`);
    lines.push('');
  }
  if (diagram.kind !== 'flow') {
    lines.push(`kind: ${diagram.kind}`);
    lines.push('');
  }
  if (diagram.layoutMode === 'force') {
    lines.push('layout-mode: force');
    lines.push('');
  }

  const byParent = new Map<string | undefined, DiagramSubgraph[]>();
  for (const subgraph of diagram.subgraphs) {
    const list = byParent.get(subgraph.parent) ?? [];
    list.push(subgraph);
    byParent.set(subgraph.parent, list);
  }

  const emitSubgraph = (subgraph: DiagramSubgraph): void => {
    lines.push(
      `subgraph ${subgraph.id}: ${subgraph.label}${subgraphSuffix(subgraph)}`
    );
    for (const node of diagram.nodes.filter(
      (candidate) => candidate.group === subgraph.id
    )) {
      lines.push(
        `node ${node.id}: ${escapeLabel(node.label)}${nodeSuffix(node)}`
      );
    }
    for (const child of byParent.get(subgraph.id) ?? []) {
      emitSubgraph(child);
    }
    lines.push('end');
    lines.push('');
  };

  for (const subgraph of byParent.get(undefined) ?? []) {
    emitSubgraph(subgraph);
  }

  for (const node of diagram.nodes.filter(
    (candidate) => candidate.group === undefined
  )) {
    lines.push(
      `node ${node.id}: ${escapeLabel(node.label)}${nodeSuffix(node)}`
    );
  }

  if (diagram.edges.length > 0) {
    lines.push('');
  }
  pushEdgesWithSequenceMarkers(lines, diagram);
  if ((diagram.notes ?? []).length > 0) {
    lines.push('');
    for (const note of diagram.notes ?? []) {
      lines.push(
        note.over
          ? `note over ${note.over}: ${note.text}`
          : `note: ${note.text}`
      );
    }
  }
  return lines.join('\n');
};

const pushEdgesWithSequenceMarkers = (
  lines: string[],
  diagram: Diagram
): void => {
  const fragments = diagram.fragments ?? [];
  const dividers = diagram.dividers ?? [];
  const activations = diagram.activations ?? [];
  const childrenByParent = new Map<string | undefined, SequenceFragment[]>();
  for (const fragment of fragments) {
    const list = childrenByParent.get(fragment.parent) ?? [];
    list.push(fragment);
    childrenByParent.set(fragment.parent, list);
  }
  const childrenOf = (parent: string | undefined): SequenceFragment[] =>
    (childrenByParent.get(parent) ?? []).sort(
      (a, b) => a.edgeStart - b.edgeStart
    );

  const emitEdges = (
    fragmentId: string | undefined,
    from: number,
    to: number
  ): void => {
    for (let index = from; index <= to; index += 1) {
      for (const divider of dividers.filter(
        (candidate) =>
          candidate.fragmentId === fragmentId && candidate.edgeIndex === index
      )) {
        lines.push(`divider ${divider.label}`);
      }
      for (const activation of activations.filter(
        (candidate) => candidate.edgeStart === index
      )) {
        lines.push(`activate ${activation.participant}`);
      }
      for (const activation of activations.filter(
        (candidate) => candidate.edgeEnd + 1 === index
      )) {
        lines.push(`deactivate ${activation.participant}`);
      }
      lines.push(edgeToLine(diagram.edges[index]));
    }
    for (const activation of activations.filter(
      (candidate) => candidate.edgeEnd + 1 === to + 1
    )) {
      lines.push(`deactivate ${activation.participant}`);
    }
  };

  const emitRange = (
    fragmentId: string | undefined,
    from: number,
    to: number
  ): void => {
    let cursor = from;
    for (const child of childrenOf(fragmentId)) {
      if (child.edgeStart < cursor) continue;
      if (child.edgeStart > cursor)
        emitEdges(fragmentId, cursor, child.edgeStart - 1);
      lines.push(`fragment ${child.type}: ${child.label}`);
      emitRange(child.id, child.edgeStart, child.edgeEnd);
      lines.push('end');
      cursor = child.edgeEnd + 1;
    }
    if (cursor <= to) emitEdges(fragmentId, cursor, to);
  };

  emitRange(undefined, 0, diagram.edges.length - 1);
};

const edgeToLine = (edge: DiagramEdge): string => {
  const connector = edge.directed ? '->' : '--';
  return `edge ${edge.source} ${connector} ${edge.target}${edge.label ? `: ${edge.label}` : ''}${edgeStyleSuffix(edge.style)}`;
};

const subgraphSuffix = (subgraph: Pick<DiagramSubgraph, 'color'>): string =>
  subgraph.color ? ` [color=${subgraph.color}]` : '';

const nodeSuffix = (
  node: Pick<
    DiagramNode,
    'shape' | 'rank' | 'icon' | 'glyph' | 'color' | 'start' | 'end'
  >
): string => {
  const parts: string[] = [];
  if (node.shape !== 'rect') parts.push(node.shape);
  if (node.color !== undefined) parts.push(`color=${node.color}`);
  if (node.start !== undefined) parts.push(`start=${node.start}`);
  if (node.end !== undefined) parts.push(`end=${node.end}`);
  if (node.rank !== undefined) parts.push(`rank=${node.rank}`);
  if (node.icon === 'glyph' && node.glyph) {
    parts.push(`icon=${GLYPH_PREFIX}${node.glyph}`);
  } else if (node.icon) {
    parts.push(`icon=${node.icon}`);
  }
  return parts.length > 0 ? ` [${parts.join(', ')}]` : '';
};

const edgeStyleSuffix = (style?: EdgeStyle): string => {
  if (!style) return '';
  const parts: string[] = [];
  if (style.dashed) parts.push('dashed');
  if (style.dotted) parts.push('dotted');
  if (style.color !== undefined) parts.push(`color=${style.color}`);
  if (style.width !== undefined) parts.push(`width=${style.width}`);
  if (style.arrow === false) parts.push('arrow=no');
  return parts.length > 0 ? ` [${parts.join(', ')}]` : '';
};
