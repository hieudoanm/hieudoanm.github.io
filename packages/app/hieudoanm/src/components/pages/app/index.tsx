import type { FC } from 'react';

interface AppDef {
  label: string;
  description: string;
  href: string;
}

const APPS: AppDef[] = [
  {
    label: 'Football',
    description: 'Football tournaments and data',
    href: '/app/football',
  },
];

export const AppPage: FC = () => (
  <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-20">
    <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-stone-200">
      Apps
    </h1>
    <p className="mb-10 text-sm text-neutral-500">
      A collection of interactive apps and visualizations.
    </p>
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {APPS.map((app) => (
        <a
          key={app.href}
          href={app.href}
          className="group block rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-amber-900/10">
          <h2 className="font-serif text-xl font-bold tracking-tight text-stone-200 transition-colors duration-200 group-hover:text-amber-400">
            {app.label}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
            {app.description}
          </p>
        </a>
      ))}
    </div>
  </div>
);
