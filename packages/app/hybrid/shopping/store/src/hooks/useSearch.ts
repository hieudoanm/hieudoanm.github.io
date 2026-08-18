'use client';

import {
  useDeferredValue,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { AppData } from '@/lib/downloads';

interface UseSearchOptions {
  apps: AppData[];
  onQueryChange?: (q: string) => void;
}

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  deferredQuery: string;
  suggestions: AppData[];
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  filtering: boolean;
}

export const useSearch = ({ apps }: UseSearchOptions): UseSearchReturn => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;
  const searchRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!filtering) return [];
    const q = deferredQuery.toLowerCase();
    return apps.filter((a) => a.label.toLowerCase().includes(q)).slice(0, 5);
  }, [deferredQuery, filtering, apps]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    if (e.key === 'Escape') {
      setQuery('');
      setShowSuggestions(false);
      searchRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    query,
    setQuery,
    deferredQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    searchRef,
    filtering,
  };
};
