import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Chat - AI Chat Interface',
  description: 'A modern AI chat interface built with Next.js',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body>{children}</body>
  </html>
);

export default RootLayout;
