import type { FC } from 'react';

export const BackLink: FC = () => (
  <div className="border-base-300 mt-6 border-t pt-6 text-center">
    <a
      href="/"
      className="btn btn-ghost btn-sm font-mono text-xs tracking-widest uppercase">
      ← Back to Store
    </a>
  </div>
);
BackLink.displayName = 'BackLink';
