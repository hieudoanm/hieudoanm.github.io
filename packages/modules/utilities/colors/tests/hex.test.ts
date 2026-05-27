import {
  hex2rgb,
  hex2hsl,
  hex2cmyk,
  hex2oklch,
  getBrightness,
} from '../src/hex';

describe('hex2rgb', () => {
  it('converts 6-digit hex to rgb', () => {
    expect(hex2rgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hex2rgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hex2rgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hex2rgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hex2rgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('converts 3-digit hex to rgb', () => {
    expect(hex2rgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hex2rgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hex2rgb('#00f')).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('returns null for invalid hex', () => {
    expect(hex2rgb('#xyz')).toBeNull();
  });
});

describe('hex2hsl', () => {
  it('converts hex to hsl', () => {
    const result = hex2hsl('#ff0000');
    expect(result.h).toBe(0);
    expect(result.s).toBe(100);
    expect(result.l).toBe(50);
  });

  it('handles 3-digit hex', () => {
    const result = hex2hsl('#f00');
    expect(result.h).toBe(0);
    expect(result.s).toBe(100);
    expect(result.l).toBe(50);
  });

  it('handles black', () => {
    const result = hex2hsl('#000000');
    expect(result.l).toBe(0);
  });

  it('handles white', () => {
    const result = hex2hsl('#ffffff');
    expect(result.l).toBe(100);
  });
});

describe('hex2cmyk', () => {
  it('converts red to cmyk', () => {
    const result = hex2cmyk('#ff0000');
    expect(result.c).toBe(0);
    expect(result.m).toBe(100);
    expect(result.y).toBe(100);
    expect(result.k).toBe(0);
  });

  it('converts black to cmyk', () => {
    const result = hex2cmyk('#000000');
    expect(result.c).toBe(0);
    expect(result.m).toBe(0);
    expect(result.y).toBe(0);
    expect(result.k).toBe(100);
  });

  it('converts white to cmyk', () => {
    const result = hex2cmyk('#ffffff');
    expect(result.c).toBe(0);
    expect(result.m).toBe(0);
    expect(result.y).toBe(0);
    expect(result.k).toBe(0);
  });
});

describe('hex2oklch', () => {
  it('returns l, c, h properties', () => {
    const result = hex2oklch('#ff0000');
    expect(result).toHaveProperty('l');
    expect(result).toHaveProperty('c');
    expect(result).toHaveProperty('h');
  });

  it('handles black', () => {
    const result = hex2oklch('#000000');
    expect(typeof result.l).toBe('number');
    expect(typeof result.c).toBe('number');
    expect(typeof result.h).toBe('number');
  });

  it('handles 3-digit hex', () => {
    const result = hex2oklch('#f00');
    expect(result.l).toBeDefined();
  });
});

describe('getBrightness', () => {
  it('returns true for dark colors', () => {
    expect(getBrightness('#000000')).toBe(true);
    expect(getBrightness('#0000ff')).toBe(true);
    expect(getBrightness('#800000')).toBe(true);
  });

  it('returns false for light colors', () => {
    expect(getBrightness('#ffffff')).toBe(false);
    expect(getBrightness('#ffff00')).toBe(false);
    expect(getBrightness('#ffcccc')).toBe(false);
  });

  it('handles 3-digit hex', () => {
    expect(getBrightness('#000')).toBe(true);
    expect(getBrightness('#fff')).toBe(false);
  });
});
