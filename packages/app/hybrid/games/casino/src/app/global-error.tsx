'use client';

import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html lang="en" data-theme="casino-dark">
    <body>
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={
          <button className="btn btn-primary btn-sm" onClick={() => reset()}>
            Try again
          </button>
        }
      />
    </body>
  </html>
);

export default GlobalError;
