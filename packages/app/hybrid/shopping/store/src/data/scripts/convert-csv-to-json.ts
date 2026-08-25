import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = join(__dirname, '..');
const CSV_PATH = join(DATA_DIR, 'downloads.csv');
const JSON_PATH = join(DATA_DIR, 'downloads.json');
const COLUMNS = [
  'section',
  'sectionId',
  'appId',
  'label',
  'description',
  'icon',
  'href',
  'releasesAction',
  'releasesUrl',
  'aabUrl',
  'apkUrl',
  'dmgUrl',
  'appImageUrl',
  'debUrl',
  'msiUrl',
  'exeUrl',
] as const;

type Column = (typeof COLUMNS)[number];

type CsvRow = Record<Column, string>;

type DownloadAction = {
  label: string;
  url: string;
};

type DownloadItem = {
  label: string;
  description: string;
  icon: string;
  href: string;
  actions: DownloadAction[];
};

type DownloadSection = {
  id: string;
  label: string;
  items: DownloadItem[];
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

const toActions = (row: CsvRow): DownloadAction[] => {
  const actions: DownloadAction[] = [];

  const platformMap: [string, string][] = [
    ['.aab', row.aabUrl],
    ['.apk', row.apkUrl],
    ['.dmg', row.dmgUrl],
    ['.AppImage', row.appImageUrl],
    ['.deb', row.debUrl],
    ['.msi', row.msiUrl],
    ['.exe', row.exeUrl],
  ];

  for (const [label, url] of platformMap) {
    if (url.trim() !== '') {
      actions.push({ label, url: url.trim() });
    }
  }

  if (actions.length === 0 && row.releasesUrl.trim() !== '') {
    actions.push({ label: 'View Releases', url: row.releasesUrl.trim() });
  }

  return actions;
};

const toJson = (rows: CsvRow[]): DownloadSection[] => {
  const sections: DownloadSection[] = [];
  for (const row of rows) {
    if (row.label === '' || row.href === '') continue;
    const section = sections.find((entry) => entry.id === row.sectionId);
    const item: DownloadItem = {
      label: row.label,
      description: row.description,
      icon: row.icon,
      href: row.href,
      actions: toActions(row),
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
