import { FC } from 'react';

export const Textarea: FC = () => {
  return (
    <textarea
      rows={4}
      placeholder="Textarea"
      className="w-full rounded-lg border border-neutral-200 px-3 py-2 shadow focus:outline-none dark:border-neutral-800 dark:shadow-neutral-100/10"
    />
  );
};
