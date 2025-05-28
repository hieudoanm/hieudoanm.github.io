import { FC } from 'react';

export const Badge: FC = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2 md:grid-cols-1 md:grid-rows-2 md:gap-4">
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <span className="inline-block rounded-full border border-purple-600 bg-purple-600 px-2 py-0.5 text-xs font-semibold text-white dark:border-purple-700 dark:bg-purple-700 dark:text-neutral-900">
          Badge
        </span>
        <span className="inline-block rounded-full border border-green-600 bg-green-600 px-2 py-0.5 text-xs font-semibold text-white dark:border-green-700 dark:bg-green-700 dark:text-white">
          Badge
        </span>
        <span className="inline-block rounded-full border border-blue-600 bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white dark:border-blue-700 dark:bg-blue-700 dark:text-white">
          Badge
        </span>
        <span className="inline-block rounded-full border border-yellow-600 bg-yellow-600 px-2 py-0.5 text-xs font-semibold text-white dark:border-yellow-700 dark:bg-yellow-700 dark:text-white">
          Badge
        </span>
        <span className="inline-block rounded-full border border-orange-600 bg-orange-600 px-2 py-0.5 text-xs font-semibold text-white dark:border-orange-700 dark:bg-orange-700 dark:text-white">
          Badge
        </span>
        <span className="inline-block rounded-full border border-red-600 bg-red-600 px-2 py-0.5 text-xs font-semibold text-white dark:border-red-700 dark:bg-red-700 dark:text-white">
          Badge
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <span className="inline-block rounded-full border border-purple-600 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:border-purple-700 dark:text-purple-700">
          Badge
        </span>
        <span className="inline-block rounded-full border border-green-600 px-2 py-0.5 text-xs font-semibold text-green-600 dark:border-green-700 dark:text-green-700">
          Badge
        </span>
        <span className="inline-block rounded-full border border-blue-600 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:border-blue-700 dark:text-blue-700">
          Badge
        </span>
        <span className="inline-block rounded-full border border-yellow-600 px-2 py-0.5 text-xs font-semibold text-yellow-600 dark:border-yellow-700 dark:text-yellow-700">
          Badge
        </span>
        <span className="inline-block rounded-full border border-orange-600 px-2 py-0.5 text-xs font-semibold text-orange-600 dark:border-orange-700 dark:text-orange-700">
          Badge
        </span>
        <span className="inline-block rounded-full border border-red-600 px-2 py-0.5 text-xs font-semibold text-red-600 dark:border-red-700 dark:text-red-700">
          Badge
        </span>
      </div>
    </div>
  );
};
