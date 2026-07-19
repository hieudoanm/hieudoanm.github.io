import type { FC, ReactNode } from 'react';

export interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar: FC<ToolbarProps> = ({ children }) => (
  <div className="flex items-center gap-2">{children}</div>
);
