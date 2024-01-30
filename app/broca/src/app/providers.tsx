'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
