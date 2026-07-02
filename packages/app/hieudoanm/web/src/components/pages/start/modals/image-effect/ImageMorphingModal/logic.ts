export interface Point {
  x: number;
  y: number;
}

export interface Grid2D {
  rows: number;
  cols: number;
  points: Point[][];
}

export const createUniformGrid = (rows: number, cols: number): Grid2D => {
  const points: Point[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Point[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        x: rows === 1 ? 0.5 : c / (cols - 1),
        y: cols === 1 ? 0.5 : r / (rows - 1),
      });
    }
    points.push(row);
  }
  return { rows, cols, points };
};

export const copyGrid = (grid: Grid2D): Grid2D => ({
  rows: grid.rows,
  cols: grid.cols,
  points: grid.points.map((row) => row.map((p) => ({ ...p }))),
});

export const findNearestPoint = (
  grid: Grid2D,
  cx: number,
  cy: number,
  radius: number
): { row: number; col: number } | null => {
  let best: { row: number; col: number } | null = null;
  let bestDist = Infinity;
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      const dx = grid.points[r][c].x - cx;
      const dy = grid.points[r][c].y - cy;
      const d = dx * dx + dy * dy;
      if (d < bestDist && d <= radius * radius) {
        bestDist = d;
        best = { row: r, col: c };
      }
    }
  }
  return best;
};

export const bilinearSample = (
  data: ImageData,
  fx: number,
  fy: number
): [number, number, number, number] => {
  const w = data.width;
  const h = data.height;
  const x = Math.max(0, Math.min(w - 1, fx));
  const y = Math.max(0, Math.min(h - 1, fy));
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, w - 1);
  const y1 = Math.min(y0 + 1, h - 1);
  const sx = x - x0;
  const sy = y - y0;
  const d = data.data;
  const i00 = (y0 * w + x0) * 4;
  const i10 = (y0 * w + x1) * 4;
  const i01 = (y1 * w + x0) * 4;
  const i11 = (y1 * w + x1) * 4;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  return [
    lerp(lerp(d[i00], d[i10], sx), lerp(d[i01], d[i11], sx), sy),
    lerp(
      lerp(d[i00 + 1], d[i10 + 1], sx),
      lerp(d[i01 + 1], d[i11 + 1], sx),
      sy
    ),
    lerp(
      lerp(d[i00 + 2], d[i10 + 2], sx),
      lerp(d[i01 + 2], d[i11 + 2], sx),
      sy
    ),
    lerp(
      lerp(d[i00 + 3], d[i10 + 3], sx),
      lerp(d[i01 + 3], d[i11 + 3], sx),
      sy
    ),
  ];
};

const inverseBilinear = (
  px: number,
  py: number,
  p00: Point,
  p10: Point,
  p01: Point,
  p11: Point
): [number, number] | null => {
  const a = p10.x - p00.x;
  const b = p01.x - p00.x;
  const c = p11.x - p10.x - p01.x + p00.x;
  const d = px - p00.x;
  const e = p10.y - p00.y;
  const f = p01.y - p00.y;
  const g = p11.y - p10.y - p01.y + p00.y;
  const h = py - p00.y;

  const eps = 1e-10;
  let u = 0;

  const A = e * c - a * g;
  const B = e * b - a * f + d * g - h * c;
  const C = d * f - h * b;

  if (Math.abs(A) < eps) {
    if (Math.abs(B) < eps) return null;
    u = -C / B;
  } else {
    const disc = B * B - 4 * A * C;
    if (disc < 0) return null;
    const sqrtDisc = Math.sqrt(disc);
    const u1 = (-B + sqrtDisc) / (2 * A);
    const u2 = (-B - sqrtDisc) / (2 * A);
    u = u1 >= 0 && u1 <= 1 ? u1 : u2;
  }

  u = Math.max(0, Math.min(1, u));

  const denomB = b + u * c;
  const denomF = f + u * g;
  let v: number;

  if (Math.abs(denomB) > eps) {
    v = (d - u * a) / denomB;
  } else if (Math.abs(denomF) > eps) {
    v = (h - u * e) / denomF;
  } else {
    return null;
  }

  v = Math.max(0, Math.min(1, v));
  return [u, v];
};

const sampleAtUV = (
  data: ImageData,
  grid: Grid2D,
  r: number,
  c: number,
  u: number,
  v: number
): [number, number, number, number] => {
  const tl = grid.points[r][c];
  const tr = grid.points[r][c + 1];
  const bl = grid.points[r + 1][c];
  const br = grid.points[r + 1][c + 1];
  const sx =
    (1 - u) * (1 - v) * tl.x +
    u * (1 - v) * tr.x +
    (1 - u) * v * bl.x +
    u * v * br.x;
  const sy =
    (1 - u) * (1 - v) * tl.y +
    u * (1 - v) * tr.y +
    (1 - u) * v * bl.y +
    u * v * br.y;
  return bilinearSample(data, sx * (data.width - 1), sy * (data.height - 1));
};

export const morphFrame = (
  srcData: ImageData,
  tgtData: ImageData,
  srcGrid: Grid2D,
  tgtGrid: Grid2D,
  outWidth: number,
  outHeight: number,
  t: number
): ImageData => {
  const out = new ImageData(outWidth, outHeight);
  const outD = out.data;

  for (let r = 0; r < srcGrid.rows - 1; r++) {
    for (let c = 0; c < srcGrid.cols - 1; c++) {
      const itl = {
        x: (1 - t) * srcGrid.points[r][c].x + t * tgtGrid.points[r][c].x,
        y: (1 - t) * srcGrid.points[r][c].y + t * tgtGrid.points[r][c].y,
      };
      const itr = {
        x:
          (1 - t) * srcGrid.points[r][c + 1].x + t * tgtGrid.points[r][c + 1].x,
        y:
          (1 - t) * srcGrid.points[r][c + 1].y + t * tgtGrid.points[r][c + 1].y,
      };
      const ibl = {
        x:
          (1 - t) * srcGrid.points[r + 1][c].x + t * tgtGrid.points[r + 1][c].x,
        y:
          (1 - t) * srcGrid.points[r + 1][c].y + t * tgtGrid.points[r + 1][c].y,
      };
      const ibr = {
        x:
          (1 - t) * srcGrid.points[r + 1][c + 1].x +
          t * tgtGrid.points[r + 1][c + 1].x,
        y:
          (1 - t) * srcGrid.points[r + 1][c + 1].y +
          t * tgtGrid.points[r + 1][c + 1].y,
      };

      const minX = Math.max(
        0,
        Math.floor(Math.min(itl.x, itr.x, ibl.x, ibr.x) * outWidth)
      );
      const maxX = Math.min(
        outWidth - 1,
        Math.ceil(Math.max(itl.x, itr.x, ibl.x, ibr.x) * outWidth)
      );
      const minY = Math.max(
        0,
        Math.floor(Math.min(itl.y, itr.y, ibl.y, ibr.y) * outHeight)
      );
      const maxY = Math.min(
        outHeight - 1,
        Math.ceil(Math.max(itl.y, itr.y, ibl.y, ibr.y) * outHeight)
      );

      for (let py = minY; py <= maxY; py++) {
        for (let px = minX; px <= maxX; px++) {
          const idx = (py * outWidth + px) * 4;
          if (outD[idx + 3]) continue;

          const nx = px / outWidth;
          const ny = py / outHeight;

          const uv = inverseBilinear(nx, ny, itl, itr, ibl, ibr);
          if (!uv) continue;

          const [u, v] = uv;
          const [sr, sg, sb] = sampleAtUV(srcData, srcGrid, r, c, u, v);
          const [tr, tg, tb] = sampleAtUV(tgtData, tgtGrid, r, c, u, v);
          outD[idx] = (1 - t) * sr + t * tr;
          outD[idx + 1] = (1 - t) * sg + t * tg;
          outD[idx + 2] = (1 - t) * sb + t * tb;
          outD[idx + 3] = 255;
        }
      }
    }
  }

  return out;
};

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
