export const FILTERS = [
  'sepia',
  'vintage',
  'invert',
  'grayscale',
  'warm',
  'cool',
] as const;

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const applyFilter = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  filter: string
) => {
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    switch (filter) {
      case 'sepia': {
        d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        d[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        d[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        break;
      }
      case 'vintage': {
        d[i] = Math.min(255, r * 0.55 + g * 0.55 + b * 0.15);
        d[i + 1] = Math.min(255, r * 0.35 + g * 0.6 + b * 0.1);
        d[i + 2] = Math.min(255, r * 0.2 + g * 0.4 + b * 0.3);
        break;
      }
      case 'invert': {
        d[i] = 255 - r;
        d[i + 1] = 255 - g;
        d[i + 2] = 255 - b;
        break;
      }
      case 'grayscale': {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[i] = gray;
        d[i + 1] = gray;
        d[i + 2] = gray;
        break;
      }
      case 'warm': {
        d[i] = Math.min(255, r * 1.2);
        d[i + 2] = Math.max(0, b * 0.8);
        break;
      }
      case 'cool': {
        d[i + 2] = Math.min(255, b * 1.2);
        d[i] = Math.max(0, r * 0.8);
        break;
      }
    }
  }
  ctx.putImageData(data, 0, 0);
};
