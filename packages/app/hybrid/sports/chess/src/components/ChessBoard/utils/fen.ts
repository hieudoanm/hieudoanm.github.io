import type { Odds } from '../types';

const expandRank = (rank: string): string[] => {
  const cells: string[] = [];
  for (const ch of rank) {
    const n = Number(ch);
    if (Number.isNaN(n)) cells.push(ch);
    else for (let i = 0; i < n; i++) cells.push('');
  }
  return cells;
};

const collapseRank = (cells: string[]): string => {
  let out = '';
  let empty = 0;
  for (const cell of cells) {
    if (cell === '') empty++;
    else {
      if (empty > 0) {
        out += empty;
        empty = 0;
      }
      out += cell;
    }
  }
  if (empty > 0) out += empty;
  return out;
};

export const emptyFen = (): string => '8/8/8/8/8/8/8/8 w - - 0 1';

export const setSquareFen = (
  fen: string,
  square: string,
  piece: string | null
): string => {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square.slice(1));
  if (file < 0 || file > 7 || rank < 1 || rank > 8) return fen;
  const parts = fen.split(' ');
  const ranks = parts[0]?.split('/') ?? [];
  if (ranks.length !== 8) return fen;
  const row = expandRank(ranks[8 - rank] ?? '');
  row[file] = piece
    ? piece[1] === 'w'
      ? piece[0].toUpperCase()
      : piece[0]
    : '';
  ranks[8 - rank] = collapseRank(row);
  return [ranks.join('/'), ...parts.slice(1)].join(' ');
};

const ODDS_PIECE: Record<Odds, string> = {
  none: '',
  queen: 'Q',
  rook: 'R',
  knight: 'N',
  bishop: 'B',
};

export const applyOdds = (fen: string, odds: Odds): string => {
  const piece = ODDS_PIECE[odds];
  if (!piece) return fen;
  const parts = fen.split(' ');
  const ranks = parts[0]?.split('/') ?? [];
  for (let i = 7; i >= 6; i--) {
    const row = expandRank(ranks[i] ?? '');
    const idx = row.indexOf(piece);
    if (idx !== -1) {
      row[idx] = '';
      ranks[i] = collapseRank(row);
      break;
    }
  }
  return [ranks.join('/'), ...parts.slice(1)].join(' ');
};
