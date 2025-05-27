import { FC } from 'react';

export const Toggle: FC<{ value: boolean; onClick: () => void }> = ({
  value = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-14 cursor-pointer items-center rounded-full border p-1 shadow transition-all duration-300 dark:shadow-neutral-100/10 ${value ? 'justify-end border-red-400' : 'justify-start border-neutral-200'}`}>
      <div
        className={`aspect-square w-6 rounded-full ${value ? 'bg-red-400' : 'bg-neutral-200'}`}></div>
    </button>
  );
};
