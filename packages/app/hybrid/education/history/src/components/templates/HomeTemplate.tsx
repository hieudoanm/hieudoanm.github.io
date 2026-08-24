'use client';

import Link from 'next/link';
import { ComponentType, FC, ReactNode } from 'react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

export interface CourseItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

export interface HomeStats {
  xp: number;
  streak: number;
}

export interface HomeTemplateProps {
  appName: string;
  description: string;
  items: CourseItem[];
  stats?: HomeStats;
  footer?: ReactNode;
}

export const HomeTemplate: FC<HomeTemplateProps> = ({
  appName,
  description,
  items,
  stats,
  footer,
}) => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center gap-8 p-8">
    <div className="flex flex-col items-center gap-4 text-center">
      <h1>{appName}</h1>
      <p className="text-base-content/70 max-w-md">{description}</p>
      {stats ? (
        <div className="flex items-center gap-3">
          <span
            className="badge badge-warning badge-lg gap-1"
            data-testid="stat-xp">
            ⚡ {stats.xp} XP
          </span>
          <span
            className="badge badge-error badge-lg gap-1"
            data-testid="stat-streak">
            🔥 {stats.streak} day{stats.streak === 1 ? '' : 's'}
          </span>
        </div>
      ) : null}
    </div>

    <ThemeToggle />

    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(
        ({ label, description: itemDescription, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            data-testid={`tool-card-${href.replace(/\//g, '')}`}
            className="card bg-base-200 border-base-content/10 hover:border-primary border transition-colors">
            <div className="card-body items-center gap-2 text-center">
              <Icon className="text-primary text-4xl" />
              <h2 className="card-title text-lg">{label}</h2>
              <p className="text-base-content/60 text-xs">{itemDescription}</p>
            </div>
          </Link>
        )
      )}
    </div>

    {footer ? (
      <footer className="text-base-content/50 mt-auto flex gap-4 text-xs">
        {footer}
      </footer>
    ) : null}
  </main>
);
