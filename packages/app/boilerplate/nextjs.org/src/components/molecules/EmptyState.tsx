import type { FC, ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-1 flex-col items-center justify-center py-12">
    <p className="mb-4 text-6xl">{icon}</p>
    <h2 className="text-base-content/50 mb-2">{title}</h2>
    {description && (
      <p className="text-base-content/50 mb-6 text-sm">{description}</p>
    )}
    {action}
  </div>
);
