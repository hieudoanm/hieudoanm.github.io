export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export interface Hsv {
  h: number;
  s: number;
  v: number;
}

export interface Cmyk {
  c: number;
  m: number;
  y: number;
  k: number;
}

export type ColorBlindnessType = 'protanopia' | 'deuteranopia' | 'tritanopia';

export interface ParsedColor {
  hex: string;
  rgb: Rgb;
  hsl: Hsl;
}

export interface ColorSchemeSet {
  complement: string;
  analogous: string[];
  triadic: string[];
  monochromatic: string[];
}

const clamp = (value: number, min = 0, max = 255): number =>
  Math.min(max, Math.max(min, value));

const toHex = (channel: number): string =>
  clamp(Math.round(channel)).toString(16).padStart(2, '0');

export const hexToRgb = (hex: string): Rgb | null => {
  const value = hex.trim().replace(/^#/, '');
  if (!/^[0-9a-f]{3}$/i.test(value) && !/^[0-9a-f]{6}$/i.test(value)) {
    return null;
  }
  const full =
    value.length === 3
      ? value
          .split('')
          .map((char) => char + char)
          .join('')
      : value;
  const number = parseInt(full, 16);
  return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 };
};

export const rgbToHex = ({ r, g, b }: Rgb): string =>
  `#${toHex(r)}${toHex(g)}${toHex(b)}`;

export const rgbToHsl = ({ r, g, b }: Rgb): Hsl => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;
  let hue = 0;
  let saturation = 0;
  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    if (max === red) {
      hue = ((green - blue) / delta) % 6;
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }
  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
};

const hueChannel = (p: number, q: number, t: number): number => {
  let position = t;
  if (position < 0) {
    position += 1;
  }
  if (position > 1) {
    position -= 1;
  }
  if (position < 1 / 6) {
    return p + (q - p) * 6 * position;
  }
  if (position < 1 / 2) {
    return q;
  }
  if (position < 2 / 3) {
    return p + (q - p) * (2 / 3 - position) * 6;
  }
  return p;
};

export const hslToRgb = ({ h, s, l }: Hsl): Rgb => {
  const hue = (((h % 360) + 360) % 360) / 360;
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;
  if (saturation === 0) {
    const value = Math.round(lightness * 255);
    return { r: value, g: value, b: value };
  }
  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  return {
    r: Math.round(hueChannel(p, q, hue + 1 / 3) * 255),
    g: Math.round(hueChannel(p, q, hue) * 255),
    b: Math.round(hueChannel(p, q, hue - 1 / 3) * 255),
  };
};

export const hexToHsl = (hex: string): Hsl | null => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb) : null;
};

export const hslToHex = (hsl: Hsl): string => rgbToHex(hslToRgb(hsl));

export const parseColor = (input: string): ParsedColor | null => {
  const value = input.trim().toLowerCase();
  const hexMatch = value.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hexMatch) {
    const rgb = hexToRgb(value);
    if (rgb) {
      const hex = rgbToHex(rgb);
      return { hex, rgb, hsl: rgbToHsl(rgb) };
    }
  }
  const rgbMatch = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const rgb: Rgb = {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
    const hex = rgbToHex(rgb);
    return { hex, rgb, hsl: rgbToHsl(rgb) };
  }
  const hslMatch = value.match(
    /^hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*/
  );
  if (hslMatch) {
    const hsl: Hsl = {
      h: Number(hslMatch[1]),
      s: Number(hslMatch[2]),
      l: Number(hslMatch[3]),
    };
    const rgb = hslToRgb(hsl);
    return { hex: rgbToHex(rgb), rgb, hsl };
  }
  return null;
};

const toLinear = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
};

export const luminance = ({ r, g, b }: Rgb): number =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

export const contrastRatio = (first: string, second: string): number => {
  const a = hexToRgb(first);
  const b = hexToRgb(second);
  if (!a || !b) {
    return 0;
  }
  const firstLuminance = luminance(a);
  const secondLuminance = luminance(b);
  const light = Math.max(firstLuminance, secondLuminance);
  const dark = Math.min(firstLuminance, secondLuminance);
  return (light + 0.05) / (dark + 0.05);
};

export const contrastPasses = (
  ratio: number,
  level: 'AA' | 'AAA',
  large: boolean
): boolean => {
  let threshold = 7;
  if (level === 'AA') {
    threshold = large ? 3 : 4.5;
  } else if (large) {
    threshold = 4.5;
  }
  return ratio >= threshold;
};

export const colorSchemes = (base: string): ColorSchemeSet | null => {
  const hsl = hexToHsl(base);
  if (!hsl) {
    return null;
  }
  const shift = (amount: number): string =>
    hslToHex({ ...hsl, h: (((hsl.h + amount) % 360) + 360) % 360 });
  return {
    complement: shift(180),
    analogous: [shift(-30), shift(0), shift(30)],
    triadic: [shift(0), shift(120), shift(240)],
    monochromatic: [
      hslToHex({ ...hsl, l: Math.max(0, hsl.l - 30) }),
      hslToHex({ ...hsl, l: Math.max(0, hsl.l - 15) }),
      hslToHex(hsl),
      hslToHex({ ...hsl, l: Math.min(100, hsl.l + 15) }),
      hslToHex({ ...hsl, l: Math.min(100, hsl.l + 30) }),
    ],
  };
};

export const randomPalette = (count = 5): string[] => {
  const hue = Math.floor(Math.random() * 360);
  const secondary = (hue + 40 + Math.floor(Math.random() * 80)) % 360;
  return Array.from({ length: count }, (_, index) => {
    const baseHue = index % 2 === 0 ? hue : secondary;
    return hslToHex({
      h: (baseHue + index * 12) % 360,
      s: 45 + Math.floor(Math.random() * 30),
      l: 35 + Math.floor(Math.random() * 35),
    });
  });
};

export const mixColors = (
  first: string,
  second: string,
  weight = 0.5
): string => {
  const a = hexToRgb(first);
  const b = hexToRgb(second);
  if (!a || !b) {
    return first;
  }
  const t = clamp(weight, 0, 1);
  return rgbToHex({
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  });
};

export const shadesAndTints = (base: string, count = 9): string[] => {
  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, index) => {
    const delta = (index - mid) / mid;
    if (delta < 0) {
      return mixColors(base, '#000000', -delta);
    }
    if (delta > 0) {
      return mixColors(base, '#ffffff', delta);
    }
    return base;
  });
};

export const tint = (base: string, weight = 0.5): string =>
  mixColors(base, '#ffffff', weight);

export const shade = (base: string, weight = 0.5): string =>
  mixColors(base, '#000000', weight);

export const tone = (base: string, weight = 0.5): string =>
  mixColors(base, '#808080', weight);

export const composite = (
  foreground: string,
  background: string,
  alpha = 0.5
): string => {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) {
    return foreground;
  }
  const blend = (channel: number, backdrop: number): number =>
    Math.round(channel * alpha + backdrop * (1 - alpha));
  return rgbToHex({
    r: blend(fg.r, bg.r),
    g: blend(fg.g, bg.g),
    b: blend(fg.b, bg.b),
  });
};

export const colorTemperature = (hex: string): 'warm' | 'cool' | 'neutral' => {
  const hsl = hexToHsl(hex);
  if (!hsl) {
    return 'neutral';
  }
  if (hsl.s < 15) {
    return 'neutral';
  }
  if (hsl.h <= 60 || hsl.h >= 330) {
    return 'warm';
  }
  return 'cool';
};

export const kelvinToHex = (kelvin: number): string => {
  const k = clamp(kelvin, 1000, 10000) / 100;
  let red: number;
  let green: number;
  let blue: number;
  if (k <= 66) {
    red = 255;
  } else {
    red = 329.698727446 * Math.pow(k - 60, -0.1332047592);
  }
  if (k <= 66) {
    green = 99.4708025861 * Math.log(k) - 161.1195681661;
  } else {
    green = 288.1221695283 * Math.pow(k - 60, -0.0755148492);
  }
  if (k >= 66) {
    blue = 255;
  } else if (k <= 19) {
    blue = 0;
  } else {
    blue = 138.5177312231 * Math.log(k - 10) - 305.0447927307;
  }
  return rgbToHex({
    r: Math.round(red),
    g: Math.round(green),
    b: Math.round(blue),
  });
};

export const randomColor = (): string =>
  hslToHex({
    h: Math.floor(Math.random() * 360),
    s: 50 + Math.floor(Math.random() * 40),
    l: 35 + Math.floor(Math.random() * 40),
  });

export const rgbToHsv = ({ r, g, b }: Rgb): Hsv => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;
  if (delta !== 0) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6;
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }
  const saturation = max === 0 ? 0 : (delta / max) * 100;
  return {
    h: Math.round(hue),
    s: Math.round(saturation),
    v: Math.round(max * 100),
  };
};

export const hsvToRgb = ({ h, s, v }: Hsv): Rgb => {
  const hue = (((h % 360) + 360) % 360) / 60;
  const saturation = clamp(s, 0, 100) / 100;
  const value = clamp(v, 0, 100) / 100;
  const chroma = value * saturation;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));
  const m = value - chroma;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hue < 1) {
    r = chroma;
    g = x;
  } else if (hue < 2) {
    r = x;
    g = chroma;
  } else if (hue < 3) {
    g = chroma;
    b = x;
  } else if (hue < 4) {
    g = x;
    b = chroma;
  } else if (hue < 5) {
    r = x;
    b = chroma;
  } else {
    r = chroma;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

export const hexToHsv = (hex: string): Hsv | null => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsv(rgb) : null;
};

export const hsvToHex = (hsv: Hsv): string => rgbToHex(hsvToRgb(hsv));

export const rgbToCmyk = ({ r, g, b }: Rgb): Cmyk => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const black = 1 - Math.max(red, green, blue);
  if (black >= 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const denominator = 1 - black;
  return {
    c: Math.round(((1 - red - black) / denominator) * 100),
    m: Math.round(((1 - green - black) / denominator) * 100),
    y: Math.round(((1 - blue - black) / denominator) * 100),
    k: Math.round(black * 100),
  };
};

export const cmykToRgb = ({ c, m, y, k }: Cmyk): Rgb => {
  const cc = clamp(c, 0, 100) / 100;
  const mm = clamp(m, 0, 100) / 100;
  const yy = clamp(y, 0, 100) / 100;
  const kk = clamp(k, 0, 100) / 100;
  return {
    r: Math.round(255 * (1 - cc) * (1 - kk)),
    g: Math.round(255 * (1 - mm) * (1 - kk)),
    b: Math.round(255 * (1 - yy) * (1 - kk)),
  };
};

export const hexToCmyk = (hex: string): Cmyk | null => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToCmyk(rgb) : null;
};

export const cmykToHex = (cmyk: Cmyk): string => rgbToHex(cmykToRgb(cmyk));

const BLINDNESS_MATRICES: Record<
  ColorBlindnessType,
  [number, number, number][]
> = {
  protanopia: [
    [0.56667, 0.43333, 0],
    [0.55833, 0.44167, 0],
    [0, 0.24167, 0.75833],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.43333, 0.56667],
    [0, 0.475, 0.525],
  ],
};

export const simulateColorBlindness = (
  hex: string,
  type: ColorBlindnessType
): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return hex;
  }
  const matrix = BLINDNESS_MATRICES[type];
  const result = matrix.map((row) =>
    Math.round(row[0] * rgb.r + row[1] * rgb.g + row[2] * rgb.b)
  );
  return rgbToHex({
    r: clamp(result[0]),
    g: clamp(result[1]),
    b: clamp(result[2]),
  });
};

export const gradientCss = (
  colors: string[],
  angle = 135,
  radial = false
): string =>
  radial
    ? `radial-gradient(circle at center, ${colors.join(', ')})`
    : `linear-gradient(${angle}deg, ${colors.join(', ')})`;
