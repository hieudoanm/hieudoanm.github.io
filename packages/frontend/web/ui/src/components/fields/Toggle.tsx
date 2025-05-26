import { FC } from 'react';

export const Toggle: FC<{ value: boolean; onClick: () => void }> = ({
  value = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-14 items-center ${value ? 'justify-end bg-red-500' : 'justify-start bg-neutral-800'} cursor-pointer rounded-full border border-neutral-900 p-1 transition-all duration-300`}>
      <div
        className={`aspect-square w-6 rounded-full ${value ? 'bg-white' : 'bg-neutral-900'}`}></div>
    </button>
  );
};
