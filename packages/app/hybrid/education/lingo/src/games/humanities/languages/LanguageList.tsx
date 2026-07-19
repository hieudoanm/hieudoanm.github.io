'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { LANGUAGE_FLAGS } from './flags';
import { FlashCard, WORDS_URL, formatLanguage, getHubLanguages } from './utils';

export const LanguagesList: FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const { isPending, data } = useQuery<FlashCard[]>({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await fetch(WORDS_URL);
      if (!response.ok) throw new Error('Failed to load words');
      return (await response.json()) as FlashCard[];
    },
  });

  const languages = useMemo(() => getHubLanguages(data ?? []), [data]);
  const filtered = useMemo(
    () =>
      languages.filter((language) =>
        language.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [languages, query]
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 text-center">
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          Choose a language
        </h1>
        <p className="text-base-content/60 mt-2 text-sm">
          Pick a course to start learning vocabulary — one language, one deck.
        </p>
      </div>

      <label className="input input-bordered flex w-full items-center gap-2">
        <PiMagnifyingGlass className="opacity-50" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search languages..."
          className="grow"
          aria-label="Search languages"
          data-testid="language-search"
        />
      </label>

      {isPending ? (
        <p className="text-base-content/50 py-8 text-center text-sm">
          Loading languages...
        </p>
      ) : (
        <ul
          className="bg-base-100 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="language-list">
          {filtered.map((language) => (
            <li key={language}>
              <div className="card bg-base-100 border-base-300 hover:border-primary flex h-full flex-col items-center gap-2 border px-4 py-5 text-center transition-colors">
                <Link
                  href={`/languages/${language}/`}
                  data-testid={`language-${language}`}
                  className="flex flex-col items-center gap-2">
                  <span className="bg-base-200 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl">
                    {LANGUAGE_FLAGS[language] ?? '🌐'}
                  </span>
                  <span className="font-bold">{formatLanguage(language)}</span>
                </Link>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => router.push(`/languages/${language}/`)}>
                  Learn
                </button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-base-content/50 col-span-full py-8 text-center text-sm">
              No languages match “{query}”.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
LanguagesList.displayName = 'LanguagesList';
