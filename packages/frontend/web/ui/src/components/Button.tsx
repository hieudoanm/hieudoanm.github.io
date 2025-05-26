import { FC } from 'react';

export const Button: FC<{
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ children = <></>, disabled = false, onClick = undefined }) => {
  return (
    <button
      className="cursor-pointer rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-neutral-300 hover:bg-red-500"
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};
