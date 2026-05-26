import { tryCatch } from '@hieudoanm/utils/try-catch';
import { createSignal } from 'solid-js';
import { useQuery } from '@tanstack/solid-query';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

export type Word = {
  word: string;
  results: {
    definition: string;
    partOfSpeech: string;
    synonyms: string[];
    anonyms: string[];
    usageOf: string[];
    typeOf: string[];
  }[];
};

export const LanguagesEnglishModal = ({ onClose }: { onClose: () => void }) => {
  const [state, setState] = createSignal<{ word: string }>({ word: 'example' });
  const word = () => state().word;

  const {
    isFetching = false,
    isPending = false,
    data = { word: '', results: [] },
    error = null,
  } = useQuery<Word>({
    queryKey: ['english', word],
    queryFn: async () => {
      if (word === '') throw new Error('Empty Word');
      const wordQuery: string = encodeURI(word.trim().toLowerCase());
      const url: string = `https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/packages/data/english/words/${wordQuery}.json`;
      const { data: response, error: fetchError } = await tryCatch(fetch(url));
      if (fetchError) {
        console.error(fetchError);
        throw new Error('Fetch Error');
      }
      const { data, error } = await tryCatch<Word>(response.json());
      if (error) {
        console.error(error);
        throw new Error('JSON Error');
      }
      return data;
    },
  });

  const { results } = data ?? { results: [] };
  const partsOfSpeech = [
    ...new Set(results.map((result) => result.partOfSpeech)),
  ];

  const resultsByPartsOfSpeech = partsOfSpeech.map((partOfSpeech) => ({
    partOfSpeech,
    results: results.filter((result) => result.partOfSpeech === partOfSpeech),
  }));

  return (
    <ModalWrapper
      onClose={onClose}
      title="English Dictionary"
      subtitle="Definitions · Synonyms · Antonyms"
      size="max-w-4xl"
      footerNote="Click outside to close">
      <div class="flex shrink-0">
        <input
          id="word"
          name="word"
          placeholder="Type a word..."
          class="input input-bordered w-full font-mono font-bold"
          value={word()}
          onChange={(event) =>
            setState((prev) => ({
              ...prev,
              word: (event.target as HTMLInputElement).value,
            }))
          }
        />
      </div>

      <div
        class="relative min-h-0 flex-1 overflow-y-auto"
        style={{ maxHeight: '60vh' } as any}>
        <div class="mx-auto flex max-w-3xl flex-col gap-8">
          {(isPending || isFetching) && (
            <div class="text-base-content/50 text-center text-lg font-medium">
              Loading...
            </div>
          )}

          {error && (
            <div class="alert alert-error text-center shadow-lg">
              <span>
                {error.message === 'Fetch Error'
                  ? 'Word not found'
                  : error.message}
              </span>
            </div>
          )}

          {!data && !isFetching && !error && (
            <div class="text-base-content/50 text-center text-lg">
              No data found
            </div>
          )}

          {data && !isFetching && !error && (
            <div class="flex flex-col gap-6">
              <h1 class="text-center text-4xl font-bold tracking-tight">
                {data.word}
              </h1>

              {resultsByPartsOfSpeech.map(({ partOfSpeech, results }) => (
                <div
                  key={partOfSpeech}
                  class="card bg-base-100 border-base-300 border shadow-md">
                  <div class="card-body flex flex-col gap-y-6">
                    <h2 class="card-title text-primary border-base-300 border-b pb-2 text-sm font-bold capitalize">
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
                          class="flex flex-col gap-3">
                          <p class="border-primary/50 border-l-2 pl-4 text-sm leading-relaxed">
                            <span class="mr-2 font-black opacity-50">
                              Definition:
                            </span>
                            {definition}
                          </p>

                          {synonyms.length > 0 && (
                            <div class="flex flex-wrap items-center gap-2 pl-4">
                              <span class="text-xs font-semibold opacity-50">
                                Synonyms:
                              </span>
                              {synonyms.map((synonym) => (
                                <button
                                  key={synonym}
                                  class="badge badge-sm badge-ghost border-base-300 hover:badge-primary cursor-pointer transition-colors"
                                  onClick={() =>
                                    setState((prev) => ({
                                      ...prev,
                                      word: synonym,
                                    }))
                                  }>
                                  {synonym}
                                </button>
                              ))}
                            </div>
                          )}

                          {anonyms.length > 0 && (
                            <div class="flex flex-wrap items-center gap-2 pl-4">
                              <span class="text-xs font-semibold opacity-50">
                                Antonyms:
                              </span>
                              {anonyms.map((anonym) => (
                                <button
                                  key={anonym}
                                  class="badge badge-sm badge-ghost border-base-300 hover:badge-primary cursor-pointer transition-colors"
                                  onClick={() =>
                                    setState((prev) => ({
                                      ...prev,
                                      word: anonym,
                                    }))
                                  }>
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
    </ModalWrapper>
  );
};
