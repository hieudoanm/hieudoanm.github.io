import type { ReactNode } from 'react';

/** A titled region. Every screen section uses it so headings stay consistent. */
export const Card = ({
  title,
  description,
  actions,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) => (
  <section className="card bg-base-100 border-base-300 border">
    {(title || actions) && (
      <header className="card-body pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="card-title text-base">{title}</h2>}
            {description && (
              <p className="text-base-content/70 text-sm">{description}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
        </div>
      </header>
    )}
    <div className="card-body pt-0">{children}</div>
  </section>
);
