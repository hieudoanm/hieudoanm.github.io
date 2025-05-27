import { FC } from 'react';

export const Toggle: FC<{ value: boolean; onClick: () => void }> = ({
  value = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-14 items-center ${value ? 'justify-end border-red-400' : 'justify-start border-neutral-200'} cursor-pointer rounded-full border p-1 transition-all duration-300`}>
      <div
        className={`aspect-square w-6 rounded-full ${value ? 'bg-red-400' : 'bg-neutral-200'}`}></div>
    </button>
  );
};
