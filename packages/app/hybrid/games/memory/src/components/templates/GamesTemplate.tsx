import type { FC } from 'react';
import Link from 'next/link';

export interface GameItem {
  name: string;
  description: string;
  icon: FC<{ className?: string }>;
  href: string;
}

export const GamesTemplate: FC<{
  title: string;
  subtitle: string;
  items: GameItem[];
}> = ({ title, subtitle, items }) => (
  <div className="flex flex-col items-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Games
    </p>
    <h1 className="mb-3 text-2xl font-bold">{title}</h1>
    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      {subtitle}
    </p>
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-6 transition-colors">
          <item.icon className="text-primary mb-3 text-2xl" />
          <h2 className="mb-1 text-sm font-bold">{item.name}</h2>
          <p className="text-base-content/50 text-xs">{item.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

GamesTemplate.displayName = 'GamesTemplate';
