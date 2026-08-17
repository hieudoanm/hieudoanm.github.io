import type { FC, ReactNode } from 'react';

interface NotFoundTemplateProps {
  description?: string;
  action?: ReactNode;
}

export const NotFoundTemplate: FC<NotFoundTemplateProps> = ({
  description,
  action,
}) => (
  <div className="flex h-full flex-col items-center justify-center px-6">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Not Found
    </p>

    <h1 className="mb-3">404</h1>

    {description && (
      <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
        {description}
      </p>
    )}

    {action && (
      <div className="flex flex-wrap justify-center gap-3">{action}</div>
    )}
  </div>
);

NotFoundTemplate.displayName = 'NotFoundTemplate';
