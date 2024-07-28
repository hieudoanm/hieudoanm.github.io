type Options = { delimiter?: string; headers?: string[]; quote?: string };

const defaultOptions = {
  delimiter: ',',
  headers: [],
  quote: '"',
};

export const jsonToCsv = <
  T extends Record<string, string | number | boolean | Date>,
>(
  data: T[],
  { delimiter = ',', headers = [], quote = '"' }: Options = defaultOptions
): string => {
  if (headers.length === 0) {
    const keys: string[] = data.flatMap((item) => Object.keys(item));
    const uniqueKeys: string[] = [...new Set(keys)];
    headers = uniqueKeys;
  }

  const headerRow: string = headers
    .map((header: string) => `${quote}${header}${quote}`)
    .join(delimiter);
  const rows: string = data
    .map((item: Record<string, string | number | boolean | Date>) =>
      headers
        .map((key: string) => {
          const value: string = (item[key] || '').toString();
          return `${quote}${value}${quote}`;
        })
        .join(delimiter)
    )
    .join('\n');
  return `${headerRow}\n${rows}`;
};
