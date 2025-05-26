import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { FC } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nothing UI',
  description: 'Nothing UI created by Hieu Doan, inspired by Nothing Tech',
};

const RootLayout: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children = <></> }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-950 text-neutral-300 antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
