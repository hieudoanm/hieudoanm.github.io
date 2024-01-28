import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { PlayersTemplate } from '@chess/templates/PlayersTemplate';
import { ChessPlayer, ChessStats } from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';

const playersQuery = gql`
  query PlayersQuery($limit: Int, $offset: Int) {
    chess {
      players(limit: $limit, offset: $offset) {
        timeClass
        best
        last
        deviation
        win
        draw
        loss
        player {
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
          countryCode
          archives
          country {
            cca2
            cca3
            name
            flag
          }
        }
      }
    }
  }
`;

type PlayersData = {
  chess: { players: (ChessStats & { player: ChessPlayer })[] };
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

  const queryOptions: QueryOptions<OperationVariables, PlayersData> = {
    query: playersQuery,
    variables: { limit, offset },
  };
  const data: PlayersData = await query<PlayersData>(
    'playersQuery',
    queryOptions
  );
  const players = data?.chess?.players ?? '';
  logger.info(`PlayersPage players=${players.length}`);

  return (
    <>
      <Head>
        <title>{APP_NAME} - Players</title>
      </Head>
      <Container>
        <div className="py-4 md:py-8">
          <PlayersTemplate players={players} />
        </div>
      </Container>
    </>
  );
};

export default PlayersPage;
