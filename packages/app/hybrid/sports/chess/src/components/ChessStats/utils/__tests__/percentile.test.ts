import { calcPercentile, buildChartData } from '../percentile';
import type { DB, Analysis } from '../../types';

const makeDb = (total: number, below: number): DB =>
  ({
    exec: jest.fn((sql: string) => {
      if (sql.includes('AND ${') || sql.includes('< 1500')) {
        return [{ values: [[below]] }];
      }
      return [{ values: [[total]] }];
    }),
  }) as unknown as DB;

describe('calcPercentile', () => {
  it('computes percentile for all players', () => {
    const db = makeDb(100, 25);
    const result = calcPercentile(db, 'blitz', 1500);
    expect(result).toEqual({
      format: 'blitz',
      rating: 1500,
      percentile: 25,
      betterThan: 25,
      total: 100,
    });
  });

  it('filters by title', () => {
    const db = {
      exec: jest.fn(() => [{ values: [[50]] }]),
    } as unknown as DB;
    calcPercentile(db, 'rapid', 2000, 'gm');
    expect(db.exec).toHaveBeenCalledWith(
      expect.stringContaining("title = 'GM'")
    );
  });

  it('handles zero total', () => {
    const db = makeDb(0, 0);
    const result = calcPercentile(db, 'bullet', 1200);
    expect(result.percentile).toBe(0);
  });

  it('handles missing rows', () => {
    const db = { exec: jest.fn(() => []) } as unknown as DB;
    const result = calcPercentile(db, 'blitz', 1500);
    expect(result.total).toBe(0);
    expect(result.percentile).toBe(0);
  });
});

const makeHistogram = (blitz: Record<string, number>) => ({
  total: { blitz, rapid: {}, bullet: {} },
});

describe('buildChartData', () => {
  it('builds labels and datasets from histogram', () => {
    const { labels, datasets } = buildChartData(
      makeHistogram({
        '0-100': 1,
        '100-200': 2,
        '200-300': 3,
      }) as Analysis['histogram'],
      'blitz',
      ['total']
    );
    expect(labels).toEqual(['0-100', '100-200', '200-300']);
    expect(datasets).toHaveLength(1);
    expect(datasets[0].data).toEqual([1, 2, 3]);
    expect(datasets[0].stack).toBe('stack1');
  });

  it('sorts numeric labels', () => {
    const { labels } = buildChartData(
      makeHistogram({ '200-300': 1, '0-100': 1 }) as Analysis['histogram'],
      'blitz',
      ['total']
    );
    expect(labels).toEqual(['0-100', '200-300']);
  });

  it('uses fallback color for unknown title', () => {
    const { datasets } = buildChartData(
      {
        nope: { blitz: { '0-100': 1 }, rapid: {}, bullet: {} },
      } as Analysis['histogram'],
      'blitz',
      ['nope']
    );
    expect(datasets[0].backgroundColor).toBe('#999');
  });

  it('skips titles missing from histogram', () => {
    const { datasets } = buildChartData(
      makeHistogram({ '0-100': 1 }) as Analysis['histogram'],
      'blitz',
      ['total', 'gm']
    );
    expect(datasets).toHaveLength(1);
  });
});
