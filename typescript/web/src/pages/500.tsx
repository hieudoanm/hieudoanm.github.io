import { ErrorTemplate } from '@web/templates/ErrorTemplate';
import type { NextPage } from 'next';

export const InternalServerErrorPage: NextPage = () => {
  return <ErrorTemplate code={500} title='Internal Server Error' />;
};

export default InternalServerErrorPage;
