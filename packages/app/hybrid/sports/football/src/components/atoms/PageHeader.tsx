import type { FC, ReactNode } from 'react';

export const PageHeader: FC<{
  subtitle: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}> = ({ subtitle, title, description, className = 'mb-6', children }) => (
  <header className={`text-center ${className}`}>
    <div className="mb-1.5 text-xs text-amber-400/85 uppercase">{subtitle}</div>
    <h1 className="m-0 mb-1.5 bg-gradient-to-b from-stone-100 to-amber-400 bg-clip-text font-serif text-2xl font-semibold tracking-wide text-transparent sm:text-3xl lg:text-4xl">
      {title}
    </h1>
    {children}
    {description && (
      <p className="mx-auto max-w-lg text-sm leading-relaxed text-neutral-400">
        {description}
      </p>
    )}
  </header>
);
