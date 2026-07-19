import type { AnnotationLayer } from '@/types/annotation';

export const toCsv = (rows: Record<string, string | number>[]): string => {
  if (rows.length === 0) {
    return '';
  }
  const headers = Object.keys(rows[0]);
  const escape = (value: string | number): string => {
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const lines = [
    headers.join(','),
    ...rows.map((row) =>
      headers.map((header) => escape(row[header] ?? '')).join(',')
    ),
  ];
  return lines.join('\n');
};

export const annotationsToCsv = (layers: AnnotationLayer[]): string => {
  const rows = layers.flatMap((layer) => {
    if (!layer.visible) return [];
    return layer.annotations.map((annotation) => ({
      layer: layer.name,
      color: layer.color,
      kind: annotation.kind,
      points: annotation.points
        .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
        .join(';'),
    }));
  });
  return toCsv(rows);
};
