import { ErrorTemplate } from '@chess/templates/ErrorTemplate';
import { NextPage } from 'next';

const ErrorPage: NextPage = () => (
  <ErrorTemplate status={500} message={'Error'} />
);

export default ErrorPage;
