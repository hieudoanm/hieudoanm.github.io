'use client';

import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { Button } from '@/components/atoms/Button';
import { FC } from 'react';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: FC<GlobalErrorProps> = ({ reset }) => (
  <html lang="en" data-theme="music">
    <body className="bg-base-100 text-base-content">
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
