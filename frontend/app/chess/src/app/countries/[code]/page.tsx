import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { CountryTemplate } from '@chess/templates/CountryTemplate';
import { Stats } from '@chess/templates/CountryTemplate/components/CountryStats';
import { TitleTotal } from '@chess/templates/CountryTemplate/components/CountryTitles';
import { ChessPlayer, ChessStats } from '@prisma/client';
import { NextPage } from 'next';

const countryQuery = gql`
  query CountryQuery($code: String!) {
    chess {
      country(code: $code) {
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
    country: {
      countryCode: string;
      stats: Stats;
      total: number;
      players: (ChessPlayer & { stats: ChessStats[] })[];
      titles: TitleTotal[];
    };
  };
};

const CountryPage: NextPage<{ params: { code: string } }> = async ({
  params,
}: {
  params: { code: string };
}) => {
  const countryCode: string = params.code ?? 'US';
  logger.info(`CountryPage countryCode=${countryCode}`);

  const queryOptions: QueryOptions<OperationVariables, CountryData> = {
    query: countryQuery,
    variables: { code: countryCode },
  };
  const data: CountryData = await query<CountryData>(
    'countryQuery',
    queryOptions
  );
  const country = data?.chess?.country ?? {};

  const { stats, total = 0, players = [], titles = [] } = country;

  return (
    <Container>
      <CountryTemplate
        countryCode={countryCode}
        stats={stats}
        total={total}
        titles={titles}
        players={players}
      />
    </Container>
  );
};

export default CountryPage;
