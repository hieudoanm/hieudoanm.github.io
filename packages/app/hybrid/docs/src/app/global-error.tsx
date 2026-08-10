'use client';

import { ErrorTemplate } from '@hieudoanm.github.io/components/templates/shared/ErrorTemplate';

const messages = [
  'Something went wrong on our end.',
  'An unexpected error occurred.',
  'We ran into a server issue.',
  'The server had trouble processing your request.',
  "This wasn't supposed to happen.",
];

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <html lang="en" data-theme="nothing">
      <body>
        <ErrorTemplate
          error={{
            code: 500,
            message: error.message ?? 'Internal server error',
          }}
          messages={messages}
        />
      </body>
    </html>
  );
};

export default GlobalError;
