import { APP_NAME } from '@web/constants/app.constants';
import { ThemeProvider } from '@web/context/ThemeContext';
import '@web/styles/globals.css';
import { trpc } from '@web/utils/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'github-markdown-css/github-markdown.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';

const queryClient: QueryClient = new QueryClient();

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
        <meta name='url' content='https://fxai.vercel.app' />
        <meta
          name='viewport'
          content='width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default trpc.withTRPC(App);
