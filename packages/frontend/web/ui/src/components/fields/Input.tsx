import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

export const Input: FC<{
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  type = 'text',
  placeholder = 'placeholder',
  value = '',
  onChange,
  readOnly = false,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
      className="w-full rounded border border-neutral-200 px-4 py-2 shadow-sm focus:outline-none"
    />
  );
};
