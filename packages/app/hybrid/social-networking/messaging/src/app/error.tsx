'use client';

import { type FC } from 'react';
import Link from 'next/link';

const ErrorPage: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => (
  <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
    <h1 className="text-3xl font-bold">Something went wrong</h1>
    <p className="text-base-content/60 max-w-md">
      {error.message || 'An unexpected error occurred.'}
    </p>
    <div className="flex gap-3">
      <button type="button" onClick={reset} className="btn btn-primary">
        Try again
      </button>
      <Link href="/" className="btn btn-ghost">
        Go home
      </Link>
    </div>
  </div>
);

export default ErrorPage;
