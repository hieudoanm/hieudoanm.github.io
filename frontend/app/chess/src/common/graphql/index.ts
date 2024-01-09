import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
} from '@chess/common/environments';

const URI: string = NEXT_PUBLIC_GRAPHQL_URI || GRAPHQL_URI || '';

export const apolloClient = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});
