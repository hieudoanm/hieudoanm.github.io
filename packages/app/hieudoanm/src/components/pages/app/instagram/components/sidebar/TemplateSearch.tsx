import type { FC } from 'react';

export const CATEGORY_LABELS: Record<string, string> = {
  compare: 'Compare',
  data: 'Data & Stats',
  device: 'Devices & Tech',
  education: 'Education & Learning',
  finance: 'Finance',
  fitness: 'Fitness & Exercise',
  food: 'Food & Drink',
  health: 'Health & Wellness',
  inspirational: 'Inspirational',
  interactive: 'Interactive',
  list: 'Lists & Steps',
  marketing: 'Marketing',
  media: 'Media',
  social: 'Social',
  text: 'Text',
  travel: 'Travel',
};

export const CATEGORY_ORDER = [
  'compare',
  'data',
  'device',
  'education',
  'finance',
  'fitness',
  'food',
  'health',
  'inspirational',
  'interactive',
  'list',
  'marketing',
  'media',
  'social',
  'text',
  'travel',
];

export const TemplateSearch: FC<{
  total: number;
  query: string;
  onQueryChange: (q: string) => void;
  categoryFilter: string;
  onCategoryChange: (c: string) => void;
}> = ({ total, query, onQueryChange, categoryFilter, onCategoryChange }) => (
  <div className="border-base-300 space-y-2 border-b px-4 py-3">
    <h2 className="text-neutral text-xs font-semibold tracking-widest uppercase">
      Templates ({total})
    </h2>
    <input
      type="text"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search name or category…"
      className="rounded-btn border-base-300 bg-base-100 text-base-content placeholder:text-neutral/50 focus:border-primary/50 focus:ring-primary/30 w-full border px-2.5 py-1.5 text-xs outline-none focus:ring-1"
    />
    <select
      value={categoryFilter}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="rounded-btn border-base-300 bg-base-100 text-base-content focus:border-primary/50 focus:ring-primary/30 w-full border px-2.5 py-1.5 text-xs outline-none focus:ring-1">
      <option value="">All categories</option>
      {CATEGORY_ORDER.map((cat) => (
        <option key={cat} value={cat}>
          {CATEGORY_LABELS[cat] ?? cat}
        </option>
      ))}
    </select>
  </div>
);
