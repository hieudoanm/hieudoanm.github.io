export type PuzzleType = 'palindrome' | 'emordnilap';

export interface Puzzle {
  letters: string[];
  answer: string;
  type: PuzzleType;
}

export type Definition = { partOfSpeech: string; definition: string };
export type WordData = { word: string; definitions: Definition[] };
