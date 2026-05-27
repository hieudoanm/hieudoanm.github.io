import { hsl2hex, hsl2rgb, hsl2cmyk } from '../src/hsl';

describe('hsl2hex', () => {
  it('converts red hsl to hex', () => {
    expect(hsl2hex(0, 100, 50)).toBe('#ff0000');
  });

  it('converts green hsl to hex', () => {
    expect(hsl2hex(120, 100, 50)).toBe('#00ff00');
  });

  it('converts blue hsl to hex', () => {
    expect(hsl2hex(240, 100, 50)).toBe('#0000ff');
  });

  it('handles black', () => {
    expect(hsl2hex(0, 0, 0)).toBe('#000000');
  });

  it('handles white', () => {
    expect(hsl2hex(0, 0, 100)).toBe('#ffffff');
  });
});

describe('hsl2rgb', () => {
  it('converts red hsl to rgb', () => {
    const result = hsl2rgb({ h: 0, s: 100, l: 50 });
    expect(result.r).toBe(255);
    expect(result.g).toBe(0);
    expect(result.b).toBe(0);
  });

  it('converts green hsl to rgb', () => {
    const result = hsl2rgb({ h: 120, s: 100, l: 50 });
    expect(result.r).toBe(0);
    expect(result.g).toBe(255);
    expect(result.b).toBe(0);
  });

  it('converts blue hsl to rgb', () => {
    const result = hsl2rgb({ h: 240, s: 100, l: 50 });
    expect(result.r).toBe(0);
    expect(result.g).toBe(0);
    expect(result.b).toBe(255);
  });

  it('handles black', () => {
    const result = hsl2rgb({ h: 0, s: 0, l: 0 });
    expect(result.r).toBe(0);
    expect(result.g).toBe(0);
    expect(result.b).toBe(0);
  });

  it('handles white', () => {
    const result = hsl2rgb({ h: 0, s: 0, l: 100 });
    expect(result.r).toBe(255);
    expect(result.g).toBe(255);
    expect(result.b).toBe(255);
  });
});

describe('hsl2cmyk', () => {
  it('converts red hsl to cmyk', () => {
    const result = hsl2cmyk(0, 100, 50);
    expect(result.c).toBe(0);
    expect(result.m).toBe(100);
    expect(result.y).toBe(100);
    expect(result.k).toBe(0);
  });

  it('converts black hsl to cmyk', () => {
    const result = hsl2cmyk(0, 0, 0);
    expect(result.k).toBe(100);
  });

  it('converts white hsl to cmyk', () => {
    const result = hsl2cmyk(0, 0, 100);
    expect(result.c).toBe(0);
    expect(result.m).toBe(0);
    expect(result.y).toBe(0);
    expect(result.k).toBe(0);
  });
});
