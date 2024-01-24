import { gql } from '@apollo/client';
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import { ChessPlayer, ChessStats } from '@chess/common/types/chess';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import PlayerTemplate from '@chess/templates/PlayerTemplate';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const PlayerPage: NextPage<{
  player: ChessPlayer & { stats: ChessStats[] };
}> = ({ player }) => {
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const username: string = context.query.username?.toString() ?? '';
  try {
    const {
      data: {
        chess: { player },
      },
    } = await apolloClient.query<{ chess: { player: ChessPlayer } }>({
      query,
      variables: { username },
    });
    return { props: { player } };
  } catch (error) {
    logger.error(`getServerSideProps error=${error}`);
    return { props: { player: {} } };
  }
};

export default PlayerPage;
