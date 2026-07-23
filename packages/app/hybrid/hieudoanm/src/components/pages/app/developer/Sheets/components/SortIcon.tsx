import { FC } from 'react';

import { IcoChevUp, IcoChevDown, IcoChevronsUpDown } from '../icons';

export const SortIcon: FC<{ active: boolean; dir: number }> = ({
  active,
  dir,
}) => {
  if (!active)
    return (
      <IcoChevronsUpDown className="text-base-content/20 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
    );
  return dir === 1 ? <IcoChevUp /> : <IcoChevDown />;
};
SortIcon.displayName = 'SortIcon';
