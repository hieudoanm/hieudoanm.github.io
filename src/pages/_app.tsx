import '@nothing/styles/globals.css';
import type { AppProps } from 'next/app';
import { Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import 'github-markdown-css/github-markdown.css';

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
        <title>Nothing</title>
      </Head>
      <div className={mono.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
