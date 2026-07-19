import { ErrorTemplate } from '@/components/templates/auth/ErrorTemplate';

const ForbiddenPage = () => (
  <ErrorTemplate
    code="403"
    description="You do not have permission to access this page."
  />
);

export default ForbiddenPage;
