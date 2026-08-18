'use client';

import { FC } from 'react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

const ErrorPage: FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => (
  <ErrorTemplate
    code="Error"
    description={error.message}
    action={
      <button className="btn btn-primary btn-sm" onClick={() => reset()}>
        Try again
      </button>
    }
  />
);

export default ErrorPage;
