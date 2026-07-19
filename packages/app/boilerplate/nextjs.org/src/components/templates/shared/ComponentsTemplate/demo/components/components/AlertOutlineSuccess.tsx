import { FC } from 'react';

export const AlertOutlineSuccess: FC = () => (
  <div className="alert alert-outline alert-success border-base-300 border text-xs font-bold">
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
    <span>Verification process completed</span>
  </div>
);

AlertOutlineSuccess.displayName = 'AlertOutlineSuccess';
