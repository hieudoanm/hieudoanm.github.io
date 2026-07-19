import { saveAs } from 'file-saver';
import { colorPair } from '@/lib/colors';
import { ICON_BODY } from '@/lib/icons';
import {
  ICON_SIZE,
  actorParts,
  cloudTransform,
  CLOUD_PATH,
  nodeIconCenterX,
  nodeLabelCenterX,
  noteTransform,
  NOTE_PATH,
} from '@/lib/layout';
import type {
  Diagram,
  DiagramEdge,
  DiagramNode,
  EdgePath,
  Layout,
  PageSize,
  PositionedNode,
  SnippetFormat,
  SvgOptions,
} from '@/lib/types';
import { escapeXml } from '@/lib/xml';

const SCREEN = {
  background: '#0b0f14',
  nodeFill: '#111820',
  nodeStroke: '#22c55e',
  nodeText: '#e6edf3',
  edge: '#3a4550',
  edgeLabel: '#94a3b8',
  title: '#e6edf3',
  subgraph: '#0e151c',
};

const PRINT = {
  background: '#ffffff',
  nodeFill: '#ffffff',
  nodeStroke: '#111827',
  nodeText: '#111827',
  edge: '#374151',
  edgeLabel: '#6b7280',
  title: '#111827',
  subgraph: '#f3f4f6',
};

const FONT = 'Inter, system-ui, sans-serif';
const MARKER_ID = 'diagram-arrow';
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export const downloadDiagram = (text: string, name: string): void => {
  saveAs(
    new Blob([text], { type: 'text/plain;charset=utf-8' }),
    `${safeName(name)}.diagram`
  );
};

export const pageSize = (page: PageSize): { width: number; height: number } =>
  page === 'a4-landscape'
    ? { width: A4_HEIGHT, height: A4_WIDTH }
    : { width: A4_WIDTH, height: A4_HEIGHT };

export const svgDimensions = (
  layout: Layout,
  options: SvgOptions = {}
): { width: number; height: number } =>
  options.page
    ? pageSize(options.page)
    : { width: layout.width, height: layout.height };

export const buildSvg = (
  layout: Layout,
  title: string,
  options: SvgOptions = {}
): string => {
  const colors = options.print ? PRINT : SCREEN;
  const contentWidth = layout.width;
  const contentHeight = layout.height;
  const pad = options.pad ?? 48;
  const page = options.page ? pageSize(options.page) : null;
  const width = page?.width ?? contentWidth;
  const height = page?.height ?? contentHeight;
  const scale = page
    ? Math.min(
        (page.width - pad * 2) / contentWidth,
        (page.height - pad * 2) / contentHeight,
        4
      )
    : 1;
  const offsetX = page ? (width - contentWidth * scale) / 2 : 0;
  const offsetY = page ? (height - contentHeight * scale) / 2 : 0;
  const transform =
    scale !== 1 || offsetX !== 0 || offsetY !== 0
      ? ` transform="translate(${offsetX} ${offsetY}) scale(${scale})"`
      : '';

  const markerIds = buildMarkerIds(layout, colors);
  const markerDefs = [...markerIds.entries()]
    .map(
      ([color, id]) =>
        `    <marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker>`
    )
    .join('\n');

  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `  <rect width="100%" height="100%" fill="${colors.background}"/>`,
    `  <defs>${markerDefs ? `\n${markerDefs}` : ''}\n  </defs>`,
    `<g${transform}>`,
  ];
  if (title) {
    parts.push(
      `  <text x="48" y="30" fill="${colors.title}" font-family="${FONT}" font-size="18" font-weight="600">${escapeXml(title)}</text>`
    );
  }
  if (layout.kind === 'sequence') {
    pushSequenceContent(parts, layout, colors, markerIds);
  } else if (layout.kind === 'timeline') {
    pushTimelineContent(parts, layout, colors);
  } else if (layout.kind === 'venn') {
    pushVennContent(parts, layout, colors);
  } else {
    pushFlowContent(parts, layout, colors, markerIds);
  }
  parts.push('  </g>', '</svg>');
  return parts.join('\n');
};

const edgeStrokeColor = (edge: DiagramEdge, colors: typeof SCREEN): string =>
  edge.style?.color ? colorPair(edge.style.color).stroke : colors.edge;

const buildMarkerIds = (
  layout: Layout,
  colors: typeof SCREEN
): Map<string, string> => {
  const byColor = new Map<string, string>();
  const used = new Set<string>();
  for (const { edge } of layout.edges) {
    if (!edge.directed || edge.style?.arrow === false) continue;
    const color = edgeStrokeColor(edge, colors);
    if (used.has(color)) continue;
    used.add(color);
    byColor.set(color, `${MARKER_ID}-${byColor.size}`);
  }
  return byColor;
};

const pushFlowContent = (
  parts: string[],
  layout: Layout,
  colors: typeof SCREEN,
  markerIds: Map<string, string>
): void => {
  for (const subgraph of layout.subgraphs ?? []) {
    parts.push(subgraphShape(subgraph, colors));
  }
  for (const { path, edge, labelX, labelY } of layout.edges) {
    pushEdge(parts, { path, edge, labelX, labelY }, colors, markerIds);
  }
  for (const node of layout.nodes) {
    parts.push(nodeShape(node, colors));
    if (node.icon) parts.push(nodeIcon(node, colors));
    parts.push(nodeLabel(node, colors));
  }
};

const pushSequenceContent = (
  parts: string[],
  layout: Layout,
  colors: typeof SCREEN,
  markerIds: Map<string, string>
): void => {
  for (const fragment of layout.fragments ?? []) {
    parts.push(sequenceFragmentShape(fragment, colors));
  }
  for (const lifeline of layout.lifelines ?? []) {
    parts.push(
      `  <line x1="${lifeline.x}" y1="${lifeline.top}" x2="${lifeline.x}" y2="${lifeline.bottom}" stroke="${colors.edge}" stroke-width="1" stroke-dasharray="4 4"/>`
    );
  }
  for (const activation of layout.activations ?? []) {
    parts.push(activationShape(activation, colors));
  }
  for (const edgePath of layout.edges) {
    parts.push(sequenceEdgeShape(edgePath, colors, markerIds));
    if (edgePath.edge.label) {
      parts.push(edgeLabelText(edgePath, colors));
    }
  }
  for (const note of layout.notes ?? []) {
    parts.push(noteShape(note, colors));
  }
  for (const node of layout.nodes) {
    parts.push(headerShape(node, colors));
    if (node.icon) parts.push(nodeIcon(node, colors));
    parts.push(nodeLabel(node, colors));
  }
};

const pushTimelineContent = (
  parts: string[],
  layout: Layout,
  colors: typeof SCREEN
): void => {
  const timeline = layout.timeline;
  if (!timeline) return;
  for (const column of timeline.columns) {
    parts.push(
      `  <line x1="${column.x}" y1="${timeline.headerHeight}" x2="${column.x}" y2="${layout.height}" stroke="${colors.edge}" stroke-opacity="0.25" stroke-width="1"/>`,
      `  <text x="${column.x + timeline.columnWidth / 2}" y="${timeline.headerHeight - 14}" fill="${colors.nodeText}" font-family="${FONT}" font-size="11" text-anchor="middle">${escapeXml(column.label)}</text>`
    );
  }
  for (const node of layout.nodes) {
    const { fill, stroke } = nodeColors(node, colors);
    parts.push(
      `  <rect x="${node.x - node.width / 2}" y="${node.y - node.height / 2}" width="${node.width}" height="${node.height}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`,
      `  <text x="${timeline.labelWidth - 14}" y="${node.y}" fill="${colors.nodeText}" font-family="${FONT}" font-size="12" text-anchor="end" dominant-baseline="middle">${escapeXml(node.label)}</text>`
    );
  }
};

const pushVennContent = (
  parts: string[],
  layout: Layout,
  colors: typeof SCREEN
): void => {
  for (const node of layout.nodes) {
    const { fill, stroke } = nodeColors(node, colors);
    parts.push(
      `  <circle cx="${node.x}" cy="${node.y}" r="${node.width / 2}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`,
      `  <text x="${node.x}" y="${node.y}" fill="${colors.nodeText}" font-family="${FONT}" font-size="13" font-weight="500" text-anchor="middle" dominant-baseline="middle">${escapeXml(node.label)}</text>`
    );
  }
};

const sequenceFragmentShape = (
  fragment: NonNullable<Layout['fragments']>[number],
  colors: typeof SCREEN
): string => {
  const left = fragment.x - fragment.width / 2;
  const top = fragment.y - fragment.height / 2;
  const lines = [
    `  <rect x="${left}" y="${top}" width="${fragment.width}" height="${fragment.height}" rx="6" fill="none" stroke="${colors.edge}" stroke-width="1.2" stroke-dasharray="5 4"/>`,
    `  <text x="${left + 8}" y="${top + 14}" fill="${colors.edgeLabel}" font-family="${FONT}" font-size="11" font-weight="500">${escapeXml(`${fragment.type} ${fragment.label}`.trim())}</text>`,
  ];
  for (const divider of fragment.dividers) {
    lines.push(
      `  <line x1="${left}" y1="${divider.y}" x2="${left + fragment.width}" y2="${divider.y}" stroke="${colors.edge}" stroke-width="1.2" stroke-dasharray="5 4"/>`,
      `  <text x="${left + 8}" y="${divider.y - 4}" fill="${colors.edgeLabel}" font-family="${FONT}" font-size="11">${escapeXml(divider.label)}</text>`
    );
  }
  return lines.join('\n');
};

const activationShape = (
  activation: NonNullable<Layout['activations']>[number],
  colors: typeof SCREEN
): string =>
  `  <rect x="${activation.x - 5}" y="${activation.top}" width="10" height="${Math.max(activation.bottom - activation.top, 2)}" rx="2" fill="${colors.nodeFill}" stroke="${colors.nodeStroke}" stroke-width="1"/>`;

const noteShape = (
  note: NonNullable<Layout['notes']>[number],
  colors: typeof SCREEN
): string => {
  const left = note.x - note.width / 2;
  const top = note.y - note.height / 2;
  const fold = 10;
  const lines = note.text.split('\n');
  const tspans = lines
    .map(
      (line, index) =>
        `<tspan dy="${index === 0 ? 0 : 14}" x="${note.x}">${escapeXml(line)}</tspan>`
    )
    .join('');
  return [
    `  <rect x="${left}" y="${top}" width="${note.width}" height="${note.height}" rx="3" fill="${colors.subgraph}" stroke="${colors.edge}" stroke-width="1.2"/>`,
    `  <path d="M ${left + note.width - fold} ${top} L ${left + note.width} ${top + fold} L ${left + note.width - fold} ${top + fold} Z" fill="${colors.subgraph}" stroke="${colors.edge}" stroke-width="1.2"/>`,
    `  <text x="${note.x}" y="${note.y - ((lines.length - 1) * 14) / 2}" fill="${colors.nodeText}" font-family="${FONT}" font-size="12" text-anchor="middle">${tspans}</text>`,
  ].join('\n');
};

const pushEdge = (
  parts: string[],
  { path, edge, labelX, labelY }: EdgePath,
  colors: typeof SCREEN,
  markerIds: Map<string, string>
): void => {
  const marker =
    edge.directed && edge.style?.arrow !== false
      ? ` marker-end="url(#${markerId(markerIds, edge, colors)})"`
      : '';
  parts.push(
    `  <path d="${path}" fill="none"${edgeStyleAttrs(edge, colors)}${marker}/>`
  );
  if (edge.label) {
    parts.push(edgeLabelText({ edge, labelX, labelY }, colors));
  }
};

const sequenceEdgeShape = (
  { path, edge, labelX, labelY }: EdgePath,
  colors: typeof SCREEN,
  markerIds: Map<string, string>
): string =>
  `  <path d="${path}" fill="none"${edgeStyleAttrs(edge, colors)} marker-end="url(#${markerId(markerIds, edge, colors)})"/>`;

const markerId = (
  markerIds: Map<string, string>,
  edge: DiagramEdge,
  colors: typeof SCREEN
): string => markerIds.get(edgeStrokeColor(edge, colors)) ?? MARKER_ID;

const edgeStyleAttrs = (edge: DiagramEdge, colors: typeof SCREEN): string => {
  const style = edge.style;
  const stroke = edgeStrokeColor(edge, colors);
  const width = style?.width ?? 1.5;
  const dash = style?.dashed
    ? ' stroke-dasharray="6 4"'
    : style?.dotted
      ? ' stroke-dasharray="2 4"'
      : '';
  return `stroke="${stroke}" stroke-width="${width}"${dash}`;
};

const nodeColors = (
  node: Pick<PositionedNode, 'color'>,
  colors: typeof SCREEN
): { fill: string; stroke: string } =>
  node.color
    ? colorPair(node.color)
    : { fill: colors.nodeFill, stroke: colors.nodeStroke };

const edgeLabelText = (
  { labelX, labelY, edge }: Pick<EdgePath, 'edge' | 'labelX' | 'labelY'>,
  colors: typeof SCREEN
): string =>
  `  <text x="${labelX}" y="${labelY}" fill="${colors.edgeLabel}" font-family="${FONT}" font-size="12" text-anchor="middle" paint-order="stroke" stroke="${colors.background}" stroke-width="4">${escapeXml(edge.label)}</text>`;

const headerShape = (node: PositionedNode, colors: typeof SCREEN): string => {
  const { x, y, width, height } = node;
  const { fill, stroke } = nodeColors(node, colors);
  return `  <rect x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
};

const nodeLabel = (node: PositionedNode, colors: typeof SCREEN): string =>
  `  <text x="${nodeLabelCenterX(node)}" y="${node.y}" fill="${colors.nodeText}" font-family="${FONT}" font-size="13" text-anchor="middle" dominant-baseline="middle">${escapeXml(node.label)}</text>`;

const nodeIcon = (node: PositionedNode, colors: typeof SCREEN): string => {
  const body =
    node.icon === 'glyph'
      ? node.glyph
        ? `<path d="${node.glyph}"/>`
        : ''
      : node.icon
        ? ICON_BODY[node.icon]
        : '';
  return `  <svg aria-hidden="true" data-icon="${node.icon ?? ''}" fill="none" stroke="${colors.nodeStroke}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24" width="${ICON_SIZE}" height="${ICON_SIZE}" x="${nodeIconCenterX(node) - ICON_SIZE / 2}" y="${node.y - ICON_SIZE / 2}">${body}</svg>`;
};

const subgraphShape = (
  subgraph: NonNullable<Layout['subgraphs']>[number],
  colors: typeof SCREEN
): string => {
  const { x, y, width, height } = subgraph;
  const { fill, stroke } = subgraph.color
    ? colorPair(subgraph.color)
    : { fill: colors.subgraph, stroke: colors.edge };
  return [
    `  <rect x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`,
    `  <text x="${x - width / 2 + 12}" y="${y - height / 2 + 17}" fill="${colors.title}" font-family="${FONT}" font-size="12" font-weight="600">${escapeXml(subgraph.label)}</text>`,
  ].join('\n');
};

const nodeShape = (node: PositionedNode, colors: typeof SCREEN): string => {
  const { x, y, width, height, shape } = node;
  const rx = width / 2;
  const ry = height / 2;
  const { fill, stroke } = nodeColors(node, colors);
  const attrs = `fill="${fill}" stroke="${stroke}" stroke-width="1.5"`;
  switch (shape) {
    case 'round':
      return `  <rect x="${x - rx}" y="${y - ry}" width="${width}" height="${height}" rx="24" ${attrs}/>`;
    case 'ellipse':
      return `  <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${attrs}/>`;
    case 'diamond':
      return `  <polygon points="${x},${y - ry} ${x + rx},${y} ${x},${y + ry} ${x - rx},${y}" ${attrs}/>`;
    case 'hexagon':
      return `  <polygon points="${x - rx},${y} ${x - rx * 0.5},${y - ry} ${x + rx * 0.5},${y - ry} ${x + rx},${y} ${x + rx * 0.5},${y + ry} ${x - rx * 0.5},${y + ry}" ${attrs}/>`;
    case 'parallelogram':
      return parallelogram(x, y, rx, ry, attrs);
    case 'cloud':
      return `  <path d="${CLOUD_PATH}" transform="${cloudTransform(node)}" ${attrs}/>`;
    case 'note':
      return `  <path d="${NOTE_PATH}" transform="${noteTransform(node)}" ${attrs}/>`;
    case 'actor':
      return actorShape(node, attrs);
    case 'cylinder':
      return [
        `  <rect x="${x - rx}" y="${y - ry + 8}" width="${width}" height="${height - 16}" ${attrs}/>`,
        `  <ellipse cx="${x}" cy="${y - ry + 8}" rx="${rx}" ry="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`,
        `  <ellipse cx="${x}" cy="${y + ry - 8}" rx="${rx}" ry="8" fill="none" stroke="${stroke}" stroke-width="1.5"/>`,
      ].join('\n');
    default:
      return `  <rect x="${x - rx}" y="${y - ry}" width="${width}" height="${height}" rx="6" ${attrs}/>`;
  }
};

const parallelogram = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  fill: string
): string => {
  const skew = ry * 0.4;
  return `  <polygon points="${x - rx + skew},${y - ry} ${x + rx + skew},${y - ry} ${x + rx - skew},${y + ry} ${x - rx - skew},${y + ry}" ${fill}/>`;
};

const actorShape = (node: PositionedNode, fill: string): string => {
  const parts = actorParts(node);
  const lines = parts.lines
    .map(
      (line) =>
        `  <line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" ${fill}/>`
    )
    .join('\n');
  return `  <circle cx="${parts.cx}" cy="${parts.cy}" r="${parts.r}" ${fill}/>\n${lines}`;
};

export const downloadSvg = (
  layout: Layout,
  title: string,
  name: string,
  options?: SvgOptions
): void => {
  const svg = buildSvg(layout, title, options);
  saveAs(
    new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
    `${safeName(name)}.svg`
  );
};

export const rasterizeSvg = (
  svg: string,
  width: number,
  height: number
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(
      new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    );
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error('Canvas 2D is not available'));
        return;
      }
      context.drawImage(image, 0, 0, width, height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) resolve(blob);
        else reject(new Error('PNG encoding failed'));
      }, 'image/png');
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG rasterization failed'));
    };
    image.src = url;
  });

export const downloadPng = async (
  layout: Layout,
  title: string,
  name: string,
  options: SvgOptions & { scale?: number } = {}
): Promise<void> => {
  const svg = buildSvg(layout, title, options);
  const { width, height } = svgDimensions(layout, options);
  const scale = options.scale ?? (options.page ? 1 : 2);
  const blob = await rasterizeSvg(
    svg,
    Math.round(width * scale),
    Math.round(height * scale)
  );
  saveAs(blob, `${safeName(name)}.png`);
};

export const buildSnippet = (
  diagram: Diagram,
  format: SnippetFormat
): string => {
  const mermaid = mermaidSnippet(diagram);
  if (format === 'markdown') return '```mermaid\n' + mermaid + '\n```';
  if (format === 'plantuml') return plantumlSnippet(diagram);
  return mermaid;
};

const mermaidSnippet = (diagram: Diagram): string => {
  if (diagram.kind === 'sequence') return mermaidSequence(diagram);
  const lines: string[] = ['flowchart LR'];
  if (diagram.title) lines.push(`  title: ${snippetLabel(diagram.title)}`);
  for (const node of diagram.nodes) {
    lines.push(`  ${node.id}${mermaidShape(node)}`);
  }
  for (const edge of diagram.edges) {
    const connector = edge.directed ? '-->' : '---';
    const label = edge.label ? `|${snippetLabel(edge.label)}|` : '';
    lines.push(`  ${edge.source} ${connector}${label} ${edge.target}`);
  }
  return lines.join('\n');
};

const mermaidSequence = (diagram: Diagram): string => {
  const lines: string[] = ['sequenceDiagram'];
  for (const node of diagram.nodes) {
    lines.push(`  participant ${node.id} as ${snippetLabel(node.label)}`);
  }
  for (const edge of diagram.edges) {
    lines.push(
      `  ${edge.source}->>${edge.target}: ${snippetLabel(edge.label || 'message')}`
    );
  }
  return lines.join('\n');
};

const plantumlSnippet = (diagram: Diagram): string => {
  const lines: string[] = ['@startuml'];
  if (diagram.title) lines.push(`title ${snippetLabel(diagram.title)}`);
  lines.push('skinparam backgroundColor white');
  if (diagram.kind === 'sequence') {
    for (const node of diagram.nodes) {
      lines.push(`participant "${snippetLabel(node.label)}" as ${node.id}`);
    }
    for (const edge of diagram.edges) {
      lines.push(
        `${edge.source} -> ${edge.target} : ${snippetLabel(edge.label || 'message')}`
      );
    }
  } else {
    for (const node of diagram.nodes) {
      lines.push(plantumlNode(node));
    }
    for (const edge of diagram.edges) {
      const connector = edge.directed ? '-->' : '--';
      lines.push(
        `${edge.source} ${connector} ${edge.target}${edge.label ? ` : ${snippetLabel(edge.label)}` : ''}`
      );
    }
  }
  lines.push('@enduml');
  return lines.join('\n');
};

const plantumlNode = (node: DiagramNode): string => {
  const label = snippetLabel(node.label);
  switch (node.shape) {
    case 'ellipse':
      return `ellipse "${label}" as ${node.id}`;
    case 'diamond':
      return `diamond "${label}" as ${node.id}`;
    case 'cylinder':
      return `database "${label}" as ${node.id}`;
    case 'hexagon':
      return `hexagon "${label}" as ${node.id}`;
    case 'parallelogram':
      return `parallelogram "${label}" as ${node.id}`;
    case 'cloud':
      return `cloud "${label}" as ${node.id}`;
    case 'actor':
      return `actor "${label}" as ${node.id}`;
    case 'round':
    case 'note':
    case 'rect':
    default:
      return `rectangle "${label}" as ${node.id}`;
  }
};

const mermaidShape = (node: DiagramNode): string => {
  const label = snippetLabel(node.label);
  switch (node.shape) {
    case 'round':
      return `("${label}")`;
    case 'ellipse':
    case 'cloud':
      return `(("${label}"))`;
    case 'diamond':
      return `{"${label}"}`;
    case 'cylinder':
      return `[("${label}")]`;
    case 'hexagon':
      return `{{"${label}"}}`;
    case 'parallelogram':
    case 'note':
      return `[/"${label}"/]`;
    case 'actor':
      return `(["${label}"])`;
    default:
      return `["${label}"]`;
  }
};

const snippetLabel = (label: string): string =>
  label.replace(/["\\\r\n]/g, ' ').trim();

const safeName = (name: string): string =>
  name.replace(/[^a-z0-9_-]+/gi, '_').toLowerCase() || 'diagram';
