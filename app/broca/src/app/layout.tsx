import {
  APP_DESCRIPTION,
  APP_NAME,
} from '@broca/common/constants/app.constants';
import '@broca/common/styles/globals.scss';
import { LayoutTemplate } from '@broca/templates/LayoutTemplate';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

type RootLayoutProperties = { children: React.ReactNode };

const RootLayout: React.FC<RootLayoutProperties> = ({
  children,
}: Readonly<RootLayoutProperties>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LayoutTemplate>{children}</LayoutTemplate>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
