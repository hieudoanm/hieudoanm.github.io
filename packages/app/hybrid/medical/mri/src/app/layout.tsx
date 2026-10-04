import type { Metadata } from 'next';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Aphasia Prediction Workbench',
  description:
    'Local workbench for reading, launching and comparing MRI post-stroke aphasia prediction runs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mri-light">
      <body className="bg-base-100 text-base-content antialiased">
        {children}
      </body>
    </html>
  );
}
