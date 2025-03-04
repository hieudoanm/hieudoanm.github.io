import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

type Word = {
  word: string;
  results: {
    definition: string;
    partOfSpeech: string;
    synonyms: string[];
    antonyms: string[];
    examples: string[];
  }[];
};

const EnglishWordsPage: NextPage = () => {
  const [word, setWord] = useState('example');

  const input: string = `https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/data/languages/english/words/${encodeURI(word)}.json`;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: [`word-${encodeURI(word)}`],
    queryFn: () => fetch(input).then((res) => res.json()),
  });

  return (
    <>
      <nav className="border-b border-gray-300">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
              Free{' '}
              <Link href="https://www.wordsapi.com/" target="_blank">
                WordsAPI
              </Link>
            </h1>
            <div className="flex items-center gap-x-2">
              <p>
                <Link href="https://github.com/hieudoanm/words" target="_blank">
                  GitHub
                </Link>
              </p>
              <p>
                <Link
                  href="https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/data/english/words.jsonl"
                  target="_blank">
                  Download
                </Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <div className="flex flex-col gap-y-4">
          <form
            className="flex w-full items-center gap-x-4"
            onSubmit={(event) => {
              event.preventDefault();
              refetch();
            }}>
            <input
              id="word"
              name="word"
              placeholder="Word"
              className="w-full rounded border border-gray-300 px-4 py-2"
              list="words"
              value={word}
              onChange={(event) => setWord(event.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-gray-900 px-4 py-2 text-gray-100">
              Query
            </button>
          </form>
          {isPending && <div className="text-center">Loading</div>}
          {error !== null && (
            <div className="text-center">Error: {error.message}</div>
          )}
          {data?.results?.length > 0 && (
            <div className="flex flex-col gap-y-4">
              {(data as Word).results.map(
                (
                  {
                    definition = '',
                    partOfSpeech = '',
                    examples = [],
                    synonyms = [],
                    antonyms = [],
                  },
                  index
                ) => {
                  return (
                    <div
                      key={partOfSpeech + index}
                      className="flex flex-col gap-y-2">
                      <hr className="border-gray-300" />
                      {partOfSpeech !== '' && (
                        <p className="text-gray-500 italic">{partOfSpeech}</p>
                      )}
                      <div className="px-4">
                        {definition !== '' && <p>{definition}</p>}
                        {examples.map((example: string) => {
                          return (
                            <p
                              key={example}
                              className="font-semibold text-gray-500">
                              &quot;{example}&quot;
                            </p>
                          );
                        })}
                        {synonyms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1">
                            <p className="text-sm">synonyms:</p>
                            {synonyms.map((synonym: string) => (
                              <button
                                key={synonym}
                                type="button"
                                className="inline-block cursor-pointer rounded-full bg-gray-900 px-2 py-1 leading-none text-gray-100"
                                onClick={() => {
                                  setWord(synonym);
                                  refetch();
                                }}>
                                {synonym}
                              </button>
                            ))}
                          </div>
                        )}
                        {antonyms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1">
                            <p className="text-sm">antonyms:</p>
                            {antonyms.map((antonym: string) => (
                              <button
                                key={antonym}
                                type="button"
                                className="inline-block cursor-pointer rounded-full bg-gray-900 px-2 py-1 leading-none text-gray-100"
                                onClick={() => {
                                  setWord(antonym);
                                  refetch();
                                }}>
                                {antonym}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
              <hr className="border-gray-300" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnglishWordsPage;
