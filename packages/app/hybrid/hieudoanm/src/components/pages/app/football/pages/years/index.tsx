import type { FC } from 'react';
import { useMemo } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageHeader } from '../../components/PageHeader';
import { PageShell } from '../../components/PageShell';
import { ALL_AFC } from '../../data/international/afc';
import { ALL_AFCON } from '../../data/international/afcon';
import { ALL_COPA } from '../../data/international/copa';
import { ALL_EUROS } from '../../data/international/euro';
import type { TournamentSlug } from '../../data/tournament';
import { TOURNAMENT_CONFIG } from '../../data/tournament';
import { ALL_WORLD_CUPS } from '../../data/international/world-cup';
import { StatList } from './StatList';
import type { YearInfo } from './YearCard';
import { YearCard } from './YearCard';
import { ALL_ASEAN } from '../../data/international/asean';
import { ALL_CONCACAF } from '../../data/international/concacaf';
import { ALL_PREMIER_LEAGUE } from '../../data/club/premier-league';
import { ALL_LA_LIGA } from '../../data/club/la-liga';
import { ALL_BUNDESLIGA } from '../../data/club/bundesliga';
import { ALL_CHAMPIONS_LEAGUE } from '../../data/club/champions-league';

const aggregateFn = (field: 'champion' | 'runnerUp') => (data: YearInfo[]) => {
  const counts: Record<string, { wins: number; years: number[] }> = {};
  for (const year of data) {
    const raw = year[field];
    if (!raw) continue;
    const name = raw === 'West Germany' ? 'Germany' : raw;
    const entry = counts[name] ?? { wins: 0, years: [] };
    entry.wins++;
    entry.years.push(year.year);
    counts[name] = entry;
  }
  return Object.entries(counts)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.wins - a.wins || a.years[0] - b.years[0]);
};

const ALL_DATA: Record<TournamentSlug, YearInfo[]> = {
  'world-cup': ALL_WORLD_CUPS,
  euro: ALL_EUROS,
  'copa-america': ALL_COPA,
  afcon: ALL_AFCON,
  afc: ALL_AFC,
  concacaf: ALL_CONCACAF,
  asean: ALL_ASEAN,
  'premier-league': ALL_PREMIER_LEAGUE,
  'la-liga': ALL_LA_LIGA,
  bundesliga: ALL_BUNDESLIGA,
  'champions-league': ALL_CHAMPIONS_LEAGUE,
};

const HOST_LABEL: Record<TournamentSlug, string> = {
  'world-cup': 'FIFA World Cup',
  euro: 'UEFA European Championship',
  'copa-america': 'CONMEBOL Copa América',
  afcon: 'Africa Cup of Nations',
  afc: 'AFC Asian Cup',
  concacaf: 'CONCACAF Gold Cup',
  asean: 'ASEAN Championship',
  'premier-league': 'English Premier League',
  'la-liga': 'Spanish La Liga',
  bundesliga: 'German Bundesliga',
  'champions-league': 'UEFA Champions League',
};

const DESCRIPTION: Record<TournamentSlug, string> = {
  'world-cup': 'Browse every edition of the FIFA World Cup, from 1930 to 2026.',
  euro: 'Explore every edition of the UEFA European Championship, from 1960 to 2024.',
  'copa-america':
    'Browse every edition of the CONMEBOL Copa América, from 1916 to 2024.',
  afcon:
    'Browse every edition of the Africa Cup of Nations, from 1957 to 2024.',
  afc: 'Browse every edition of the AFC Asian Cup, from 1956 to 2024.',
  concacaf: 'Browse every edition of the CONCACAF Gold Cup, from 1963 to 2023.',
  asean: 'Browse every edition of the ASEAN Championship, from 1996 to 2024.',
  'premier-league':
    'Browse every season of the English Premier League, from 1992 to 2026.',
  'la-liga': 'Browse every season of the Spanish La Liga, from 1997 to 2026.',
  bundesliga:
    'Browse every season of the German Bundesliga, from 1992 to 2026.',
  'champions-league':
    'Browse every season of the UEFA Champions League, from 1992 to 2026.',
};

export const YearsPage: FC<{ tournament?: TournamentSlug }> = ({
  tournament = 'world-cup',
}) => {
  const data = ALL_DATA[tournament];
  const config = TOURNAMENT_CONFIG[tournament];
  const prefix = config.hrefPrefix;

  const winners = useMemo(() => aggregateFn('champion')(data), [data]);
  const runnersUp = useMemo(() => aggregateFn('runnerUp')(data), [data]);

  return (
    <PageShell>
      <div className="mb-6 flex justify-center">
        <Breadcrumbs
          crumbs={[
            { label: 'Football', href: '/app/football' },
            { label: config.label },
          ]}
        />
      </div>
      <PageHeader
        subtitle={HOST_LABEL[tournament]}
        title="Tournaments"
        description={DESCRIPTION[tournament]}
        className="mb-8"
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[...data].reverse().map((info) => (
          <YearCard
            key={info.year}
            info={info}
            href={`${prefix}/${info.year}`}
          />
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
        <StatList title="Winners" data={winners} />
        <StatList title="Runners-up" data={runnersUp} />
      </div>
    </PageShell>
  );
};

YearsPage.displayName = 'YearsPage';
