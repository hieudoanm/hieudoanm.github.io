import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = join(__dirname, '..');
const CSV_DIR = join(DATA_DIR, 'csv');
const JSON_PATH = join(DATA_DIR, 'downloads.json');
const APPS_FILE = join(CSV_DIR, 'apps.csv');
const LINKS_FILE = join(CSV_DIR, 'links.csv');

const LINK_LABELS: Record<string, string> = {
  aab: '.aab',
  apk: '.apk',
  dmg: '.dmg',
  appimage: '.AppImage',
  deb: '.deb',
  rpm: '.x86_64.rpm',
  msi: '.msi',
  exe: '.exe',
  'crx-v2': 'v2.crx',
  'xpi-v2': 'v2.xpi',
  'zip-v2': 'v2.zip',
  'crx-v3': 'v3.crx',
  'xpi-v3': 'v3.xpi',
  'zip-v3': 'v3.zip',
  'darwin-amd64': 'macOS (Intel)',
  'darwin-arm64': 'macOS (Apple Silicon)',
  'linux-amd64': 'Linux x64',
  'linux-arm64': 'Linux ARM64',
};

type DownloadAction = {
  label: string;
  url: string;
};

type DownloadItem = {
  label: string;
  primaryCategory: string;
  secondaryCategory: string;
  icon: string;
  href: string;
  version: string;
  lastUpdated: string;
  fileSize: string;
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

const readCsv = (file: string): Record<string, string>[] => {
  const csv = readFileSync(file, 'utf8')
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '');
  const [header, ...body] = parseCsvRows(csv);
  const rows: Record<string, string>[] = [];
  for (const values of body) {
    if (!values.some((value) => value.trim() !== '')) continue;
    const row: Record<string, string> = {};
    header.forEach((column, index) => {
      row[column as string] = (values[index] ?? '').trim();
    });
    rows.push(row);
  }
  return rows;
};

const toJson = (
  apps: Record<string, string>[],
  links: Record<string, string>[]
): DownloadSection[] => {
  const byAppId = (appId: string) =>
    links.filter((link) => link.appId === appId && link.url !== '');

  const toActions = (appId: string, releasesUrl: string): DownloadAction[] => {
    const actions = byAppId(appId).map((link) => ({
      label: LINK_LABELS[link.type] ?? link.type,
      url: link.url,
    }));
    if (actions.length === 0 && releasesUrl !== '') {
      actions.push({ label: 'View Releases', url: releasesUrl });
    }
    return actions;
  };

  const sections: DownloadSection[] = [];
  for (const row of apps) {
    if (row.app === '') continue;
    const section = sections.find((entry) => entry.id === row.sectionId);
    const item: DownloadItem = {
      label: row.app,
      primaryCategory: row.primaryCategory,
      secondaryCategory: row.secondaryCategory,
      icon: row.icon,
      href: row.href,
      version: row.version || '1.0.0',
      lastUpdated: row.lastUpdated || '',
      fileSize: row.fileSize || '',
      actions: toActions(row.appId, row.releasesUrl),
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
    JSON.stringify(toJson(readCsv(APPS_FILE), readCsv(LINKS_FILE)), null, 2) +
      '\n'
  );
  console.log(`Wrote ${JSON_PATH}`);
};

main();
