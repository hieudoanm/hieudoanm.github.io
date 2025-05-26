import { FC } from 'react';

export const Divider: FC<{ text: string }> = ({ text = '' }) => {
  return (
    <span className="flex w-full items-center gap-x-2">
      <span className="h-px flex-1 bg-neutral-800"></span>
      <span className="shrink-0 text-neutral-500">{text}</span>
      <span className="h-px flex-1 bg-neutral-800"></span>
    </span>
  );
};
