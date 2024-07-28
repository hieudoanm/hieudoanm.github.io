export const getBrightness = (hex: string): boolean => {
  let hexCode: string = hex.startsWith('#') ? hex.substring(1) : hex;
  if (hexCode.length === 3) {
    hexCode = `${hexCode[0]}${hexCode[0]}${hexCode[1]}${hexCode[1]}${hexCode[2]}${hexCode[2]}`;
  }
  const rgb: number = parseInt(hexCode, 16);
  const r: number = (rgb >> 16) & 0xff;
  const g: number = (rgb >> 8) & 0xff;
  const b: number = (rgb >> 0) & 0xff;
  const luma: number = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma < 186;
};

export const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return `#${n.slice(0, 6)}`;
};

export const componentToHex = (code: number): string => {
  const hex: string = code.toString(16);
  return hex.length === 1 ? `${hex}${hex}` : hex;
};

export const rgbToHex = (
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
  const r: string = componentToHex(red);
  const g: string = componentToHex(green);
  const b: string = componentToHex(blue);
  return `#${r}${g}${b}`;
};

export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
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

export const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const cmykToHex = ({
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
  const rgb = cmykToRgb({ c, m, y, k });
  const hex: string = rgbToHex(rgb.r, rgb.g, rgb.b);
  return hex;
};

const cmykToRgb = ({
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
