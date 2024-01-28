import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { StreamersTemplate } from '@chess/templates/StreamersTemplate';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTitle,
} from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

const streamersQuery: DocumentNode = gql`
  query StreamersQuery($title: String, $country: String) {
    chess {
      streamers(title: $title, country: $country) {
        total
        countries {
          countryCode
          country
        }
        players {
          id
          username
          name
          followers
          avatar
          location
          countryCode
          twitchUrl
          isStreamer
          verified
          lastOnline
          joined
          status
          title
          league
          archives
          country {
            cca2
            cca3
            name
            flag
          }
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
  }
`;

type StreamersData = {
  chess: {
    streamers: {
      total: number;
      title: ChessTitle;
      players: (ChessPlayer & { country: ChessCountry; stats: ChessStats[] })[];
      countries: { countryCode: string; country: string }[];
    };
  };
};

type StreamersPageProperties = {
  searchParams: { title: string; country: string };
};

const StreamersPage: NextPage<StreamersPageProperties> = async ({
  searchParams,
}: StreamersPageProperties) => {
  const title = searchParams?.title ?? '';
  const country = searchParams?.country ?? '';
  logger.info(`StreamersPage country=${country} title=${title}`);

  const queryOptions: QueryOptions<OperationVariables, StreamersData> = {
    query: streamersQuery,
    variables: { title, country },
  };
  const data: StreamersData = await query<StreamersData>(
    'streamersQuery',
    queryOptions
  );
  const total: number = data?.chess?.streamers?.total ?? 0;
  const countries = data?.chess?.streamers?.countries ?? [];
  const players = data?.chess?.streamers?.players ?? [{ twitchUrl: '' }];

  logger.info(`StreamersPage total=${total} players=${players.length}`);

  return (
    <>
      <Head>
        <title>{APP_NAME} - Streamers</title>
      </Head>
      <Container>
        <div className="py-4 md:py-8">
          <StreamersTemplate total={total} streamers={players} />
        </div>
      </Container>
    </>
  );
};

export default StreamersPage;
