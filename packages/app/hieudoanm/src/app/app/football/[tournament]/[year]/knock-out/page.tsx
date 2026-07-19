import { KNOCKOUT_DATA as EURO_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/euro';
import { KNOCKOUT_DATA as COPA_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/copa';
import { KNOCKOUT_DATA as AFCON_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/afcon';
import { KNOCKOUT_DATA as AFC_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/afc';
import { KNOCKOUT_DATA as ASEA_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/asean';
import { KNOCKOUT_DATA as CONCACAF_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/concacaf';
import type { TournamentSlug } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import { isValidTournament } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import { KNOCKOUT_DATA as WC_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/international/world-cup';
import { KNOCKOUT_DATA as PL_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/club/premier-league';
import { KNOCKOUT_DATA as LL_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/club/la-liga';
import { KNOCKOUT_DATA as BL_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/club/bundesliga';
import { KNOCKOUT_DATA as CL_KNOCKOUT_DATA } from '@hieudoanm.github.io/components/pages/app/football/data/club/champions-league';
import type { KnockoutYearData as WcKnockoutYearData } from '@hieudoanm.github.io/components/pages/app/football/data/international/world-cup/types';
import { KnockOutPage } from './_client';
import { notFound } from 'next/navigation';

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
  'premier-league': PL_KNOCKOUT_DATA as unknown as Record<
    number,
    WcKnockoutYearData
  >,
  'la-liga': LL_KNOCKOUT_DATA as unknown as Record<number, WcKnockoutYearData>,
  bundesliga: BL_KNOCKOUT_DATA as unknown as Record<number, WcKnockoutYearData>,
  'champions-league': CL_KNOCKOUT_DATA as unknown as Record<
    number,
    WcKnockoutYearData
  >,
};

interface Params {
  tournament: string;
  year: string;
}

const KnockOutNextPage = async ({ params }: { params: Promise<Params> }) => {
  const { tournament, year } = await params;
  if (!isValidTournament(tournament)) notFound();

  const yearNum = Number(year);
  if (Number.isNaN(yearNum)) notFound();

  const data = KNOCKOUT_DATA_MAP[tournament];
  const yearData = data[yearNum];
  if (!yearData) notFound();

  return (
    <KnockOutPage yearData={yearData} year={yearNum} tournament={tournament} />
  );
};

export function generateStaticParams() {
  const paths = [
    ...Object.keys(WC_KNOCKOUT_DATA).map((y) => ({
      tournament: 'world-cup',
      year: y,
    })),
    ...Object.keys(EURO_KNOCKOUT_DATA).map((y) => ({
      tournament: 'euro',
      year: y,
    })),
    ...Object.keys(COPA_KNOCKOUT_DATA).map((y) => ({
      tournament: 'copa-america',
      year: y,
    })),
    ...Object.keys(AFCON_KNOCKOUT_DATA).map((y) => ({
      tournament: 'afcon',
      year: y,
    })),
    ...Object.keys(AFC_KNOCKOUT_DATA).map((y) => ({
      tournament: 'afc',
      year: y,
    })),
    ...Object.keys(CONCACAF_KNOCKOUT_DATA).map((y) => ({
      tournament: 'concacaf',
      year: y,
    })),
    ...Object.keys(ASEA_KNOCKOUT_DATA).map((y) => ({
      tournament: 'asean',
      year: y,
    })),
    ...Object.keys(PL_KNOCKOUT_DATA).map((y) => ({
      tournament: 'premier-league',
      year: y,
    })),
    ...Object.keys(LL_KNOCKOUT_DATA).map((y) => ({
      tournament: 'la-liga',
      year: y,
    })),
    ...Object.keys(BL_KNOCKOUT_DATA).map((y) => ({
      tournament: 'bundesliga',
      year: y,
    })),
    ...Object.keys(CL_KNOCKOUT_DATA).map((y) => ({
      tournament: 'champions-league',
      year: y,
    })),
  ];
  return paths;
}

export default KnockOutNextPage;
