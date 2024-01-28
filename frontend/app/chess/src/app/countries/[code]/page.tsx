import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import {
  CountryStats,
  CountryTemplate,
} from '@chess/templates/CountryTemplate';
import { ChessPlayer, ChessStats, ChessTitle } from '@prisma/client';
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
      stats: CountryStats;
      total: number;
      players: (ChessPlayer & { stats: ChessStats[] })[];
      titles: { title: ChessTitle; total: number }[];
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
      <div className="py-4 md:py-8">
        <CountryTemplate
          countryCode={countryCode}
          stats={stats}
          total={total}
          titles={titles}
          players={players}
        />
      </div>
    </Container>
  );
};

export default CountryPage;
