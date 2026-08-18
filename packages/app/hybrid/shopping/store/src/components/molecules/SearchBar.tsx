'use client';

import { type FC } from 'react';
import Link from 'next/link';
import type { AppData } from '@/lib/downloads';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  suggestions: AppData[];
  searchRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchBar: FC<SearchBarProps> = ({
  query,
  setQuery,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  searchRef,
}) => (
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
        placeholder="Search apps… (press /)"
        className="input input-bordered focus:border-primary focus:outline-primary w-full"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-base-200 border-base-300 absolute top-full right-0 left-0 z-20 mt-1 rounded-lg border shadow-lg">
          {suggestions.map((s) => (
            <Link
              key={s.slug}
              href={`/app/${s.slug}/`}
              className="hover:bg-base-300 block px-4 py-2 text-sm">
              {s.label}
              <span className="text-base-content/40 ml-2 text-xs">
                {s.primaryCategory}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);

SearchBar.displayName = 'SearchBar';
