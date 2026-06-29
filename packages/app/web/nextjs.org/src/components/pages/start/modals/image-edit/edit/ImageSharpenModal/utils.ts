export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const applyConvolution = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kernel: number[]
) => {
  const imgData = ctx.getImageData(0, 0, w, h);
  const out = ctx.createImageData(w, h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0,
        g = 0,
        b = 0,
        idx = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = (y + ky) * w + (x + kx);
          const ki = idx++;
          r += imgData.data[px * 4] * kernel[ki];
          g += imgData.data[px * 4 + 1] * kernel[ki];
          b += imgData.data[px * 4 + 2] * kernel[ki];
        }
      }
      const oi = (y * w + x) * 4;
      out.data[oi] = Math.min(255, Math.max(0, r));
      out.data[oi + 1] = Math.min(255, Math.max(0, g));
      out.data[oi + 2] = Math.min(255, Math.max(0, b));
      out.data[oi + 3] = 255;
    }
  }
  ctx.putImageData(out, 0, 0);
};
