import { FC, memo } from 'react';

export const Section: FC<{
  label: string;
  count?: number;
  children: React.ReactNode;
}> = memo(({ label, count, children }) => (
  <section aria-label={label} className="mt-10 w-full max-w-2xl">
    <p className="text-base-content/30 mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
      {label}
      {count !== undefined && (
        <span className="bg-primary/20 text-primary border-primary/30 badge badge-xs font-mono tracking-normal normal-case">
          {count}
        </span>
      )}
    </p>
    {children}
  </section>
));

Section.displayName = 'Section';
