import { FC } from 'react';

export const Alert: FC = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 shadow dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
      <div className="flex flex-col gap-y-1">
        <p className="font-extrabold">Changes saved</p>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Your product changes have been saved.
        </p>
      </div>
    </div>
  );
};
