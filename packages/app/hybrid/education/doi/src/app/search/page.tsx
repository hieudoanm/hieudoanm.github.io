'use client';

import ErrorState from '@/components/molecules/ErrorState';
import LoadingState from '@/components/molecules/LoadingState';
import { sanitizeAbstract } from '@/lib/abstract';
import { useDoi } from '@/providers/DoiProvider';
import { FC } from 'react';
import { FiSearch } from 'react-icons/fi';

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

      <div className="relative mb-6">
        <FiSearch className="text-base-content/40 absolute top-1/2 left-3 z-50 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. thermometry"
          className="input input-bordered w-full pl-10"
          aria-label="Search works"
        />
      </div>

      {query === '' ? (
        <p className="text-base-content/50 text-sm">
          Type a query to search the citation network.
        </p>
      ) : searchResults.length === 0 ? (
        <p className="text-base-content/50 py-8 text-center">
          No works match &quot;{query}&quot;.
        </p>
      ) : (
        <ul className="space-y-3" data-testid="search-results">
          {searchResults.map((w) => (
            <li
              key={w.doi}
              className="card bg-base-200 card-body hover:bg-base-300 transition-colors">
              <h2 className="font-semibold">
                {w.title || (
                  <em className="text-base-content/50">(untitled)</em>
                )}
              </h2>
              <p className="text-base-content/50 text-xs">
                {w.year} · {w.doi}
                {w.type && <> · {w.type}</>}
              </p>
              {w.author && (
                <p className="text-base-content/60 truncate text-sm">
                  {w.author}
                </p>
              )}
              {w.abstract && (
                <p className="text-base-content/60 line-clamp-2 text-sm">
                  {sanitizeAbstract(w.abstract)}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SearchPage;
