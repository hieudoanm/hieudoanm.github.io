import {
  APP_DESCRIPTION,
  APP_NAME,
} from '@chess/common/constants/app.constants';
import '@chess/common/styles/globals.css';
import { Container } from '@chess/shared/components/Container';
import { Footer } from '@chess/shared/components/Footer';
import { Navbar } from '@chess/shared/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FC, ReactNode } from 'react';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

type RootLayoutProperties = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProperties> = ({
  children = <></>,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        style={{ background: 'transparent' }}
        className={`${inter.className} text-black`}>
        <Providers>
          <div className="flex h-screen flex-col">
            <Navbar />
            <div className="grow">
              <Container>{children}</Container>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
