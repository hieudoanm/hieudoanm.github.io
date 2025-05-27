import { FC } from 'react';

export const List: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-100/10">
      <div className="px-6 py-3">List 1</div>
      <div className="px-6 py-3">List 2</div>
      <div className="px-6 py-3">List 3</div>
      <div className="px-6 py-3">List 4</div>
      <div className="px-6 py-3">List 5</div>
      <div className="px-6 py-3">List 6</div>
    </div>
  );
};
