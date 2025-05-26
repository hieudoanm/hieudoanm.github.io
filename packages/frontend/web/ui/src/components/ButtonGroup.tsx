import { FC } from 'react';

export const ButtonGroup: FC = () => {
  return (
    <div className="flex items-center divide-x divide-neutral-800 overflow-hidden rounded border border-neutral-800 bg-neutral-900 text-neutral-300">
      <button
        type="button"
        className="cursor-pointer px-4 py-2 hover:bg-red-500">
        Button 1
      </button>
      <button
        type="button"
        className="cursor-pointer px-4 py-2 hover:bg-red-500">
        Button 2
      </button>
      <button
        type="button"
        className="cursor-pointer px-4 py-2 hover:bg-red-500">
        Button 2
      </button>
    </div>
  );
};
