import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
} from '@chess/common/environments/environments';
import { logger } from '@chess/common/libs/logger';

const URI: string = NEXT_PUBLIC_GRAPHQL_URI || GRAPHQL_URI || '';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export const getApolloClient = (
  uri: string
): ApolloClient<NormalizedCacheObject> => {
  if (apolloClient) return apolloClient;
  const cache: InMemoryCache = new InMemoryCache();
  apolloClient = new ApolloClient({ uri, cache });
  return apolloClient;
};

export const query = async <T>(
  queryOptions: QueryOptions<OperationVariables, T>
): Promise<T> => {
  try {
    logger.info(`query URI=${URI}`);
    const { data } = await getApolloClient(URI).query<T>(queryOptions);
    return data;
  } catch (error) {
    logger.error(`query error=${error}`);
    return {} as T;
  }
};
