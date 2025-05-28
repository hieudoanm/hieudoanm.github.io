import { FC } from 'react';

export const ButtonGroup: FC = () => {
  return (
    <div className="flex items-center divide-x divide-red-300 overflow-hidden rounded-lg shadow dark:divide-red-500 dark:shadow-neutral-100/10">
      <button
        type="button"
        className="grow cursor-pointer bg-red-500 px-4 py-2 text-white shadow dark:bg-red-700">
        Button 1
      </button>
      <button
        type="button"
        className="grow cursor-pointer bg-red-500 px-4 py-2 text-white shadow dark:bg-red-700">
        Button 2
      </button>
      <button
        type="button"
        className="grow cursor-pointer bg-red-500 px-4 py-2 text-white shadow dark:bg-red-700">
        Button 3
      </button>
    </div>
  );
};
