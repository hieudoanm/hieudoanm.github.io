import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import {
  Element,
  periodicTable,
  specificNameColorMap,
} from '@hieudoanm/data/periodic-table';
import { FC, useState } from 'react';

const elements = Object.entries(periodicTable);

const Block: FC<{
  selectedType: string | null;
  symbol: string;
  element: Element;
  style: Record<string, string>;
}> = ({ selectedType = null, symbol = '', element, style = {} }) => {
  const isGray = selectedType !== null && selectedType !== element.specificName;
  const backgroundColor = isGray
    ? 'bg-gray-100/10'
    : specificNameColorMap[element.specificName];

  return (
    <div
      className={`flex min-h-[70px] min-w-[60px] flex-col items-center justify-center rounded p-2 text-white shadow-lg transition-opacity ${backgroundColor} ${
        isGray ? 'opacity-20' : 'opacity-100'
      }`}
      style={style}>
      <span className="text-xs">{element.number}</span>
      <span className="my-1 text-xl font-bold">{symbol}</span>
      <span
        title={element.name}
        className="w-full truncate text-center text-[10px]">
        {element.name}
      </span>
      <span className="mt-0.5 text-[10px]">{element.mass}</span>
    </div>
  );
};

const PeriodicTable: FC<{ selectedType: string | null }> = ({
  selectedType = null,
}) => (
  <div className="grid grid-cols-18 gap-1">
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
        <Block
          key={symbol}
          selectedType={selectedType}
          symbol={symbol}
          element={element}
          style={{
            gridColumn: `${gridColumn} / span 1`,
            gridRow: gridRow.toString(),
          }}
        />
      );
    })}
  </div>
);

export const PeriodicTableModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const specificNames = Array.from(
    new Set(elements.map(([, el]) => el.specificName))
  );

  return (
    <ModalWrapper onClose={onClose} title="Periodic Table" size="max-w-[98vw]">
      {/* Filter buttons */}
      <div className="mb-4 grid grid-cols-3 gap-2 md:grid-cols-6">
        {specificNames.map((name) => {
          const backgroundColor =
            selectedType === null || selectedType === name
              ? specificNameColorMap[name]
              : 'bg-gray-100/10';
          return (
            <button
              key={name}
              className={`btn btn-sm w-full font-semibold text-white shadow-md transition hover:cursor-pointer ${backgroundColor} ${
                selectedType === name ? 'ring-2 ring-white' : ''
              }`}
              onClick={() =>
                setSelectedType(selectedType === name ? null : name)
              }>
              {name}
            </button>
          );
        })}
      </div>

      {/* Full grid — desktop */}
      <div className="hidden md:block">
        <PeriodicTable selectedType={selectedType} />
      </div>

      {/* Card grid — mobile */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        {elements.map(([symbol, element]) => (
          <Block
            key={symbol}
            selectedType={selectedType}
            symbol={symbol}
            element={element}
            style={{}}
          />
        ))}
      </div>
    </ModalWrapper>
  );
};
