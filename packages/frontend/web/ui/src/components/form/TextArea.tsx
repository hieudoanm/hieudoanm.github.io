import { ChangeEvent, FC } from 'react';

export const TextArea: FC<{
  rows: number;
  placeholder: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({
  rows = 2,
  placeholder = 'placeholder',
  value = '',
  onChange,
  readOnly = false,
  disabled = false,
}) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
      className="w-full rounded-lg border border-neutral-200 px-4 py-2 shadow focus:outline-none dark:border-neutral-800"
    />
  );
};
