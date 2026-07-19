import { useState } from 'react';
import type { ErrorInfo } from '../utils/try-catch';

export const useErrorModal = () => {
  const [error, setError] = useState<ErrorInfo | null>(null);

  const showError = (err: ErrorInfo) => setError(err);
  const hideError = () => setError(null);

  return { error, showError, hideError };
};
