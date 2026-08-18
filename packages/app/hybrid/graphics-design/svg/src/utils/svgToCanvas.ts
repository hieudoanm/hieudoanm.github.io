interface SvgDimensions {
  width: number;
  height: number;
}

const parseLength = (value: string | null): number | null => {
  if (!value) return null;
  const match = value.trim().match(/^([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
};

const svgDimensions = (root: Element): SvgDimensions => {
  const width = parseLength(root.getAttribute('width'));
  const height = parseLength(root.getAttribute('height'));
  if (width && height) return { width, height };

  const vbParts = root
    .getAttribute('viewBox')
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);
  if (vbParts && vbParts.length === 4 && vbParts.every(Number.isFinite)) {
    return { width: vbParts[2], height: vbParts[3] };
  }
  return { width: width ?? 400, height: height ?? 400 };
};

export const svgToCanvas = (
  svgText: string,
  size: number
): Promise<HTMLCanvasElement> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2D context unavailable'));
      return;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    const root = doc.documentElement;
    if (
      doc.querySelector('parsererror') ||
      root.tagName.toLowerCase() !== 'svg'
    ) {
      reject(new Error('Invalid SVG'));
      return;
    }

    const { width, height } = svgDimensions(root);
    root.setAttribute('width', String(width));
    root.setAttribute('height', String(height));

    const blob = new Blob([new XMLSerializer().serializeToString(root)], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(size / width, size / height);
      const drawWidth = width * scale;
      const drawHeight = height * scale;
      ctx.drawImage(
        img,
        (size - drawWidth) / 2,
        (size - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to render SVG'));
    };
    img.src = url;
  });
