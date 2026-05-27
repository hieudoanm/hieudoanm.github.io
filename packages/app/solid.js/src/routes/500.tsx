import { ErrorTemplate } from '@hieudoanm.github.io/components/templates/ErrorTemplate';
import { HttpStatusCode } from '@solidjs/start';

const messages = [
  'Something went wrong on our end.',
  'An unexpected error occurred.',
  'We ran into a server issue.',
  'The server had trouble processing your request.',
  'This wasn\u2019t supposed to happen.',
];

const InternalServerErrorPage = () => {
  return (
    <>
      <HttpStatusCode code={500} />
      <ErrorTemplate
        error={{
          code: 500,
          message: 'Internal server error',
        }}
        messages={messages}
      />
    </>
  );
};

export default InternalServerErrorPage;
