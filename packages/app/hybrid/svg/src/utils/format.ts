import type {
  SVGDocument,
  SVGShape,
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
    case 'text':
      return `<text x="${shape.x}" y="${shape.y + shape.height}" font-family="${shape.fontFamily ?? 'Arial'}" font-size="${shape.fontSize ?? 16}" fill="${fill}" opacity="${opacity}"${transform}>${shape.text ?? ''}</text>`;
    default:
      return '';
  }
};

export const exportAsSVG = (document: SVGDocument): string => {
  const shapesStr = document.shapes
    .map((s) => `  ${generateShapeSVG(s)}`)
    .join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${document.width}" height="${document.height}" viewBox="0 0 ${document.width} ${document.height}">\n${shapesStr}\n</svg>`;
};

export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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
