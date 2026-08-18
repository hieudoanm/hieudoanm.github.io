'use client';

import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { Button } from '@/components/atoms/Button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ reset }: ErrorProps) => (
  <ErrorTemplate
    code="500"
    description="Something went wrong."
    action={
      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    }
  />
);

export default ErrorPage;
