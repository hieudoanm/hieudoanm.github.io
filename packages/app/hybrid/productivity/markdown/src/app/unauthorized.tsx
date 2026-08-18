import { NextPage } from 'next';
import { ErrorTemplate } from '../components/templates/ErrorTemplate';

const UnauthorizedPage: NextPage = () => (
  <ErrorTemplate
    code="401"
    description="You must be authenticated to access this page."
  />
);

export default UnauthorizedPage;
