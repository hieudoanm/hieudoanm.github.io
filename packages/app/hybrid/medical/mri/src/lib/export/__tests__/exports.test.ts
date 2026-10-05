import { barChartSvg, metricSeries } from '@/lib/export/chart';
import { toCsv } from '@/lib/export/csv';
import { metricsToLatex, tableCaption } from '@/lib/export/latex';
import { compareMetrics, metricCells } from '@/lib/analysis/metrics-table';
import type { RunSummary } from '@/lib/contract/types';

const run = (runId: string, name: string | null): RunSummary => ({
  runId,
  path: `/project/runs/${runId}`,
  name,
  status: 'completed',
  nMetrics: 1,
  problems: [],
});

const deltas = compareMetrics(
  {
    runId: 'r_1',
    metrics: {
      metrics: [{ name: 'auc', value: 0.8, ciLower: 0.7, ciUpper: 0.9 }],
    },
  },
  {
    runId: 'r_2',
    metrics: {
      metrics: [{ name: 'auc', value: 0.85, ciLower: 0.75, ciUpper: 0.95 }],
    },
  }
);

describe('CSV export', () => {
  test('writes a header and one line per row', () => {
    const csv = toCsv(
      [{ a: 1, b: 'x' }],
      [
        { header: 'a', value: (row) => row.a },
        { header: 'b', value: (row) => row.b },
      ]
    );
    expect(csv).toBe('a,b\n1,x');
  });

  test('quotes values that would break a spreadsheet', () => {
    const csv = toCsv(
      [{ note: 'a,b' }, { note: 'say "hi"' }, { note: 'line\nbreak' }],
      [{ header: 'note', value: (row) => row.note }]
    );
    expect(csv).toContain('"a,b"');
    expect(csv).toContain('"say ""hi"""');
    expect(csv).toContain('"line\nbreak"');
  });

  test('writes empty cells for missing values', () => {
    const csv = toCsv(
      [{ a: null as number | null }],
      [{ header: 'a', value: (row) => row.a }]
    );
    expect(csv).toBe('a\n');
  });
});

describe('LaTeX export', () => {
  test('produces a booktabs table', () => {
    const tex = metricsToLatex(deltas, 'caption text');
    expect(tex).toContain('\\begin{tabular}');
    expect(tex).toContain('\\toprule');
    expect(tex).toContain('\\bottomrule');
    expect(tex).toContain('auc');
    expect(tex).toContain('% caption text');
  });

  test('escapes characters that would break LaTeX', () => {
    const tex = metricsToLatex(
      [
        {
          name: 'auc_100%',
          baseline: null,
          candidate: null,
          difference: null,
          intervalsOverlap: null,
        },
      ],
      'x'
    );
    expect(tex).toContain('auc\\_100\\%');
  });

  test('shows a dash instead of an empty cell', () => {
    const tex = metricsToLatex(
      [
        {
          name: 'auc',
          baseline: null,
          candidate: null,
          difference: null,
          intervalsOverlap: null,
        },
      ],
      'x'
    );
    expect(tex).toContain('& — & — & —');
  });

  test('names both runs in the caption', () => {
    expect(
      tableCaption(run('r_1', 'baseline'), run('r_2', 'candidate'))
    ).toContain('candidate compared with baseline');
  });
});

describe('SVG chart export', () => {
  test('renders one rect per point', () => {
    const svg = barChartSvg([
      {
        name: 'A',
        points: [
          { name: 'auc', value: 0.8 },
          { name: 'f1', value: 0.6 },
        ],
      },
      {
        name: 'B',
        points: [
          { name: 'auc', value: 0.9 },
          { name: 'f1', value: 0.7 },
        ],
      },
    ]);
    expect(svg.match(/<rect/g)).toHaveLength(4);
    expect(svg).toContain('<title>A auc: 0.800</title>');
    expect(svg).toContain('>A<');
  });

  test('escapes labels', () => {
    const svg = barChartSvg([
      { name: 'A & B', points: [{ name: '<auc>', value: 1 }] },
    ]);
    expect(svg).toContain('A &amp; B');
    expect(svg).toContain('&lt;auc&gt;');
  });

  test('does not divide by zero when every value is zero', () => {
    const svg = barChartSvg([
      { name: 'A', points: [{ name: 'auc', value: 0 }] },
    ]);
    expect(svg).toContain('<svg');
  });

  test('builds a series from metric cells', () => {
    const cells = metricCells('r_1', {
      metrics: [{ name: 'auc', value: 0.8, ciLower: 0.7, ciUpper: 0.9 }],
    });
    const series = metricSeries('run', cells);
    expect(series.points).toEqual([
      { name: 'auc', value: 0.8, low: 0.7, high: 0.9 },
    ]);
  });

  test('drops cells without a value', () => {
    const series = metricSeries(
      'run',
      metricCells('r_1', { metrics: [{ name: 'auc' }] })
    );
    expect(series.points).toEqual([]);
  });
});
