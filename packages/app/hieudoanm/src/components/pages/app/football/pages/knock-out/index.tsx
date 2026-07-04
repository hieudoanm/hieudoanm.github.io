import type { FC } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageShell } from '../../components/PageShell';
import { ALL_AFC } from '../../data/international/afc';
import { ALL_AFCON } from '../../data/international/afcon';
import { ALL_ASEAN } from '../../data/international/asean';
import { ALL_CONCACAF } from '../../data/international/concacaf';
import { ALL_COPA } from '../../data/international/copa';
import { ALL_EUROS } from '../../data/international/euro';
import type { TournamentSlug } from '../../data/tournament';
import { TOURNAMENT_CONFIG } from '../../data/tournament';
import { ALL_WORLD_CUPS } from '../../data/international/world-cup';
import { ALL_PREMIER_LEAGUE } from '../../data/club/premier-league';
import { ALL_CHAMPIONS_LEAGUE } from '../../data/club/champions-league';
import type { KnockoutYearData } from '../../data/international/world-cup/types';
import { BracketContent } from './components/BracketContent';

const ALL_DATA: Record<TournamentSlug, { year: number }[]> = {
  'world-cup': ALL_WORLD_CUPS,
  euro: ALL_EUROS,
  'copa-america': ALL_COPA,
  afcon: ALL_AFCON,
  afc: ALL_AFC,
  concacaf: ALL_CONCACAF,
  asean: ALL_ASEAN,
  'premier-league': ALL_PREMIER_LEAGUE,
  'champions-league': ALL_CHAMPIONS_LEAGUE,
};

export const KnockOutPage: FC<{
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
            { label: 'Football', href: '/app/football' },
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
KnockOutPage.displayName = 'KnockOutPage';
