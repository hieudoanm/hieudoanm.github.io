import { type FC } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const SortIcon: FC<{ active: boolean; dir: number }> = ({
  active,
  dir,
}) => {
  if (!active)
    return (
      <span className="text-base-content/20 inline-flex h-3 w-3 flex-col leading-none opacity-0 transition-opacity group-hover:opacity-100">
        <FiChevronUp className="h-1.5 w-3" />
        <FiChevronDown className="h-1.5 w-3" />
      </span>
    );
  return dir === 1 ? (
    <FiChevronUp className="h-3 w-3" />
  ) : (
    <FiChevronDown className="h-3 w-3" />
  );
};
SortIcon.displayName = 'SortIcon';
