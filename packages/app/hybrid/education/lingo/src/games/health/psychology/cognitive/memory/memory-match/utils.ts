export interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const CATEGORIES: Record<string, string[]> = {
  animals: [
    '🐶',
    '🐱',
    '🐭',
    '🐹',
    '🐰',
    '🦊',
    '🐻',
    '🐼',
    '🐨',
    '🐸',
    '🦁',
    '🐯',
  ],
  food: [
    '🍎',
    '🍊',
    '🍋',
    '🍇',
    '🍓',
    '🍑',
    '🍒',
    '🍌',
    '🥝',
    '🍉',
    '🍍',
    '🥭',
  ],
  nature: [
    '🌟',
    '⭐',
    '🌙',
    '🌍',
    '🌈',
    '☀️',
    '🔥',
    '💧',
    '🌸',
    '🌺',
    '🍄',
    '🌿',
  ],
  sports: [
    '⚽',
    '🏀',
    '🏈',
    '⚾',
    '🎾',
    '🏐',
    '🏓',
    '🥊',
    '🎱',
    '⛳',
    '🚴',
    '🏋️',
  ],
  smileys: [
    '😀',
    '😂',
    '😍',
    '🤔',
    '😎',
    '🥳',
    '😴',
    '🤩',
    '😱',
    '🥺',
    '😈',
    '🤖',
  ],
};

export const EMOJI_CATEGORIES = Object.keys(CATEGORIES);

export const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

export const getEmojis = (category: string, count: number): string[] =>
  CATEGORIES[category]?.slice(0, count) ?? CATEGORIES.animals.slice(0, count);

export const pairCount = (rows: number, cols: number): number =>
  (rows * cols) / 2;

export const hasWholePairs = (rows: number, cols: number): boolean =>
  Number.isInteger(pairCount(rows, cols));

export const createCards = (
  rows: number,
  cols: number,
  category: string
): Card[] => {
  const emojis = getEmojis(category, pairCount(rows, cols));

  return shuffle(
    emojis.flatMap((emoji, index) => [
      { id: index * 2, emoji, flipped: false, matched: false },
      { id: index * 2 + 1, emoji, flipped: false, matched: false },
    ])
  );
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${minutes}:${rest.toString().padStart(2, '0')}`;
};
