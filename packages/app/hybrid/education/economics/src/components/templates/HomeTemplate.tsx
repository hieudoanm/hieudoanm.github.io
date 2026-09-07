'use client';

import Link from 'next/link';
import { ComponentType, FC, useMemo, useState } from 'react';
import {
  PiBookOpenText,
  PiCaretDown,
  PiCaretUp,
  PiMagnifyingGlass,
  PiPercent,
  PiXCircle,
} from 'react-icons/pi';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

const DIFFICULTIES: readonly Difficulty[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

type DifficultyFilter = 'All' | Difficulty;

type SortOrder =
  'default' | 'label-asc' | 'label-desc' | 'category' | 'easiest' | 'hardest';

type GroupBy = 'category' | 'difficulty' | 'letter';

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: 'badge-success',
  Intermediate: 'badge-warning',
  Advanced: 'badge-error',
};

function compareBy(
  sort: SortOrder
): ((a: CourseItem, b: CourseItem) => number) | null {
  switch (sort) {
    case 'label-asc':
      return (a, b) => a.label.localeCompare(b.label);
    case 'label-desc':
      return (a, b) => b.label.localeCompare(a.label);
    case 'category':
      return (a, b) =>
        (a.category ?? '').localeCompare(b.category ?? '') ||
        a.label.localeCompare(b.label);
    case 'easiest':
      return (a, b) =>
        DIFFICULTY_ORDER[a.difficulty ?? 'Beginner'] -
          DIFFICULTY_ORDER[b.difficulty ?? 'Beginner'] ||
        a.label.localeCompare(b.label);
    case 'hardest':
      return (a, b) =>
        DIFFICULTY_ORDER[b.difficulty ?? 'Beginner'] -
          DIFFICULTY_ORDER[a.difficulty ?? 'Beginner'] ||
        a.label.localeCompare(b.label);
    default:
      return null;
  }
}

function groupKeyOf(item: CourseItem, groupBy: GroupBy): string {
  switch (groupBy) {
    case 'category':
      return item.category ?? 'Uncategorized';
    case 'difficulty':
      return item.difficulty ?? 'Unknown';
    case 'letter':
      return (item.label.charAt(0) || '?').toUpperCase();
  }
}

function compareGroupKeys(groupBy: GroupBy): (a: string, b: string) => number {
  if (groupBy === 'difficulty') {
    return (a, b) =>
      (DIFFICULTY_ORDER[a as Difficulty] ?? 99) -
      (DIFFICULTY_ORDER[b as Difficulty] ?? 99);
  }
  return (a, b) => a.localeCompare(b);
}

export interface CourseItem {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  category?: string;
  difficulty?: Difficulty;
}

export interface HomeTemplateProps {
  appName: string;
  description: string;
  items: CourseItem[];
  showFilters?: boolean;
}

const ToolCard: FC<{ item: CourseItem }> = ({ item }) => {
  const {
    label,
    description: itemDescription,
    icon: Icon,
    href,
    badge,
    difficulty,
  } = item;
  return (
    <div
      data-testid={`tool-card-${href.replaceAll('/', '')}`}
      className="card border-base-content/10 hover:border-primary border transition-colors">
      <div className="card-body items-center gap-2 text-center">
        <Icon className="text-primary text-4xl" />
        <h2 className="card-title text-lg">{label}</h2>
        <p className="text-base-content/60 text-xs">{itemDescription}</p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1">
          {difficulty && (
            <span
              className={`badge badge-outline badge-sm text-[10px] ${difficultyStyles[difficulty]}`}>
              {difficulty}
            </span>
          )}
          {badge && (
            <span className="badge badge-accent badge-outline text-[10px]">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-2">
          <Link
            href={href}
            className="btn btn-primary btn-sm gap-1"
            data-testid={`study-${href.replaceAll('/', '')}`}>
            <PiBookOpenText className="text-sm" />
            Study
          </Link>
        </div>
      </div>
    </div>
  );
};

export const HomeTemplate: FC<HomeTemplateProps> = ({
  appName = '',
  description = '',
  items = [],
  showFilters = true,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('All');
  const [sort, setSort] = useState<SortOrder>('default');
  const [groupBy, setGroupBy] = useState<GroupBy>('difficulty');
  const [nobelOnly, setNobelOnly] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    const filteredItems = items.filter((item) => {
      if (q && !`${item.label} ${item.description}`.toLowerCase().includes(q)) {
        return false;
      }
      if (category !== 'All' && item.category !== category) {
        return false;
      }
      if (difficulty !== 'All' && item.difficulty !== difficulty) {
        return false;
      }
      if (nobelOnly && !item.badge) {
        return false;
      }
      return true;
    });
    const comparator = compareBy(sort);
    if (!comparator) {
      return filteredItems;
    }
    return [...filteredItems].sort(comparator);
  }, [items, query, category, difficulty, nobelOnly, sort]);

  const grouped = useMemo(() => {
    const map = new Map<string, CourseItem[]>();
    for (const item of filtered) {
      const key = groupKeyOf(item, groupBy);
      const list = map.get(key);
      if (list) {
        list.push(item);
      } else {
        map.set(key, [item]);
      }
    }
    const compareKeys = compareGroupKeys(groupBy);
    return [...map.entries()]
      .sort(([a], [b]) => compareKeys(a, b))
      .map(([key, groupItems]) => ({ key, groupItems }));
  }, [filtered, groupBy]);

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
        <div className="card border-base-content/10 w-full max-w-3xl border">
          <div className="card-body gap-4 p-5">
            <div className="relative w-full">
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

            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              data-testid="advanced-toggle"
              className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content/70 gap-1 self-start">
              {showAdvanced ? (
                <PiCaretUp className="text-xs" />
              ) : (
                <PiCaretDown className="text-xs" />
              )}
              Advanced
            </button>

            {showAdvanced && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
                    Category
                  </span>
                  <div className="flex flex-wrap gap-1.5">
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
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
                    Difficulty
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['All', ...DIFFICULTIES] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setDifficulty(lvl)}
                        data-testid={`difficulty-${lvl}`}
                        className={`badge badge-outline badge-sm cursor-pointer transition-colors ${
                          difficulty === lvl
                            ? 'badge-primary'
                            : 'badge-neutral hover:badge-primary'
                        }`}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
                    Sort
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOrder)}
                    data-testid="sort-select"
                    aria-label="Sort theories"
                    className="select select-bordered select-sm">
                    <option value="default">Default order</option>
                    <option value="label-asc">Title: A → Z</option>
                    <option value="label-desc">Title: Z → A</option>
                    <option value="category">Category</option>
                    <option value="easiest">Difficulty: Easiest first</option>
                    <option value="hardest">Difficulty: Hardest first</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
                    Group
                  </span>
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                    data-testid="group-select"
                    aria-label="Group theories"
                    className="select select-bordered select-sm">
                    <option value="difficulty">By difficulty</option>
                    <option value="category">By category</option>
                    <option value="letter">By first letter</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
                    More
                  </span>
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
              </div>
            )}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-base-content/50 mt-4 text-sm">
          No theories match your search.
        </p>
      ) : (
        <div className="flex w-full max-w-3xl flex-col gap-8">
          {grouped.map(({ key, groupItems }) => (
            <section
              key={key}
              data-testid={`group-${key}`}
              className="flex flex-col gap-4">
              <div className="divider">
                <span className="text-base-content/70 text-xs font-semibold tracking-wide uppercase">
                  {key}
                </span>
                <span className="badge badge-outline badge-sm text-[10px]">
                  {groupItems.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map((item) => (
                  <ToolCard key={item.href} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

HomeTemplate.displayName = 'HomeTemplate';
