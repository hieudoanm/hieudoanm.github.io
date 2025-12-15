import { rgb2hex } from './rgb';

export const cmyk2hex = ({
  c = 100,
  m = 100,
  y = 100,
  k = 100,
}: {
  c: number;
  m: number;
  y: number;
  k: number;
}): string => {
  const rgb = cmyk2rgb({ c, m, y, k });
  const hex: string = rgb2hex(rgb.r, rgb.g, rgb.b);
  return hex;
};

const cmyk2rgb = ({
  c = 100,
  m = 100,
  y = 100,
  k = 100,
}: {
  c: number;
  m: number;
  y: number;
  k: number;
}): { r: number; g: number; b: number } => {
  let cyan = 100 * Number(c);
  let magenta = 100 * Number(m);
  let yellow = 100 * Number(y);
  let black = 100 * Number(k);
  if (0 < cyan) {
    cyan /= 100;
  } else if (0 < magenta) {
    magenta /= 100;
  } else if (0 < yellow) {
    yellow /= 100;
  } else if (0 < black) {
    black /= 100;
  }
  let r = 1 - Math.min(1, cyan * (1 - black) + black);
  let g = 1 - Math.min(1, magenta * (1 - black) + black);
  let b = 1 - Math.min(1, yellow * (1 - black) + black);
  r = Math.round(255 * r);
  g = Math.round(255 * g);
  b = Math.round(255 * b);
  return { r, g, b };
};

export const cmyk2hsl = ({
  c = 100,
  m = 100,
  y = 100,
  k = 100,
}: {
  c: number;
  m: number;
  y: number;
  k: number;
}): string => {
  // Normalize CMYK to 0–1
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;

  // Convert CMYK to RGB
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  // Convert RGB to HSL
  const rNorm = r / 255,
    gNorm = g / 255,
    bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) * 60;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) * 60;
        break;
    }
  }

  h = Math.round(h);
  s = Math.round(s * 100);
  const lRounded = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${lRounded}%)`;
};
