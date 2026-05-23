export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const detectBrightRegions = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  threshold: number
) => {
  for (let i = 0; i < data.length; i += 4) {
    const brightness =
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (brightness > threshold) {
      data[i + 3] = 0;
    }
  }
};

export const inpaint = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  radius: number,
  iterations: number
) => {
  for (let iter = 0; iter < iterations; iter++) {
    const copy = new Uint8ClampedArray(data);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 255) {
          let r = 0,
            g = 0,
            b = 0,
            count = 0;
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx,
                ny = y + dy;
              if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
              const ni = (ny * w + nx) * 4;
              if (copy[ni + 3] === 255) {
                r += copy[ni];
                g += copy[ni + 1];
                b += copy[ni + 2];
                count++;
              }
            }
          }
          if (count > 0) {
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
          }
          data[idx + 3] = 255;
        }
      }
    }
  }
};
