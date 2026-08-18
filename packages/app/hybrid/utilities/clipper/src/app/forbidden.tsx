'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import Link from 'next/link';

const ForbiddenPage: FC = () => {
  const router = useRouter();
  return (
    <ErrorTemplate
      code="403"
      description="You don't have permission to access this page."
      action={
        <Link href="/" className="btn btn-primary btn-sm">
          Go home
        </Link>
      }
    />
  );
};

export default ForbiddenPage;
