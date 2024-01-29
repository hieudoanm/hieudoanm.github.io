import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { TimeRange } from '@chess/common/types/time';
import { query } from '@chess/graphql/apollo/client';
import {
  FullChessPlayer,
  TitledTemplate,
} from '@chess/templates/TitledTemplate';
import { Stats } from '@chess/templates/TitledTemplate/components/TitledStats';
import { ChessTitle } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

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

type TitledData = {
  chess: {
    titled: {
      stats: Stats;
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
  logger.info({ timeRange, title }, 'TitledPage searchParams');

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
      <TitledTemplate total={total} players={players} stats={stats} />
    </>
  );
};

export default TitledPage;
