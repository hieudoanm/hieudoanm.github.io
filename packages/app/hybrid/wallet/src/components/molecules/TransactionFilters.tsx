import { FC } from 'react';
import { FiSearch } from 'react-icons/fi';

interface TransactionFiltersProps {
  search: string;
  filter: 'all' | 'income' | 'expense';
  onSearchChange: (value: string) => void;
  onFilterChange: (value: 'all' | 'income' | 'expense') => void;
}

const TransactionFilters: FC<TransactionFiltersProps> = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}) => {
  return (
    <>
      <div className="relative">
        <FiSearch className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="input input-bordered w-full pl-10"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        {(['all', 'income', 'expense'] as const).map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn'}`}
            onClick={() => onFilterChange(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
};

export default TransactionFilters;
