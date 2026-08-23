'use client';

import Link from 'next/link';
import { ComponentType, FC } from 'react';

export interface ScaleItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

export interface HomeTemplateProps {
  appName: string;
  description: string;
  items: ScaleItem[];
}

export const HomeTemplate: FC<HomeTemplateProps> = ({
  appName,
  description,
  items,
}) => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
    <div className="flex flex-col items-center gap-4 text-center">
      <h1>{appName}</h1>
      <p className="text-base-content/70 max-w-md">{description}</p>
    </div>
    <div className="grid w-full max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4">
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
  </main>
);
