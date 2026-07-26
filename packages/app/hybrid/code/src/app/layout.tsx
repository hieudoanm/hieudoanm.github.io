import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'A web-based code editor',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="dim">
    <body className="bg-base-100 text-base-content h-screen overflow-hidden">
      {children}
    </body>
  </html>
);

export default RootLayout;
