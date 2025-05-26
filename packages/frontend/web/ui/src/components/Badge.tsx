import { FC, ReactNode } from 'react';

export const Badge: FC<{ children: ReactNode }> = ({ children = <></> }) => {
  return (
    <span className="rounded-full bg-neutral-900 px-3 py-1 text-sm text-white">
      {children}
    </span>
  );
};
