'use client';

import { FC } from 'react';

const ErrorFallback: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => (
  <main className="mx-auto max-w-2xl px-6 py-12 text-center">
    <h2 className="text-error mb-3 text-2xl font-bold">Something went wrong</h2>
    <p className="text-base-content/60 mb-6">{error.message}</p>
    <button type="button" onClick={reset} className="btn btn-primary">
      Try again
    </button>
  </main>
);

export default ErrorFallback;
