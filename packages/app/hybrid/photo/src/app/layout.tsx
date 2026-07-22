import type { Metadata } from 'next';
import '@/styles/globals.css';
export const metadata: Metadata = {
  title: 'Photo - Image Editor',
  description: 'A powerful image editor',
};
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body>{children}</body>
  </html>
);
export default RootLayout;
