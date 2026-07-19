/// <reference types="node" />

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve } from 'node:path';

interface HistoricalEvent {
  id: string;
  title: string;
  year: number;
  description: string;
  category: string;
  region: string;
  difficulty: number;
  source: string;
}

const CSV_DIR = resolve(__dirname, '../csv');
const JSON_DIR = resolve(__dirname, '../json');

const REQUIRED_HEADERS = [
  'id',
  'title',
  'year',
  'description',
  'category',
  'region',
  'difficulty',
  'source',
];

const parseCsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\r' || char === '\n') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((cell) => cell !== '')) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell !== '')) rows.push(row);
  }

  return rows;
};

const toEvent = (row: string[]): HistoricalEvent | null => {
  const [id, title, year, description, category, region, difficulty, source] =
    row;
  if (
    !id ||
    !title ||
    !year ||
    !description ||
    !category ||
    !region ||
    !difficulty ||
    !source
  ) {
    return null;
  }
  return {
    id: id.trim(),
    title: title.trim(),
    year: Number(year),
    description: description.trim(),
    category: category.trim(),
    region: region.trim(),
    difficulty: Number(difficulty),
    source: source.trim(),
  };
};

const convertFile = (csvPath: string, jsonPath: string) => {
  const rows = parseCsv(readFileSync(csvPath, 'utf8'));
  const headers = rows[0] ?? [];
  for (const header of REQUIRED_HEADERS) {
    if (!headers.includes(header)) {
      throw new Error(`Missing required CSV column: ${header}`);
    }
  }

  const dataRows = rows.slice(1);
  const events = dataRows
    .map((row) => toEvent(row))
    .filter((event): event is HistoricalEvent => event !== null);

  if (events.length !== dataRows.length) {
    throw new Error(
      `Could not convert ${dataRows.length - events.length} of ${dataRows.length} rows`
    );
  }

  writeFileSync(jsonPath, JSON.stringify(events, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${events.length} events to ${jsonPath}`);
};

const walk = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = resolve(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
};

const main = () => {
  const csvFiles = walk(CSV_DIR)
    .filter((file) => file.endsWith('.csv'))
    .sort();

  if (csvFiles.length === 0) {
    throw new Error(`No CSV files found in ${CSV_DIR}`);
  }

  for (const file of csvFiles) {
    const jsonRel = `${basename(file, '.csv')}.json`;
    const jsonPath = resolve(
      JSON_DIR,
      relative(CSV_DIR, dirname(file)),
      jsonRel
    );
    mkdirSync(dirname(jsonPath), { recursive: true });
    convertFile(file, jsonPath);
  }
};

main();
