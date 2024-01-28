import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { logger } from '@chess/common/libs/logger';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { CountriesTemplate, Country } from '@chess/templates/CountriesTemplate';
import { NextPage } from 'next';

type CountriesData = { chess: { countries: Country[] } };

const countriesQuery: DocumentNode = gql`
  query CountriesQuery {
    chess {
      countries {
        countryCode
        count
      }
    }
  }
`;

const CountriesPage: NextPage = async () => {
  logger.info('CountriesPage');

  const queryOptions: QueryOptions<OperationVariables, CountriesData> = {
    query: countriesQuery,
  };
  const data: CountriesData = await query<CountriesData>(
    'countriesQuery',
    queryOptions
  );
  const countries = data?.chess?.countries ?? [];

  return (
    <Container>
      <CountriesTemplate countries={countries} />
    </Container>
  );
};

export default CountriesPage;
