export const DICE_FACES: Record<number, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

export const rollDie = (): number => Math.floor(Math.random() * 6) + 1;

export const rollDice = (): [number, number] => [rollDie(), rollDie()];
