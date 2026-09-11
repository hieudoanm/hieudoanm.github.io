'use client';

import { CSSProperties, FC, useState } from 'react';
import { Element, periodicTable, specificNameColorMap } from './utils';

const elements = Object.entries(periodicTable);

const GRID_COLUMNS: CSSProperties = {
  gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
};

interface ElementCellProps {
  selectedType: string | null;
  symbol: string;
  element: Element;
  style?: CSSProperties;
}

const ElementCell: FC<ElementCellProps> = ({
  selectedType = null,
  symbol = '',
  element,
  style,
}) => {
  const isGray = selectedType !== null && selectedType !== element.specificName;
  return (
    <div
      className={`flex min-h-[70px] min-w-[60px] flex-col items-center justify-center rounded-lg p-2 shadow-md transition-opacity ${
        isGray
          ? 'bg-base-300 text-base-content/40 opacity-30'
          : `${specificNameColorMap[element.specificName]} text-white opacity-100`
      }`}
      style={style}>
      <span className="text-xs">{element.number}</span>
      <span className="my-1 text-xl font-normal">{symbol}</span>
      <span
        title={element.name}
        className="w-full truncate text-center text-[10px]">
        {element.name}
      </span>
      <span className="mt-0.5 text-[10px]">{element.mass}</span>
    </div>
  );
};
ElementCell.displayName = 'ElementCell';

interface PeriodicGridViewProps {
  selectedType: string | null;
}

const PeriodicGridView: FC<PeriodicGridViewProps> = ({
  selectedType = null,
}) => (
  <div className="overflow-x-auto">
    <div className="grid min-w-[1280px] gap-1" style={GRID_COLUMNS}>
      {elements.map(([symbol, element]) => {
        const isFBlock = element.group === 0;
        const gridColumn = isFBlock
          ? element.number - (element.specificName === 'Actinide' ? 88 : 56) + 2
          : element.group;
        const gridRow = isFBlock
          ? element.specificName === 'Actinide'
            ? 9
            : 8
          : element.period;

        return (
          <ElementCell
            key={symbol}
            selectedType={selectedType}
            symbol={symbol}
            element={element}
            style={{ gridColumn, gridRow }}
          />
        );
      })}
    </div>
  </div>
);
PeriodicGridView.displayName = 'PeriodicGridView';

interface CategoryFilterProps {
  selectedType: string | null;
  onSelect: (name: string) => void;
}

const specificNames = Array.from(
  new Set(elements.map(([, el]) => el.specificName))
);

const CategoryFilter: FC<CategoryFilterProps> = ({
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

export const Chemistry: FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (name: string): void =>
    setSelectedType(selectedType === name ? null : name);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <h1 className="text-primary text-2xl font-bold tracking-tight">
        Periodic Table
      </h1>
      <CategoryFilter selectedType={selectedType} onSelect={handleSelect} />

      <div className="hidden md:block">
        <PeriodicGridView selectedType={selectedType} />
      </div>

      <div className="grid grid-cols-2 gap-2 md:hidden">
        {elements.map(([symbol, element]) => (
          <ElementCell
            key={symbol}
            selectedType={selectedType}
            symbol={symbol}
            element={element}
          />
        ))}
      </div>
    </div>
  );
};

Chemistry.displayName = 'Chemistry';
