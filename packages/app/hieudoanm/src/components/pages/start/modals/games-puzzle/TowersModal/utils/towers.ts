import { Move } from '../types';

export const generateMoves = (
  n: number,
  from: number,
  to: number,
  aux: number,
  result: Move[] = []
): Move[] => {
  if (n <= 0) return result;
  generateMoves(n - 1, from, aux, to, result);
  result.push([from, to]);
  generateMoves(n - 1, aux, to, from, result);
  return result;
};
