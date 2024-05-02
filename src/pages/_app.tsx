import { ChakraProvider } from '@chakra-ui/react';
import { APP_NAME } from '@hieudoanm/common/constants/time.constants';
import '@hieudoanm/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
