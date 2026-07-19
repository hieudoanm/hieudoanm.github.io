import type {
  Analysis,
  DB,
  Format,
  PercentileResult,
  TitleKey,
} from '../types';
import { COLORS } from '../constants';

export const calcPercentile = (
  db: DB,
  format: Format,
  rating: number,
  title?: TitleKey
): PercentileResult => {
  const col = `${format}_rating_best`;
  const titleFilter = title ? ` AND title = '${title.toUpperCase()}'` : '';
  const totalRes = db.exec(
    `SELECT COUNT(*) FROM players WHERE ${col} > 0${titleFilter}`
  );
  const total = Number(totalRes[0]?.values[0]?.[0] ?? 0);
  const belowRes = db.exec(
    `SELECT COUNT(*) FROM players WHERE ${col} > 0 AND ${col} < ${rating}${titleFilter}`
  );
  const betterThan = Number(belowRes[0]?.values[0]?.[0] ?? 0);
  const percentile = total > 0 ? Math.round((betterThan / total) * 100) : 0;
  return { format, rating, percentile, betterThan, total };
};

export const buildChartData = (
  histogram: Analysis['histogram'],
  timeControl: Format,
  titleKeys: string[]
) => {
  const ranges = new Set<string>();
  titleKeys.forEach((key) => {
    Object.keys(histogram[key]?.[timeControl] || {}).forEach((r) =>
      ranges.add(r)
    );
  });
  const labels = Array.from(ranges).sort(
    (a, b) => Number.parseInt(a) - Number.parseInt(b)
  );
  const datasets = titleKeys
    .filter((k) => histogram[k])
    .map((title) => ({
      label: title.toUpperCase(),
      data: labels.map((range) => histogram[title][timeControl]?.[range] || 0),
      backgroundColor: COLORS[title] || '#999',
      stack: 'stack1',
    }));
  return { labels, datasets };
};
