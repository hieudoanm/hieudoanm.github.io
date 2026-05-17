const ROUND_NAMES_BY_OFFSET: Record<number, string> = {
  0: 'Final',
  1: 'Semi-finals',
  2: 'Quarter-finals',
  3: 'Round of 16',
  4: 'Round of 32',
};

export const roundName = (level: number, maxLevel: number): string => {
  const offset = maxLevel - level;
  return ROUND_NAMES_BY_OFFSET[offset] ?? '';
};

export const R_OUTER = 45;
export const rotation = (leafCount: number) => 180 / leafCount;
export const ringStep = (maxLevel: number) => R_OUTER / maxLevel;
