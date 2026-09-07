import { periodicTable } from '@/data/periodic-table';
import { CSSProperties, FC } from 'react';
import { ElementCell } from '@/components/atoms/ElementCell';

const elements = Object.entries(periodicTable);

const GRID_COLUMNS: CSSProperties = {
  gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
};

interface PeriodicGridViewProps {
  selectedType: string | null;
}

export const PeriodicGridView: FC<PeriodicGridViewProps> = ({
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
