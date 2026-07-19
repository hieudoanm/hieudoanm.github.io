export interface FlashCard {
  language: string;
  front: string;
  back: string;
}

export { WORDS_URL } from '@/lib/publicPaths';

export const getLanguages = (cards: FlashCard[]): string[] => [
  ...new Set(cards.map((card) => card.language)),
];

export const filterByLanguage = (
  cards: FlashCard[],
  language: string
): FlashCard[] => cards.filter((card) => card.language === language);

export const shuffle = <T>(items: T[]): T[] =>
  [...items].sort(() => Math.random() - 0.5);
