import { FC } from 'react';

export const Checkbox: FC = () => {
  return (
    <div>
      <label className="flex items-center gap-x-2">
        <input
          type="checkbox"
          name="checkbox"
          className="rounded-lg border border-neutral-800 bg-transparent accent-red-500 shadow-none"
        />
        <span>Checkbox 1</span>
      </label>
      <label className="flex items-center gap-x-2">
        <input
          type="checkbox"
          name="checkbox"
          className="rounded-lg border border-neutral-800 bg-transparent accent-red-500 shadow-none"
        />
        <span>Checkbox 2</span>
      </label>
      <label className="flex items-center gap-x-2">
        <input
          type="checkbox"
          name="checkbox"
          className="rounded-lg border border-neutral-800 bg-transparent accent-red-500 shadow-none"
        />
        <span>Checkbox 3</span>
      </label>
      <label className="flex items-center gap-x-2">
        <input
          type="checkbox"
          name="checkbox"
          className="rounded-lg border border-neutral-800 bg-transparent accent-red-500 shadow-none"
        />
        <span>Checkbox 4</span>
      </label>
    </div>
  );
};
