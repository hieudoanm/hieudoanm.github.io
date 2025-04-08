import { A } from '@solidjs/router';
import { useQuery } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';

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

const EnglishWordsPage = () => {
  const [word, setWord] = createSignal('example');

  const input: string = `https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/data/languages/english/words/${encodeURI(word())}.json`;
  const { isPending, error, data, refetch } = useQuery(() => ({
    queryKey: [`word-${encodeURI(word())}`],
    queryFn: () => fetch(input).then((res) => res.json()),
  }));

  return (
    <>
      <nav class="border-b border-gray-300">
        <div class="container mx-auto px-8 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold">
              Free{' '}
              <A href="https://www.wordsapi.com/" target="_blank">
                WordsAPI
              </A>
            </h1>
            <p>
              <A
                href="https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/data/english/words.jsonl"
                target="_blank">
                Download
              </A>
            </p>
          </div>
        </div>
      </nav>
      <div class="container mx-auto p-8">
        <div class="flex flex-col gap-y-4">
          <form
            class="flex w-full items-center gap-x-4"
            onSubmit={(event) => {
              event.preventDefault();
              refetch();
            }}>
            <input
              id="word"
              name="word"
              placeholder="Word"
              class="w-full rounded border border-gray-300 px-4 py-2"
              list="words"
              value={word()}
              onChange={(event) => setWord(event.target.value)}
            />
            <button
              type="submit"
              class="rounded bg-gray-900 px-4 py-2 text-gray-100">
              Query
            </button>
          </form>
          {isPending && <div class="text-center">Loading</div>}
          {error !== null && (
            <div class="text-center">Error: {error.message}</div>
          )}
          {data?.results?.length > 0 && (
            <div class="flex flex-col gap-y-4">
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
                      title={partOfSpeech + index}
                      class="flex flex-col gap-y-2">
                      <hr class="border-gray-300" />
                      {partOfSpeech !== '' && (
                        <p class="text-gray-500 italic">{partOfSpeech}</p>
                      )}
                      <div class="px-4">
                        {definition !== '' && <p>{definition}</p>}
                        {examples.map((example: string) => {
                          return (
                            <p
                              title={example}
                              class="font-semibold text-gray-500">
                              &quot;{example}&quot;
                            </p>
                          );
                        })}
                        {synonyms.length > 0 && (
                          <div class="flex flex-wrap items-center gap-1">
                            <p class="text-sm">synonyms:</p>
                            {synonyms.map((synonym: string) => (
                              <button
                                title={synonym}
                                type="button"
                                class="inline-block cursor-pointer rounded-full bg-gray-900 px-2 py-1 leading-none text-gray-100"
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
                          <div class="flex flex-wrap items-center gap-1">
                            <p class="text-sm">antonyms:</p>
                            {antonyms.map((antonym: string) => (
                              <button
                                title={antonym}
                                type="button"
                                class="inline-block cursor-pointer rounded-full bg-gray-900 px-2 py-1 leading-none text-gray-100"
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
              <hr class="border-gray-300" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnglishWordsPage;
