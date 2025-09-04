import { AppCard } from '@web/components/store/AppCard';
import { EmptyState } from '@web/components/store/EmptyState';
import {
  filterAndSortApps,
  Filters,
  SortMode,
} from '@web/components/store/Filters';
import { Footer } from '@web/components/store/Footer';
import { Hero } from '@web/components/store/Hero';
import { Navbar } from '@web/components/store/Navbar';
import { ResultStats } from '@web/components/store/ResultStats';
import { App, apps } from '@web/data/apps';
import { useKeyboardSearch } from '@web/hooks/use-keyboard-search';
import { useTheme } from '@web/hooks/use-theme';
import { NextPage } from 'next';
import { useMemo, useState } from 'react';

/* -------------------------------------------------------------------------- */
/* Utils & hooks                                                               */
/* -------------------------------------------------------------------------- */

const categories: string[] = [...new Set(apps.map((a) => a.category))];

const StorePage: NextPage = () => {
  const [{ query, category }, setState] = useState({
    query: '',
    category: 'all',
  });

  const [sort, setSort] = useState<SortMode>('az');
  const { theme, toggleTheme } = useTheme();

  useKeyboardSearch('app-search');

  const filteredApps = useMemo(
    () => filterAndSortApps(apps as App[], query, category, sort),
    [query, category, sort]
  );

  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 py-6">
        <Hero apps={apps} categories={categories} />

        <Filters
          query={query}
          category={category}
          sort={sort}
          categories={categories}
          onQueryChange={(q) => setState({ query: q, category })}
          onCategoryChange={(c) => setState({ query, category: c })}
          onSortChange={setSort}
          onReset={() => setState({ query: '', category: 'all' })}
        />

        <ResultStats shown={filteredApps.length} total={apps.length} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredApps.length === 0 ? (
            <EmptyState />
          ) : (
            filteredApps.map((app) => <AppCard key={app.id} app={app} />)
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StorePage;
