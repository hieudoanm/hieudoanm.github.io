'use client';

import { NextPage } from 'next';

const GlobalErrorPage: NextPage<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html lang="en" data-theme="tourney-dark">
    <body className="bg-base-100 text-base-content flex min-h-screen flex-col items-center justify-center font-mono">
      <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
        Error
      </p>
      <h1 className="mb-3">500</h1>
      <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
        Something went wrong.
      </p>
      <button className="btn btn-primary btn-sm" onClick={() => reset()}>
        Try again
      </button>
    </body>
  </html>
);

export default GlobalErrorPage;
