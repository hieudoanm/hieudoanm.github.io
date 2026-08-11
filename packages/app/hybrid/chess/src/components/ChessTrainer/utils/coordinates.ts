import { FILES, getFile, getRank, toSquare, toSquareName } from '@chess/ts';

export interface CoordinatesRound {
  target: string;
  answered: string | null;
  correct: boolean;
  timeMs: number;
}

export const shuffle = <T>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = result[i] as T;
    result[i] = result[j] as T;
    result[j] = tmp;
  }
  return result;
};

export const allSquares = (): string[] => {
  const squares: string[] = [];
  for (const file of FILES) {
    for (let rank = 1; rank <= 8; rank += 1) {
      squares.push(`${file}${rank}`);
    }
  }
  return squares;
};

export const parseSquare = (name: string): number => {
  const match = /^([a-h])([1-8])$/.exec(name);
  if (!match) return -1;
  const file = (match[1] as string).charCodeAt(0) - 97;
  return toSquare(parseInt(match[2] as string, 10) - 1, file);
};

export const squareLabel = (sq: number): string => toSquareName(sq);

export const rankOf = (sq: number): number => getRank(sq) + 1;
export const fileOf = (sq: number): string => FILES[getFile(sq)] ?? '';

export const roundStats = (
  rounds: CoordinatesRound[]
): { total: number; correct: number; avgMs: number } => {
  const correct = rounds.filter((r) => r.correct).length;
  const total = rounds.length;
  const avgMs =
    total === 0
      ? 0
      : Math.round(
          rounds.reduce((sum, r) => sum + r.timeMs, 0) / total
        );
  return { total, correct, avgMs };
};

export const bestScore = (): { score: number; avgMs: number } => {
  try {
    const raw = localStorage.getItem('chess-coords-best');
    return raw
      ? (JSON.parse(raw) as { score: number; avgMs: number })
      : { score: 0, avgMs: 0 };
  } catch {
    return { score: 0, avgMs: 0 };
  }
};

export const saveBestScore = (score: number, avgMs: number): void => {
  try {
    localStorage.setItem(
      'chess-coords-best',
      JSON.stringify({ score, avgMs })
    );
  } catch {
    // ignore storage errors
  }
};
