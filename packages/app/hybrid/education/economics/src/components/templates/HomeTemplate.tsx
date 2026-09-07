'use client';

import Link from 'next/link';
import { ComponentType, FC, useMemo, useState } from 'react';
import { PiMagnifyingGlass, PiPercent, PiXCircle } from 'react-icons/pi';

export interface CourseItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  category?: string;
}

export interface HomeTemplateProps {
  appName: string;
  description: string;
  items: CourseItem[];
  showFilters?: boolean;
}

export const HomeTemplate: FC<HomeTemplateProps> = ({
  appName = '',
  description = '',
  items = [],
  showFilters = true,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [nobelOnly, setNobelOnly] = useState(false);

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          items.map((i) => i.category).filter((c): c is string => Boolean(c))
        )
      ),
    ],
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (q && !`${item.label} ${item.description}`.toLowerCase().includes(q)) {
        return false;
      }
      if (category !== 'All' && item.category !== category) {
        return false;
      }
      if (nobelOnly && !item.badge) {
        return false;
      }
      return true;
    });
  }, [items, query, category, nobelOnly]);

  const hasFilters = showFilters && items.length > 0;

  return (
    <main className="bg-base-100 flex min-h-dvh flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
          {appName}
        </h1>
        <p className="text-base-content/60 mt-2 text-sm">{description}</p>
      </div>

      {hasFilters && (
        <div className="flex w-full max-w-3xl flex-col items-center gap-3">
          <div className="relative w-full max-w-md">
            <PiMagnifyingGlass className="text-base-content/40 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-lg" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search theories..."
              data-testid="home-search"
              className="input input-bordered input-sm w-full pl-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="text-base-content/40 hover:text-base-content/70 absolute top-1/2 right-3 -translate-y-1/2">
                <PiXCircle className="text-lg" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                data-testid={`category-${cat}`}
                className={`badge badge-outline badge-sm cursor-pointer transition-colors ${
                  category === cat
                    ? 'badge-primary'
                    : 'badge-neutral hover:badge-primary'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={nobelOnly}
              onChange={(e) => setNobelOnly(e.target.checked)}
              data-testid="nobel-filter"
              className="checkbox checkbox-sm"
            />
            <PiPercent className="text-base-content/60" />
            Nobel Prize winners only
          </label>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-base-content/50 mt-4 text-sm">
          No theories match your search.
        </p>
      ) : (
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(
            ({
              label,
              description: itemDescription,
              icon: Icon,
              href,
              badge,
            }) => (
              <Link
                key={href}
                href={href}
                data-testid={`tool-card-${href.replace(/\//g, '')}`}
                className="card border-base-content/10 hover:border-primary border transition-colors">
                <div className="card-body items-center gap-2 text-center">
                  <Icon className="text-primary text-4xl" />
                  <h2 className="card-title text-lg">{label}</h2>
                  <p className="text-base-content/60 text-xs">
                    {itemDescription}
                  </p>
                  {badge && (
                    <span className="badge badge-accent badge-outline mt-1 text-[10px]">
                      {badge}
                    </span>
                  )}
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </main>
  );
};

HomeTemplate.displayName = 'HomeTemplate';
