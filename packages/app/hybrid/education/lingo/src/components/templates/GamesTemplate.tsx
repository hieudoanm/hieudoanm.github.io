'use client';

import Link from 'next/link';
import { ComponentType, FC, ReactNode, useMemo, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

export interface GameItem {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  testId?: string;
  group?: string;
}

export interface GamesTemplateProps {
  title: string;
  subtitle: string;
  items: GameItem[];
  children?: ReactNode;
  searchable?: boolean;
}

interface ItemGroup {
  name: string;
  items: GameItem[];
}

const toGroups = (items: GameItem[]): ItemGroup[] => {
  const byName = new Map<string, ItemGroup>();
  for (const item of items) {
    const name = item.group ?? '';
    let group = byName.get(name);
    if (!group) {
      group = { name, items: [] };
      byName.set(name, group);
    }
    group.items.push(item);
  }
  return [...byName.values()];
};

export const GamesTemplate: FC<GamesTemplateProps> = ({
  title = '',
  subtitle = '',
  items = [],
  children,
  searchable = false,
}) => {
  const [query, setQuery] = useState('');
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter(
          ({ name, description }) =>
            name.toLowerCase().includes(q) ||
            description.toLowerCase().includes(q)
        )
      : items;
    return toGroups(filtered);
  }, [items, query]);

  const total = groups.reduce(
    (sum, { items: groupItems }) => sum + groupItems.length,
    0
  );

  return (
    <main className="bg-base-100 flex min-h-dvh flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-base-content/60 mt-2 text-sm">{subtitle}</p>
      </div>

      {children}

      {searchable && (
        <div className="w-full max-w-3xl">
          <label className="input input-bordered flex w-full items-center gap-2">
            <PiMagnifyingGlass className="text-base-content/50 shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search games..."
              aria-label="Search games"
              data-testid="games-search"
              className="grow"
            />
          </label>
        </div>
      )}

      {searchable && total === 0 ? (
        <p className="text-base-content/60 text-sm">
          No games match your search.
        </p>
      ) : (
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {groups.map(({ name, items: groupItems }) => (
            <section key={name} className="flex flex-col gap-4">
              {name && (
                <h2 className="text-base-content/70 text-xs font-semibold tracking-widest uppercase">
                  {name}
                </h2>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map(
                  ({
                    name: itemName,
                    description,
                    icon: Icon,
                    href,
                    testId,
                  }) => (
                    <Link
                      key={href}
                      href={href}
                      data-testid={
                        testId ?? `tool-card-${href.replace(/\//g, '')}`
                      }
                      className="card border-base-content/10 hover:border-primary border transition-colors">
                      <div className="card-body items-center gap-2 text-center">
                        <Icon className="text-primary text-4xl" />
                        <h3 className="card-title text-lg">{itemName}</h3>
                        <p className="text-base-content/60 text-xs">
                          {description}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

GamesTemplate.displayName = 'GamesTemplate';
