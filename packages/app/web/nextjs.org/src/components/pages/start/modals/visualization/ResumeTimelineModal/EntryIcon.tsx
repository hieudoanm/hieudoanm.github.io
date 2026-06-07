import { FC } from 'react';

export const EntryIcon: FC<{ icon: string }> = ({ icon }) => (
  <div className="bg-base-100 ring-base-content/10 flex h-7 w-7 items-center justify-center rounded-full ring-4">
    <span className="text-xs">{icon}</span>
  </div>
);
