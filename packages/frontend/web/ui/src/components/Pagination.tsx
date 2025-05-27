import { FC } from 'react';

export const Pagination: FC = () => {
  return (
    <div className="flex divide-x divide-neutral-200 rounded border border-neutral-200 bg-white shadow-sm">
      <div className="px-4 py-2">1</div>
      <div className="px-4 py-2">2</div>
      <div className="px-4 py-2">3</div>
      <div className="px-4 py-2">4</div>
      <div className="px-4 py-2">5</div>
      <div className="px-4 py-2">6</div>
    </div>
  );
};
