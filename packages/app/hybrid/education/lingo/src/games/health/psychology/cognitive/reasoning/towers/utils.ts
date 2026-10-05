export type Tower = number[];

export type Move = [number, number];

export const PEgs = 3;

export const createStacks = (diskCount: number): Tower[] => [
  Array.from({ length: diskCount }, (_, index) => diskCount - index),
  [],
  [],
];

export const canDrop = (from: number, to: number, towers: Tower[]): boolean => {
  if (from === to) return false;
  const moving = towers[from]?.at(-1);
  const target = towers[to]?.at(-1);
  return Boolean(moving && (!target || moving < target));
};

export const moveDisk = (
  towers: Tower[],
  from: number,
  to: number
): Tower[] => {
  if (!canDrop(from, to, towers)) return towers;
  const next = towers.map((tower) => [...tower]);
  const disk = next[from].pop();
  if (disk === undefined) return towers;
  next[to].push(disk);
  return next;
};

export const optimalMoves = (diskCount: number): number =>
  Math.pow(2, diskCount) - 1;

export const isSolved = (towers: Tower[], diskCount: number): boolean =>
  towers[2].length === diskCount;

export const generateMoves = (
  count: number,
  from = 0,
  to = 2,
  aux = 1,
  result: Move[] = []
): Move[] => {
  if (count <= 0) return result;
  generateMoves(count - 1, from, aux, to, result);
  result.push([from, to]);
  generateMoves(count - 1, aux, to, from, result);
  return result;
};

export const applyMoves = (towers: Tower[], moves: Move[]): Tower[] =>
  moves.reduce((state, [from, to]) => moveDisk(state, from, to), towers);
