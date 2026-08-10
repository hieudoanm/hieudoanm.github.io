import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = join(__dirname, '..');
const CSV_PATH = join(DATA_DIR, 'games.csv');
const JSON_PATH = join(DATA_DIR, 'games.json');
const COLUMNS = [
  'section',
  'sectionId',
  'label',
  'description',
  'icon',
  'toolId',
] as const;

type Column = (typeof COLUMNS)[number];

type CsvRow = Record<Column, string>;

type GameItem = {
  label: string;
  description: string;
  icon: string;
  toolId: string;
};

type GameSection = {
  id: string;
  label: string;
  items: GameItem[];
};

const parseCsvRows = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (inQuotes) {
      if (char === '"' && csv[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  row.push(field);
  rows.push(row);
  return rows;
};

const readCsvRows = (): CsvRow[] => {
  const csv = readFileSync(CSV_PATH, 'utf8')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '');
  const [header, ...body] = parseCsvRows(csv);
  return body
    .filter((values) => values.some((value) => value.trim() !== ''))
    .map((values) => {
      const row = {} as CsvRow;
      header.forEach((column, index) => {
        row[column as Column] = values[index] ?? '';
      });
      return row;
    });
};

const toJson = (rows: CsvRow[]): GameSection[] => {
  const sections: GameSection[] = [];
  for (const row of rows) {
    if (row.label === '' || row.toolId === '') continue;
    const section = sections.find((entry) => entry.label === row.section);
    const item: GameItem = {
      label: row.label,
      description: row.description,
      icon: row.icon,
      toolId: row.toolId,
    };
    if (section) {
      section.items.push(item);
    } else {
      sections.push({
        id: row.sectionId,
        label: row.section,
        items: [item],
      });
    }
  }
  return sections;
};

export const main = (): void => {
  writeFileSync(
    JSON_PATH,
    JSON.stringify(toJson(readCsvRows()), null, 2) + '\n'
  );
  console.log(`Wrote ${JSON_PATH}`);
};

main();
