import { FC } from 'react';

export const Button: FC<{
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ children = <></>, disabled = false, onClick = undefined }) => {
  return (
    <button
      className="cursor-pointer rounded border border-neutral-200 px-4 py-2 shadow-sm"
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};
