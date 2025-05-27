import { ChangeEvent, FC } from 'react';

export const Select: FC<{
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}> = ({
  placeholder = 'placeholder',
  value = '',
  onChange,
  disabled = false,
}) => {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="w-full rounded-lg border border-neutral-200 px-4 py-2 shadow focus:outline-none dark:border-neutral-800">
      <option>{placeholder}</option>
    </select>
  );
};
