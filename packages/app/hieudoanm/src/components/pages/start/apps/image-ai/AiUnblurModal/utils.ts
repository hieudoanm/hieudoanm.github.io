export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const laplacianSharpen = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  strength: number
) => {
  const copy = new Uint8ClampedArray(data);
  const kernel = [0, -1, 0, -1, 4, -1, 0, -1, 0];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        let laplacian = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pIdx = ((y + ky) * w + (x + kx)) * 4 + c;
            laplacian += copy[pIdx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        const original = copy[idx + c];
        data[idx + c] = Math.min(
          255,
          Math.max(0, original - strength * laplacian)
        );
      }
    }
  }
};
