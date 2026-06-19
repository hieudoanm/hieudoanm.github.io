import type { ReactNode } from 'react';

export const Section = ({
  id,
  label,
  title,
  sub,
  children,
  center = false,
}: {
  id?: string;
  label?: string;
  title?: string;
  sub?: string;
  children?: ReactNode;
  center?: boolean;
}) => (
  <section id={id} className="mx-auto max-w-5xl px-12 py-24">
    {label && (
      <p className="text-primary mb-3 text-xs font-medium tracking-[0.14em] uppercase">
        {label}
      </p>
    )}
    {title && (
      <h2
        className={`mb-4 font-serif text-4xl leading-snug font-bold ${center ? 'text-center' : ''}`}>
        {title}
      </h2>
    )}
    {sub && (
      <p
        className={`text-base-content/60 mb-12 max-w-xl text-base leading-relaxed ${center ? 'mx-auto text-center' : ''}`}>
        {sub}
      </p>
    )}
    {children}
  </section>
);
