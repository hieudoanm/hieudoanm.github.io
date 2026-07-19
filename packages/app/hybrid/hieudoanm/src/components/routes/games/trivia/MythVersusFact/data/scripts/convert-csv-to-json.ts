/// <reference types="node" />

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface ClaimItem {
  category: string;
  myth: string;
  fact: string;
  isTrue: boolean;
}

const CSV_PATH = resolve(__dirname, '../items.csv');
const JSON_PATH = resolve(__dirname, '../items.json');

const REQUIRED_HEADERS = ['category', 'myth', 'fact', 'true'];

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

const toClaim = (row: string[]): ClaimItem | null => {
  const [category, myth, fact, truth] = row;
  if (!category || !myth || !fact || !truth) return null;
  if (truth !== 'y' && truth !== 'n') return null;
  return {
    category: category.trim(),
    myth: myth.trim(),
    fact: fact.trim(),
    isTrue: truth === 'y',
  };
};

const main = () => {
  const rows = parseCsv(readFileSync(CSV_PATH, 'utf8'));
  const headers = rows[0] ?? [];
  for (const header of REQUIRED_HEADERS) {
    if (!headers.includes(header)) {
      throw new Error(`Missing required CSV column: ${header}`);
    }
  }

  const dataRows = rows.slice(1);
  const claims = dataRows
    .map((row) => toClaim(row))
    .filter((claim): claim is ClaimItem => claim !== null);

  if (claims.length !== dataRows.length) {
    throw new Error(
      `Could not convert ${dataRows.length - claims.length} of ${dataRows.length} rows`
    );
  }

  writeFileSync(JSON_PATH, JSON.stringify(claims, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${claims.length} claims to ${JSON_PATH}`);
};

main();
