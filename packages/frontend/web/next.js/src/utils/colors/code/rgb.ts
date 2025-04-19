export const component2hex = (code: number): string => {
  const hex: string = code.toString(16);
  return hex.length === 1 ? `${hex}${hex}` : hex;
};

export const rgb2hex = (
  red: number = 0,
  green: number = 0,
  blue: number = 0
): string => {
  const min = 0;
  const max = 255;
  if (red > max) red = max;
  if (green > max) green = max;
  if (blue > max) blue = max;
  if (red < min) red = min;
  if (green < min) green = min;
  if (blue < min) blue = min;
  const r: string = component2hex(red);
  const g: string = component2hex(green);
  const b: string = component2hex(blue);
  return `#${r}${g}${b}`;
};

export const rgb2hsl = ({
  r = 0,
  g = 0,
  b = 0,
}: {
  r: number;
  g: number;
  b: number;
}): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / delta + 2) * 60;
        break;
      case b:
        h = ((r - g) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const rgb2cmyk = ({
  r = 0,
  g = 0,
  b = 0,
}: {
  r: number;
  g: number;
  b: number;
}): { c: number; m: number; y: number; k: number } => {
  // Normalize RGB to 0–1
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  // Calculate K (black)
  const K = 1 - Math.max(R, G, B);

  // Handle black special case
  if (K === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  // Calculate CMY
  const C = (1 - R - K) / (1 - K);
  const M = (1 - G - K) / (1 - K);
  const Y = (1 - B - K) / (1 - K);

  return {
    c: Math.round(C * 100),
    m: Math.round(M * 100),
    y: Math.round(Y * 100),
    k: Math.round(K * 100),
  };
};
