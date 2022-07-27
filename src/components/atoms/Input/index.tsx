import React from 'react';

export type InputProps = {
  label?: string;
  id?: string;
  type?: 'text' | 'number' | 'password' | 'tel' | 'email' | 'date';
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
  required?: boolean;
  full?: boolean;
};

const Input: React.FC<InputProps> = ({
  label = '',
  id = '',
  type = 'text',
  name = '',
  placeholder = '',
  value = '',
  onChange = () => {
    return;
  },
  className = '',
  readOnly = false,
  required = false,
  full = false,
}: InputProps) => {
  const width = full ? 'w-full' : '';
  return (
    <>
      {label && (
        <label htmlFor={id} className="mb-2 block">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${width} px-3 py-2 rounded border border-solid box-border border-gray-300 ${className}`}
        required={required}
        readOnly={readOnly}
        disabled={readOnly}
      />
    </>
  );
};

Input.displayName = 'Input';
Input.defaultProps = {
  label: '',
  id: '',
  type: 'text',
  name: '',
  placeholder: '',
  value: '',
  onChange: () => {
    return;
  },
  className: '',
  readOnly: false,
  required: false,
  full: false,
};

export default Input;
