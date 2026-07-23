import { FC, useState } from 'react';
import { FiSearch, FiCalendar, FiX } from 'react-icons/fi';

interface TransactionFiltersProps {
  search: string;
  filter: 'all' | 'income' | 'expense';
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: 'all' | 'income' | 'expense') => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

const TransactionFilters: FC<TransactionFiltersProps> = ({
  search,
  filter,
  dateFrom,
  dateTo,
  onSearchChange,
  onFilterChange,
  onDateFromChange,
  onDateToChange,
}) => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const hasDateFilter = dateFrom || dateTo;

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

      <div className="flex flex-wrap gap-2">
        {(['all', 'income', 'expense'] as const).map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn'}`}
            onClick={() => onFilterChange(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}

        <button
          className={`btn btn-sm gap-1 ${hasDateFilter ? 'btn-primary' : 'btn'}`}
          onClick={() => setShowDateFilter(!showDateFilter)}>
          <FiCalendar className="text-sm" />
          Date
          {hasDateFilter && (
            <FiX
              className="ml-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onDateFromChange('');
                onDateToChange('');
              }}
            />
          )}
        </button>
      </div>

      {showDateFilter && (
        <div className="bg-base-200 flex flex-wrap items-center gap-3 rounded-lg p-3">
          <label className="floating-label">
            <span>From</span>
            <input
              type="date"
              className="input input-bordered input-sm"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />
          </label>
          <label className="floating-label">
            <span>To</span>
            <input
              type="date"
              className="input input-bordered input-sm"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
          </label>
        </div>
      )}
    </>
  );
};

export default TransactionFilters;
