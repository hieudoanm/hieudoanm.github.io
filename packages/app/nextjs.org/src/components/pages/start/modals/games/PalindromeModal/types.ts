export type PuzzleType = 'palindrome' | 'emordnilap';

export type Puzzle = {
  letters: string[];
  answer: string;
  type: PuzzleType;
};

export type Definition = { partOfSpeech: string; definition: string };
export type WordData = { word: string; definitions: Definition[] };
