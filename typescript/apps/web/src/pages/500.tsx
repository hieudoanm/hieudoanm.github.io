import { ErrorRoute } from '@web/templates/ErrorTemplate';
import type { NextPage } from 'next';

export const InternalServerErrorPage: NextPage = () => {
  return <ErrorRoute code={500} title='Internal Server Error' />;
};

export default InternalServerErrorPage;
