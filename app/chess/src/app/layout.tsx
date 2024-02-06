import { Container } from '@chess/common/components/Container';
import { Footer } from '@chess/common/components/Footer';
import { Navbar } from '@chess/common/components/Navbar';
import {
  APP_DESCRIPTION,
  APP_NAME,
} from '@chess/common/constants/app.constants';
import '@chess/common/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

type RootLayoutProperties = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProperties> = ({
  children = <></>,
}: Readonly<{
  children: React.ReactNode;
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
