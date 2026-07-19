import type {
  SVGDocument,
  SVGShape,
  SVGLayer,
  SVGSymbol,
  SVGSettings,
  HistoryEntry,
} from '@/types';

export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const snapToGrid = (value: number, gridSize: number): number =>
  Math.round(value / gridSize) * gridSize;

export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  const match = hex.replace('#', '').trim();
  if (match.length === 3) {
    const [r, g, b] = match.split('').map((c) => parseInt(c + c, 16));
    return { r, g, b };
  }
  if (match.length === 6) {
    const r = parseInt(match.slice(0, 2), 16);
    const g = parseInt(match.slice(2, 4), 16);
    const b = parseInt(match.slice(4, 6), 16);
    if ([r, g, b].some((v) => Number.isNaN(v))) return null;
    return { r, g, b };
  }
  return null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
};

export const mixHexColors = (a: string, b: string, t: number): string => {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  if (!ca || !cb) return b;
  return rgbToHex(
    ca.r + (cb.r - ca.r) * t,
    ca.g + (cb.g - ca.g) * t,
    ca.b + (cb.b - ca.b) * t
  );
};

export const measureTextWidth = (
  text: string,
  fontSize: number,
  letterSpacing = 0
): number => {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = `${fontSize}px Arial`;
      return ctx.measureText(text).width + text.length * letterSpacing;
    }
  }
  return text.length * (fontSize * 0.55 + letterSpacing);
};

export const wrapText = (
  text: string,
  maxWidth: number,
  fontSize: number,
  letterSpacing = 0,
  measure: (value: string) => number = (value) =>
    measureTextWidth(value, fontSize, letterSpacing)
): string[] => {
  if (maxWidth <= 0) return [text];
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(' ')) {
    const candidate = current ? `${current} ${word}` : word;
    if (measure(candidate) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
};

export interface ShapeBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AlignmentMatch {
  matchedEdge: 'start' | 'center' | 'end';
  position: number;
  delta: number;
}

export interface AlignmentResult {
  vertical?: AlignmentMatch;
  horizontal?: AlignmentMatch;
}

const ALIGNMENT_EDGES = ['start', 'center', 'end'] as const;

export const getAlignment = (
  target: ShapeBounds,
  others: ShapeBounds[],
  tolerance = 4
): AlignmentResult => {
  let vertical: AlignmentMatch | undefined;
  let horizontal: AlignmentMatch | undefined;

  const consider = (
    axis: 'vertical' | 'horizontal',
    targetEdge: number,
    otherEdge: number,
    matchedEdge: AlignmentMatch['matchedEdge']
  ): void => {
    const delta = otherEdge - targetEdge;
    if (Math.abs(delta) > tolerance) return;
    const current = axis === 'vertical' ? vertical : horizontal;
    if (!current || Math.abs(delta) < Math.abs(current.delta)) {
      const match: AlignmentMatch = {
        matchedEdge,
        position: otherEdge,
        delta,
      };
      if (axis === 'vertical') vertical = match;
      else horizontal = match;
    }
  };

  const targetEdges = ALIGNMENT_EDGES.map((edge) => ({
    edge,
    v:
      edge === 'start'
        ? target.x
        : edge === 'center'
          ? target.x + target.width / 2
          : target.x + target.width,
    h:
      edge === 'start'
        ? target.y
        : edge === 'center'
          ? target.y + target.height / 2
          : target.y + target.height,
  }));

  for (const other of others) {
    const otherEdges = ALIGNMENT_EDGES.map((edge) => ({
      v:
        edge === 'start'
          ? other.x
          : edge === 'center'
            ? other.x + other.width / 2
            : other.x + other.width,
      h:
        edge === 'start'
          ? other.y
          : edge === 'center'
            ? other.y + other.height / 2
            : other.y + other.height,
    }));
    for (const te of targetEdges) {
      for (const oe of otherEdges) {
        consider('vertical', te.v, oe.v, te.edge);
        consider('horizontal', te.h, oe.h, te.edge);
      }
    }
  }

  return { vertical, horizontal };
};

export const applyAlignment = (
  bounds: ShapeBounds,
  alignment: AlignmentResult,
  handle?: string
): ShapeBounds => {
  const next = { ...bounds };
  if (alignment.vertical) {
    const { matchedEdge, delta } = alignment.vertical;
    if (!handle || matchedEdge === 'center') {
      next.x += delta;
    } else if (matchedEdge === 'start' && handle.includes('w')) {
      next.x += delta;
      next.width -= delta;
    } else if (matchedEdge === 'end' && handle.includes('e')) {
      next.width += delta;
    } else {
      next.x += delta;
    }
  }
  if (alignment.horizontal) {
    const { matchedEdge, delta } = alignment.horizontal;
    if (!handle || matchedEdge === 'center') {
      next.y += delta;
    } else if (matchedEdge === 'start' && handle.includes('n')) {
      next.y += delta;
      next.height -= delta;
    } else if (matchedEdge === 'end' && handle.includes('s')) {
      next.height += delta;
    } else {
      next.y += delta;
    }
  }
  return next;
};

export interface PathPoint {
  x: number;
  y: number;
  smooth: boolean;
}

export interface ParsedPath {
  points: PathPoint[];
  closed: boolean;
}

const PATH_COMMAND_RE = /([MmLlQqCcSsTtAaHhVvZz])([^MmLlQqCcSsTtAaHhVvZz]*)/g;

export const parsePath = (pathData = ''): ParsedPath => {
  const points: PathPoint[] = [];
  let closed = false;
  let match: RegExpExecArray | null;
  const re = new RegExp(PATH_COMMAND_RE.source, 'g');
  while ((match = re.exec(pathData)) !== null) {
    const cmd = match[1];
    const args =
      (match[2] ?? '')
        .trim()
        .match(/-?\d*\.?\d+(?:e[-+]?\d+)?/g)
        ?.map(Number) ?? [];
    if (cmd === 'Z' || cmd === 'z') {
      closed = true;
    } else if (cmd === 'M' && args.length >= 2) {
      points.push({ x: args[0], y: args[1], smooth: false });
    } else if (cmd === 'L' && args.length >= 2) {
      points.push({ x: args[0], y: args[1], smooth: false });
    } else if ((cmd === 'Q' || cmd === 'C') && args.length >= 4) {
      points.push({
        x: args[args.length - 2],
        y: args[args.length - 1],
        smooth: true,
      });
    }
  }
  return { points, closed };
};

export const serializePath = (path: ParsedPath): string => {
  const { points, closed } = path;
  if (points.length === 0) return '';
  const parts = [`M${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p.smooth) {
      const prev = points[i - 1];
      const next = points[i + 1] ?? prev;
      const cx = (p.x + next.x) / 2;
      const cy = (p.y + next.y) / 2;
      parts.push(`Q${cx} ${cy} ${p.x} ${p.y}`);
    } else {
      parts.push(`L${p.x} ${p.y}`);
    }
  }
  return closed ? `${parts.join(' ')} Z` : parts.join(' ');
};

export const mockBooleanUnion = (shapes: SVGShape[]): string =>
  shapes
    .filter((s) => s.type === 'path')
    .map((s) => s.pathData ?? '')
    .filter(Boolean)
    .join(' ');

export type AlignMode =
  'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom';

export const alignShapes = (
  shapes: SVGShape[],
  mode: AlignMode
): SVGShape[] => {
  if (shapes.length < 2) return shapes;
  const minX = Math.min(...shapes.map((s) => s.x));
  const minY = Math.min(...shapes.map((s) => s.y));
  const maxX = Math.max(...shapes.map((s) => s.x + s.width));
  const maxY = Math.max(...shapes.map((s) => s.y + s.height));
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return shapes.map((s) => {
    switch (mode) {
      case 'left':
        return { ...s, x: minX };
      case 'right':
        return { ...s, x: maxX - s.width };
      case 'center':
        return { ...s, x: cx - s.width / 2 };
      case 'top':
        return { ...s, y: minY };
      case 'bottom':
        return { ...s, y: maxY - s.height };
      case 'middle':
        return { ...s, y: cy - s.height / 2 };
    }
  });
};

export const distributeShapes = (
  shapes: SVGShape[],
  axis: 'horizontal' | 'vertical'
): SVGShape[] => {
  if (shapes.length < 3) return shapes;
  const sorted = [...shapes].sort((a, b) => {
    const ca = axis === 'horizontal' ? a.x + a.width / 2 : a.y + a.height / 2;
    const cb = axis === 'horizontal' ? b.x + b.width / 2 : b.y + b.height / 2;
    return ca - cb;
  });
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const start =
    axis === 'horizontal'
      ? first.x + first.width / 2
      : first.y + first.height / 2;
  const end =
    axis === 'horizontal' ? last.x + last.width / 2 : last.y + last.height / 2;
  const gap = (end - start) / (sorted.length - 1);
  return sorted.map((s, i) => {
    if (i === 0 || i === sorted.length - 1) return s;
    if (axis === 'horizontal') {
      return { ...s, x: start + gap * i - s.width / 2 };
    }
    return { ...s, y: start + gap * i - s.height / 2 };
  });
};

export const moveLayer = (
  layers: SVGLayer[],
  draggedId: string,
  targetId: string
): SVGLayer[] => {
  const dragged = layers.find((l) => l.id === draggedId);
  const target = layers.find((l) => l.id === targetId);
  if (!dragged || !target || dragged.id === target.id) return layers;
  const rest = layers.filter((l) => l.id !== draggedId);
  if (target.isFolder) {
    const children = rest.filter((l) => l.parentId === target.id);
    const insertAt =
      children.length > 0
        ? rest.indexOf(children[children.length - 1]) + 1
        : rest.indexOf(target) + 1;
    const next = [...rest];
    next.splice(insertAt, 0, { ...dragged, parentId: target.id });
    return next;
  }
  const insertAt = rest.indexOf(target) + 1;
  const next = [...rest];
  next.splice(insertAt, 0, { ...dragged, parentId: target.parentId });
  return next;
};

export const generateShapeSVG = (shape: SVGShape): string => {
  const fill =
    shape.fill.type === 'none'
      ? 'none'
      : shape.fill.type === 'gradient'
        ? `url(#${shape.fill.gradientId})`
        : shape.fill.color;
  const stroke = shape.stroke.width > 0 ? shape.stroke.color : 'none';
  const strokeWidth = shape.stroke.width;
  const opacity = shape.opacity;
  const transform = shape.rotation
    ? ` transform="rotate(${shape.rotation} ${shape.x + shape.width / 2} ${shape.y + shape.height / 2})"`
    : '';

  switch (shape.type) {
    case 'rect':
      return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" rx="${shape.rx ?? 0}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"${transform} />`;
    case 'ellipse':
      return `<ellipse cx="${shape.x + shape.width / 2}" cy="${shape.y + shape.height / 2}" rx="${shape.width / 2}" ry="${shape.height / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"${transform} />`;
    case 'line':
      return `<line x1="${shape.x}" y1="${shape.y}" x2="${shape.x + shape.width}" y2="${shape.y + shape.height}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"${transform} />`;
    case 'path':
      return `<path d="${shape.pathData ?? ''}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"${transform} />`;
    case 'text': {
      const font = shape.fontFamily ?? 'Arial';
      const size = shape.fontSize ?? 16;
      const lines = shape.textArea
        ? wrapText(
            shape.text ?? '',
            shape.width,
            size,
            shape.letterSpacing ?? 0
          )
        : [shape.text ?? ''];
      const lineHeight = (shape.lineHeight ?? 1.2) * size;
      const spacing = shape.letterSpacing
        ? ` letter-spacing="${shape.letterSpacing}"`
        : '';
      const inner = lines
        .map((line, i) =>
          i === 0
            ? line
            : `<tspan x="${shape.x}" dy="${lineHeight}">${line}</tspan>`
        )
        .join('');
      return `<text x="${shape.x}" y="${shape.y + shape.height}" font-family="${font}" font-size="${size}" fill="${fill}" opacity="${opacity}"${spacing}${transform}>${inner}</text>`;
    }
    default:
      return '';
  }
};

export const exportAsSVG = (
  document: SVGDocument,
  shapeIds?: string[]
): string => {
  const shapes = shapeIds
    ? document.shapes.filter((s) => shapeIds.includes(s.id))
    : document.shapes;
  const parts: string[] = [];
  const emitted = new Set<string>();
  const usedGradients = new Set<string>();
  for (const shape of shapes) {
    if (emitted.has(shape.id)) continue;
    if (shape.fill.type === 'gradient' && shape.fill.gradientId) {
      usedGradients.add(shape.fill.gradientId);
    }
    if (shape.groupId) {
      const members = shapes.filter((s) => s.groupId === shape.groupId);
      const inner = members.map((s) => `  ${generateShapeSVG(s)}`).join('\n');
      parts.push(`  <g id="${shape.groupId}">`, inner, `  </g>`);
      members.forEach((m) => emitted.add(m.id));
    } else {
      parts.push(`  ${generateShapeSVG(shape)}`);
      emitted.add(shape.id);
    }
  }
  const defs =
    usedGradients.size === 0
      ? ''
      : `  <defs>\n${[...usedGradients]
          .map((id) => {
            const g = document.gradients.find((x) => x.id === id);
            if (!g) return '';
            const stops = g.stops
              .map(
                (s) =>
                  `<stop offset="${s.offset}" stop-color="${s.color}" stop-opacity="${s.opacity}" />`
              )
              .join('');
            return g.type === 'linear'
              ? `    <linearGradient id="${g.id}" x1="${g.x1 ?? 0}" y1="${g.y1 ?? 0}" x2="${g.x2 ?? 1}" y2="${g.y2 ?? 1}">${stops}</linearGradient>`
              : `    <radialGradient id="${g.id}" cx="${g.cx ?? 0.5}" cy="${g.cy ?? 0.5}" r="${g.r ?? 0.5}">${stops}</radialGradient>`;
          })
          .filter(Boolean)
          .join('\n')}\n  </defs>\n`;
  const shapesStr = parts.join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${document.width}" height="${document.height}" viewBox="0 0 ${document.width} ${document.height}">\n${defs}${shapesStr}\n</svg>`;
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadFile = (content: string, filename: string): void => {
  downloadBlob(new Blob([content], { type: 'image/svg+xml' }), filename);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const exportAsPNG = (
  svgElement: SVGSVGElement,
  scale: number = 2
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    };
    img.src = url;
  });
};

export const rasterizeSVG = (
  svgText: string,
  opts: { scale?: number; type?: string; quality?: number } = {}
): Promise<Blob | null> => {
  const { scale = 1, type = 'image/png', quality } = opts;
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }
    const img = new Image();
    const svgBlob = new Blob([svgText], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => resolve(blob), type, quality);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
};
