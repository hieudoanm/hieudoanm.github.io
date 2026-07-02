export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const applyVignette = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strength: number
) => {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const cx = w / 2,
    cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const factor = 1 - (dist / maxDist) * strength;
      const idx = (y * w + x) * 4;
      d[idx] *= factor;
      d[idx + 1] *= factor;
      d[idx + 2] *= factor;
    }
  }
  ctx.putImageData(imgData, 0, 0);
};
