type Options = { delimiter?: string; quote?: string };

const defaultOptions = { delimiter: ',', quote: '"' };

export const csv2json = <T extends Record<string, string>>(
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

export const csv2md = (csv: string): string => {
  const data: Record<string, string>[] = csv2json(csv);
  const header = data[0] ?? {};
  const headers = Object.keys(header);
  const headerConfigs = headers.map((header: string) => {
    const valuesByHeader = data.map((item) => item[header] ?? '');
    const maxLength: number = Math.max(
      ...valuesByHeader.map((value) => value.length),
      header.length
    );
    return { header, length: maxLength };
  });
  const headerRow: string =
    headerConfigs.length > 0
      ? `| ${headerConfigs
          .map(({ header = '', length = 0 }) => {
            const padding: number = Math.max(0, length - header.length);
            return `${header}${' '.repeat(padding)}`;
          })
          .join(' | ')} |`
      : '';
  const dividerRow: string =
    headers.length > 0
      ? `| ${headerConfigs.map(({ length = 0 }) => '-'.repeat(length)).join(' | ')} |`
      : '';
  const rows: string = data
    .map((item) => {
      const row = headerConfigs
        .map(({ header, length }) => {
          const value = item[header] ?? '';
          const padding: number = Math.max(0, length - (value.length ?? 0));
          return `${value}${' '.repeat(padding)}`;
        })
        .join(' | ');
      return `| ${row} |`;
    })
    .join('\n');
  const md = `${headerRow}\n${dividerRow}\n${rows}`;
  return md;
};

export const csv2sql = (csv: string): string => {
  const data: Record<string, string>[] = csv2json(csv);
  const sql: string = data
    .map((item) => {
      const keys: string[] = Object.keys(item);
      const values: string[] = Object.values(item);
      const columns: string = keys.map((key: string) => `"${key}"`).join(', ');
      const columnValues: string = values
        .map((value: string) => `"${value}"`)
        .join(', ');
      return `INSERT INTO schema.table (${columns}) VALUES (${columnValues})`;
    })
    .join(';\n');
  return sql;
};
