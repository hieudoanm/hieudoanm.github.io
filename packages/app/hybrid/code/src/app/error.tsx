'use client';

import { ErrorPage } from '../routes/ErrorPage';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => <ErrorPage statusCode={500} error={error} reset={reset} />;

export default Error;
