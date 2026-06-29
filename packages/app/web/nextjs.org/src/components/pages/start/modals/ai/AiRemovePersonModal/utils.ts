export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const floodFill = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  startX: number,
  startY: number,
  tolerance: number
) => {
  const startIdx = (startY * w + startX) * 4;
  const targetR = data[startIdx];
  const targetG = data[startIdx + 1];
  const targetB = data[startIdx + 2];
  const visited = new Uint8Array(w * h);
  const stack = [[startX, startY]];

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue;
    const idx = cy * w + cx;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const pi = idx * 4;
    const dist = Math.sqrt(
      (data[pi] - targetR) ** 2 +
        (data[pi + 1] - targetG) ** 2 +
        (data[pi + 2] - targetB) ** 2
    );
    if (dist > tolerance) continue;

    data[pi + 3] = 0;
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
};

export const inpaintRegion = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  radius: number
) => {
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
};
