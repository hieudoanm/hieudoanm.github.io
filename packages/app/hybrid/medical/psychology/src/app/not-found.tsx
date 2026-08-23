import Link from 'next/link';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { Button } from '@/components/atoms/Button';

const NotFound = () => (
  <ErrorTemplate
    code="404"
    description="The page you are looking for does not exist."
    action={
      <Link href="/">
        <Button variant="primary">Go home</Button>
      </Link>
    }
  />
);

export default NotFound;
