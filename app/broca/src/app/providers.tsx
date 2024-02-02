'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type ProvidersProperties = { children?: ReactNode };

export const Providers: React.FC<ProvidersProperties> = ({
  children = <></>,
}) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
