export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const pixelateRegion = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number
) => {
  const cx = width / 2,
    cy = height / 3;
  const rw = width * 0.3,
    rh = height * 0.3;
  const sx = Math.max(1, Math.floor(cx - rw / 2));
  const sy = Math.max(1, Math.floor(cy - rh / 2));
  const ex = Math.min(width, Math.ceil(cx + rw / 2));
  const ey = Math.min(height, Math.ceil(cy + rh / 2));

  for (let y = sy; y < ey; y += size) {
    for (let x = sx; x < ex; x += size) {
      const idx = (y * width + x) * 4;
      const r = ctx.getImageData(x, y, 1, 1).data;
      ctx.fillStyle = `rgb(${r[0]},${r[1]},${r[2]})`;
      ctx.fillRect(x, y, size, size);
    }
  }
};
