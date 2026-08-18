'use client';

import { FC } from 'react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import Link from 'next/link';

const UnauthorizedPage: FC = () => (
  <ErrorTemplate
    code="401"
    description="You need to be authorized to access this page."
    action={
      <Link href="/" className="btn btn-primary btn-sm">
        Go home
      </Link>
    }
  />
);

export default UnauthorizedPage;
