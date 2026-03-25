import { HeadTemplate } from '../templates/HeadTemplate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@web/styles/globals.css';
import { trpc } from '@web/utils/trpc';
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
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
      <HeadTemplate basic={{ title: 'Hieu Doan' }} />
      <div className={`${geistSans.className} ${geistMono.className}`}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default trpc.withTRPC(App);
