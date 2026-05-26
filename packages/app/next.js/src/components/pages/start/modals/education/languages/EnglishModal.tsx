import { tryCatch } from '@hieudoanm/utils/try-catch';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FC, useState } from 'react';
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

export const LanguagesEnglishModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [{ word }, setState] = useState<{ word: string }>({ word: 'example' });

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
      <div className="flex shrink-0">
        <input
          id="word"
          name="word"
          placeholder="Type a word..."
          className="input input-bordered w-full font-mono font-bold"
          value={word}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setState((prev) => ({ ...prev, word: event.target.value }))
          }
        />
      </div>

      <div
        className="relative min-h-0 flex-1 overflow-y-auto"
        style={{ maxHeight: '60vh' }}>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {(isPending || isFetching) && (
            <div className="text-base-content/50 text-center text-lg font-medium">
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

          {!data && !isFetching && !error && (
            <div className="text-base-content/50 text-center text-lg">
              No data found
            </div>
          )}

          {data && !isFetching && !error && (
            <div className="flex flex-col gap-6">
              <h1 className="text-center text-4xl font-bold tracking-tight">
                {data.word}
              </h1>

              {resultsByPartsOfSpeech.map(({ partOfSpeech, results }) => (
                <div
                  key={partOfSpeech}
                  className="card bg-base-100 border-base-300 border shadow-md">
                  <div className="card-body flex flex-col gap-y-6">
                    <h2 className="card-title text-primary border-base-300 border-b pb-2 text-sm font-bold capitalize">
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
                            <span className="mr-2 font-black opacity-50">
                              Definition:
                            </span>
                            {definition}
                          </p>

                          {synonyms.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pl-4">
                              <span className="text-xs font-semibold opacity-50">
                                Synonyms:
                              </span>
                              {synonyms.map((synonym) => (
                                <button
                                  key={synonym}
                                  className="badge badge-sm badge-ghost border-base-300 hover:badge-primary cursor-pointer transition-colors"
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
                            <div className="flex flex-wrap items-center gap-2 pl-4">
                              <span className="text-xs font-semibold opacity-50">
                                Antonyms:
                              </span>
                              {anonyms.map((anonym) => (
                                <button
                                  key={anonym}
                                  className="badge badge-sm badge-ghost border-base-300 hover:badge-primary cursor-pointer transition-colors"
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
