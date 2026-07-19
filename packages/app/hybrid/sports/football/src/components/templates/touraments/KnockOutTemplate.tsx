import type { FC } from 'react';

import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { PageShell } from '@/components/atoms/PageShell';
import { ALL_AFC } from '@/data/touraments/international/afc';
import { ALL_AFCON } from '@/data/touraments/international/afcon';
import { ALL_ASEAN } from '@/data/touraments/international/asean';
import { ALL_CONCACAF } from '@/data/touraments/international/concacaf';
import { ALL_COPA } from '@/data/touraments/international/copa';
import { ALL_EUROS } from '@/data/touraments/international/euro';
import type { TournamentSlug } from '@/data/touraments/tournament';
import { TOURNAMENT_CONFIG } from '@/data/touraments/tournament';
import { ALL_WORLD_CUPS } from '@/data/touraments/international/world-cup';
import { ALL_PREMIER_LEAGUE } from '@/data/touraments/club/premier-league';
import { ALL_LA_LIGA } from '@/data/touraments/club/la-liga';
import { ALL_BUNDESLIGA } from '@/data/touraments/club/bundesliga';
import { ALL_CHAMPIONS_LEAGUE } from '@/data/touraments/club/champions-league';
import type { KnockoutYearData } from '@/data/touraments/international/world-cup/types';
import { BracketContent } from './knockout/BracketContent';

const ALL_DATA: Record<TournamentSlug, { year: number }[]> = {
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

export const KnockOutTemplate: FC<{
  yearData: KnockoutYearData;
  year: number;
  tournament?: TournamentSlug;
}> = ({ yearData, year, tournament = 'world-cup' }) => {
  const config = TOURNAMENT_CONFIG[tournament];
  const years = ALL_DATA[tournament];
  return (
    <PageShell>
      <div className="mb-6 flex justify-center">
        <Breadcrumbs
          crumbs={[
            { label: 'Football', href: '/touraments' },
            {
              label: config.label,
              href: config.hrefPrefix,
            },
            {
              label: String(year),
              href: `${config.hrefPrefix}/${year}/knock-out`,
              years: years.map((c) => ({
                year: c.year,
                href: `${config.hrefPrefix}/${c.year}/knock-out`,
              })),
            },
            { label: 'Knockout' },
          ]}
        />
      </div>

      <BracketContent yearData={yearData} year={year} tournament={tournament} />
    </PageShell>
  );
};
KnockOutTemplate.displayName = 'KnockOutTemplate';
