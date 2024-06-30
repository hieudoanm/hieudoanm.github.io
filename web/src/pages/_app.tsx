import { APP_NAME } from '@web/constants/app.constants';
import { ThemeProvider } from '@web/context/ThemeContext';
import '@web/styles/globals.css';
import 'github-markdown-css';
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
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          href='/icons/png/512x512.png'
          rel='apple-touch-icon'
          type='image/png'
        />
        {/* Meta */}
        <meta charSet='UTF-8' />
        <meta name='keywords' content='f(x)' />
        <meta name='theme-color' content='#000000' />
        <meta name='url' content='https://hieudoanm.github.io' />
        <meta
          name='viewport'
          content='width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
        />
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
