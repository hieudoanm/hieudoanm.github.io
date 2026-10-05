import type { ReactNode } from 'react';

/**
 * The app explains itself instead of showing a spinner: what is missing and the
 * one action that resolves it.
 */
export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) => (
  <div className="rounded-box border-base-300 flex flex-col items-center gap-3 border border-dashed px-6 py-10 text-center">
    <p className="font-medium">{title}</p>
    {description && (
      <div className="text-base-content/70 max-w-prose text-sm">
        {description}
      </div>
    )}
    {action}
  </div>
);

export const Loading = ({
  label = 'Reading from the project…',
}: {
  label?: string;
}) => (
  <div className="text-base-content/70 flex items-center gap-3 px-1 py-6 text-sm">
    <span className="loading loading-spinner loading-sm" />
    {label}
  </div>
);

export const ErrorNote = ({
  message,
  action,
}: {
  message: string;
  action?: ReactNode;
}) => (
  <div role="alert" className="alert alert-error text-sm">
    <span>{message}</span>
    {action}
  </div>
);
