import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => (
  <ErrorTemplate
    code="404"
    description="This page does not exist."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Back to clock
      </Link>
    }
  />
);

export default NotFoundPage;
