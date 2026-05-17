export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const chromaKey = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  target: string,
  threshold: number
) => {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  const tR = parseInt(target.slice(1, 3), 16);
  const tG = parseInt(target.slice(3, 5), 16);
  const tB = parseInt(target.slice(5, 7), 16);
  for (let i = 0; i < d.length; i += 4) {
    const dist = Math.sqrt(
      (d[i] - tR) ** 2 + (d[i + 1] - tG) ** 2 + (d[i + 2] - tB) ** 2
    );
    if (dist < threshold) d[i + 3] = 0;
  }
  ctx.putImageData(imgData, 0, 0);
};
