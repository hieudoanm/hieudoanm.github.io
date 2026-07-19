import Link from 'next/link';
import { ErrorTemplate } from '@/components/templates/auth/ErrorTemplate';

const ErrorDemoPage = () => (
  <ErrorTemplate
    code="500"
    description="Something went wrong."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Go home
      </Link>
    }
  />
);

export default ErrorDemoPage;
