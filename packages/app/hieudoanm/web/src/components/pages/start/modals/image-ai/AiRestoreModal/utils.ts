export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const applySharpen = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  amount: number
) => {
  const copy = new Uint8ClampedArray(data);
  const kernel = [0, -1, 0, -1, 4 + amount, -1, 0, -1, 0];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pIdx = ((y + ky) * w + (x + kx)) * 4 + c;
            sum += copy[pIdx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        data[idx + c] = Math.min(255, Math.max(0, sum));
      }
    }
  }
};

export const reduceNoise = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  strength: number
) => {
  const copy = new Uint8ClampedArray(data);
  const r = Math.max(1, Math.floor(strength));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        let sum = 0,
          count = 0;
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const nx = x + dx,
              ny = y + dy;
            if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
            sum += copy[(ny * w + nx) * 4 + c];
            count++;
          }
        }
        data[idx + c] = sum / count;
      }
    }
  }
};
