export type GridSize = 32 | 64;
export type Mode = 'square' | 'scale';
export type Tab = 'original' | 'pixel';

export const CELL: Record<GridSize, number> = { 32: 9, 64: 4 };
export const GAP = 1;

export const sample = (
  img: HTMLImageElement,
  mode: Mode,
  gridSize: GridSize
): { colors: string[]; cols: number; rows: number } => {
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  if (mode === 'square') {
    const size = Math.min(nw, nh);
    canvas.width = gridSize;
    canvas.height = gridSize;
    ctx.drawImage(
      img,
      (nw - size) / 2,
      (nh - size) / 2,
      size,
      size,
      0,
      0,
      gridSize,
      gridSize
    );
  } else {
    const isLandscape = nw >= nh;
    const cols = isLandscape
      ? gridSize
      : Math.max(1, Math.round((gridSize * nw) / nh));
    const rows = isLandscape
      ? Math.max(1, Math.round((gridSize * nh) / nw))
      : gridSize;
    canvas.width = cols;
    canvas.height = rows;
    ctx.drawImage(img, 0, 0, nw, nh, 0, 0, cols, rows);
  }

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const colors: string[] = [];
  for (let i = 0; i < data.length; i += 4) {
    colors.push(
      `#${data[i].toString(16).padStart(2, '0')}${data[i + 1].toString(16).padStart(2, '0')}${data[i + 2].toString(16).padStart(2, '0')}`
    );
  }
  return { colors, cols: canvas.width, rows: canvas.height };
};
