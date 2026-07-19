'use client';

import { FC, ReactNode } from 'react';

export interface ToolTemplateProps {
  title: string;
  children: ReactNode;
}

export const ToolTemplate: FC<ToolTemplateProps> = ({ children }) => (
  <main className="mx-auto w-full max-w-2xl flex-1 p-6">{children}</main>
);

ToolTemplate.displayName = 'ToolTemplate';
