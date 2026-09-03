'use client';

import { Button } from '@/components/atoms/Button';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { NextPage } from 'next';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: NextPage<GlobalErrorProps> = ({ reset }) => (
  <html lang="en" data-theme="mri-light">
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
