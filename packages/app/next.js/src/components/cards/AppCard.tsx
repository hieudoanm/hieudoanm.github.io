import Link from 'next/link';
import { FC } from 'react';

export interface AppCardProps {
  href: string;
  name: string;
  emoji: string;
}

export const AppCard: FC<AppCardProps> = ({ href, name, emoji }) => (
  <Link href={href}>
    <button
      type="button"
      className="card bg-base-200 border-base-300 hover:bg-base-300 group w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
      <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="bg-neutral border-primary-content flex h-10 w-10 items-center justify-center rounded-xl border text-xl shadow-inner transition-transform duration-300 group-hover:scale-110">
          {emoji}
        </div>
        <div>
          <div className="truncate text-sm font-bold tracking-tight">
            {name}
          </div>
          <div className="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
            {name}
          </div>
        </div>
      </div>
    </button>
  </Link>
);
