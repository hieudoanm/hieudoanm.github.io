export type Word = {
  word: string;
  results: {
    definition: string;
    partOfSpeech: string;
    synonyms: string[];
    antonyms: string[];
    typeOf: string[];
    hasTypes: string[];
    derivation: string[];
    examples: string[];
  }[];
};

export const getWord = async (word: string): Promise<Word> => {
  try {
    const url: string = `https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/data/languages/english/words/${encodeURI(word)}.json`;
    const response = await fetch(url);
    const data: Word = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { word, results: [] };
  }
};
