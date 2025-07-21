import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@web/styles/globals.css';
import { trpc } from '@web/utils/trpc';
import 'github-markdown-css/github-markdown.css';
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import { FC, useEffect } from 'react';

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) =>
          console.log('Service Worker registration failed:', error)
        );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Hieu Doan</title>
      </Head>
      <div className={`${geistSans.className} ${geistMono.className}`}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default trpc.withTRPC(App);
