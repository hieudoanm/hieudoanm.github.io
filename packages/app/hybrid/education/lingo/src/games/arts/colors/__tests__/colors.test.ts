import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hexToHsl,
  hslToRgb,
  hslToHex,
  hexToHsv,
  hsvToRgb,
  hsvToHex,
  hexToCmyk,
  cmykToRgb,
  cmykToHex,
  luminance,
  contrastRatio,
  contrastPasses,
  colorSchemes,
  parseColor,
  mixColors,
  tint,
  shade,
  tone,
  composite,
  colorTemperature,
  kelvinToHex,
  randomColor,
  randomPalette,
  shadesAndTints,
  simulateColorBlindness,
  gradientCss,
} from '../colors';

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('parses 3-digit hex', () => {
    expect(hexToRgb('#0af')).toEqual({ r: 0, g: 170, b: 255 });
  });

  it('accepts hex without a hash prefix', () => {
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('is case-insensitive', () => {
    expect(hexToRgb('#ABCDEF')).toEqual({ r: 171, g: 205, b: 239 });
  });

  it('returns null for invalid input', () => {
    expect(hexToRgb('#gggggg')).toBeNull();
    expect(hexToRgb('#12345')).toBeNull();
    expect(hexToRgb('')).toBeNull();
  });
});

describe('rgbToHex', () => {
  it('formats rgb as lowercase hex with hash', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
  });

  it('pads single-digit channels', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });

  it('clamps out-of-range channels', () => {
    expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe('#ff0080');
  });
});

describe('rgbToHsl', () => {
  it('converts black to lightness 0', () => {
    expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 });
  });

  it('converts white to lightness 100', () => {
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({
      h: 0,
      s: 0,
      l: 100,
    });
  });

  it('converts a pure red to hue 0', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });

  it('converts a pure green to hue 120', () => {
    expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
  });

  it('converts a pure blue to hue 240', () => {
    expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
  });
});

describe('hslToRgb and hslToHex round-trip', () => {
  it('round-trips red', () => {
    expect(hexToHsl('#ff0000')).toEqual({ h: 0, s: 100, l: 50 });
    const rgb = hslToRgb({ h: 0, s: 100, l: 50 });
    expect(rgbToHex(rgb)).toBe('#ff0000');
  });

  it('round-trips a mid-tone color', () => {
    const hsl = hexToHsl('#6366f1');
    expect(hsl).not.toBeNull();
    expect(hsl!.h).toBe(239);
    expect(hsl!.s).toBe(84);
    expect(hsl!.l).toBe(67);
  });

  it('handles grayscale saturation of zero', () => {
    expect(hslToRgb({ h: 120, s: 0, l: 50 })).toEqual({
      r: 128,
      g: 128,
      b: 128,
    });
  });

  it('normalizes negative hue', () => {
    expect(hslToHex({ h: -120, s: 100, l: 50 })).toBe('#0000ff');
  });
});

describe('hexToHsv and hsvToRgb', () => {
  it('converts red', () => {
    expect(hexToHsv('#ff0000')).toEqual({ h: 0, s: 100, v: 100 });
  });

  it('converts black', () => {
    expect(hexToHsv('#000000')).toEqual({ h: 0, s: 0, v: 0 });
  });

  it('converts a mid-tone color to hsv', () => {
    expect(hexToHsv('#123456')).toEqual({ h: 210, s: 79, v: 34 });
  });
});

describe('hexToCmyk and cmykToRgb', () => {
  it('converts pure cyan', () => {
    expect(hexToCmyk('#00ffff')).toEqual({ c: 100, m: 0, y: 0, k: 0 });
  });

  it('converts black to k=100', () => {
    expect(hexToCmyk('#000000')).toEqual({ c: 0, m: 0, y: 0, k: 100 });
  });

  it('converts red to cmyk', () => {
    expect(hexToCmyk('#ff0000')).toEqual({ c: 0, m: 100, y: 100, k: 0 });
  });

  it('round-trips via cmykToRgb within tolerance', () => {
    const cmyk = hexToCmyk('#123456')!;
    const reHex = rgbToHex(cmykToRgb(cmyk));
    const original = hexToCmyk(reHex)!;
    expect(Math.abs(original.c - cmyk.c)).toBeLessThanOrEqual(1);
    expect(Math.abs(original.m - cmyk.m)).toBeLessThanOrEqual(1);
    expect(Math.abs(original.y - cmyk.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(original.k - cmyk.k)).toBeLessThanOrEqual(1);
  });
});

describe('luminance and contrastRatio', () => {
  it('computes zero luminance for black', () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 5);
  });

  it('computes ~1 luminance for white', () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 3);
  });

  it('returns high contrast between black and white', () => {
    const ratio = contrastRatio('#000000', '#ffffff');
    expect(ratio).toBeGreaterThan(20);
  });

  it('returns 0 for invalid colors', () => {
    expect(contrastRatio('nope', '#ffffff')).toBe(0);
  });
});

describe('contrastPasses', () => {
  it('AA normal text requires 4.5', () => {
    expect(contrastPasses(4.5, 'AA', false)).toBe(true);
    expect(contrastPasses(4.4, 'AA', false)).toBe(false);
  });

  it('AA large text requires 3', () => {
    expect(contrastPasses(3, 'AA', true)).toBe(true);
    expect(contrastPasses(2.9, 'AA', true)).toBe(false);
  });

  it('AAA normal text requires 7', () => {
    expect(contrastPasses(7, 'AAA', false)).toBe(true);
    expect(contrastPasses(6.9, 'AAA', false)).toBe(false);
  });

  it('AAA large text requires 4.5', () => {
    expect(contrastPasses(4.5, 'AAA', true)).toBe(true);
    expect(contrastPasses(4.4, 'AAA', true)).toBe(false);
  });
});

describe('colorSchemes', () => {
  it('returns null for invalid base', () => {
    expect(colorSchemes('nope')).toBeNull();
  });

  it('returns a complement that differs by 180 degrees', () => {
    const base = '#ff0000';
    const schemes = colorSchemes(base)!;
    expect(schemes.complement).toBe('#00ffff');
  });

  it('analogous has three entries', () => {
    expect(colorSchemes('#6366f1')!.analogous).toHaveLength(3);
  });

  it('triadic has three entries', () => {
    expect(colorSchemes('#6366f1')!.triadic).toHaveLength(3);
  });

  it('monochromatic has five entries', () => {
    expect(colorSchemes('#6366f1')!.monochromatic).toHaveLength(5);
  });
});

describe('parseColor', () => {
  it('parses a hex input', () => {
    expect(parseColor('#ff0000')!.hex).toBe('#ff0000');
  });

  it('parses an rgb input', () => {
    expect(parseColor('rgb(0, 128, 255)')!.hex).toBe('#0080ff');
  });

  it('parses an hsl input', () => {
    expect(parseColor('hsl(120, 100%, 50%)')!.hex).toBe('#00ff00');
  });

  it('returns null for unsupported input', () => {
    expect(parseColor('not-a-color')).toBeNull();
  });
});

describe('mixColors, tint, shade, tone', () => {
  it('mixes at the midpoint', () => {
    expect(mixColors('#000000', '#ffffff', 0.5)).toBe('#808080');
  });

  it('returns first color when weight is 0', () => {
    expect(mixColors('#ff0000', '#00ff00', 0)).toBe('#ff0000');
  });

  it('returns second color when weight is 1', () => {
    expect(mixColors('#ff0000', '#00ff00', 1)).toBe('#00ff00');
  });

  it('returns first color for invalid second color', () => {
    expect(mixColors('#ff0000', 'xyz')).toBe('#ff0000');
  });

  it('lightens with tint', () => {
    const result = tint('#000000', 0.5);
    expect(result).toBe('#808080');
  });

  it('darkens with shade', () => {
    const result = shade('#ffffff', 0.5);
    expect(result).toBe('#808080');
  });

  it('mutes with tone toward gray', () => {
    const result = tone('#ff0000', 1);
    expect(result).toBe('#808080');
  });
});

describe('composite', () => {
  it('blends foreground over background', () => {
    expect(composite('#000000', '#ffffff', 0.5)).toBe('#808080');
  });

  it('full opacity returns the foreground', () => {
    expect(composite('#123456', '#ffffff', 1)).toBe('#123456');
  });

  it('zero opacity returns the background', () => {
    expect(composite('#123456', '#ffffff', 0)).toBe('#ffffff');
  });

  it('returns foreground for invalid background', () => {
    expect(composite('#123456', 'xyz')).toBe('#123456');
  });
});

describe('colorTemperature', () => {
  it('classifies a red as warm', () => {
    expect(colorTemperature('#ff0000')).toBe('warm');
  });

  it('classifies a blue as cool', () => {
    expect(colorTemperature('#0000ff')).toBe('cool');
  });

  it('classifies low-saturation as neutral', () => {
    expect(colorTemperature('#808080')).toBe('neutral');
  });

  it('returns neutral for invalid color', () => {
    expect(colorTemperature('xyz')).toBe('neutral');
  });
});

describe('simulateColorBlindness', () => {
  it('returns the input for an invalid color', () => {
    expect(simulateColorBlindness('xyz', 'protanopia')).toBe('xyz');
  });

  it('clamps simulated channels to valid range', () => {
    const result = simulateColorBlindness('#ff0000', 'protanopia');
    expect(hexToRgb(result)).not.toBeNull();
  });
});

describe('gradientCss', () => {
  it('builds a linear gradient', () => {
    expect(gradientCss(['#000', '#fff'], 90)).toBe(
      'linear-gradient(90deg, #000, #fff)'
    );
  });

  it('builds a radial gradient', () => {
    expect(gradientCss(['#000', '#fff'], 135, true)).toBe(
      'radial-gradient(circle at center, #000, #fff)'
    );
  });

  it('uses the default angle of 135', () => {
    expect(gradientCss(['#000', '#fff'])).toBe(
      'linear-gradient(135deg, #000, #fff)'
    );
  });
});

describe('kelvinToHex', () => {
  it('produces a warm orange for a low kelvin value', () => {
    const result = kelvinToHex(1000);
    const rgb = hexToRgb(result)!;
    expect(rgb.r).toBeGreaterThan(rgb.b);
  });

  it('produces a cool blue for a high kelvin value', () => {
    const result = kelvinToHex(10000);
    const rgb = hexToRgb(result)!;
    expect(rgb.b).toBeGreaterThanOrEqual(rgb.r);
  });

  it('produces a neutral-ish white at midday', () => {
    const result = kelvinToHex(6500);
    expect(hexToRgb(result)).not.toBeNull();
  });

  it('clamps the input to the supported range', () => {
    const low = hexToRgb(kelvinToHex(1))!;
    const high = hexToRgb(kelvinToHex(50000))!;
    expect(low.b).toBe(0);
    expect(high.b).toBe(255);
  });
});

describe('randomColor', () => {
  it('returns a valid 6-digit hex color string', () => {
    expect(randomColor()).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('randomPalette', () => {
  it('returns an array with the requested count', () => {
    const palette = randomPalette(5);
    expect(palette).toHaveLength(5);
  });

  it('defaults to five colors', () => {
    expect(randomPalette()).toHaveLength(5);
  });

  it('produces valid hex colors', () => {
    expect(randomPalette(3).every((c) => /^#[0-9a-f]{6}$/.test(c))).toBe(true);
  });
});

describe('shadesAndTints', () => {
  it('returns the requested number of steps', () => {
    expect(shadesAndTints('#ff0000', 9)).toHaveLength(9);
  });

  it('keeps the base color in the middle', () => {
    const scale = shadesAndTints('#123456', 9);
    expect(scale[4]).toBe('#123456');
  });

  it('defaults to nine steps', () => {
    expect(shadesAndTints('#ff0000')).toHaveLength(9);
  });
});

describe('hsvToHex and cmykToHex conversions', () => {
  it('converts an hsv value to hex', () => {
    expect(hsvToHex({ h: 0, s: 100, v: 100 })).toBe('#ff0000');
  });

  it('converts a cmyk value to hex', () => {
    expect(cmykToHex({ c: 100, m: 0, y: 0, k: 0 })).toBe('#00ffff');
  });
});
