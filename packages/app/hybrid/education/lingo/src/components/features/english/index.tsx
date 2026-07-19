'use client';

import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FC, useState } from 'react';
import { fetchWord, groupByPartOfSpeech, Word } from './utils';

export const LanguagesEnglish: FC = () => {
  const [word, setWord] = useState('example');

  const { isFetching, isPending, data, error } = useQuery<Word>({
    queryKey: ['english', word],
    queryFn: () => fetchWord(word),
  });

  const results = data?.results ?? [];
  const resultsByPartsOfSpeech = groupByPartOfSpeech(results);

  return (
    <>
      <div className="flex shrink-0">
        <input
          id="word"
          name="word"
          placeholder="Type a word..."
          className="input input-bordered w-full font-mono font-normal"
          value={word}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setWord(event.target.value)
          }
        />
      </div>

      <div
        className="relative min-h-0 flex-1 overflow-y-auto"
        style={{ maxHeight: '60vh' }}>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {(isPending || isFetching) && (
            <div className="text-base-content/50 text-center text-lg font-normal">
              Loading...
            </div>
          )}

          {error && (
            <div className="alert alert-error text-center shadow-lg">
              <span>
                {error.message === 'Fetch Error'
                  ? 'Word not found'
                  : error.message}
              </span>
            </div>
          )}

          {data && !isFetching && !error && (
            <div className="flex flex-col gap-6">
              <h1 className="text-center text-4xl font-normal tracking-tight">
                {data.word}
              </h1>

              {resultsByPartsOfSpeech.map(({ partOfSpeech, results }) => (
                <div
                  key={partOfSpeech}
                  className="card bg-base-100 border-base-300 border shadow-md">
                  <div className="card-body flex flex-col gap-y-6">
                    <h2 className="card-title text-primary border-base-300 border-b pb-2 text-sm font-normal capitalize">
                      {partOfSpeech}
                    </h2>

                    {results.map(
                      (
                        {
                          partOfSpeech,
                          definition,
                          synonyms = [],
                          anonyms = [],
                        },
                        index
                      ) => (
                        <div
                          key={`${partOfSpeech}-${index}`}
                          className="flex flex-col gap-3">
                          <p className="border-primary/50 border-l-2 pl-4 text-sm leading-relaxed">
                            <span className="mr-2 font-normal opacity-50">
                              Definition:
                            </span>
                            {definition}
                          </p>

                          {synonyms.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pl-4">
                              <span className="text-xs font-normal opacity-50">
                                Synonyms:
                              </span>
                              {synonyms.map((synonym) => (
                                <button
                                  key={synonym}
                                  className="badge badge-sm badge-ghost border-base-300 hover:badge-primary cursor-pointer transition-colors"
                                  onClick={() => setWord(synonym)}>
                                  {synonym}
                                </button>
                              ))}
                            </div>
                          )}

                          {anonyms.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pl-4">
                              <span className="text-xs font-normal opacity-50">
                                Antonyms:
                              </span>
                              {anonyms.map((anonym) => (
                                <button
                                  key={anonym}
                                  className="badge badge-sm badge-ghost border-base-300 hover:badge-primary cursor-pointer transition-colors"
                                  onClick={() => setWord(anonym)}>
                                  {anonym}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
LanguagesEnglish.displayName = 'LanguagesEnglish';
