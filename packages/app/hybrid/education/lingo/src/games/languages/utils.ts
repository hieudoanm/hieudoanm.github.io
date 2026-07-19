export interface FlashCard {
  language: string;
  front: string;
  back: string;
}

export { WORDS_URL } from '@/lib/publicPaths';

export const FEATURE_LANGUAGES = ['english', 'sign'] as const;

export const getLanguages = (cards: FlashCard[]): string[] => [
  ...new Set<string>(cards.map((card) => card.language)),
];

export const getHubLanguages = (cards: FlashCard[]): string[] => [
  ...new Set<string>([...FEATURE_LANGUAGES, ...getLanguages(cards)]),
];

export const filterByLanguage = (
  cards: FlashCard[],
  language: string
): FlashCard[] => cards.filter((card) => card.language === language);

export const formatLanguage = (language: string): string =>
  language
    .split('_')
    .map((part) => {
      const open = part.startsWith('(') ? '(' : '';
      const word = open ? part.slice(1) : part;
      return `${open}${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(' ');

export const shuffle = <T>(items: T[]): T[] =>
  [...items].sort(() => Math.random() - 0.5);
