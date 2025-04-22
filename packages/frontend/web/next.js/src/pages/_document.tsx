import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#101828" />
        {/* <!-- iOS --> */}
        <meta name="apple-mobile-web-app-title" content="Hieu Doan" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
      </Head>
      <body className="bg-gray-900 text-gray-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
