#!/usr/bin/env node
// Converts src/data/foods.csv -> src/data/foods.json so the app picks up edits.
// Run: npm run foods:convert
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const csvPath = join(here, '..', 'src', 'data', 'foods.csv');
const jsonPath = join(here, '..', 'src', 'data', 'foods.json');

const lines = readFileSync(csvPath, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

const [headerLine, ...rows] = lines;
const header = headerLine.split(',');

const records = rows.map((line) => {
  const cells = line.split(',');
  return Object.fromEntries(header.map((col, i) => [col, cells[i] ?? '']));
});

writeFileSync(jsonPath, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
console.log(`Wrote ${records.length} foods -> ${jsonPath}`);
