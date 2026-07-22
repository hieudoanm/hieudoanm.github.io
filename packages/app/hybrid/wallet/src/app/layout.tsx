import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Banking app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night">
      <body className="bg-base-300 h-screen overflow-hidden">{children}</body>
    </html>
  );
}
