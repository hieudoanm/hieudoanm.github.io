import { FC, memo, useCallback, useRef } from 'react';

export const SearchBar: FC<{ query: string; onChange: (v: string) => void }> =
  memo(({ query, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const googleSearch = useCallback(() => {
      if (!query.trim()) return;
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`,
        '_blank'
      );
    }, [query]);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') googleSearch();
      },
      [googleSearch]
    );

    return (
      <div className="join w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search or filter…"
          className="input input-bordered join-item w-full"
        />
        <button
          className="btn join-item btn-neutral"
          onClick={googleSearch}
          aria-label="Search with Google">
          🔍
        </button>
      </div>
    );
  });

SearchBar.displayName = 'SearchBar';
