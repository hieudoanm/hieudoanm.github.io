'use client';

import Link from 'next/link';
import { ComponentType, FC, ReactNode } from 'react';

export interface GameItem {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  testId?: string;
}

export interface GamesTemplateProps {
  title: string;
  subtitle: string;
  items: GameItem[];
  children?: ReactNode;
}

export const GamesTemplate: FC<GamesTemplateProps> = ({
  title = '',
  subtitle = '',
  items = [],
  children,
}) => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center gap-8 p-8">
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-base-content/60 mt-2 text-sm">{subtitle}</p>
    </div>

    {children}

    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(
        ({ name, description: itemDescription, icon: Icon, href, testId }) => (
          <Link
            key={href}
            href={href}
            data-testid={testId ?? `tool-card-${href.replace(/\//g, '')}`}
            className="card border-base-content/10 hover:border-primary border transition-colors">
            <div className="card-body items-center gap-2 text-center">
              <Icon className="text-primary text-4xl" />
              <h2 className="card-title text-lg">{name}</h2>
              <p className="text-base-content/60 text-xs">{itemDescription}</p>
            </div>
          </Link>
        )
      )}
    </div>
  </main>
);

GamesTemplate.displayName = 'GamesTemplate';
