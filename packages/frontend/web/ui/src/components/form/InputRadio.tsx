import { FC } from 'react';

export const Radio: FC = () => {
  return (
    <div>
      <label className="flex items-center gap-x-2">
        <input
          type="radio"
          name="radio"
          className="rounded-lg border border-neutral-800 bg-neutral-900 accent-red-500 shadow-none"
        />
        <span>Radio 1</span>
      </label>
      <label className="flex items-center gap-x-2">
        <input
          type="radio"
          name="radio"
          className="rounded-lg border border-neutral-800 bg-neutral-900 accent-red-500 shadow-none"
        />
        <span>Radio 2</span>
      </label>
      <label className="flex items-center gap-x-2">
        <input
          type="radio"
          name="radio"
          className="rounded-lg border border-neutral-800 bg-neutral-900 accent-red-500 shadow-none"
        />
        <span>Radio 3</span>
      </label>
      <label className="flex items-center gap-x-2">
        <input
          type="radio"
          name="radio"
          className="rounded-lg border border-neutral-800 bg-neutral-900 accent-red-500 shadow-none"
        />
        <span>Radio 4</span>
      </label>
    </div>
  );
};
