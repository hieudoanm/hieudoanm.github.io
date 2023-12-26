import axios from 'axios';
import { writeFileSync } from 'fs';

export type WordsResponse = {
  query: { limit: string; page: number };
  results: { total: number; data: string[] };
};

const main = async () => {
  const encrypted = '8cfdb189e722909be89207bfe958babbaeb2290937f892b8';
  const when = '2023-03-23T06:42:24.775Z';
  const limit = 1000000;
  const url = `https://www.wordsapi.com/mashape/words?encrypted=${encrypted}&when=${when}&limit=${limit}`;
  const response = await axios.get<WordsResponse>(url);
  const {
    data: {
      results: { total = 0, data = [] },
    },
  } = response;
  console.info(`total=${total}`);
  writeFileSync('./scripts/txt/words.txt', data.join('\n'));
};

main();
