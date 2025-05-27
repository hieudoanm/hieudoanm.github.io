import { FC } from 'react';

export const ButtonGroup: FC = () => {
  return (
    <div className="flex w-full items-center divide-x divide-red-700 overflow-hidden rounded-lg shadow">
      <button
        type="button"
        className="grow cursor-pointer bg-red-700 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:shadow-neutral-100/10">
        Button 1
      </button>
      <button
        type="button"
        className="grow cursor-pointer bg-red-700 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:shadow-neutral-100/10">
        Button 2
      </button>
      <button
        type="button"
        className="grow cursor-pointer bg-red-700 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:shadow-neutral-100/10">
        Button 2
      </button>
    </div>
  );
};
