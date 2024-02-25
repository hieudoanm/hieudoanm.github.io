import { APP_DESCRIPTION, APP_NAME } from '@vi/common/constants/app.constants';
import { Footer } from '@vi/shared/components/Footer';
import { Navbar } from '@vi/shared/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children = <></> }) => {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="flex h-screen flex-col">
          <Navbar />
          <main className="grow">
            <div className="container mx-auto">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
