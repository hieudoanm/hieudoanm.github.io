import { FC } from 'react';
import { PiMagnifyingGlass, PiXCircle } from 'react-icons/pi';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="relative w-full">
    <PiMagnifyingGlass className="text-base-content/40 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-lg" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search theories..."
      data-testid="home-search"
      className="input input-bordered input-sm w-full pl-9"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="text-base-content/40 hover:text-base-content/70 absolute top-1/2 right-3 -translate-y-1/2">
        <PiXCircle className="text-lg" />
      </button>
    )}
  </div>
);

SearchBar.displayName = 'SearchBar';
