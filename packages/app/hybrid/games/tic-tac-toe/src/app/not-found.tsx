import Link from 'next/link';
import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

const NotFoundPage = () => (
  <NotFoundTemplate
    description="The page you are looking for does not exist."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Go home
      </Link>
    }
  />
);

export default NotFoundPage;
