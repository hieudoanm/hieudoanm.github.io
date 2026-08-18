import type { FC, ReactNode } from 'react';

export interface ErrorTemplateProps {
  code: string;
  description: string;
  action?: ReactNode;
}

export const ErrorTemplate: FC<ErrorTemplateProps> = ({
  code,
  description,
  action,
}) => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
    <h1 className="text-6xl">{code}</h1>
    <p className="text-base-content/70 max-w-md">{description}</p>
    {action ? <div className="mt-2">{action}</div> : null}
  </main>
);
