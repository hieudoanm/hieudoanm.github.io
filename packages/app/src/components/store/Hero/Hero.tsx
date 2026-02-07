import { App } from '@web/data/apps';
import { FC } from 'react';

export const Hero: FC<{ apps: App[]; categories: string[] }> = ({
  apps = [],
  categories = [],
}) => {
  return (
    <section className="bg-base-200/50 border-base-300/30 ring-base-100/10 mb-8 rounded-2xl border p-6 shadow-sm ring-1 backdrop-blur-xl backdrop-saturate-150">
      <h1 className="text-3xl font-bold tracking-tight">Explore Apps</h1>

      <p className="mt-2 max-w-xl text-sm opacity-70">
        A curated collection of privacy-first, in-browser tools. No tracking. No
        accounts.
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="badge bg-base-300/40 border-base-300/40">
          {apps.length} apps
        </span>
        <span className="badge bg-base-300/40 border-base-300/40">
          {categories.length} categories
        </span>
        <span className="badge bg-base-300/40 border-base-300/40">
          Open source
        </span>
      </div>
    </section>
  );
};
