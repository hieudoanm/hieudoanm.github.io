import { gql } from '@apollo/client';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { Layout } from '@chess/layout';
import { ChessPlayer, ChessStats } from '@prisma/client';
import type { NextPage } from 'next';

const playersQuery = gql`
  query PlayersQuery($limit: Int, $offset: Int) {
    chess {
      players(limit: $limit, offset: $offset) {
        id
        username
        name
        followers
        avatar
        location
        verified
        lastOnline
        joined
        status
        title
        league
        twitchUrl
        isStreamer
        country
        countryCode
        archives
        stats {
          timeClass
          best
          last
          deviation
          win
          draw
          loss
        }
      }
    }
  }
`;

type PlayersResponse = {
  chess: { players: (ChessPlayer & { stats: ChessStats[] })[] };
};

type PlayersPageProperties = {
  searchParams: { limit: number; offset: number };
};

const PlayersPage: NextPage<PlayersPageProperties> = async ({
  searchParams,
}: PlayersPageProperties) => {
  const limit: number = searchParams.limit ?? 100;
  const offset: number = searchParams.offset ?? 0;
  logger.info(`PlayersPage limit=${limit} offset=${offset}`);

  const data = await query<PlayersResponse>({
    query: playersQuery,
    variables: { limit, offset },
  });
  const players = data?.chess?.players ?? '';
  logger.info(`PlayersPage players=${players.length}`);

  return (
    <Layout>
      <Container>
        <div className="py-8" />
      </Container>
    </Layout>
  );
};

export default PlayersPage;
