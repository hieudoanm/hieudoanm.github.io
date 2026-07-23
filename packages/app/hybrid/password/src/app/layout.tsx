import type { Metadata } from 'next';
import '@/styles/globals.css';
export const metadata: Metadata = {
  title: 'Password - Password Manager',
  description: 'A secure password manager',
};
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body>{children}</body>
  </html>
);
export default RootLayout;
