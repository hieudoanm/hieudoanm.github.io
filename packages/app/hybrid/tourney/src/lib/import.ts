import type { Tournament, Participant } from '@/types';

type ParsedParticipant = { name: string; seed?: number; rating?: number };

const parseCSVLines = (csv: string): string[][] => {
  return csv
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((line) => {
      const cells: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (inQuotes) {
          if (char === '"' && line[i + 1] === '"') {
            current += '"';
            i++;
          } else if (char === '"') {
            inQuotes = false;
          } else {
            current += char;
          }
        } else {
          if (char === '"') {
            inQuotes = true;
          } else if (char === ',') {
            cells.push(current);
            current = '';
          } else {
            current += char;
          }
        }
      }
      cells.push(current);
      return cells;
    });
};

const findColumnIndex = (header: string[], ...candidates: string[]): number => {
  const lower = header.map((h) => h.toLowerCase().trim());
  for (const candidate of candidates) {
    const idx = lower.indexOf(candidate.toLowerCase());
    if (idx !== -1) return idx;
  }
  return -1;
};

export const importParticipantsFromCSV = (csv: string): ParsedParticipant[] => {
  const lines = parseCSVLines(csv);
  if (lines.length < 2) return [];

  const header = lines[0];
  const nameIdx = findColumnIndex(header, 'name', 'participant', 'player');
  const seedIdx = findColumnIndex(header, 'seed');
  const ratingIdx = findColumnIndex(header, 'rating', 'elo', 'rank');

  if (nameIdx === -1) return [];

  return lines.slice(1).map((row) => ({
    name: row[nameIdx]?.trim() ?? '',
    seed: seedIdx !== -1 ? Number(row[seedIdx]) || undefined : undefined,
    rating: ratingIdx !== -1 ? Number(row[ratingIdx]) || undefined : undefined,
  }));
};

type ParsedTournament = {
  name: string;
  description?: string;
  format?: string;
  maxParticipants?: number;
};

export const importTournamentFromCSV = (csv: string): ParsedTournament[] => {
  const lines = parseCSVLines(csv);
  if (lines.length < 2) return [];

  const header = lines[0];
  const nameIdx = findColumnIndex(header, 'name', 'tournament');
  const descIdx = findColumnIndex(header, 'description', 'desc');
  const formatIdx = findColumnIndex(header, 'format', 'type');
  const maxIdx = findColumnIndex(
    header,
    'maxParticipants',
    'max',
    'max_participants'
  );

  if (nameIdx === -1) return [];

  return lines.slice(1).map((row) => ({
    name: row[nameIdx]?.trim() ?? '',
    description: descIdx !== -1 ? row[descIdx]?.trim() : undefined,
    format: formatIdx !== -1 ? row[formatIdx]?.trim() : undefined,
    maxParticipants:
      maxIdx !== -1 ? Number(row[maxIdx]) || undefined : undefined,
  }));
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
