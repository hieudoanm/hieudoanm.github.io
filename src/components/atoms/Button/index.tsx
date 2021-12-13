import React from 'react';

const sizes = {
  xs: 'rounded-sm px-2 py-1 text-xs',
  sm: 'rounded-sm px-2 py-1 text-sm',
  md: 'rounded px-3 py-2 text-base',
  lg: 'rounded px-3 py-2 text-lg',
  xl: 'rounded-md px-4 py-3 text-xl',
  '2xl': 'rounded-md px-4 py-3 text-2xl',
  '3xl': 'rounded-lg px-5 py-4 text-3xl',
  '4xl': 'rounded-lg px-5 py-4 text-4xl',
  '5xl': 'rounded-xl px-6 py-5 text-5xl',
  '6xl': 'rounded-xl px-6 py-5 text-6xl',
  '7xl': 'rounded-2xl px-7 py-6 text-7xl',
  '8xl': 'rounded-2xl px-7 py-6 text-8xl',
  '9xl': 'rounded-3xl px-8 py-7 text-9xl',
};

export type ButtonProps = {
  type?: 'submit' | 'button';
  onClick?: () => void;
  full?: boolean;
  bg?: string;
  className?: string;
  color?: string;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  children:
    | string
    | number
    | JSX.Element
    | Array<string | number | JSX.Element>;
};

const Button: React.FC<ButtonProps> = ({
  type = 'submit',
  full = false,
  children = '',
  bg = 'bg-gray-900',
  className = '',
  color = 'text-white',
  size = 'md',
  onClick = () => {
    return;
  },
}: ButtonProps) => {
  const width = full ? 'w-full' : '';
  return (
    <button
      type={type}
      onClick={onClick}
      className={`tracking-widest	${sizes[size]} ${bg} ${color} ${width} ${className}`}
    >
      <b>{children}</b>
    </button>
  );
};

export default Button;
