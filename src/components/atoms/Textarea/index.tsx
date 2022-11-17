import React from 'react';

export type TextareaProps = {
  label?: string;
  rows?: number;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  required?: boolean;
};

const Textarea: React.FC<TextareaProps> = ({
  label = '',
  rows = 2,
  id = '',
  name = '',
  placeholder = '',
  value = '',
  onChange = () => {
    return;
  },
  readOnly = false,
  required = false,
}: TextareaProps) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="mb-2 block">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded border border-solid box-border border-gray-300"
        readOnly={readOnly}
        required={required}
      />
    </>
  );
};

Textarea.displayName = 'Textarea';
Textarea.defaultProps = {
  rows: 2,
  value: '',
  onChange: () => {
    return;
  },
  readOnly: false,
  required: false,
};

export default Textarea;
