import type { FC } from 'react';

import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { PageHeader } from '@/components/atoms/PageHeader';
import { PageShell } from '@/components/atoms/PageShell';
import { ALL_WORLD_CUPS } from '@/data/touraments/international/world-cup';
import { ALL_EUROS } from '@/data/touraments/international/euro';
import { ALL_COPA } from '@/data/touraments/international/copa';
import { ALL_AFCON } from '@/data/touraments/international/afcon';
import { ALL_AFC } from '@/data/touraments/international/afc';
import { ALL_ASEAN } from '@/data/touraments/international/asean';
import { ALL_CONCACAF } from '@/data/touraments/international/concacaf';
import { ALL_PREMIER_LEAGUE } from '@/data/touraments/club/premier-league';
import { ALL_LA_LIGA } from '@/data/touraments/club/la-liga';
import { ALL_BUNDESLIGA } from '@/data/touraments/club/bundesliga';
import { ALL_CHAMPIONS_LEAGUE } from '@/data/touraments/club/champions-league';

interface TournamentDef {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  editions: number;
  firstYear: number;
  lastYear: number;
  description: string;
}

const INTERNATIONAL: TournamentDef[] = [
  {
    id: 'world-cup',
    label: 'World Cup',
    subtitle: 'FIFA World Cup',
    href: '/touraments/world-cup',
    editions: ALL_WORLD_CUPS.length,
    firstYear: ALL_WORLD_CUPS.at(0)?.year || 0,
    lastYear: ALL_WORLD_CUPS.at(-1)?.year || 0,
    description:
      'Browse every edition of the FIFA World Cup, from 1930 to 2026.',
  },
  {
    id: 'euro',
    label: 'Euro',
    subtitle: 'UEFA European Championship',
    href: '/touraments/euro',
    editions: ALL_EUROS.length,
    firstYear: ALL_EUROS.at(0)?.year || 0,
    lastYear: ALL_EUROS.at(-1)?.year || 0,
    description:
      'Explore every edition of the UEFA European Championship, from 1960 to 2024.',
  },
  {
    id: 'copa-america',
    label: 'Copa América',
    subtitle: 'CONMEBOL Copa América',
    href: '/touraments/copa-america',
    editions: ALL_COPA.length,
    firstYear: ALL_COPA.at(0)?.year || 0,
    lastYear: ALL_COPA.at(-1)?.year || 0,
    description:
      'Browse every edition of the CONMEBOL Copa América, from 1916 to 2024.',
  },
  {
    id: 'afcon',
    label: 'AFCON',
    subtitle: 'Africa Cup of Nations',
    href: '/touraments/afcon',
    editions: ALL_AFCON.length,
    firstYear: ALL_AFCON.at(0)?.year || 0,
    lastYear: ALL_AFCON.at(-1)?.year || 0,
    description:
      'Browse every edition of the Africa Cup of Nations, from 1957 to 2024.',
  },
  {
    id: 'afc',
    label: 'AFC Asian Cup',
    subtitle: 'AFC Asian Cup',
    href: '/touraments/afc',
    editions: ALL_AFC.length,
    firstYear: ALL_AFC.at(0)?.year || 0,
    lastYear: ALL_AFC.at(-1)?.year || 0,
    description:
      'Browse every edition of the AFC Asian Cup, from 1956 to 2024.',
  },
  {
    id: 'concacaf',
    label: 'CONCACAF Gold Cup',
    subtitle: 'CONCACAF Gold Cup',
    href: '/touraments/concacaf',
    editions: ALL_CONCACAF.length,
    firstYear: ALL_CONCACAF.at(0)?.year || 0,
    lastYear: ALL_CONCACAF.at(-1)?.year || 0,
    description:
      'Browse every edition of the CONCACAF Gold Cup, from 1963 to 2023.',
  },
  {
    id: 'asean',
    label: 'ASEAN',
    subtitle: 'ASEAN Championship',
    href: '/touraments/asean',
    editions: ALL_ASEAN.length,
    firstYear: ALL_ASEAN.at(0)?.year || 0,
    lastYear: ALL_ASEAN.at(-1)?.year || 0,
    description:
      'Browse every edition of the ASEAN Championship (formerly AFF Championship), from 1996 to 2024.',
  },
];

const CLUB: TournamentDef[] = [
  {
    id: 'champions-league',
    label: 'Champions League',
    subtitle: 'UEFA Champions League',
    href: '/touraments/champions-league',
    editions: ALL_CHAMPIONS_LEAGUE.length,
    firstYear: ALL_CHAMPIONS_LEAGUE.at(0)?.year || 0,
    lastYear: ALL_CHAMPIONS_LEAGUE.at(-1)?.year || 0,
    description:
      'Browse every season of the UEFA Champions League, from 1992 to 2026.',
  },
  {
    id: 'premier-league',
    label: 'Premier League',
    subtitle: 'English Premier League',
    href: '/touraments/premier-league',
    editions: ALL_PREMIER_LEAGUE.length,
    firstYear: ALL_PREMIER_LEAGUE.at(0)?.year || 0,
    lastYear: ALL_PREMIER_LEAGUE.at(-1)?.year || 0,
    description:
      'Browse every season of the English Premier League, from 1992 to 2026.',
  },
  {
    id: 'la-liga',
    label: 'La Liga',
    subtitle: 'Spanish La Liga',
    href: '/touraments/la-liga',
    editions: ALL_LA_LIGA.length,
    firstYear: ALL_LA_LIGA.at(0)?.year || 0,
    lastYear: ALL_LA_LIGA.at(-1)?.year || 0,
    description:
      'Browse every season of the Spanish La Liga, from 1997 to 2026.',
  },
  {
    id: 'bundesliga',
    label: 'Bundesliga',
    subtitle: 'German Bundesliga',
    href: '/touraments/bundesliga',
    editions: ALL_BUNDESLIGA.length,
    firstYear: ALL_BUNDESLIGA.at(0)?.year || 0,
    lastYear: ALL_BUNDESLIGA.at(-1)?.year || 0,
    description:
      'Browse every season of the German Bundesliga, from 1992 to 2026.',
  },
];

const SectionGrid: FC<{ title: string; items: TournamentDef[] }> = ({
  title,
  items,
}) => (
  <div>
    <h3 className="mb-3 text-center text-xs tracking-widest text-neutral-500 uppercase">
      {title}
    </h3>
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((t) => (
        <a
          key={t.id}
          href={t.href}
          className="group block rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-amber-900/10">
          <div className="mb-1 text-xs text-amber-400/85 uppercase">
            {t.subtitle}
          </div>
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
      ))}
    </div>
  </div>
);

export const TournamentsTemplate: FC = () => (
  <PageShell>
    <div className="mb-6 flex justify-center">
      <Breadcrumbs crumbs={[{ label: 'Football' }]} />
    </div>
    <PageHeader
      subtitle="Football"
      title="Tournaments"
      description="Browse football tournaments from around the world."
      className="mb-8"
    />
    <div className="mx-auto flex max-w-2xl flex-col gap-10">
      <SectionGrid title="International Football" items={INTERNATIONAL} />
      <SectionGrid title="Club Football" items={CLUB} />
    </div>
  </PageShell>
);

TournamentsTemplate.displayName = 'TournamentsTemplate';
