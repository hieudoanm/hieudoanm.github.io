import { ErrorTemplate } from '@/components/templates/auth/ErrorTemplate';

const UnauthorizedPage = () => (
  <ErrorTemplate
    code="401"
    description="You must be authenticated to access this page."
  />
);

export default UnauthorizedPage;
