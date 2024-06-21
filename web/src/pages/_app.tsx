import { APP_NAME } from '@web/constants/time.constants';
import { ThemeProvider } from '@web/context/ThemeContext';
import '@web/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto_Mono } from 'next/font/google';
import Head from 'next/head';
import { FC } from 'react';

const font = Roboto_Mono({ subsets: ['latin'] });

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </Head>
      <ThemeProvider>
        <div className={font.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
