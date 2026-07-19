import type { FC } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';

export interface SliceNavigatorProps {
  index: number;
  count: number;
  label?: string;
  onIndexChange: (index: number) => void;
  onAnalyzeStack?: () => void;
}

export const SliceNavigator: FC<SliceNavigatorProps> = ({
  index,
  count,
  label = 'Slice',
  onIndexChange,
  onAnalyzeStack,
}) => (
  <div className="border-base-300 bg-base-200 flex items-center gap-3 border-b px-4 py-2">
    <span className="text-base-content/70 text-sm">
      {label} {index + 1} / {count}
    </span>
    <Button
      variant="outline"
      size="sm"
      aria-label="Previous slice"
      disabled={index <= 0}
      onClick={() => onIndexChange(index - 1)}>
      <FiChevronLeft />
    </Button>
    <input
      type="range"
      min={0}
      max={count - 1}
      value={index}
      aria-label="Slice index"
      className="range range-primary range-xs w-48"
      onChange={(event) => onIndexChange(Number(event.target.value))}
    />
    <Button
      variant="outline"
      size="sm"
      aria-label="Next slice"
      disabled={index >= count - 1}
      onClick={() => onIndexChange(index + 1)}>
      <FiChevronRight />
    </Button>
    {onAnalyzeStack ? (
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto"
        onClick={onAnalyzeStack}>
        Analyze stack
      </Button>
    ) : null}
  </div>
);
