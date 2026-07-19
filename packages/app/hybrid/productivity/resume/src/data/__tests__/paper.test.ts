import { DEFAULT_PAPER_ID, PAPER_SIZES, getPaperSize, mmToPx } from '../paper';

describe('paper sizes', () => {
  it('provides metric ISO sizes including the default A4', () => {
    const ids = PAPER_SIZES.map((size) => size.id);
    expect(ids).toContain('a4');
    expect(ids).toEqual(['a3', 'a4', 'a5', 'a6', 'b5']);
    const a4 = getPaperSize('a4');
    expect(a4.widthMm).toBe(210);
    expect(a4.heightMm).toBe(297);
  });

  it('defaults to A4', () => {
    expect(DEFAULT_PAPER_ID).toBe('a4');
  });

  it('falls back to A4 for unknown ids', () => {
    expect(getPaperSize('unknown').id).toBe('a4');
  });

  it('converts millimetres to pixels at 96 dpi', () => {
    expect(mmToPx(25.4)).toBe(96);
    expect(mmToPx(0)).toBe(0);
  });
});
