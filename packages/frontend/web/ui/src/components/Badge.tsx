import { FC } from 'react';

export const Badge: FC = () => {
  return (
    <div className="flex items-center gap-x-2">
      <span className="inline-block rounded-full bg-black px-2 py-0.5 text-xs font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900">
        Primary
      </span>
      <span className="inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white dark:bg-red-700 dark:text-white">
        Badge
      </span>
    </div>
  );
};
