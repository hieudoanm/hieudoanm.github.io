'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useData } from '@/providers/DataProvider';

const PUBLIC_ROUTES = ['/login', '/register'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useData();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/login');
    } else if (isAuthenticated && isPublicRoute) {
      router.replace('/');
    }
  }, [isAuthenticated, isPublicRoute, router, pathname]);

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  if (isAuthenticated && isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
