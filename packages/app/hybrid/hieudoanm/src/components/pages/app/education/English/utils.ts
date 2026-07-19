export interface Word {
  word: string;
  results: {
    definition: string;
    partOfSpeech: string;
    synonyms: string[];
    anonyms: string[];
    usageOf: string[];
    typeOf: string[];
  }[];
}
