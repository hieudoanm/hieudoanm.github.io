import { FC } from 'react';

export const Button: FC = () => {
  return (
    <button className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-800 focus:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-red-700 dark:shadow-neutral-100/10">
      Button
    </button>
  );
};
