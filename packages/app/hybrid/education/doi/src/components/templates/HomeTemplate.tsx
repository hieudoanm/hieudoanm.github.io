import { FC, ReactNode } from 'react';

interface LandingItem {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface HomeTemplateProps {
  items: LandingItem[];
}

export const HomeTemplate: FC<HomeTemplateProps> = ({ items }) => (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <section className="mb-10 text-center">
      <h1 className="mb-3 text-5xl font-bold tracking-tight">Citation Graph</h1>
      <p className="text-base-content/60">
        Explore the Crossref citation network — statistics, an interactive
        force-directed graph, and full-text search across{' '}
        <code>database/doi.db</code>.
      </p>
    </section>
    <section className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="card bg-base-200 card-body hover:bg-base-300 transition-colors">
          <div className="text-primary text-2xl">{item.icon}</div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-base-content/60 text-sm">{item.description}</p>
        </a>
      ))}
    </section>
  </main>
);

HomeTemplate.displayName = 'HomeTemplate';
