import type { FC, ReactNode } from 'react';

export interface EmptyStateProps {
  icon: ReactNode;
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
  <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
    <div className="text-4xl">{icon}</div>
    <h3>{title}</h3>
    {description ? (
      <p className="text-base-content/70 max-w-md">{description}</p>
    ) : null}
    {action ? <div className="mt-2">{action}</div> : null}
  </div>
);
