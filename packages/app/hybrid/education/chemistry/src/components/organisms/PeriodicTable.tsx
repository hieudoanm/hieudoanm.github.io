'use client';

import { FC, useState } from 'react';
import { ElementCell } from '@/components/atoms/ElementCell';
import { CategoryFilter } from '@/components/molecules/CategoryFilter';
import { PeriodicGridView } from '@/components/molecules/PeriodicGridView';
import { periodicTable } from '@/data/periodic-table';

const elements = Object.entries(periodicTable);

export const PeriodicTable: FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (name: string): void =>
    setSelectedType(selectedType === name ? null : name);

  return (
    <>
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
    </>
  );
};
PeriodicTable.displayName = 'PeriodicTable';
