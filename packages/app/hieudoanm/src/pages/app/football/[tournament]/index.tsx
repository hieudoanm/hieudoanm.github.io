import { YearsPage } from '@hieudoanm.github.io/components/pages/app/football/pages/years';
import {
  isValidTournament,
  TOURNAMENT_CONFIG,
} from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import type { TournamentSlug } from '@hieudoanm.github.io/components/pages/app/football/data/tournament';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';

const TournamentYearsPage: FC<{ tournament: TournamentSlug }> = ({
  tournament,
}) => <YearsPage tournament={tournament} />;

export const getStaticPaths: GetStaticPaths = () => ({
  paths: Object.keys(TOURNAMENT_CONFIG).map((slug) => ({
    params: { tournament: slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{
  tournament: TournamentSlug;
}> = ({ params }) => {
  const tournament = params?.tournament;
  if (typeof tournament !== 'string' || !isValidTournament(tournament)) {
    return { notFound: true };
  }
  return { props: { tournament } };
};

export default TournamentYearsPage;
