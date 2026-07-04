export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const encodeGif = (frames: ImageData[], delay: number): Blob => {
  const w = frames[0].width;
  const h = frames[0].height;
  const palette = buildPalette(frames, 256);
  const buf: number[] = [];
  const wb = (v: number) => {
    buf.push(v & 0xff, (v >> 8) & 0xff);
  };
  buf.push(0x47, 0x49, 0x46, 0x38, 0x39, 0x61);
  wb(w);
  wb(h);
  const gctSize = 7;
  buf.push(0xf0 | gctSize, 0, 0);
  for (const c of palette) buf.push(c[0], c[1], c[2]);
  const pad = (1 << (gctSize + 1)) - palette.length;
  for (let i = 0; i < pad; i++) buf.push(0, 0, 0);
  for (const frame of frames) {
    buf.push(0x21, 0xf9, 0x04, 0x00);
    wb(delay / 10);
    buf.push(0x00, 0x00);
    buf.push(0x2c, 0x00, 0x00, 0x00, 0x00);
    wb(w);
    wb(h);
    buf.push(0x00);
    const pixels = quantizePixels(frame, palette);
    const minCode = 8;
    const compressed = lzwEncode(pixels, minCode);
    buf.push(minCode);
    for (let i = 0; i < compressed.length; i += 255) {
      const chunk = compressed.slice(i, i + 255);
      buf.push(chunk.length, ...chunk);
    }
    buf.push(0x00);
  }
  buf.push(0x3b);
  return new Blob([new Uint8Array(buf)], { type: 'image/gif' });
};

export const buildPalette = (
  frames: ImageData[],
  maxColors: number
): number[][] => {
  const colorMap = new Map<string, number>();
  for (const frame of frames) {
    const d = frame.data;
    for (let i = 0; i < d.length; i += 4) {
      const key = `${d[i] >> 3},${d[i + 1] >> 3},${d[i + 2] >> 3}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
  }
  const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
  const colors = sorted
    .slice(0, maxColors - 1)
    .map(([k]) => k.split(',').map(Number));
  colors.push([0, 0, 0]);
  return colors;
};

export const quantizePixels = (
  frame: ImageData,
  palette: number[][]
): number[] => {
  const d = frame.data;
  const pixels: number[] = [];
  for (let i = 0; i < d.length; i += 4) {
    let bestIdx = 0,
      bestDist = Infinity;
    for (let j = 0; j < palette.length; j++) {
      const dist =
        (d[i] - palette[j][0]) ** 2 +
        (d[i + 1] - palette[j][1]) ** 2 +
        (d[i + 2] - palette[j][2]) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = j;
      }
    }
    pixels.push(bestIdx);
  }
  return pixels;
};

export const lzwEncode = (data: number[], minCodeSize: number): number[] => {
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = eoiCode + 1;
  const table = new Map<string, number>();
  const out: number[] = [];
  let bits = 0,
    bitPos = 0;
  const writeCode = (code: number) => {
    bits |= code << bitPos;
    bitPos += codeSize;
    while (bitPos >= 8) {
      out.push(bits & 0xff);
      bits >>= 8;
      bitPos -= 8;
    }
  };
  writeCode(clearCode);
  let s = '';
  for (const c of data) {
    const sc = s + String.fromCharCode(c);
    if (table.has(sc)) {
      s = sc;
      continue;
    }
    writeCode(table.get(s)!);
    if (nextCode < 4096) {
      table.set(sc, nextCode++);
      if (nextCode > 1 << codeSize) codeSize++;
    }
    s = String.fromCharCode(c);
  }
  if (s !== '') writeCode(table.get(s)!);
  writeCode(eoiCode);
  if (bitPos > 0) out.push(bits & 0xff);
  return out;
};
