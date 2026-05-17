import { Breadcrumbs } from '@hieudoanm.github.io/components/pages/app/football/components/Breadcrumbs';
import { PageHeader } from '@hieudoanm.github.io/components/pages/app/football/components/PageHeader';
import { PageShell } from '@hieudoanm.github.io/components/pages/app/football/components/PageShell';
import { GroupStagePage } from '@hieudoanm.github.io/components/pages/app/football/pages/group-stage';
import type { WorldCupYearData } from '@hieudoanm.github.io/components/pages/app/football/data/world-cup/types';
import { ALL_WORLD_CUPS } from '@hieudoanm.github.io/components/pages/app/football/data/world-cup';
import { ALL_EUROS } from '@hieudoanm.github.io/components/pages/app/football/data/euro';
import { ALL_COPA } from '@hieudoanm.github.io/components/pages/app/football/data/copa';
import { ALL_AFCON } from '@hieudoanm.github.io/components/pages/app/football/data/afcon';
import { ALL_AFC } from '@hieudoanm.github.io/components/pages/app/football/data/afc';
import { ALL_ASEAN } from '@hieudoanm.github.io/components/pages/app/football/data/asean';
import { ALL_CONCACAF } from '@hieudoanm.github.io/components/pages/app/football/data/concacaf';
import {
  TOURNAMENT_CONFIG,
  isValidTournament,
} from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import type { TournamentSlug } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';

const ALL_DATA: Record<TournamentSlug, WorldCupYearData[]> = {
  'world-cup': ALL_WORLD_CUPS,
  euro: ALL_EUROS as unknown as WorldCupYearData[],
  'copa-america': ALL_COPA as unknown as WorldCupYearData[],
  afcon: ALL_AFCON as unknown as WorldCupYearData[],
  afc: ALL_AFC as unknown as WorldCupYearData[],
  concacaf: ALL_CONCACAF as unknown as WorldCupYearData[],
  asean: ALL_ASEAN as unknown as WorldCupYearData[],
};

const TournamentYearPage: FC<{
  wc: WorldCupYearData;
  tournament: TournamentSlug;
}> = ({ wc, tournament }) => {
  const config = TOURNAMENT_CONFIG[tournament];
  const data = ALL_DATA[tournament];

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
              label: String(wc.year),
              href: `${config.hrefPrefix}/${wc.year}`,
              years: data.map((c) => ({
                year: c.year,
                href: `${config.hrefPrefix}/${c.year}`,
              })),
            },
          ]}
        />
      </div>

      <PageHeader
        subtitle={`${wc.year} ${config.label} · ${wc.host}`}
        title={wc.champion ? `Champion: ${wc.champion}` : wc.host}>
        {wc.champion && (
          <div className="mb-2 text-sm font-medium text-amber-400/70">
            {wc.champion}
          </div>
        )}
      </PageHeader>

      <GroupStagePage wc={wc} tournament={tournament} />
    </PageShell>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    ...ALL_WORLD_CUPS.map((c) => ({
      params: { tournament: 'world-cup', year: String(c.year) },
    })),
    ...ALL_EUROS.map((c) => ({
      params: { tournament: 'euro', year: String(c.year) },
    })),
    ...ALL_COPA.map((c) => ({
      params: { tournament: 'copa-america', year: String(c.year) },
    })),
    ...ALL_AFCON.map((c) => ({
      params: { tournament: 'afcon', year: String(c.year) },
    })),
    ...ALL_AFC.map((c) => ({
      params: { tournament: 'afc', year: String(c.year) },
    })),
    ...ALL_CONCACAF.map((c) => ({
      params: { tournament: 'concacaf', year: String(c.year) },
    })),
    ...ALL_ASEAN.map((c) => ({
      params: { tournament: 'asean', year: String(c.year) },
    })),
  ];
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  wc: WorldCupYearData;
  tournament: TournamentSlug;
}> = ({ params }) => {
  const tournament = params?.tournament;
  if (typeof tournament !== 'string' || !isValidTournament(tournament)) {
    return { notFound: true };
  }
  const year = Number(params?.year);
  if (Number.isNaN(year)) return { notFound: true };

  const data = ALL_DATA[tournament];
  const found = data.find((c) => c.year === year);
  if (!found) return { notFound: true };

  return { props: { wc: found, tournament } };
};

export default TournamentYearPage;
