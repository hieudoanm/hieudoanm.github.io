'use client';

import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { Button } from '@/components/atoms/Button';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError = ({ reset }: GlobalErrorProps) => (
  <html lang="en" data-theme="psychology-light">
    <body className="bg-base-100 text-base-content font-mono">
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
        }
      />
    </body>
  </html>
);

export default GlobalError;
