import { ErrorTemplate } from '@hieudoanm.github.io/components/templates/shared/ErrorTemplate';
import { HttpStatusCode } from '@solidjs/start';

const messages = [
  'This page seems to have wandered off.',
  'Nothing to see here \u2014 just a missing page.',
  'You\u2019ve reached a dead end.',
  'Looks like this link is broken.',
  'We couldn\u2019t find what you were looking for.',
];

const NotFoundPage = () => {
  return (
    <>
      <HttpStatusCode code={404} />
      <ErrorTemplate
        error={{
          code: 404,
          message: 'Page not found',
        }}
        messages={messages}
      />
    </>
  );
};

export default NotFoundPage;
