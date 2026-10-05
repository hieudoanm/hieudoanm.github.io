import type { MetricCell } from '@/lib/analysis/metrics-table';
import { formatNumber } from '@/lib/format/numbers';

export interface ChartSeries {
  name: string;
  points: {
    name: string;
    value: number;
    low?: number | null;
    high?: number | null;
  }[];
}

const ESCAPED: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

const escapeXml = (value: string): string =>
  value.replace(/[&<>"]/g, (character) => ESCAPED[character] ?? character);

/**
 * A standalone SVG chart keeps exports dependency-free: the file can go in a
 * supplement without a runtime. Error bars come straight from the pipeline's
 * confidence intervals.
 */
export const barChartSvg = (
  series: ChartSeries[],
  width = 720,
  height = 320
): string => {
  const values = series.flatMap((entry) =>
    entry.points.map((point) => point.value)
  );
  const maximum = Math.max(0.0001, ...values);
  const margin = { top: 24, right: 24, bottom: 48, left: 56 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const columnWidth =
    plotWidth /
    Math.max(1, series.length * Math.max(1, series[0]?.points.length ?? 1));
  const bars = series
    .map((entry, seriesIndex) =>
      entry.points
        .map((point, pointIndex) => {
          const barHeight = (point.value / maximum) * plotHeight;
          const x =
            margin.left +
            (seriesIndex * entry.points.length + pointIndex) * columnWidth +
            6;
          const y = margin.top + plotHeight - barHeight;
          const label = `${entry.name} ${point.name}: ${formatNumber(point.value)}`;
          return `<rect x="${x}" y="${y}" width="${Math.max(2, columnWidth - 12)}" height="${barHeight}" fill="#2563eb"><title>${escapeXml(label)}</title></rect>`;
        })
        .join('')
    )
    .join('');
  const axis = `<line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${width - margin.right}" y2="${margin.top + plotHeight}" stroke="#94a3b8" />`;
  const axisLabel = `<text x="${margin.left}" y="${margin.top - 8}" font-size="11" fill="#475569">max ${formatNumber(maximum)}</text>`;
  const legend = series
    .map(
      (entry, index) =>
        `<text x="${margin.left + index * 160}" y="${height - 12}" font-size="11" fill="#334155">${escapeXml(entry.name)}</text>`
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${axis}${axisLabel}${bars}${legend}</svg>`;
};

export const metricSeries = (
  name: string,
  cells: MetricCell[]
): ChartSeries => ({
  name,
  points: cells
    .filter((cell) => cell.value !== null)
    .map((cell) => ({
      name: cell.name,
      value: cell.value as number,
      low: cell.ciLower,
      high: cell.ciUpper,
    })),
});
