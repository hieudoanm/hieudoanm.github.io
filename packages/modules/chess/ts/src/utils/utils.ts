import type { Square, Color } from '../types/types';

export const FILES = 'abcdefgh';

export const getRank = (sq: Square): number => Math.floor(sq / 8);

export const getFile = (sq: Square): number => sq % 8;

export const toSquare = (rank: number, file: number): Square => rank * 8 + file;

export const isSquareValid = (sq: number): sq is Square => sq >= 0 && sq < 64;

export const toSquareName = (sq: Square): string =>
  FILES[getFile(sq)]! + (getRank(sq) + 1);

export const toSquareFromName = (name: string): Square | null => {
  if (name.length < 2) return null;
  const file = FILES.indexOf(name[0]!.toLowerCase());
  const rank = parseInt(name[1]!) - 1;
  if (file === -1 || isNaN(rank) || rank < 0 || rank > 7) return null;
  return toSquare(rank, file);
};

export const toOppositeColor = (c: Color): Color => (c === 'w' ? 'b' : 'w');

export const getSquareColor = (sq: Square): 'light' | 'dark' =>
  (getRank(sq) + getFile(sq)) % 2 === 0 ? 'dark' : 'light';
