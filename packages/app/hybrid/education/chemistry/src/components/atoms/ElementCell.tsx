import { Element, specificNameColorMap } from '@/data/periodic-table';
import { CSSProperties, FC } from 'react';

interface ElementCellProps {
  selectedType: string | null;
  symbol: string;
  element: Element;
  style?: CSSProperties;
}

export const ElementCell: FC<ElementCellProps> = ({
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
