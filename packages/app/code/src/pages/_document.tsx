import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dim">
      <Head />
      <body className="bg-base-300 h-screen overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
