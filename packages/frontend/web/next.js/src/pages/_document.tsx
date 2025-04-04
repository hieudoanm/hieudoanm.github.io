import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f3f4f6" />
      </Head>
      <body className="bg-gray-100 text-gray-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
