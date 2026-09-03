import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Video Tools',
  description: 'Browser-based video and audio processing tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="video-light">
      <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
        {children}
      </body>
    </html>
  );
}
