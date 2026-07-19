import Link from 'next/link';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => (
  <ErrorTemplate
    code="404"
    description="The page you are looking for does not exist."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Go home
      </Link>
    }
  />
);

export default NotFoundPage;
