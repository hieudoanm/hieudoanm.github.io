import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
} from '../environments/environments';

const URI = NEXT_PUBLIC_GRAPHQL_URI ?? GRAPHQL_URI ?? '';

export const createApolloClient = () => {
  return new ApolloClient({ uri: URI, cache: new InMemoryCache() });
};
