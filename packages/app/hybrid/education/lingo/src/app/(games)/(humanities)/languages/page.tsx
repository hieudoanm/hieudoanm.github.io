'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { LANGUAGE_FLAGS } from '@/games/languages/flags';
import {
  FlashCard,
  WORDS_URL,
  formatLanguage,
  getHubLanguages,
} from '@/games/languages/utils';

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  english: 'Look up words and their definitions',
  sign: 'Recognise letters with your webcam',
};

const languageItem = (language: string): GameItem => ({
  name: formatLanguage(language),
  description:
    FEATURE_DESCRIPTIONS[language] ??
    `Learn ${formatLanguage(language)} vocabulary`,
  icon: () => (
    <span className="text-3xl">{LANGUAGE_FLAGS[language] ?? '🌐'}</span>
  ),
  href: `/languages/${language}/`,
  testId: `language-${language}`,
});

const LanguagesPage: NextPage = () => {
  const [query, setQuery] = useState('');

  const { isPending, data } = useQuery<FlashCard[]>({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await fetch(WORDS_URL);
      if (!response.ok) throw new Error('Failed to load words');
      return (await response.json()) as FlashCard[];
    },
  });

  const items = useMemo(() => {
    const languages = getHubLanguages(data ?? []);
    const filtered = languages.filter((language) =>
      language.toLowerCase().includes(query.trim().toLowerCase())
    );
    return filtered.map(languageItem);
  }, [data, query]);

  const SearchBar: FC = () => (
    <>
      <label className="input input-bordered flex w-full max-w-3xl items-center gap-2">
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
      {isPending && (
        <p className="text-base-content/50 py-2 text-center text-sm">
          Loading languages...
        </p>
      )}
      {!isPending && items.length === 0 && (
        <p className="text-base-content/50 py-2 text-center text-sm">
          No languages match “{query}”.
        </p>
      )}
    </>
  );

  return (
    <GamesTemplate
      title="Choose a language"
      subtitle="Pick a course to start learning vocabulary — one language, one deck."
      items={items}>
      <SearchBar />
    </GamesTemplate>
  );
};

export default LanguagesPage;
