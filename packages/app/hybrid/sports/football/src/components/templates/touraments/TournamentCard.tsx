import type { FC } from 'react';

export interface TournamentDef {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  editions: number;
  firstYear: number;
  lastYear: number;
  description: string;
}

export const TournamentCard: FC<{ t: TournamentDef }> = ({ t }) => (
  <a
    href={t.href}
    className="group block rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-amber-900/10">
    <div className="mb-1 text-xs text-amber-400/85 uppercase">{t.subtitle}</div>
    <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-200 transition-colors duration-200 group-hover:text-amber-400">
      {t.label}
    </h2>
    <div className="mt-2 text-sm text-neutral-400">
      {t.editions} editions &middot; {t.firstYear}&ndash;{t.lastYear}
    </div>
    <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-neutral-500">
      {t.description}
    </p>
  </a>
);
