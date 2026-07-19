import { FC } from 'react';

export const AlertSolidInfo: FC = () => (
  <div className="alert alert-info border-base-300 border text-xs font-bold">
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
    <span>There are 9 new messages</span>
  </div>
);

AlertSolidInfo.displayName = 'AlertSolidInfo';
