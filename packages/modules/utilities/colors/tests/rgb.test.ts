import { component2hex, rgb2hex, rgb2hsl, rgb2cmyk } from '../src/rgb';

describe('component2hex', () => {
  it('converts 0 to 00', () => {
    expect(component2hex(0)).toBe('00');
  });

  it('converts 255 to ff', () => {
    expect(component2hex(255)).toBe('ff');
  });

  it('doubles single-char hex values', () => {
    expect(component2hex(0)).toBe('00');
    expect(component2hex(15)).toBe('ff');
  });
});

describe('rgb2hex', () => {
  it('converts rgb to hex', () => {
    expect(rgb2hex(255, 0, 0)).toBe('#ff0000');
    expect(rgb2hex(0, 255, 0)).toBe('#00ff00');
    expect(rgb2hex(0, 0, 255)).toBe('#0000ff');
  });

  it('clamps values above 255', () => {
    expect(rgb2hex(300, 0, 0)).toBe('#ff0000');
  });

  it('clamps values below 0', () => {
    expect(rgb2hex(-10, 0, 0)).toBe('#000000');
  });

  it('defaults to 0 for missing args', () => {
    expect(rgb2hex()).toBe('#000000');
  });

  it('converts gray', () => {
    expect(rgb2hex(128, 128, 128)).toBe('#808080');
  });
});

describe('rgb2hsl', () => {
  it('converts red to hsl', () => {
    const result = rgb2hsl({ r: 255, g: 0, b: 0 });
    expect(result.h).toBe(0);
    expect(result.s).toBe(100);
    expect(result.l).toBe(50);
  });

  it('converts green to hsl', () => {
    const result = rgb2hsl({ r: 0, g: 255, b: 0 });
    expect(result.h).toBe(120);
    expect(result.s).toBe(100);
    expect(result.l).toBe(50);
  });

  it('converts blue to hsl', () => {
    const result = rgb2hsl({ r: 0, g: 0, b: 255 });
    expect(result.h).toBe(240);
    expect(result.s).toBe(100);
    expect(result.l).toBe(50);
  });

  it('handles black', () => {
    const result = rgb2hsl({ r: 0, g: 0, b: 0 });
    expect(result.h).toBe(0);
    expect(result.s).toBe(0);
    expect(result.l).toBe(0);
  });

  it('handles white', () => {
    const result = rgb2hsl({ r: 255, g: 255, b: 255 });
    expect(result.h).toBe(0);
    expect(result.s).toBe(0);
    expect(result.l).toBe(100);
  });

  it('defaults missing channels to 0', () => {
    const result = rgb2hsl({});
    expect(result.l).toBe(0);
  });
});

describe('rgb2cmyk', () => {
  it('converts red to cmyk', () => {
    const result = rgb2cmyk({ r: 255, g: 0, b: 0 });
    expect(result.c).toBe(0);
    expect(result.m).toBe(100);
    expect(result.y).toBe(100);
    expect(result.k).toBe(0);
  });

  it('converts black to cmyk', () => {
    const result = rgb2cmyk({ r: 0, g: 0, b: 0 });
    expect(result.c).toBe(0);
    expect(result.m).toBe(0);
    expect(result.y).toBe(0);
    expect(result.k).toBe(100);
  });

  it('converts white to cmyk', () => {
    const result = rgb2cmyk({ r: 255, g: 255, b: 255 });
    expect(result.c).toBe(0);
    expect(result.m).toBe(0);
    expect(result.y).toBe(0);
    expect(result.k).toBe(0);
  });

  it('converts green to cmyk', () => {
    const result = rgb2cmyk({ r: 0, g: 255, b: 0 });
    expect(result.c).toBe(100);
    expect(result.m).toBe(0);
    expect(result.y).toBe(100);
    expect(result.k).toBe(0);
  });
});
