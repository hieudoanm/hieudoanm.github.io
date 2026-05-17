import type { FC } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageShell } from '../../components/PageShell';
import { ALL_AFC } from '../../data/afc';
import { ALL_AFCON } from '../../data/afcon';
import { ALL_ASEAN } from '../../data/asean';
import { ALL_CONCACAF } from '../../data/concacaf';
import { ALL_COPA } from '../../data/copa';
import { ALL_EUROS } from '../../data/euro';
import type { TournamentSlug } from '../../data/tournament';
import { TOURNAMENT_CONFIG } from '../../data/tournament';
import { ALL_WORLD_CUPS } from '../../data/world-cup';
import type { KnockoutYearData } from '../../data/world-cup/types';
import { BracketContent } from './components/BracketContent';

const ALL_DATA: Record<TournamentSlug, { year: number }[]> = {
  'world-cup': ALL_WORLD_CUPS,
  euro: ALL_EUROS,
  'copa-america': ALL_COPA,
  afcon: ALL_AFCON,
  afc: ALL_AFC,
  concacaf: ALL_CONCACAF,
  asean: ALL_ASEAN,
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
