import type { AppProps } from 'next/app';
import { FC } from 'react';
import '@/styles/globals.css';
import Head from 'next/head';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Boilerplate</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
