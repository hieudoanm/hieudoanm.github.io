import { Head, Html, Main, NextScript } from 'next/document';
import { FC } from 'react';

const Document: FC = () => {
  return (
    <Html lang="en" data-theme="dim">
      <Head />
      <body className="bg-base-300 h-screen overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
