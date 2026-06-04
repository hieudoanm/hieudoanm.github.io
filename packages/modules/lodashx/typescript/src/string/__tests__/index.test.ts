import * as colors from '..';

describe('colors package exports', () => {
  it('exports all expected functions', () => {
    expect(colors.cmyk2hex).toBeDefined();
    expect(colors.cmyk2hsl).toBeDefined();
    expect(colors.hex2rgb).toBeDefined();
    expect(colors.hex2hsl).toBeDefined();
    expect(colors.hex2cmyk).toBeDefined();
    expect(colors.hex2oklch).toBeDefined();
    expect(colors.getBrightness).toBeDefined();
    expect(colors.randomHEX).toBeDefined();
    expect(colors.hsl2hex).toBeDefined();
    expect(colors.hsl2rgb).toBeDefined();
    expect(colors.hsl2cmyk).toBeDefined();
    expect(colors.oklch2hex).toBeDefined();
    expect(colors.component2hex).toBeDefined();
    expect(colors.rgb2hex).toBeDefined();
    expect(colors.rgb2hsl).toBeDefined();
    expect(colors.rgb2cmyk).toBeDefined();
  });

  it('generates random hex color', () => {
    const color = colors.randomHEX();
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });
});
