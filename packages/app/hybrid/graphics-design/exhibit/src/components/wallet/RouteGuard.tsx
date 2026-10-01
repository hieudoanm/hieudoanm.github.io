'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getWalletSession } from '@/lib/wallet/session';

const WALLET_ROOT = '/wallet';

const isPublicPath = (pathname: string): boolean =>
  !pathname.startsWith(WALLET_ROOT);

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const routerRef = useRef(router);
  const prevRedirect = useRef<string | null>(null);

  routerRef.current = router;

  const isPublic = isPublicPath(pathname);
  const isAuth = getWalletSession();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const target =
      !isAuth && !isPublic
        ? `/sign-in?next=${encodeURIComponent(pathname)}`
        : null;

    if (target && prevRedirect.current !== target) {
      prevRedirect.current = target;
      routerRef.current.replace(target);
    }
  }, [pathname, isAuth, isPublic, ready]);

  if (!ready) return null;
  if (!isAuth && !isPublic) return null;

  return <>{children}</>;
};
