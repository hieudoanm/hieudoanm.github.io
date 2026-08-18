'use client';

import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  PiCaretDown,
  PiCaretRight,
  PiCheckBold,
  PiMagnifyingGlass,
} from 'react-icons/pi';
import type { Cuisine, Food } from '../types';

interface CuisineSelectProps {
  cuisines: Cuisine[];
  foods: Food[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  placeholder?: string;
}

export const CuisineSelect: FC<CuisineSelectProps> = ({
  cuisines,
  foods,
  value,
  onChange,
  allLabel = 'All Cuisines',
  placeholder = 'Search…',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCuisine, setFilterCuisine] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const active = foods.find((food) => food.value === value);
  const activeCuisine = cuisines.find(
    (cuisine) => cuisine.value === active?.category
  );

  useEffect(() => {
    if (!open) return;
    const handle = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setSearch('');
        setFilterCuisine(null);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSearch('');
    }
  }, [open]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return cuisines
      .map((cuisine) => {
        const matched = foods.filter(
          (food) =>
            food.category === cuisine.value &&
            (filterCuisine === null || cuisine.value === filterCuisine) &&
            (!query ||
              food.label.toLowerCase().includes(query) ||
              cuisine.label.toLowerCase().includes(query))
        );
        return { cuisine, foods: matched };
      })
      .filter((group) => group.foods.length > 0);
  }, [cuisines, foods, search, filterCuisine]);

  const toggleExpand = (cuisineValue: string) => {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(cuisineValue)) next.delete(cuisineValue);
      else next.add(cuisineValue);
      return next;
    });
  };

  const close = () => {
    setOpen(false);
    setSearch('');
    setFilterCuisine(null);
  };

  return (
    <div ref={ref} className="relative z-10 w-full max-w-md">
      <button
        onClick={() => setOpen((previous) => !previous)}
        data-testid="cuisine-select-trigger"
        className={`flex w-full cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
          open
            ? 'text-accent border-accent/50 bg-accent/10'
            : 'text-base-content border-base-content/20 bg-base-content/5'
        }`}>
        <span className="w-5 shrink-0 text-center text-base leading-none">
          {activeCuisine?.emoji ?? '🎲'}
        </span>
        <span className="flex-1 truncate text-left">
          {active?.label ?? allLabel}
        </span>
        <PiCaretDown
          className={`ml-0.5 h-3 w-3 shrink-0 transition-transform duration-200 ${
            open ? 'text-accent rotate-180' : 'text-base-content/70'
          }`}
        />
      </button>

      {open && (
        <div
          data-testid="cuisine-select-menu"
          className="border-base-content/10 bg-base-200 absolute right-0 left-0 z-50 mt-2 rounded-2xl border p-1.5 shadow-2xl shadow-black/50 transition-all duration-200">
          <div className="px-2 pt-1 pb-1">
            <div className="border-base-content/10 bg-base-300 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
              <PiMagnifyingGlass className="text-base-content/50 h-4 w-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={placeholder}
                aria-label="Search foods"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1 px-2 pb-2">
            <button
              onClick={() => setFilterCuisine(null)}
              className={`cursor-pointer rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors ${
                filterCuisine === null
                  ? 'text-accent bg-accent/20'
                  : 'text-base-content/60 hover:bg-base-content/10'
              }`}>
              All
            </button>
            {cuisines.map((cuisine) => (
              <button
                key={cuisine.value}
                onClick={() =>
                  setFilterCuisine((previous) =>
                    previous === cuisine.value ? null : cuisine.value
                  )
                }
                title={cuisine.label}
                className={`cursor-pointer rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors ${
                  filterCuisine === cuisine.value
                    ? 'text-accent bg-accent/20'
                    : 'text-base-content/60 hover:bg-base-content/10'
                }`}>
                {cuisine.emoji}
              </button>
            ))}
          </div>

          <div className="max-h-[55vh] overflow-y-auto">
            <button
              onClick={() => {
                onChange('all');
                close();
              }}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-xl border-none px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-150 ${
                value === 'all'
                  ? 'text-accent bg-accent/20'
                  : 'text-base-content hover:bg-base-content/10'
              }`}>
              <span className="inline-flex h-5 w-5 items-center justify-center text-base leading-none">
                🎲
              </span>
              <span className="flex-1">{allLabel}</span>
              {value === 'all' && (
                <PiCheckBold className="h-3.5 w-3.5 shrink-0" />
              )}
            </button>

            <div className="border-base-content/10 mx-2 my-1 border-t" />

            {filtered.map(({ cuisine, foods: cuisineFoods }) => {
              const isExpanded =
                search.trim().length > 0 || expanded.has(cuisine.value);
              return (
                <div key={cuisine.value}>
                  <button
                    onClick={() => toggleExpand(cuisine.value)}
                    className="text-base-content/50 flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-wider uppercase">
                    {isExpanded ? (
                      <PiCaretDown className="h-3 w-3" />
                    ) : (
                      <PiCaretRight className="h-3 w-3" />
                    )}
                    <span>{cuisine.emoji}</span>
                    <span>{cuisine.label}</span>
                    <span className="text-base-content/30 ml-auto">
                      {cuisineFoods.length}
                    </span>
                  </button>
                  {isExpanded &&
                    cuisineFoods.map(({ emoji, label, value: foodValue }) => (
                      <button
                        key={foodValue}
                        onClick={() => {
                          onChange(foodValue);
                          close();
                        }}
                        className={`flex w-full cursor-pointer items-center gap-2 rounded-xl border-none px-3 py-2 pl-10 text-left text-sm font-medium transition-colors duration-150 ${
                          foodValue === value
                            ? 'text-accent bg-accent/20'
                            : 'text-base-content hover:bg-base-content/10'
                        }`}>
                        <span className="inline-flex h-5 w-5 items-center justify-center text-base leading-none">
                          {emoji}
                        </span>
                        <span className="flex-1">{label}</span>
                        {foodValue === value && (
                          <PiCheckBold className="h-3.5 w-3.5 shrink-0" />
                        )}
                      </button>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

CuisineSelect.displayName = 'CuisineSelect';
