export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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

export const getEmojis = (category: string, count: number): string[] =>
  CATEGORIES[category]?.slice(0, count) ?? CATEGORIES.animals.slice(0, count);

export interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export const createCards = (
  rows: number,
  cols: number,
  category: string
): Card[] => {
  const pairs = (rows * cols) / 2;
  const emojis = getEmojis(category, pairs);
  const cards: Card[] = [];
  let id = 0;
  for (const emoji of emojis) {
    cards.push({ id: id++, emoji, flipped: false, matched: false });
    cards.push({ id: id++, emoji, flipped: false, matched: false });
  }
  return shuffle(cards);
};

export const formatTime = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};
