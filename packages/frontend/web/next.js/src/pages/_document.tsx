import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#171717" />
        {/* <!-- iOS --> */}
        <meta name="apple-mobile-web-app-title" content="Hieu Doan" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
      </Head>
      <body className="bg-neutral-900 text-neutral-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
