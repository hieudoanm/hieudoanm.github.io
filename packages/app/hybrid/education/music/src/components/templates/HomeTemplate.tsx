'use client';

import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface HomeTemplateProps {
  appName: string;
  description: string;
  items: { label: string; description: string; icon: IconType; href: string }[];
}

export const HomeTemplate: FC<HomeTemplateProps> = ({
  appName,
  description,
  items,
}) => (
  <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-6 p-6">
    <div className="text-center">
      <h1 className="text-xl font-bold">{appName}</h1>
      <p className="text-base-content/50 mt-1 text-xs">{description}</p>
    </div>
    <div className="flex w-full flex-col gap-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-testid={`tool-card-${item.href.replace(/\//g, '')}`}
          className="card bg-base-200 hover:bg-base-300 transition-colors">
          <div className="card-body flex-row items-center gap-4 p-4">
            <item.icon className="text-2xl" />
            <div>
              <h2 className="card-title text-sm">{item.label}</h2>
              <p className="text-base-content/50 text-xs">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
