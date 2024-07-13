type Options = { delimiter?: string; quote?: string };

const defaultOptions = { delimiter: ',', quote: '"' };

export const csvToJson = <T extends object>(
  string: string,
  { delimiter = ',', quote = '"' }: Options = defaultOptions
): T[] => {
  const lines: string[] = string.split('\n');
  const header: string = lines[0] ?? '';
  if (!header) return [];
  const rows: string[] = lines.splice(1);
  const keys: string[] = header.split(delimiter);
  return rows.map((row: string) => {
    const cells = row.split(delimiter);
    const data: T = {} as T;
    for (const [index, key_] of keys.entries()) {
      const regex = new RegExp(quote, 'g');
      const key: string = key_.replace(regex, '');
      const value = (cells[index] || '').toString().replace(regex, '');
      Object.assign(data, { [key]: value });
    }
    return data;
  });
};
