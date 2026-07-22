import { FC, ReactNode } from 'react';

interface AuthTemplateProps {
  children: ReactNode;
}

const AuthTemplate: FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthTemplate;
