'use client';

import { GlobalErrorTemplate } from '@/components/templates/auth/GlobalErrorTemplate';

const GlobalErrorDemoPage = () => (
  <GlobalErrorTemplate
    error={new Error('Something went wrong.') as Error & { digest?: string }}
    reset={() => {}}
  />
);

export default GlobalErrorDemoPage;
