import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { query } from '@chess/graphql/apollo/client';
import { CountryTemplate } from '@chess/templates/CountryTemplate';
import { Stats } from '@chess/templates/CountryTemplate/components/CountryStats';
import { TitleTotal } from '@chess/templates/CountryTemplate/components/CountryTitles';
import { ChessPlayer, ChessStats, ChessTitle } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

const countryQuery = gql`
  query CountryQuery($code: String!, $title: String) {
    chess {
      titled {
        abbreviation
        title
      }
      titledCountry(code: $code, title: $title) {
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
        titles {
          title
          total
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

type CountryData = {
  chess: {
    titled: ChessTitle[];
    titledCountry: {
      countryCode: string;
      stats: Stats;
      total: number;
      players: (ChessPlayer & { stats: ChessStats[] })[];
      titles: TitleTotal[];
    };
  };
};

type CountryPageProperties = {
  params: { code: string };
  searchParams: { title: string };
};

const CountryPage: NextPage<CountryPageProperties> = async ({
  params,
  searchParams,
}: CountryPageProperties) => {
  const code: string = params.code ?? 'US';
  const title = searchParams.title ?? undefined;
  logger.info({ code, title }, 'CountryPage');

  const queryOptions: QueryOptions<OperationVariables, CountryData> = {
    query: countryQuery,
    variables: { code, title },
  };
  const data: CountryData = await query<CountryData>(
    'countryQuery',
    queryOptions
  );

  const titled = data?.chess?.titled ?? [];
  const country = data?.chess?.titledCountry ?? {};
  const { stats, total = 0, players = [], titles = [] } = country;

  return (
    <>
      <Head>
        <title>
          {APP_NAME} - {code}
        </title>
      </Head>
      <CountryTemplate
        countryCode={code}
        stats={stats}
        total={total}
        titles={titles}
        titled={titled}
        players={players}
      />
    </>
  );
};

export default CountryPage;
