import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SVG - Vector Editor',
  description: 'A modern vector graphics editor built with Next.js',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body>{children}</body>
  </html>
);

export default RootLayout;
