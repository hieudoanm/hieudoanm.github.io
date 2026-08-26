import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import Link from 'next/link';

const ForbiddenPage = () => (
  <ErrorTemplate
    code="403"
    description="You do not have permission to access this page."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Back to clock
      </Link>
    }
  />
);

export default ForbiddenPage;
