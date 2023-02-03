import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import content from '../content';
import { ThemeProvider } from '../context/ThemeProvider';
import '../styles/globals.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{content.seo.title.toUpperCase()}</title>
        <meta name="description" content={content.seo.description} />{' '}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
