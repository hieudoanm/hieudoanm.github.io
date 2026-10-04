export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
}

const cell = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** RFC 4180 CSV so exports open in a spreadsheet without a repair prompt. */
export const toCsv = <T>(rows: T[], columns: CsvColumn<T>[]): string =>
  [
    columns.map((column) => cell(column.header)).join(','),
    ...rows.map((row) =>
      columns.map((column) => cell(column.value(row))).join(',')
    ),
  ].join('\n');

export const downloadText = (
  fileName: string,
  text: string,
  mime = 'text/plain'
): void => {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const downloadCsv = (fileName: string, csv: string): void =>
  downloadText(fileName, csv, 'text/csv');

export const fileStamp = (): string =>
  new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
