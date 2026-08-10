'use client';

import { ErrorTemplate } from '@hieudoanm.github.io/components/templates/shared/ErrorTemplate';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const REDIRECT_PREFIXES = ['/free', '/foss'] as const;

const messages = [
  'This page seems to have wandered off.',
  'Nothing to see here — just a missing page.',
  "You've reached a dead end.",
  'Looks like this link is broken.',
  "We couldn't find what you were looking for.",
];

const redirectPath = (pathname: string): string | null => {
  const prefix = REDIRECT_PREFIXES.find(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!prefix) return null;
  return `/downloads${pathname.slice(prefix.length)}`;
};

const NotFoundPage: NextPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const destination = redirectPath(pathname);
    if (destination) {
      router.replace(destination);
    }
  }, [pathname, router]);

  return (
    <ErrorTemplate
      error={{
        code: 404,
        message: 'Page not found',
      }}
      messages={messages}
    />
  );
};

export default NotFoundPage;
