import {
  cmykToHex,
  cmykToRgb,
  colorSchemes,
  colorTemperature,
  composite,
  contrastPasses,
  contrastRatio,
  gradientCss,
  hexToCmyk,
  hexToHsl,
  hexToHsv,
  hexToRgb,
  hslToHex,
  hslToRgb,
  hsvToHex,
  hsvToRgb,
  kelvinToHex,
  luminance,
  mixColors,
  parseColor,
  randomColor,
  randomPalette,
  rgbToHex,
  rgbToHsl,
  shade,
  shadesAndTints,
  simulateColorBlindness,
  tint,
  tone,
} from '../colors';

describe('hexToRgb', () => {
  it('parses six digit hex', () => {
    expect(hexToRgb('#ff0030')).toEqual({ r: 255, g: 0, b: 48 });
    expect(hexToRgb('ff0030')).toEqual({ r: 255, g: 0, b: 48 });
  });

  it('parses shorthand three digit hex', () => {
    expect(hexToRgb('#f03')).toEqual({ r: 255, g: 0, b: 51 });
  });

  it('returns null for invalid hex', () => {
    expect(hexToRgb('#1234')).toBeNull();
    expect(hexToRgb('#gggggg')).toBeNull();
    expect(hexToRgb('')).toBeNull();
  });
});

describe('rgbToHex', () => {
  it('formats channels as lowercase hex', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 48 })).toBe('#ff0030');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
  });

  it('clamps out of range channels', () => {
    expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe('#ff0080');
  });
});

describe('rgbToHsl', () => {
  it.each([
    ['#ff0000', { h: 0, s: 100, l: 50 }],
    ['#00ff00', { h: 120, s: 100, l: 50 }],
    ['#0000ff', { h: 240, s: 100, l: 50 }],
    ['#000000', { h: 0, s: 0, l: 0 }],
    ['#ffffff', { h: 0, s: 0, l: 100 }],
    ['#808080', { h: 0, s: 0, l: 50 }],
    ['#ff0030', { h: 349, s: 100, l: 50 }],
  ])('converts %s to HSL', (hex, expected) => {
    expect(
      rgbToHsl(hexToRgb(hex) as { r: number; g: number; b: number })
    ).toEqual(expected);
  });
});

describe('hslToRgb and hslToHex', () => {
  it.each([
    [
      { h: 0, s: 100, l: 50 },
      { r: 255, g: 0, b: 0 },
    ],
    [
      { h: 120, s: 100, l: 50 },
      { r: 0, g: 255, b: 0 },
    ],
    [
      { h: 240, s: 100, l: 50 },
      { r: 0, g: 0, b: 255 },
    ],
    [
      { h: 0, s: 0, l: 0 },
      { r: 0, g: 0, b: 0 },
    ],
    [
      { h: 0, s: 0, l: 100 },
      { r: 255, g: 255, b: 255 },
    ],
    [
      { h: 0, s: 0, l: 50 },
      { r: 128, g: 128, b: 128 },
    ],
  ])('converts HSL %o to RGB', (hsl, expected) => {
    expect(hslToRgb(hsl)).toEqual(expected);
    expect(hslToHex(hsl)).toBe(rgbToHex(expected));
  });

  it('normalizes hue outside 0-360', () => {
    expect(hslToHex({ h: -120, s: 100, l: 50 })).toBe('#0000ff');
    expect(hslToHex({ h: 540, s: 100, l: 50 })).toBe('#00ffff');
  });
});

describe('hexToHsl', () => {
  it('returns null for invalid input', () => {
    expect(hexToHsl('nope')).toBeNull();
  });
});

describe('parseColor', () => {
  it('parses hex input and normalizes it', () => {
    const parsed = parseColor('#F03');
    expect(parsed).not.toBeNull();
    expect(parsed?.hex).toBe('#ff0033');
    expect(parsed?.rgb).toEqual({ r: 255, g: 0, b: 51 });
    expect(parsed?.hsl).toEqual({ h: 348, s: 100, l: 50 });
  });

  it('parses rgb() input', () => {
    const parsed = parseColor('rgb(255, 0, 48)');
    expect(parsed?.hex).toBe('#ff0030');
  });

  it('parses rgba() input', () => {
    expect(parseColor('rgba(255, 0, 48, 0.5)')?.hex).toBe('#ff0030');
  });

  it('parses hsl() input', () => {
    expect(parseColor('hsl(0, 100%, 50%)')?.hex).toBe('#ff0000');
  });

  it('returns null for invalid input', () => {
    expect(parseColor('notacolor')).toBeNull();
    expect(parseColor('')).toBeNull();
    expect(parseColor('#12345')).toBeNull();
  });
});

describe('contrast', () => {
  it('computes luminance', () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBe(0);
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 2);
  });

  it('computes black on white as 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
  });

  it('computes red on white ratio', () => {
    expect(contrastRatio('#ff0030', '#ffffff')).toBeCloseTo(3.97, 1);
  });

  it('returns 0 for invalid colors', () => {
    expect(contrastRatio('nope', '#ffffff')).toBe(0);
  });

  it('checks AA and AAA thresholds', () => {
    expect(contrastPasses(4.6, 'AA', false)).toBe(true);
    expect(contrastPasses(4.4, 'AA', false)).toBe(false);
    expect(contrastPasses(3.5, 'AA', true)).toBe(true);
    expect(contrastPasses(2.9, 'AA', true)).toBe(false);
    expect(contrastPasses(7.1, 'AAA', false)).toBe(true);
    expect(contrastPasses(6.9, 'AAA', false)).toBe(false);
    expect(contrastPasses(4.6, 'AAA', true)).toBe(true);
    expect(contrastPasses(4.4, 'AAA', true)).toBe(false);
  });
});

describe('colorSchemes', () => {
  const schemes = colorSchemes('#ff0000') as NonNullable<
    ReturnType<typeof colorSchemes>
  >;

  it('builds a complementary color', () => {
    expect(schemes.complement).toBe('#00ffff');
  });

  it('builds analogous colors around the base hue', () => {
    expect(schemes.analogous).toHaveLength(3);
    expect(schemes.analogous[1]).toBe('#ff0000');
  });

  it('builds a triadic set', () => {
    expect(schemes.triadic).toEqual(['#ff0000', '#00ff00', '#0000ff']);
  });

  it('builds a monochromatic set', () => {
    expect(schemes.monochromatic).toHaveLength(5);
    expect(schemes.monochromatic[2]).toBe('#ff0000');
  });

  it('returns null for invalid input', () => {
    expect(colorSchemes('nope')).toBeNull();
  });
});

describe('randomPalette', () => {
  it('returns the requested number of hex colors', () => {
    expect(randomPalette()).toHaveLength(5);
    expect(randomPalette(3)).toHaveLength(3);
    for (const hex of randomPalette()) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('produces distinct hues when random is mocked', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    try {
      const palette = randomPalette();
      expect(new Set(palette).size).toBe(palette.length);
    } finally {
      spy.mockRestore();
    }
  });
});

describe('mixColors', () => {
  it('blends two colors at the given weight', () => {
    expect(mixColors('#ff0000', '#0000ff', 0.5)).toBe('#800080');
    expect(mixColors('#ff0000', '#0000ff', 0.25)).toBe('#bf0040');
  });

  it('returns the source color at weight 0 and the target at weight 1', () => {
    expect(mixColors('#ff0000', '#0000ff', 0)).toBe('#ff0000');
    expect(mixColors('#ff0000', '#0000ff', 1)).toBe('#0000ff');
  });

  it('returns the first color when either input is invalid', () => {
    expect(mixColors('nope', '#0000ff')).toBe('nope');
  });
});

describe('shadesAndTints', () => {
  it('returns an odd-length scale centered on the base color', () => {
    const scale = shadesAndTints('#888888');
    expect(scale).toHaveLength(9);
    expect(scale[4]).toBe('#888888');
  });

  it('darks toward black on the left and lightens toward white on the right', () => {
    const scale = shadesAndTints('#ff0030');
    expect(scale[0]).toBe('#000000');
    expect(scale[8]).toBe('#ffffff');
    expect(parseInt(scale[3].slice(1, 3), 16)).toBeLessThan(
      parseInt(scale[5].slice(1, 3), 16)
    );
  });

  it('honors a custom step count', () => {
    expect(shadesAndTints('#ff0030', 5)).toHaveLength(5);
  });
});

describe('tint / shade / tone', () => {
  it('tints a color toward white', () => {
    expect(tint('#ff0030', 0.5)).toBe('#ff8098');
  });

  it('shades a color toward black', () => {
    expect(shade('#ff0030', 0.5)).toBe('#800018');
  });

  it('tones a color toward gray', () => {
    expect(tone('#ff0030', 0.5)).toBe('#c04058');
  });

  it('returns the source color at weight 0', () => {
    expect(tint('#ff0030', 0)).toBe('#ff0030');
    expect(shade('#ff0030', 0)).toBe('#ff0030');
    expect(tone('#ff0030', 0)).toBe('#ff0030');
  });
});

describe('composite', () => {
  it('blends the foreground over the background at the given alpha', () => {
    expect(composite('#ff0030', '#ffffff', 0.5)).toBe('#ff8098');
    expect(composite('#ff0030', '#000000', 0.5)).toBe('#800018');
    expect(composite('#ff0030', '#ffffff', 0.25)).toBe('#ffbfcb');
  });

  it('returns the foreground fully opaque at alpha 1', () => {
    expect(composite('#ff0030', '#000000', 1)).toBe('#ff0030');
  });

  it('returns the foreground for an invalid background', () => {
    expect(composite('#ff0030', 'nope', 0.5)).toBe('#ff0030');
  });
});

describe('colorTemperature', () => {
  it('classifies red-orange hues as warm', () => {
    expect(colorTemperature('#ff0030')).toBe('warm');
    expect(colorTemperature('#ff9900')).toBe('warm');
    expect(colorTemperature('#ff5500')).toBe('warm');
  });

  it('classifies green-blue-violet hues as cool', () => {
    expect(colorTemperature('#0000ff')).toBe('cool');
    expect(colorTemperature('#00cc00')).toBe('cool');
  });

  it('classifies desaturated colors as neutral', () => {
    expect(colorTemperature('#808080')).toBe('neutral');
    expect(colorTemperature('nope')).toBe('neutral');
  });
});

describe('kelvinToHex', () => {
  it('maps low temperatures to warm orange', () => {
    expect(kelvinToHex(2000)).toBe('#ff890e');
  });

  it('maps mid temperatures to daylight white', () => {
    expect(kelvinToHex(6500)).toBe('#fffefa');
  });

  it('maps high temperatures to cool blue', () => {
    expect(kelvinToHex(10000)).toBe('#cadaff');
  });

  it('clamps out-of-range values', () => {
    expect(kelvinToHex(500)).toBe('#ff4400');
    expect(kelvinToHex(20000)).toBe('#cadaff');
  });
});

describe('randomColor', () => {
  it('returns a valid hex color', () => {
    expect(randomColor()).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('produces a deterministic color when random is mocked', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    try {
      expect(randomColor()).toBe('#3cdddd');
    } finally {
      spy.mockRestore();
    }
  });
});

describe('HSV conversion', () => {
  it.each([
    ['#ff0000', { h: 0, s: 100, v: 100 }],
    ['#00ff00', { h: 120, s: 100, v: 100 }],
    ['#0000ff', { h: 240, s: 100, v: 100 }],
    ['#000000', { h: 0, s: 0, v: 0 }],
    ['#ffffff', { h: 0, s: 0, v: 100 }],
  ])('converts %s to HSV', (hex, expected) => {
    expect(hexToHsv(hex)).toEqual(expected);
  });

  it('round trips through hsvToHex', () => {
    expect(
      hsvToHex(hexToHsv('#ff0000') as { h: number; s: number; v: number })
    ).toBe('#ff0000');
    expect(hsvToRgb({ h: 0, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('returns null for invalid input', () => {
    expect(hexToHsv('nope')).toBeNull();
  });
});

describe('CMYK conversion', () => {
  it.each([
    ['#ff0000', { c: 0, m: 100, y: 100, k: 0 }],
    ['#000000', { c: 0, m: 0, y: 0, k: 100 }],
    ['#ffffff', { c: 0, m: 0, y: 0, k: 0 }],
  ])('converts %s to CMYK', (hex, expected) => {
    expect(hexToCmyk(hex)).toEqual(expected);
  });

  it('round trips through cmykToHex', () => {
    expect(cmykToHex({ c: 0, m: 100, y: 100, k: 0 })).toBe('#ff0000');
    expect(cmykToRgb({ c: 100, m: 0, y: 0, k: 0 })).toEqual({
      r: 0,
      g: 255,
      b: 255,
    });
  });

  it('returns null for invalid input', () => {
    expect(hexToCmyk('nope')).toBeNull();
  });
});

describe('simulateColorBlindness', () => {
  it('applies the protanopia matrix', () => {
    expect(simulateColorBlindness('#ff0030', 'protanopia')).toBe('#918e24');
  });

  it('produces valid hex for every type', () => {
    for (const type of ['protanopia', 'deuteranopia', 'tritanopia'] as const) {
      expect(simulateColorBlindness('#ff0030', type)).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('returns the input when invalid', () => {
    expect(simulateColorBlindness('nope', 'protanopia')).toBe('nope');
  });
});

describe('gradientCss', () => {
  it('builds a linear gradient with an angle', () => {
    expect(gradientCss(['#ff0000', '#0000ff'])).toBe(
      'linear-gradient(135deg, #ff0000, #0000ff)'
    );
    expect(gradientCss(['#ff0000', '#0000ff'], 0)).toBe(
      'linear-gradient(0deg, #ff0000, #0000ff)'
    );
  });

  it('builds a radial gradient when requested', () => {
    expect(gradientCss(['#ff0000', '#0000ff'], 135, true)).toBe(
      'radial-gradient(circle at center, #ff0000, #0000ff)'
    );
  });
});
