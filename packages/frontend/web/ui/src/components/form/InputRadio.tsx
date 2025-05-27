import { FC } from 'react';

export const Radio: FC<{ label: string; name: string }> = ({
  label = '',
  name = '',
}) => {
  return (
    <label className="flex items-center gap-x-2">
      <input
        type="radio"
        name={name}
        className="rounded-lg border border-neutral-800 bg-neutral-900 accent-red-500 shadow-none"
      />
      <span>{label}</span>
    </label>
  );
};
