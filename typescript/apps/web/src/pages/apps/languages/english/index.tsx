import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { Result } from '@web/server/routers/_app';
import { trpc } from '@web/utils/trpc';
import { NextPage } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { Dispatch, FC, SetStateAction, Suspense, useState } from 'react';

const Tab: FC<{
  title: string;
  list: string[];
  index: number;
  defaultChecked?: boolean;
  setWord: Dispatch<SetStateAction<string>>;
}> = ({
  title = '',
  list = [],
  index = 0,
  defaultChecked = false,
  setWord,
}) => {
  if (list.length === 0) return <></>;

  return (
    <>
      <input
        type='radio'
        name={`tab-${index}`}
        role='tab'
        className='tab'
        aria-label={`${title} (${list.length})`}
        defaultChecked={defaultChecked}
      />
      <div
        role='tabpanel'
        className='tab-content rounded-box border-primary-content p-6'>
        <div className='flex flex-wrap gap-2'>
          {list.map((item: string) => {
            return (
              <span
                key={item}
                className='badge badge-primary cursor-pointer'
                onClick={() => setWord(item)}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Results: FC<{
  word: string;
  results: Result[];
  setWord: Dispatch<SetStateAction<string>>;
}> = ({ word = '', results = [], setWord }) => {
  return (
    <>
      <p className='text-xl'>{word}</p>
      {results.map((result: Result, index: number) => {
        const {
          definition = '',
          partOfSpeech = '',
          synonyms = [],
          antonyms = [],
          derivation = [],
        } = result;

        return (
          <div
            key={`${partOfSpeech}-${index}`}
            className='flex flex-col gap-y-4'>
            <p>
              <span className='font-bold italic'>{partOfSpeech}. </span>
              <span>{definition}</span>
            </p>
            {synonyms.length > 0 ||
            antonyms.length > 0 ||
            derivation.length > 0 ? (
              <div
                role='tablist'
                className='tabs tabs-lifted rounded-xl border-primary-content'>
                <Tab
                  title='Synonyms'
                  list={synonyms}
                  index={index}
                  defaultChecked={synonyms.length > 0}
                  setWord={setWord}
                />
                <Tab
                  title='Antonyms'
                  list={antonyms}
                  index={index}
                  defaultChecked={synonyms.length === 0}
                  setWord={setWord}
                />
                <Tab
                  title='Derivation'
                  list={derivation}
                  index={index}
                  defaultChecked={
                    synonyms.length === 0 && antonyms.length === 0
                  }
                  setWord={setWord}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </>
  );
};

const SearchResults: FC<{
  query: string;
  setWord: Dispatch<SetStateAction<string>>;
}> = ({ query = '', setWord }) => {
  const {
    // @ts-ignore
    data = { word: '', results: [] },
    status,
    error,
  } = trpc.word.useQuery({ word: query });

  const { results = [] } = data;

  return (
    <div className='flex flex-col gap-y-8'>
      {status === 'pending' ? (
        <div className='flex h-[50vh] w-full items-center justify-center'>
          <span className='loading loading-infinity loading-lg'></span>
        </div>
      ) : (
        <>
          {error ? (
            <div className='flex w-full items-center justify-center rounded-xl border border-primary-content p-8'>
              {error?.message ?? 'Error'}
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <>
                  <Results
                    word={data.word}
                    results={results as Result[]}
                    setWord={setWord}
                  />
                </>
              ) : (
                <div className='flex w-full items-center justify-center rounded-xl border border-primary-content p-8'>
                  No Results
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

const ThesaurusPage: NextPage = () => {
  const isOnline: boolean = useIsOnline();

  const [word, setWord] = useState('example');

  if (!isOnline) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Offline
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-8'>
            <input
              type='text'
              id='word'
              name='word'
              placeholder='Word'
              className='input join-item input-bordered grow'
              value={word}
              onChange={(event) => setWord(event.target.value)}
            />
            <Suspense
              fallback={
                <div className='flex h-[50vh] w-full items-center justify-center'>
                  <span className='loading loading-infinity loading-lg'></span>
                </div>
              }>
              <SearchResults query={word} setWord={setWord} />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThesaurusPage;
