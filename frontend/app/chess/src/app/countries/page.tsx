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
import { ChessTitle, ChessTitleAbbreviation } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

type CountriesData = {
  chess: { titled: ChessTitle[]; titledCountries: Country[] };
};

const countriesQuery: DocumentNode = gql`
  query CountriesQuery($title: String) {
    chess {
      titled {
        abbreviation
        title
      }
      titledCountries(title: $title) {
        countryCode
        count
      }
    }
  }
`;

export type CountriesPageProperties = {
  searchParams: { title: ChessTitleAbbreviation };
};

const CountriesPage: NextPage<CountriesPageProperties> = async ({
  searchParams,
}) => {
  const title = searchParams.title ?? undefined;
  logger.info({ title }, 'CountriesPage');

  const queryOptions: QueryOptions<OperationVariables, CountriesData> = {
    query: countriesQuery,
    variables: { title },
  };
  const data: CountriesData = await query<CountriesData>(
    'countriesQuery',
    queryOptions
  );
  const countries = data?.chess?.titledCountries ?? [];
  const titles = data?.chess?.titled ?? [];

  return (
    <>
      <Head>
        <title>{APP_NAME} - Countries</title>
      </Head>
      <CountriesTemplate titles={titles} countries={countries} />
    </>
  );
};

export default CountriesPage;
