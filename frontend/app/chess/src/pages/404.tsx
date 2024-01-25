import { ErrorTemplate } from '@chess/templates/ErrorTemplate';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => (
  <ErrorTemplate status={404} message={'Page Not Found'} />
);

export default NotFoundPage;
