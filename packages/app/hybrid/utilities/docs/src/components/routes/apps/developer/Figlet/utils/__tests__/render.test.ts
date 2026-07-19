import { renderFiglet, FONT_NAMES } from '../render';

jest.mock('../../constants', () => {
  const makeFont = (letter: string) => ['  ', '  ', '  ', '  ', '  ', '  '];
  const font: Record<string, string[]> = {};
  for (const ch of ' ABCDEFGHIJKLMNOPQRSTUVWXYZ') font[ch] = makeFont(ch);
  font[' '] = ['   ', '   ', '   ', '   ', '   ', '   '];
  font['?'] = [' ? ', '?? ', ' ? ', '   ', ' ? ', '   '];
  return {
    STANDARD: { ...font },
    BLOCK: { ...font },
    SMALL: { ...font },
    BANNER: { ...font },
  };
});

describe('renderFiglet', () => {
  it('renders text with default font', () => {
    const result = renderFiglet('A', 'Standard');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('falls back to Standard for unknown font', () => {
    const result = renderFiglet('A', 'Unknown');
    expect(typeof result).toBe('string');
  });

  it('handles empty text', () => {
    const result = renderFiglet('', 'Standard');
    expect(result.split('\n').length).toBeGreaterThanOrEqual(1);
  });

  it('returns lines separated by newlines', () => {
    const result = renderFiglet('HI', 'Standard');
    expect(result.split('\n').length).toBeGreaterThan(1);
  });
});

describe('FONT_NAMES', () => {
  it('returns available font names', () => {
    expect(FONT_NAMES).toContain('Standard');
    expect(FONT_NAMES).toContain('Block');
  });
});
