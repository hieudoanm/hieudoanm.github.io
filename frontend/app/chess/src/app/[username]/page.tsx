import { gql } from '@apollo/client';
import { logger } from '@chess/common/libs/logger';
import { ChessPlayer, ChessStats } from '@chess/common/types/chess';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { Layout } from '@chess/layout';
import PlayerTemplate from '@chess/templates/PlayerTemplate';
import { NextPage } from 'next';

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

type PlayerResponse = {
  chess: { player: ChessPlayer & { stats: ChessStats[] } };
};

const PlayerPage: NextPage<{ params: { username: string } }> = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username: string = params.username ?? CHESS_USERNAME;
  logger.info(`PlayerPage username=${username}`);

  const data = await query<PlayerResponse>({
    query: playerQuery,
    variables: { username },
  });
  const player = data?.chess?.player;

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <PlayerTemplate player={player} />
        </div>
      </Container>
    </Layout>
  );
};

export default PlayerPage;
