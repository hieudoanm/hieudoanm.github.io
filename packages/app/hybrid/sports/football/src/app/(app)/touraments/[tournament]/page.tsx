import { YearsTemplate } from './_client';
import {
  isValidTournament,
  TOURNAMENT_CONFIG,
} from '@/data/touraments/tournament';
import type { TournamentSlug } from '@/data/touraments/tournament';
import { notFound } from 'next/navigation';

interface Params {
  tournament: string;
}

const TournamentYearsTemplate = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { tournament } = await params;
  if (!isValidTournament(tournament)) notFound();
  return <YearsTemplate tournament={tournament} />;
};

export function generateStaticParams() {
  return Object.keys(TOURNAMENT_CONFIG).map((slug) => ({
    tournament: slug,
  }));
}

export default TournamentYearsTemplate;
