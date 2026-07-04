import type { FC } from 'react';

export const InstagramBadge: FC<{
  username: string;
}> = ({ username }) => (
  <div className="pointer-events-none absolute right-2 bottom-2 rounded bg-black/30 px-1.5 py-0.5 text-[9px] leading-tight text-white/80 backdrop-blur-sm">
    @{username}
  </div>
);
