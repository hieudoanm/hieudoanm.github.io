import { cmyk2hex, cmyk2hsl } from '../src/cmyk';

describe('cmyk2hex', () => {
  it('converts cmyk red to hex', () => {
    expect(cmyk2hex({ c: 0, m: 100, y: 100, k: 0 })).toBe('#ff0000');
  });

  it('converts cmyk cyan to hex', () => {
    expect(cmyk2hex({ c: 100, m: 0, y: 0, k: 0 })).toBe('#00ffff');
  });

  it('converts cmyk black to hex', () => {
    expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 100 })).toBe('#000000');
  });

  it('converts cmyk white to hex', () => {
    expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 0 })).toBe('#ffffff');
  });

  it('defaults missing values', () => {
    expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 0 })).toBe('#ffffff');
  });
});

describe('cmyk2hsl', () => {
  it('converts red cmyk to hsl string', () => {
    const result = cmyk2hsl({ c: 0, m: 100, y: 100, k: 0 });
    expect(result).toMatch(/^hsl\(/);
    expect(result).toContain('0,');
    expect(result).toContain('100%');
  });

  it('converts black cmyk to hsl', () => {
    const result = cmyk2hsl({ c: 0, m: 0, y: 0, k: 100 });
    expect(result).toBe('hsl(0, 0%, 0%)');
  });

  it('converts white cmyk to hsl', () => {
    const result = cmyk2hsl({ c: 0, m: 0, y: 0, k: 0 });
    expect(result).toBe('hsl(0, 0%, 100%)');
  });
});
