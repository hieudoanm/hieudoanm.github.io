export interface WordResult {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  anonyms: string[];
  usageOf: string[];
  typeOf: string[];
}

export interface Word {
  word: string;
  results: WordResult[];
}

const BASE =
  'https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/data/english/words';

export const wordUrl = (word: string): string =>
  `${BASE}/${encodeURI(word.trim().toLowerCase())}.json`;

export const fetchWord = async (word: string): Promise<Word> => {
  if (word.trim() === '') throw new Error('Empty Word');
  let response: Response;
  try {
    response = await fetch(wordUrl(word));
  } catch (error) {
    console.error(error);
    throw new Error('Fetch Error');
  }
  try {
    return (await response.json()) as Word;
  } catch (error) {
    console.error(error);
    throw new Error('JSON Error');
  }
};

export const groupByPartOfSpeech = (
  results: WordResult[]
): { partOfSpeech: string; results: WordResult[] }[] => {
  const parts = [...new Set(results.map((result) => result.partOfSpeech))];
  return parts.map((partOfSpeech) => ({
    partOfSpeech,
    results: results.filter((result) => result.partOfSpeech === partOfSpeech),
  }));
};
