import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { NextPage } from 'next';

const ForbiddenPage: NextPage = () => (
  <ErrorTemplate
    code="403"
    description="You do not have permission to access this page."
  />
);

export default ForbiddenPage;
