'use client';

import { FC } from 'react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

const GlobalErrorPage: FC<{
  error: Error;
  reset: () => void;
}> = ({ error, reset }) => (
  <html lang="en">
    <body>
      <ErrorTemplate
        code="Error"
        description={error.message}
        action={
          <button className="btn btn-primary btn-sm" onClick={() => reset()}>
            Try again
          </button>
        }
      />
    </body>
  </html>
);

export default GlobalErrorPage;
