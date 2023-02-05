import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>App Minimal</title>
        <meta charSet="UTF-8" key="charset" />
        <meta name="description" content="App Minimal" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
