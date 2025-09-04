import { App } from '@web/data/apps';
import { ChangeEvent } from 'react';

export type SortMode = 'az' | 'za' | 'category';

export const filterAndSortApps = (
  apps: App[],
  query: string,
  category: string,
  sort: SortMode
): App[] => {
  const q = query.toLowerCase();

  const filtered = apps.filter(({ name = '', tags = [], category: c }) => {
    const matchesQuery =
      name.toLowerCase().includes(q) ||
      tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory = category === 'all' || c === category;

    return matchesQuery && matchesCategory;
  });

  return [...filtered].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name);
    if (sort === 'za') return b.name.localeCompare(a.name);
    return a.category.localeCompare(b.category);
  });
};

export const Filters = ({
  query,
  category,
  sort,
  categories = [],
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onReset,
}: {
  query: string;
  category: string;
  sort: SortMode;
  categories: string[];
  onQueryChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onSortChange: (v: SortMode) => void;
  onReset: () => void;
}) => {
  return (
    <div className="bg-base-200/50 border-base-300/30 ring-base-100/10 mb-6 rounded-xl border p-4 shadow-sm ring-1 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id="app-search"
          className="input input-bordered bg-base-100/60 flex-1 backdrop-blur"
          placeholder="Search apps… (⌘ / Ctrl + K)"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onQueryChange(e.target.value)
          }
        />

        <select
          className="select select-bordered bg-base-100/60 backdrop-blur sm:w-48"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered bg-base-100/60 backdrop-blur sm:w-40"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortMode)}>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="category">By category</option>
        </select>

        {(query || category !== 'all') && (
          <button
            className="btn btn-ghost btn-sm text-base-content/70 hover:text-base-content"
            onClick={onReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
