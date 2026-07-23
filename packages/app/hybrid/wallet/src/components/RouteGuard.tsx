'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useData } from '@/providers/DataProvider';

const PUBLIC_ROUTES = ['/login', '/register'];

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useData();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  console.log('[RouteGuard] render', {
    pathname,
    isAuthenticated,
    isPublicRoute,
  });

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      console.log('[RouteGuard] redirecting to /login');
      router.replace('/login');
    } else if (isAuthenticated && isPublicRoute) {
      console.log('[RouteGuard] redirecting to /');
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
};
