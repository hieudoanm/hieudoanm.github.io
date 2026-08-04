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
