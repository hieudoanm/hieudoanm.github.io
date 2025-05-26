import { FC } from 'react';

export const ButtonGroup: FC = () => {
  return (
    <div className="flex items-center divide-x divide-neutral-200 overflow-hidden rounded border border-neutral-200 shadow-sm">
      <button type="button" className="cursor-pointer px-4 py-2">
        Button 1
      </button>
      <button type="button" className="cursor-pointer px-4 py-2">
        Button 2
      </button>
      <button type="button" className="cursor-pointer px-4 py-2">
        Button 2
      </button>
    </div>
  );
};
