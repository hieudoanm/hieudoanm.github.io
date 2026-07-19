import * as colors from '..';

describe('colors package exports', () => {
  it('exports all expected functions', () => {
    expect(colors.cmyk2hex).toBeDefined();
    expect(colors.cmyk2hsl).toBeDefined();
    expect(colors.hex2rgb).toBeDefined();
    expect(colors.hex2hsl).toBeDefined();
    expect(colors.hex2cmyk).toBeDefined();
    expect(colors.hex2oklch).toBeDefined();
    expect(colors.brightness).toBeDefined();
    expect(colors.randomHex).toBeDefined();
    expect(colors.hsl2hex).toBeDefined();
    expect(colors.hsl2rgb).toBeDefined();
    expect(colors.hsl2cmyk).toBeDefined();
    expect(colors.oklch2hex).toBeDefined();
    expect(colors.componentToHex).toBeDefined();
    expect(colors.rgb2hex).toBeDefined();
    expect(colors.rgb2hsl).toBeDefined();
    expect(colors.rgb2cmyk).toBeDefined();
  });

  it('generates random hex color', () => {
    const color = colors.randomHex();
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });
});
