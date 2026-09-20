import { ErrorTemplate } from '@/components/shared/templates/ErrorTemplate';

const ForbiddenPage = () => (
  <ErrorTemplate
    code="403"
    description="You do not have permission to access this page."
  />
);

export default ForbiddenPage;
