'use client';

import { ApolloProvider } from '@apollo/client';
import {
  NEXT_PUBLIC_GRAPHQL_URI,
  GRAPHQL_URI,
} from '@chess/common/environments/environments';
import { getApolloClient } from '@chess/graphql/apollo/client';

const URI: string = NEXT_PUBLIC_GRAPHQL_URI || GRAPHQL_URI || '';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={getApolloClient(URI)}>{children}</ApolloProvider>
  );
};
