import type { AppProps } from 'next/app';
import Head from 'next/head';
import content from '../content';
import '../styles/globals.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>{content.seo.title.toUpperCase()}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
