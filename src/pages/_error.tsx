import { ErrorTemplate } from '@hieudoanm/templates/ErrorTemplate';
import type { NextPage } from 'next';

export const ErrorPage: NextPage = () => {
  return <ErrorTemplate code={500} title='Error' />;
};

export default ErrorPage;
