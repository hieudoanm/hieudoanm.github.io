export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const colorize = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  intensity: number
) => {
  ctx.fillStyle = color;
  ctx.globalAlpha = intensity;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
};
