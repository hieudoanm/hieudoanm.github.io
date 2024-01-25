import { gql } from '@apollo/client';
import { logger } from '@chess/common/libs/logger';
import { ChessPlayer, ChessStats } from '@chess/common/types/chess';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { Container } from '@chess/components/atoms/Container';
import { apolloClient } from '@chess/graphql/apollo/client';
import { Layout } from '@chess/layout';
import PlayerTemplate from '@chess/templates/PlayerTemplate';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const PlayerPage: NextPage<{ params: { username: string } }> = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username: string = params.username ?? CHESS_USERNAME;
  logger.info(`PlayerPage username=${username}`);

  const {
    data: {
      chess: { player },
    },
  } = await apolloClient.query<{
    chess: { player: ChessPlayer & { stats: ChessStats[] } };
  }>({
    query,
    variables: { username },
  });

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

const query = gql`
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

export default PlayerPage;
