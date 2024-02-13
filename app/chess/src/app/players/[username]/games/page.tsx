import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
import { query } from '@chess/graphql/apollo/client';
import { PlayerGamesTemplate } from '@chess/shared/templates/PlayerGamesTemplate';
import { ChessGame } from '@prisma/client';
import { Metadata, NextPage } from 'next';
import Head from 'next/head';

const gamesQuery: DocumentNode = gql`
  query GamesQuery($username: String!) {
    chess {
      player(username: $username) {
        games {
          id
          url
          pgn
          timeControl
          timeClass
          endTime
          rated
          tcn
          initialSetup
          rules
          whiteUsername
          blackUsername
          whiteAccuracy
          blackAccuracy
          whiteResult
          blackResult
          whiteRating
          blackRating
          fen
        }
      }
    }
  }
`;

type GamesData = { chess: { player: { games: ChessGame[] } } };

const GamesPage: NextPage<{ params: { username: string } }> = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username: string = params.username ?? CHESS_USERNAME;
  logger.info(`InsightsPage username=${username}`);

  const queryOptions: QueryOptions<OperationVariables, GamesData> = {
    query: gamesQuery,
    variables: { username },
  };
  const data: GamesData = await query<GamesData>('gamesQuery', queryOptions);
  const games: ChessGame[] = data?.chess?.player?.games ?? [];

  return (
    <>
      <Head>
        <title>
          {APP_NAME} - {username} - Games
        </title>
      </Head>
      <PlayerGamesTemplate username={username} games={games} />
    </>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [{ username: CHESS_USERNAME }];
};

export default GamesPage;
