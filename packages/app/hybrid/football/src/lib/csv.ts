import { Player, PlayerRole } from '@/types/football';
import { newPlayer } from '@/lib/squad';

const CSV_HEADERS = ['Name', 'Number', 'Role', 'Position'] as const;

const escapeCell = (value: string): string => {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

export const exportSquadCsv = (players: Player[]): string => {
  const header = CSV_HEADERS.join(',');
  const rows = players.map((player) =>
    [player.name, player.number, player.role, player.position ?? '']
      .map((cell) => escapeCell(String(cell)))
      .join(',')
  );
  return [header, ...rows].join('\r\n');
};

export const downloadCsv = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const parseCsvRows = (input: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  let index = 0;
  const text = input.replace(/^\uFEFF/, '');
  while (index < text.length) {
    const char = text[index];
    if (quoted) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index += 2;
          continue;
        }
        quoted = false;
        index += 1;
        continue;
      }
      cell += char;
      index += 1;
      continue;
    }
    if (char === '"') {
      quoted = true;
      index += 1;
      continue;
    }
    if (char === ',') {
      row.push(cell);
      cell = '';
      index += 1;
      continue;
    }
    if (char === '\n' || char === '\r') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      index += 1;
      continue;
    }
    cell += char;
    index += 1;
  }
  row.push(cell);
  rows.push(row);
  return rows;
};

const roleFromLabel = (label: string): PlayerRole | null => {
  const normalized = label.trim().toUpperCase();
  if (normalized === 'GK' || normalized === 'GOALKEEPER') return 'GK';
  if (normalized === 'DEF' || normalized === 'DEFENDER') return 'DEF';
  if (normalized === 'MID' || normalized === 'MIDFIELDER') return 'MID';
  if (
    normalized === 'FWD' ||
    normalized === 'FORWARD' ||
    normalized === 'ATT'
  ) {
    return 'FWD';
  }
  return null;
};

export interface CsvImportResult {
  players: Player[];
  skipped: number;
}

export const importSquadCsv = (input: string): CsvImportResult => {
  const rows = parseCsvRows(input).filter((cells) =>
    cells.some((cell) => cell.trim() !== '')
  );
  if (rows.length === 0) return { players: [], skipped: 0 };
  const header = rows[0].map((cell) => cell.trim().toLowerCase());
  const columnOf = (label: string): number => {
    const index = header.indexOf(label);
    return index === -1 ? -1 : index;
  };
  const nameIndex = columnOf('name');
  const numberIndex = columnOf('number');
  const roleIndex = columnOf('role');
  const positionIndex = columnOf('position');
  const isNameFirstRow = (cells: string[]): boolean =>
    cells.some(
      (cell) =>
        cell.toLowerCase() === 'name' ||
        cell.toLowerCase() === 'number' ||
        cell.toLowerCase() === 'role' ||
        cell.toLowerCase() === 'position'
    );
  const dataRows = rows
    .slice(1)
    .filter(
      (cells) => !isNameFirstRow(cells) && cells.some((c) => c.trim() !== '')
    );
  const players: Player[] = [];
  let skipped = 0;
  for (const cells of dataRows) {
    if (nameIndex === -1 || numberIndex === -1) {
      skipped += 1;
      continue;
    }
    const name = (cells[nameIndex] ?? '').trim();
    const rawNumber = (cells[numberIndex] ?? '').trim();
    const number = Number(rawNumber);
    if (name === '' || !Number.isInteger(number) || number <= 0) {
      skipped += 1;
      continue;
    }
    const role =
      roleIndex === -1 ? null : roleFromLabel(cells[roleIndex] ?? '');
    const position =
      positionIndex === -1
        ? undefined
        : (cells[positionIndex] ?? '').trim() || undefined;
    players.push(newPlayer(name, number, role ?? 'FWD', position));
  }
  return { players, skipped };
};
