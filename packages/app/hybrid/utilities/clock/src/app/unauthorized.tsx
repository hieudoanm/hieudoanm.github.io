import { NextPage } from 'next';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import Link from 'next/link';

const UnauthorizedPage: NextPage = () => (
  <ErrorTemplate
    code="401"
    description="You must be authenticated to access this page."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Back to clock
      </Link>
    }
  />
);

export default UnauthorizedPage;
