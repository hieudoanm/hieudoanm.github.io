import '@web/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'github-markdown-css/github-markdown.css';
import type { AppProps } from 'next/app';
import { Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import { FC, useEffect } from 'react';

const queryClient = new QueryClient();

const mono = Geist_Mono({
  weight: ['100', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
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
        <title>Nothing</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f3f4f6" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <div className={`${mono.className} bg-gray-100 text-gray-900`}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
