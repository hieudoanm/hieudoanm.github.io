'use client';

import { Highlight } from '@/components/atoms/Highlight';
import type { AppData } from '@/lib/downloads';
import type { SearchEntry } from '@/lib/hooks';
import { PiClockCounterClockwise, PiTrash } from 'react-icons/pi';
import Link from 'next/link';
import type { FC, KeyboardEvent } from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  suggestions: AppData[];
  searchRef: React.RefObject<HTMLInputElement | null>;
  history?: SearchEntry[];
  onSearch?: (q: string) => void;
  onClearHistory?: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  query,
  setQuery,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  searchRef,
  history = [],
  onSearch,
  onClearHistory,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch?.(query);
      setShowSuggestions(false);
      searchRef.current?.blur();
    }
  };

  const hasSuggestions = suggestions.length > 0;
  const showHistory =
    showSuggestions &&
    !hasSuggestions &&
    query.trim() === '' &&
    history.length > 0;

  return (
    <div className="mb-4 w-full max-w-3xl">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search apps… (press /)"
          aria-label="Search apps"
          className="input input-bordered focus:border-primary focus:outline-primary w-full"
        />
        {showSuggestions && hasSuggestions && (
          <div className="bg-base-200 border-base-300 absolute top-full right-0 left-0 z-20 mt-1 rounded-lg border shadow-lg">
            {suggestions.map((s) => (
              <Link
                key={s.slug}
                href={`/app/${s.slug}/`}
                className="hover:bg-base-300 block px-4 py-2 text-sm">
                <Highlight text={s.label} query={query} />
                <span className="text-base-content/40 ml-2 text-xs">
                  {s.primaryCategory}
                </span>
              </Link>
            ))}
          </div>
        )}
        {showHistory && (
          <div className="bg-base-200 border-base-300 absolute top-full right-0 left-0 z-20 mt-1 rounded-lg border shadow-lg">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-base-content/40 font-mono text-xs tracking-widest uppercase">
                Recent searches
              </span>
              {onClearHistory && (
                <button
                  type="button"
                  onClick={onClearHistory}
                  aria-label="Clear search history"
                  className="btn btn-ghost btn-xs">
                  <PiTrash />
                </button>
              )}
            </div>
            {history.map((entry) => (
              <button
                key={entry.ts}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setQuery(entry.q);
                  setShowSuggestions(true);
                }}
                className="hover:bg-base-300 flex w-full items-center gap-2 px-4 py-2 text-left text-sm">
                <PiClockCounterClockwise className="text-base-content/40 shrink-0" />
                {entry.q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
