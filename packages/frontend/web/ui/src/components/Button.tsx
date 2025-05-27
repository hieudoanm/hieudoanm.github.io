import { FC } from 'react';

export const Button: FC<{
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ children = <></>, disabled = false, onClick = undefined }) => {
  return (
    <button
      className="cursor-pointer rounded bg-red-700 px-4 py-2 text-white shadow-sm transition-all hover:bg-red-800"
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};
