export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const colorDistance = (
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
) => {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
};

export const chromaKey = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  keyR: number,
  keyG: number,
  keyB: number,
  threshold: number,
  feather: number
) => {
  for (let i = 0; i < data.length; i += 4) {
    const dist = colorDistance(
      data[i],
      data[i + 1],
      data[i + 2],
      keyR,
      keyG,
      keyB
    );
    if (dist < threshold) {
      const alpha = Math.min(
        1,
        Math.max(0, (dist - threshold + feather) / feather)
      );
      data[i + 3] = Math.round(alpha * 255);
    }
  }
};

export const edgeDetectBg = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  tolerance: number
) => {
  const copy = new Uint8ClampedArray(data);
  const corners = [
    copy[0],
    copy[1],
    copy[2],
    copy[(w - 1) * 4],
    copy[(w - 1) * 4 + 1],
    copy[(w - 1) * 4 + 2],
    copy[(h - 1) * w * 4],
    copy[(h - 1) * w * 4 + 1],
    copy[(h - 1) * w * 4 + 2],
    copy[((h - 1) * w + (w - 1)) * 4],
    copy[((h - 1) * w + (w - 1)) * 4 + 1],
    copy[((h - 1) * w + (w - 1)) * 4 + 2],
  ];
  const bgR = corners.reduce((s, v, i) => s + (i % 3 === 0 ? v : 0), 0) / 4;
  const bgG = corners.reduce((s, v, i) => s + (i % 3 === 1 ? v : 0), 0) / 4;
  const bgB = corners.reduce((s, v, i) => s + (i % 3 === 2 ? v : 0), 0) / 4;

  for (let i = 0; i < data.length; i += 4) {
    const dist = colorDistance(
      data[i],
      data[i + 1],
      data[i + 2],
      bgR,
      bgG,
      bgB
    );
    if (dist < tolerance) {
      data[i + 3] = 0;
    }
  }
};
