import { FC } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBoxProps {
  query: string;
  onChange: (q: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ query, onChange }) => (
  <div className="relative">
    <FiSearch className="text-base-content/40 absolute top-1/2 left-3 z-50 -translate-y-1/2" />
    <input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="e.g. thermometry"
      className="input input-bordered w-full pl-10"
      aria-label="Search works"
    />
  </div>
);

export default SearchBox;
