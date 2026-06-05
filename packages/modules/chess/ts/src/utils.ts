import type { Square, Color } from './types';

export const FILES = 'abcdefgh';

export const rankOf = (sq: Square): number => Math.floor(sq / 8);

export const fileOf = (sq: Square): number => sq % 8;

export const square = (rank: number, file: number): Square => rank * 8 + file;

export const isValidSquare = (sq: number): sq is Square => sq >= 0 && sq < 64;

export const squareName = (sq: Square): string =>
  FILES[fileOf(sq)]! + (rankOf(sq) + 1);

export const parseSquare = (name: string): Square | null => {
  if (name.length < 2) return null;
  const file = FILES.indexOf(name[0]!.toLowerCase());
  const rank = parseInt(name[1]!) - 1;
  if (file === -1 || isNaN(rank) || rank < 0 || rank > 7) return null;
  return square(rank, file);
};

export const oppositeColor = (c: Color): Color => (c === 'w' ? 'b' : 'w');

export const squareColor = (sq: Square): 'light' | 'dark' =>
  (rankOf(sq) + fileOf(sq)) % 2 === 0 ? 'dark' : 'light';
