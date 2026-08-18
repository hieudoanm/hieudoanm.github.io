'use client';

import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { LuCheck, LuSearch, LuSearchX } from 'react-icons/lu';
import { RESUME_TEMPLATES } from '../templates';
import { filterTemplates, TEMPLATE_CATEGORIES } from './templateFilters';
import type { TemplateCategory } from './templateFilters';
import { TemplateThumbnail } from './TemplateThumbnail';

interface TemplatePickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TemplatePicker: FC<TemplatePickerProps> = ({
  selectedId,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TemplateCategory | null>(null);

  const filtered = useMemo(
    () => filterTemplates(RESUME_TEMPLATES, query, category),
    [query, category]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="join w-full">
        <div className="join-item flex w-full items-center gap-2 px-3">
          <LuSearch className="text-base-content/40 h-4 w-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search templates…"
            aria-label="Search templates"
            className="placeholder:text-base-content/40 w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>
      <div aria-label="Filter by category" className="flex flex-wrap gap-1">
        {TEMPLATE_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(category === item ? null : item)}
            className={[
              'badge cursor-pointer border text-xs',
              category === item
                ? 'badge-primary'
                : 'border-base-300 hover:border-base-content/30',
            ].join(' ')}
            aria-pressed={category === item}>
            {item}
          </button>
        ))}
      </div>
      <div aria-label="Template results" className="grid grid-cols-1 gap-2">
        {filtered.map((template) => {
          const isSelected = template.id === selectedId;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={[
                'relative flex items-start gap-3 rounded-xl border p-2 text-left transition-colors',
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-base-300 hover:border-base-content/30',
              ].join(' ')}
              aria-pressed={isSelected}>
              <TemplateThumbnail component={template.component} width={60} />
              <span className="flex min-w-0 flex-col pt-0.5">
                <span className="text-xs font-bold">{template.name}</span>
                <span className="text-base-content/50 line-clamp-2 text-[10px]">
                  {template.description}
                </span>
              </span>
              {isSelected && (
                <span className="bg-primary text-primary-content absolute top-1 right-1 rounded-full p-0.5">
                  <LuCheck className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-base-content/50 flex flex-col items-center gap-1 py-4 text-center text-xs">
            <LuSearchX className="h-5 w-5" />
            <span>No templates match your search.</span>
          </div>
        )}
      </div>
    </div>
  );
};

TemplatePicker.displayName = 'TemplatePicker';
