import { FC } from 'react';

export const Pagination: FC = () => {
  return (
    <div className="flex divide-x divide-neutral-200 rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-neutral-100/10">
      <div className="px-4 py-2">&lt;</div>
      <div className="px-4 py-2">1</div>
      <div className="px-4 py-2">2</div>
      <div className="px-4 py-2">3</div>
      <div className="px-4 py-2">4</div>
      <div className="px-4 py-2">5</div>
      <div className="px-4 py-2">6</div>
      <div className="px-4 py-2">&gt;</div>
    </div>
  );
};
