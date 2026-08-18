'use client';

import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { NextPage } from 'next';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <ErrorTemplate
    code="500"
    description={error.message ?? 'Something went wrong.'}
    action={
      <button className="btn btn-primary btn-sm" onClick={() => reset()}>
        Try again
      </button>
    }
  />
);

export default ErrorPage;
