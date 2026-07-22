import { YearsPage } from './_client';
import {
  isValidTournament,
  TOURNAMENT_CONFIG,
} from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import type { TournamentSlug } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import { notFound } from 'next/navigation';

interface Params {
  tournament: string;
}

const TournamentYearsPage = async ({ params }: { params: Promise<Params> }) => {
  const { tournament } = await params;
  if (!isValidTournament(tournament)) notFound();
  return <YearsPage tournament={tournament} />;
};

export function generateStaticParams() {
  return Object.keys(TOURNAMENT_CONFIG).map((slug) => ({
    tournament: slug,
  }));
}

export default TournamentYearsPage;
