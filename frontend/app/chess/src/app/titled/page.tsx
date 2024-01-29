import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { TimeRange } from '@chess/common/types/time';
import { query } from '@chess/graphql/apollo/client';
import { Stats } from '@chess/templates/PlayersTemplate/components/PlayerStats';
import {
  FullChessPlayer,
  TitledTemplate,
} from '@chess/templates/TitledTemplate';
import { ChessCountry, ChessTitleAbbreviation } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

const titledQuery = gql`
  query TitledQuery($countryCode: String, $title: String!, $timeRange: String) {
    chess {
      countries {
        cca2
        cca3
        name
        flag
      }
      title(countryCode: $countryCode, title: $title, timeRange: $timeRange) {
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
    countries: ChessCountry[];
    title: {
      stats: Stats;
      total: number;
      players: FullChessPlayer[];
    };
  };
};

type TitledPageProperties = {
  searchParams: {
    countryCode: string;
    timeRange: TimeRange;
    title: ChessTitleAbbreviation;
  };
};

const TitledPage: NextPage<TitledPageProperties> = async ({
  searchParams,
}: TitledPageProperties) => {
  const timeRange = searchParams?.timeRange ?? 'year';
  const title = searchParams?.title ?? 'GM';
  const countryCode = searchParams?.countryCode ?? undefined;
  logger.info({ countryCode, timeRange, title }, 'TitledPage searchParams');

  const queryOptions: QueryOptions<OperationVariables, TitledData> = {
    query: titledQuery,
    variables: { countryCode, title, timeRange },
  };
  const data: TitledData = await query<TitledData>('titledQuery', queryOptions);
  const countries = data?.chess?.countries ?? [];
  const titleData = data?.chess?.title ?? {};
  const { stats, total = 0, players = [] } = titleData;

  return (
    <>
      <Head>
        <title>{APP_NAME} - Titled</title>
      </Head>
      <TitledTemplate
        stats={stats}
        total={total}
        players={players}
        countries={countries}
      />
    </>
  );
};

export default TitledPage;
