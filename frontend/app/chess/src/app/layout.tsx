import {
  APP_NAME,
  APP_DESCRIPTION,
} from '@chess/common/constants/app.constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@chess/styles/globals.scss';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
