import { Footer } from '@chess/components/atoms/Footer';
import { Loading } from '@chess/components/atoms/Loading';
import { Navbar } from '@chess/components/atoms/Navbar';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Loading />
      <div className={inter.className}>
        <div className="flex h-screen flex-col">
          <Navbar />
          <div className="grow">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};
