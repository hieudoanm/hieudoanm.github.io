import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { PlayerGamesTemplate } from '@chess/templates/PlayerGamesTemplate';
import { ChessGame } from '@prisma/client';
import { NextPage } from 'next';

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
    <Container>
      <PlayerGamesTemplate username={username} games={games} />
    </Container>
  );
};

export default GamesPage;
