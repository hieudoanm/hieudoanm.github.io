import { BASE_PATH } from '@web/environments/environments';
import '@web/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'github-markdown-css/github-markdown.css';
import type { AppProps } from 'next/app';
import { Geist_Mono } from 'next/font/google';
import Head from 'next/head';

const queryClient = new QueryClient();

const mono = Geist_Mono({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HIEU</title>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${BASE_PATH}/favicon.ico`}
        />
      </Head>
      <div className={mono.className}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </>
  );
}
