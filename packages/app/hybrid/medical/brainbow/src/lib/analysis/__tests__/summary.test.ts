import { diversityIndex, summarize } from '@/lib/analysis/summary';

describe('diversityIndex', () => {
  it('returns 1 for two equal proportions', () => {
    expect(diversityIndex([0.5, 0.5])).toBeCloseTo(1, 5);
  });

  it('returns 0 for a single cluster', () => {
    expect(diversityIndex([1])).toBe(0);
  });

  it('ignores empty proportions', () => {
    expect(diversityIndex([0, 1])).toBe(0);
  });
});

describe('summarize', () => {
  it('builds cluster summaries with coverage and region counts', () => {
    const summary = summarize([{ r: 255, g: 0, b: 0 }], [8], [2], 8);
    expect(summary.totalPixels).toBe(8);
    expect(summary.clusters).toEqual([
      {
        index: 0,
        color: { r: 255, g: 0, b: 0 },
        pixelCount: 8,
        areaCoverage: 1,
        regionCount: 2,
      },
    ]);
    expect(summary.diversity).toBe(0);
  });
});
