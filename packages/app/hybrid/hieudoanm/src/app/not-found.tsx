'use client';

import { ErrorTemplate } from '@hieudoanm.github.io/components/templates/shared/ErrorTemplate';

const messages = [
  'This page seems to have wandered off.',
  'Nothing to see here — just a missing page.',
  "You've reached a dead end.",
  'Looks like this link is broken.',
  "We couldn't find what you were looking for.",
];

const NotFound = () => {
  return (
    <ErrorTemplate
      error={{
        code: 404,
        message: 'Page not found',
      }}
      messages={messages}
    />
  );
};

export default NotFound;
