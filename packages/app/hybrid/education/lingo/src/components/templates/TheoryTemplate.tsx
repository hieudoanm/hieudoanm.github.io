import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export interface TheorySection {
  title: string;
  body: ReactNode;
}

export interface TheoryLink {
  href: string;
  label: string;
  description: string;
}

interface TheoryTemplateProps {
  title: string;
  subtitle: string;
  sections: TheorySection[];
  links?: TheoryLink[];
  references?: TheoryLink[];
}

const SectionHeading: FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-primary text-center text-2xl font-bold tracking-tight">
    {children}
  </h2>
);

export const TheoryTemplate: FC<TheoryTemplateProps> = ({
  title,
  subtitle,
  sections,
  links = [],
  references = [],
}) => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 md:p-6">
    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-base-content/60 mt-2 text-sm">{subtitle}</p>
    </header>

    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.title}>
          <SectionHeading>{section.title}</SectionHeading>
          <div className="card border-base-content/10 mt-3 border p-6">
            {section.body}
          </div>
        </section>
      ))}
    </div>

    {references.length > 0 && (
      <section className="flex flex-col gap-4">
        <h2 className="text-primary text-center text-2xl font-bold tracking-tight">
          References
        </h2>
        <ol className="card border-base-content/10 marker:text-primary list-decimal space-y-2 border p-6 pl-10">
          {references.map((ref) => (
            <li key={ref.href}>
              <a
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline">
                {ref.label}
              </a>
              {ref.description && (
                <span className="text-base-content/60 ml-2 text-sm">
                  &mdash; {ref.description}
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
    )}

    {links.length > 0 && (
      <section className="flex flex-col gap-4">
        <h2 className="text-primary text-center text-2xl font-bold tracking-tight">
          Examples
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card border-base-content/10 border p-5 transition-colors">
              <h3 className="text-primary text-lg font-bold">{link.label}</h3>
              <p className="text-base-content/60 mt-1 text-sm">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    )}
  </div>
);

TheoryTemplate.displayName = 'TheoryTemplate';
