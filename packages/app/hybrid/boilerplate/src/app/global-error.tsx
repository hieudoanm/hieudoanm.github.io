'use client';

import { GlobalErrorTemplate } from '@/components/templates/shared/GlobalErrorTemplate';

const GlobalErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => <GlobalErrorTemplate error={error} reset={reset} />;

export default GlobalErrorPage;
