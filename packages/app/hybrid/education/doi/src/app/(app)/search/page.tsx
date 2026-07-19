'use client';

import SearchBox from '@/components/atoms/SearchBox';
import ErrorState from '@/components/molecules/ErrorState';
import LoadingState from '@/components/molecules/LoadingState';
import SearchResults from '@/components/molecules/SearchResults';
import { useDoi } from '@/providers/DoiProvider';
import { FC } from 'react';

const SearchPage: FC = () => {
  const { loading, error, query, setQuery, searchResults } = useDoi();

  if (error) return <ErrorState />;
  if (loading) return <LoadingState />;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-6">
        <h1 className="mb-1 text-3xl font-bold">Search</h1>
        <p className="text-base-content/60 text-sm">
          Find works by title, author, abstract, or DOI.
        </p>
      </header>

      <div className="mb-6">
        <SearchBox query={query} onChange={setQuery} />
      </div>

      <SearchResults query={query} results={searchResults} />
    </main>
  );
};

export default SearchPage;
