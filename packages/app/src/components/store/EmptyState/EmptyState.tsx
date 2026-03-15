import { FC } from 'react';

export const EmptyState: FC = () => {
  return (
    <div className="col-span-full py-24 text-center">
      <div className="bg-base-200/50 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm">
        <span className="text-2xl">🧭</span>
      </div>

      <p className="text-lg font-medium">Nothing matches your search</p>

      <p className="text-base-content/60 mt-1 text-sm">
        Try different keywords or reset filters
      </p>
    </div>
  );
};
