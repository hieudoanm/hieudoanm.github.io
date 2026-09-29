import type { FC, ReactNode } from 'react';

/**
 * The control-panel section shared by the neuroimaging simulators: a titled
 * card with a one-line explanation above its controls.
 */
export const Window: FC<{
  title: string;
  hint: string;
  children: ReactNode;
}> = ({ title, hint, children }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex flex-col gap-1">
      <h3 className="text-primary text-sm font-bold">{title}</h3>
      <p className="text-base-content/50 text-xs">{hint}</p>
    </div>
    {children}
  </div>
);

Window.displayName = 'Window';
