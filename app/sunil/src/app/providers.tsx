'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@sunil/graphql/apollo/client';
import React from 'react';

export type ProvidersProperties = { children: React.ReactNode };

export const Providers: React.FC<ProvidersProperties> = ({
  children = <></>,
}: ProvidersProperties) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
