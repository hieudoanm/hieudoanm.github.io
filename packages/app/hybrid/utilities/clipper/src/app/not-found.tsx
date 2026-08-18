import type { FC } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

const NotFoundPage: FC = () => (
  <div className="flex min-h-screen flex-col">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="btn btn-ghost btn-sm">
          <FiArrowLeft className="text-lg" />
        </Link>
        <h1 className="text-sm font-bold">Clipper</h1>
      </div>
    </header>
    <main className="flex flex-1 items-center justify-center">
      <ErrorTemplate
        code="404"
        description="The page you are looking for does not exist."
        action={
          <Link href="/" className="btn btn-primary btn-sm">
            Go home
          </Link>
        }
      />
    </main>
  </div>
);

export default NotFoundPage;
