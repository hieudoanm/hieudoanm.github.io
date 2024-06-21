import { ErrorTemplate } from '@web/templates/ErrorTemplate';
import type { NextPage } from 'next';

export const NotFoundPage: NextPage = () => {
  return <ErrorTemplate code={404} title='Not Found' />;
};

export default NotFoundPage;
