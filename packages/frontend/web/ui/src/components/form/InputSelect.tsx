import { FC } from 'react';

export const Select: FC = () => {
  return (
    <select className="w-full rounded-lg border border-neutral-200 px-3 py-2 shadow focus:outline-none dark:border-neutral-800 dark:shadow-neutral-100/10">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4">Option 4</option>
    </select>
  );
};
