import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client';
import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
} from '@chess/common/environments/environments';
import { logger } from '@chess/common/libs/logger';

const URI: string = NEXT_PUBLIC_GRAPHQL_URI || GRAPHQL_URI || '';

console.info(`URI=${URI}`);

export const apolloClient = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export const query = async <T>(
  documentNode: DocumentNode,
  variables: Record<string, string | number> = {}
): Promise<T> => {
  try {
    const { data } = await apolloClient.query<T>({
      query: documentNode,
      variables,
    });
    return data;
  } catch (error) {
    logger.error(`query error=${error}`);
    return {} as T;
  }
};
