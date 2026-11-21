import type { FC } from 'react';
import Link from 'next/link';

export const BackLink: FC = () => (
  <div className="border-base-300 mt-6 border-t pt-6 text-center">
    <Link
      href="/"
      className="btn btn-ghost btn-sm font-mono text-xs tracking-widest uppercase">
      ← Back to Store
    </Link>
  </div>
);
BackLink.displayName = 'BackLink';
