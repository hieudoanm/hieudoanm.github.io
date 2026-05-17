import { KNOCKOUT_DATA as EURO_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/euro';
import { KNOCKOUT_DATA as COPA_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/copa';
import { KNOCKOUT_DATA as AFCON_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/afcon';
import { KNOCKOUT_DATA as AFC_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/afc';
import { KNOCKOUT_DATA as ASEA_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/asean';
import { KNOCKOUT_DATA as CONCACAF_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/concacaf';
import type { TournamentSlug } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import { isValidTournament } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import { KNOCKOUT_DATA as WC_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/world-cup';
import type { KnockoutYearData as WcKnockoutYearData } from '@hieudoanm.github.io/components/pages/app/football/data/world-cup/types';
import { KnockOutPage } from '@hieudoanm.github.io/components/pages/app/football/pages/knock-out';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

const KNOCKOUT_DATA_MAP: Record<
  TournamentSlug,
  Record<number, WcKnockoutYearData>
> = {
  'world-cup': WC_KNOCKOUT_DATA,
  euro: EURO_KNOCKOUT_DATA as unknown as Record<number, WcKnockoutYearData>,
  'copa-america': COPA_KNOCKOUT_DATA as unknown as Record<
    number,
    WcKnockoutYearData
  >,
  afcon: AFCON_KNOCKOUT_DATA as unknown as Record<number, WcKnockoutYearData>,
  afc: AFC_KNOCKOUT_DATA as unknown as Record<number, WcKnockoutYearData>,
  concacaf: CONCACAF_KNOCKOUT_DATA as unknown as Record<
    number,
    WcKnockoutYearData
  >,
  asean: ASEA_KNOCKOUT_DATA as unknown as Record<number, WcKnockoutYearData>,
};

const KnockOutNextPage: NextPage<{
  yearData: WcKnockoutYearData;
  year: number;
  tournament: TournamentSlug;
}> = ({ yearData, year, tournament }) => (
  <KnockOutPage yearData={yearData} year={year} tournament={tournament} />
);

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    ...Object.keys(WC_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'world-cup', year: y },
    })),
    ...Object.keys(EURO_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'euro', year: y },
    })),
    ...Object.keys(COPA_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'copa-america', year: y },
    })),
    ...Object.keys(AFCON_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'afcon', year: y },
    })),
    ...Object.keys(AFC_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'afc', year: y },
    })),
    ...Object.keys(CONCACAF_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'concacaf', year: y },
    })),
    ...Object.keys(ASEA_KNOCKOUT_DATA).map((y) => ({
      params: { tournament: 'asean', year: y },
    })),
  ];
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  yearData: WcKnockoutYearData;
  year: number;
  tournament: TournamentSlug;
}> = ({ params }) => {
  const tournament = params?.tournament;
  if (typeof tournament !== 'string' || !isValidTournament(tournament)) {
    return { notFound: true };
  }
  const year = Number(params?.year);
  if (Number.isNaN(year)) return { notFound: true };

  const data = KNOCKOUT_DATA_MAP[tournament];
  const yearData = data[year];
  if (!yearData) return { notFound: true };

  return { props: { yearData, year, tournament } };
};

export default KnockOutNextPage;
