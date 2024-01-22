import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ChakraProvider } from '@chakra-ui/react';
import { APP_DESCRIPTION, APP_NAME } from '@chess/common/constants';
import '@chess/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta charSet="utf-8" key="charset" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
      </Head>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </>
  );
};

export default App;
