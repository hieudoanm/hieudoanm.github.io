import type { Metadata } from 'next';
import '@/styles/globals.css';
export const metadata: Metadata = {
  title: 'Projects - Kanban Board',
  description: 'A kanban board for project management',
};
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body>{children}</body>
  </html>
);
export default RootLayout;
