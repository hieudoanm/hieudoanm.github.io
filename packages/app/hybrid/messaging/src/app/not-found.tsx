import { type FC } from 'react';
import Link from 'next/link';

const NotFoundPage: FC = () => (
  <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
    <h1 className="text-3xl font-bold">Page not found</h1>
    <p className="text-base-content/60 max-w-md">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link href="/" className="btn btn-primary">
      Back to chats
    </Link>
  </div>
);

export default NotFoundPage;
