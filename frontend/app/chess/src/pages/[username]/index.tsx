import { gql } from '@apollo/client';
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import PlayerTemplate from '@chess/templates/PlayerTemplate';
import { ChessPlayer } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const PlayerPage: NextPage<{ player: ChessPlayer }> = ({ player }) => {
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
      data: { player },
    } = await apolloClient.query<{ player: ChessPlayer }>({
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
