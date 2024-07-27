import { ErrorRoute } from '@web/templates/ErrorTemplate';
import type { NextPage } from 'next';

export const NotFoundPage: NextPage = () => {
  return <ErrorRoute code={404} title='Not Found' />;
};

export default NotFoundPage;
