import { FC } from 'react';

export const List: FC = () => {
  return (
    <div className="w-full max-w-md divide-y divide-neutral-200 overflow-hidden rounded border border-neutral-200 bg-white shadow-md">
      <div className="px-6 py-3">List 1</div>
      <div className="px-6 py-3">List 2</div>
      <div className="px-6 py-3">List 3</div>
      <div className="px-6 py-3">List 4</div>
      <div className="px-6 py-3">List 5</div>
      <div className="px-6 py-3">List 6</div>
    </div>
  );
};
