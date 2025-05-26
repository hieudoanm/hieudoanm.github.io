import { FC, ReactNode } from 'react';

export const Badge: FC<{ children: ReactNode }> = ({ children = <></> }) => {
  return (
    <span className="rounded-full border border-gray-800 bg-neutral-900 px-3 py-1 text-sm text-neutral-300">
      {children}
    </span>
  );
};
