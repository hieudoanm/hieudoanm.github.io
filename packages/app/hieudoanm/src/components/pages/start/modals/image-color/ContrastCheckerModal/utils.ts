export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const num = Number.parseInt(clean, 16);
  if (Number.isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

export const linearize = (c: number): number => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

export const luminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (
    0.2126 * linearize(rgb.r) +
    0.7152 * linearize(rgb.g) +
    0.0722 * linearize(rgb.b)
  );
};

export const contrastRatio = (fg: string, bg: string): number => {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export const formatRatio = (ratio: number): string => {
  return `${ratio.toFixed(2)}:1`;
};

export type Level = { pass: boolean; label: string };

export const getLevels = (fg: string, bg: string): Level[] => {
  const ratio = contrastRatio(fg, bg);
  return [
    { pass: ratio >= 3, label: 'AA Large (≥ 3:1)' },
    { pass: ratio >= 4.5, label: 'AA Normal (≥ 4.5:1)' },
    { pass: ratio >= 4.5, label: 'AAA Large (≥ 4.5:1)' },
    { pass: ratio >= 7, label: 'AAA Normal (≥ 7:1)' },
  ];
};

export const formatHex = (input: string): string => {
  const clean = input.replace('#', '');
  if (clean.length === 3) {
    return `#${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`;
  }
  return `#${clean.padEnd(6, '0').slice(0, 6)}`;
};
