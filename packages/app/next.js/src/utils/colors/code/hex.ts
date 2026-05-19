export const hex2rgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const regex: RegExp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const result: RegExpExecArray | null = regex.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const hex2hsl = (hex: string): { h: number; s: number; l: number } => {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand form (e.g. "f00") to full form ("ff0000")
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  h = Math.round(h);
  s = Math.round(s * 100);
  const lRounded = Math.round(l * 100);

  return { h, s, l: lRounded };
};

export const hex2cmyk = (
  hex: string
): { c: number; m: number; y: number; k: number } => {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand (e.g. "f00") to full form ("ff0000")
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert RGB to CMY
  const c = 1 - r;
  const m = 1 - g;
  const y = 1 - b;

  // Calculate K (black key)
  const k = Math.min(c, m, y);

  // Avoid divide by zero
  const denom = 1 - k || 1;

  // Final CMYK values (in percentages)
  return {
    c: Math.round(((c - k) / denom) * 100),
    m: Math.round(((m - k) / denom) * 100),
    y: Math.round(((y - k) / denom) * 100),
    k: Math.round(k * 100),
  };
};

export const hex2oklch = (hex: string): { l: number; c: number; h: number } => {
  // 1. Hex → RGB (0–1 range)
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // 2. Convert to linear RGB
  const linearize = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);

  // 3. Linear RGB → OKLab
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // 4. OKLab → OKLCH
  const C = Math.sqrt(a * a + b2 * b2);
  const H = Math.atan2(b2, a) * (180 / Math.PI);
  const h = (H + 360) % 360; // Ensure positive hue

  return {
    l: parseFloat(L.toFixed(4)),
    c: parseFloat(C.toFixed(4)),
    h: parseFloat(h.toFixed(2)),
  };
};
