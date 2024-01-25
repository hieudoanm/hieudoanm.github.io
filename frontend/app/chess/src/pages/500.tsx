import { ErrorTemplate } from '@chess/templates/ErrorTemplate';
import { NextPage } from 'next';

const InternalServerErrorPage: NextPage = () => (
  <ErrorTemplate status={500} message={'Internal Server Error'} />
);

export default InternalServerErrorPage;
