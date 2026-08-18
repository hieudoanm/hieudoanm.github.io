import { FC, ReactNode } from 'react';

export const ErrorTemplate: FC<{
  code: string;
  description: string;
  action?: ReactNode;
}> = ({ code, description, action }) => (
  <div className="flex h-screen flex-col items-center justify-center gap-4">
    <h1 className="text-primary font-mono text-4xl font-normal">{code}</h1>
    <p className="text-base-content/50 max-w-sm text-center text-sm">
      {description}
    </p>
    {action}
  </div>
);
ErrorTemplate.displayName = 'ErrorTemplate';
