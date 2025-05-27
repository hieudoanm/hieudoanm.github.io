import { FC } from 'react';

export const Stats: FC = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 shadow dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-neutral-700 dark:text-neutral-300">Stats</p>
      <p className="text-2xl font-extrabold">$300.00</p>
      <p className="text-red-700 dark:text-red-300">3.0%</p>
    </div>
  );
};
