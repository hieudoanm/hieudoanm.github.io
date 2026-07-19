import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <span className="mb-4 text-5xl">{icon}</span>
    <h3 className="text-lg font-semibold">{title}</h3>
    {description && (
      <p className="text-base-content/50 mt-1 max-w-xs text-sm">
        {description}
      </p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
