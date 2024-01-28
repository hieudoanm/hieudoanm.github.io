import {
  APP_DESCRIPTION,
  APP_NAME,
} from '@chess/common/constants/app.constants';
import '@chess/common/styles/globals.scss';
import { Container } from '@chess/components/atoms/Container';
import { Footer } from '@chess/components/atoms/Footer';
import { Navbar } from '@chess/components/atoms/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
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
