'use client';

import { FC, useMemo, useState } from 'react';
import { FilterPanel } from '@/components/organisms/FilterPanel';
import { GroupSection } from '@/components/organisms/GroupSection';
import { compareBy, compareGroupKeys, groupKeyOf } from '@/lib/catalog';
import type {
  CourseItem,
  DifficultyFilter,
  GroupBy,
  SortOrder,
} from '@/lib/catalog';

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
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('All');
  const [sort, setSort] = useState<SortOrder>('default');
  const [groupBy, setGroupBy] = useState<GroupBy>('difficulty');
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
        <FilterPanel
          query={query}
          onQueryChange={setQuery}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          sort={sort}
          onSortChange={setSort}
          groupBy={groupBy}
          onGroupByChange={setGroupBy}
          nobelOnly={nobelOnly}
          onNobelChange={setNobelOnly}
        />
      )}

      {filtered.length === 0 ? (
        <p className="text-base-content/50 mt-4 text-sm">
          No theories match your search.
        </p>
      ) : (
        <div className="flex w-full max-w-3xl flex-col gap-8">
          {grouped.map(({ key, groupItems }) => (
            <GroupSection key={key} title={key} items={groupItems} />
          ))}
        </div>
      )}
    </main>
  );
};

HomeTemplate.displayName = 'HomeTemplate';
