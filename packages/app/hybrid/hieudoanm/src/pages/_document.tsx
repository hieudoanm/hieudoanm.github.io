import { Head, Html, Main, NextScript } from 'next/document';
import { createElement, FC } from 'react';

const Document: FC = () => {
  return (
    <Html lang="en" data-theme="nothing">
      {createElement(Head)}
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
