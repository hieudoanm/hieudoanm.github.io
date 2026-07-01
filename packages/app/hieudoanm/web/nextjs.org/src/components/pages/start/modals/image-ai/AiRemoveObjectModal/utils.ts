export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const medianPatch = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  patchSize: number
) => {
  const copy = new Uint8ClampedArray(data);
  const half = Math.floor(patchSize / 2);
  for (let y = half; y < h - half; y++) {
    for (let x = half; x < w - half; x++) {
      const idx = (y * w + x) * 4;
      if (copy[idx + 3] < 255) {
        for (let c = 0; c < 3; c++) {
          const neighbors: number[] = [];
          for (let dy = -half; dy <= half; dy++) {
            for (let dx = -half; dx <= half; dx++) {
              const ni = ((y + dy) * w + (x + dx)) * 4 + c;
              if (copy[ni + 3] > 0) neighbors.push(copy[ni]);
            }
          }
          if (neighbors.length > 0) {
            neighbors.sort((a, b) => a - b);
            data[idx + c] = neighbors[Math.floor(neighbors.length / 2)];
          }
        }
        data[idx + 3] = 255;
      }
    }
  }
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
