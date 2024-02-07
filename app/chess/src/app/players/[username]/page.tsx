import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
import { query } from '@chess/graphql/apollo/client';
import PlayerTemplate from '@chess/shared/templates/PlayerTemplate';
import { ChessPlayer, ChessStats } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

const playerQuery = gql`
  query PlayerQuery($username: String!) {
    chess {
      player(username: $username) {
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

type PlayerData = {
  chess: { player: ChessPlayer & { stats: ChessStats[] } };
};

const PlayerPage: NextPage<{ params: { username: string } }> = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username: string = params.username ?? CHESS_USERNAME;
  logger.info(`PlayerPage username=${username}`);

  const queryOptions: QueryOptions<OperationVariables, PlayerData> = {
    query: playerQuery,
    variables: { username },
  };
  const data: PlayerData = await query<PlayerData>('playerQuery', queryOptions);
  const player = data?.chess?.player;

  return (
    <>
      <Head>
        <title>
          {APP_NAME} - {username}
        </title>
      </Head>
      <PlayerTemplate player={player} />
    </>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [{ username: CHESS_USERNAME }];
};

export default PlayerPage;
