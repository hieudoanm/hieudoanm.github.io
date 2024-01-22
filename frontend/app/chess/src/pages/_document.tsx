import { Head, Html, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
  return (
    <Html lang="en">
      <Head />
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
