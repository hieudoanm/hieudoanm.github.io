'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('wallet-auth') === 'true';
  } catch {
    return false;
  }
};

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const routerRef = useRef(router);
  const prevRedirect = useRef<string | null>(null);

  routerRef.current = router;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isAuth = checkAuth();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const target =
      !isAuth && !isPublic ? '/login' : isAuth && isPublic ? '/' : null;

    console.log('[RouteGuard]', { target });

    if (target && prevRedirect.current !== target) {
      console.log('[RouteGuard] redirect', { target, pathname, isAuth });
      prevRedirect.current = target;
      routerRef.current.replace(target);
    }
  }, [pathname, isAuth, isPublic, ready]);

  console.log('[RouteGuard]', { pathname, isAuth, isPublic, ready });

  if (!ready) return null;
  if (!isAuth && !isPublic) return null;
  if (isAuth && isPublic) return null;

  return <>{children}</>;
};
