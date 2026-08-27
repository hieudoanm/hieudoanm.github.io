import { type FC, type ReactNode } from 'react';

interface AuthTemplateProps {
  children: ReactNode;
}

export const AuthTemplate: FC<AuthTemplateProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
};
