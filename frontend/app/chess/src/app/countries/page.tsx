import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  gql,
} from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { logger } from '@chess/common/libs/logger';
import { query } from '@chess/graphql/apollo/client';
import { CountriesTemplate, Country } from '@chess/templates/CountriesTemplate';
import { NextPage } from 'next';
import Head from 'next/head';

type CountriesData = { chess: { titledCountries: Country[] } };

const countriesQuery: DocumentNode = gql`
  query CountriesQuery {
    chess {
      titledCountries {
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
  const countries = data?.chess?.titledCountries ?? [];

  return (
    <>
      <Head>
        <title>{APP_NAME} - Countries</title>
      </Head>
      <CountriesTemplate countries={countries} />
    </>
  );
};

export default CountriesPage;
