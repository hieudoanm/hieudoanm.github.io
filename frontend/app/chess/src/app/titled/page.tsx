import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { TimeRange } from '@chess/common/types/time';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import {
  FullChessPlayer,
  TitledStats,
  TitledTemplate,
} from '@chess/templates/TitledTemplate';
import { ChessTitle } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

type TitledData = {
  chess: {
    titled: {
      stats: TitledStats;
      total: number;
      players: FullChessPlayer[];
    };
  };
};

type TitledPageProperties = {
  searchParams: {
    timeRange: TimeRange;
    title: ChessTitle;
  };
};

const TitledPage: NextPage<TitledPageProperties> = async ({
  searchParams,
}: TitledPageProperties) => {
  const timeRange = searchParams?.timeRange ?? 'year';
  const title = searchParams?.title ?? 'GM';
  logger.info(`TitledPage timeRange=${timeRange} title=${title}`);

  const queryOptions: QueryOptions<OperationVariables, TitledData> = {
    query: titledQuery,
    variables: { title, timeRange },
  };
  const data: TitledData = await query<TitledData>('titledQuery', queryOptions);
  const titled = data?.chess?.titled ?? {};
  const { stats, total = 0, players = [] } = titled;

  return (
    <>
      <Head>
        <title>{APP_NAME} - Titled</title>
      </Head>
      <Container>
        <div className="py-4 md:py-8">
          <TitledTemplate
            title={title}
            total={total}
            timeRange={timeRange}
            players={players}
            stats={stats}
          />
        </div>
      </Container>
    </>
  );
};

const titledQuery = gql`
  query TitledQuery($title: String!, $timeRange: String) {
    chess {
      titled(title: $title, timeRange: $timeRange) {
        stats {
          rapid {
            average
            max
          }
          blitz {
            average
            max
          }
          bullet {
            average
            max
          }
        }
        total
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
  }
`;

export default TitledPage;
