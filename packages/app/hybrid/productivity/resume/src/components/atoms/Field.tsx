import type { FC } from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <label className="flex flex-col gap-1">
    <span className="text-base-content/60 text-xs">{label}</span>
    <input
      type="text"
      className="input input-sm input-bordered w-full"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);

TextField.displayName = 'TextField';

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextAreaField: FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}) => (
  <label className="flex flex-col gap-1">
    <span className="text-base-content/60 text-xs">{label}</span>
    <textarea
      className="textarea textarea-sm textarea-bordered w-full"
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);

TextAreaField.displayName = 'TextAreaField';

export const FieldRow: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-2 gap-2">{children}</div>
);

FieldRow.displayName = 'FieldRow';
