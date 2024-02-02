import { ApolloClient, InMemoryCache, QueryOptions } from '@apollo/client';
import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
} from '@sunil/common/environments/environments';
import { logger } from '@sunil/common/log';

const URI: string = NEXT_PUBLIC_GRAPHQL_URI || GRAPHQL_URI || '';

console.info(`URI=${URI}`);

export const apolloClient = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export const queryData = async <T>(queryOptions: QueryOptions): Promise<T> => {
  try {
    const { data } = await apolloClient.query<T>(queryOptions);
    return data;
  } catch (error) {
    logger.error(`queryData error=${error}`);
    return {} as T;
  }
};
