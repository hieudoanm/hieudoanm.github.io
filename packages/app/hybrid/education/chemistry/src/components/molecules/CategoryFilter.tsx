import { periodicTable, specificNameColorMap } from '@/data/periodic-table';
import { FC } from 'react';

const specificNames = Array.from(
  new Set(Object.entries(periodicTable).map(([, el]) => el.specificName))
);

interface CategoryFilterProps {
  selectedType: string | null;
  onSelect: (name: string) => void;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  selectedType,
  onSelect,
}) => (
  <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-5">
    {specificNames.map((name) => {
      const isSelected = selectedType === name;
      return (
        <button
          key={name}
          type="button"
          className={`btn btn-sm w-full font-normal transition hover:cursor-pointer ${
            isSelected
              ? `${specificNameColorMap[name]} ring-primary text-white ring-2`
              : 'bg-base-200 text-base-content border-base-300 hover:border-primary border'
          }`}
          onClick={() => onSelect(name)}>
          {name}
        </button>
      );
    })}
  </div>
);
CategoryFilter.displayName = 'CategoryFilter';
