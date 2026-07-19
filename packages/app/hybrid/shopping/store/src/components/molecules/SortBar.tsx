'use client';

import { type FC } from 'react';
import {
  PiArrowUp,
  PiArrowDown,
  PiGridFour,
  PiImageSquare,
  PiList,
} from 'react-icons/pi';
import type { SortKey, ViewMode } from '@/lib/types';

interface SortBarProps {
  sortKey: SortKey;
  sortAsc: boolean;
  toggleSort: (key: SortKey) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (v: boolean) => void;
}

export const SortBar: FC<SortBarProps> = ({
  sortKey,
  sortAsc,
  toggleSort,
  viewMode,
  setViewMode,
  showFavoritesOnly,
  setShowFavoritesOnly,
}) => (
  <div className="mb-6 w-full max-w-3xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`btn btn-xs ${showFavoritesOnly ? 'btn-primary' : 'btn-ghost'}`}>
          &#9829; Favorites
        </button>
        <button
          type="button"
          onClick={() => toggleSort('name')}
          className={`btn btn-xs ${sortKey === 'name' ? 'btn-active' : 'btn-ghost'}`}>
          Name{' '}
          {sortKey === 'name' && (sortAsc ? <PiArrowUp /> : <PiArrowDown />)}
        </button>
        <button
          type="button"
          onClick={() => toggleSort('category')}
          className={`btn btn-xs ${sortKey === 'category' ? 'btn-active' : 'btn-ghost'}`}>
          Category{' '}
          {sortKey === 'category' &&
            (sortAsc ? <PiArrowUp /> : <PiArrowDown />)}
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setViewMode('gallery')}
          aria-label="Gallery view"
          className={`btn btn-ghost btn-xs ${
            viewMode === 'gallery' ? 'btn-active' : ''
          }`}>
          <PiImageSquare />
        </button>
        <button
          type="button"
          onClick={() => setViewMode('grid')}
          aria-label="Grid view"
          className={`btn btn-ghost btn-xs ${viewMode === 'grid' ? 'btn-active' : ''}`}>
          <PiGridFour />
        </button>
        <button
          type="button"
          onClick={() => setViewMode('list')}
          aria-label="List view"
          className={`btn btn-ghost btn-xs ${viewMode === 'list' ? 'btn-active' : ''}`}>
          <PiList />
        </button>
      </div>
    </div>
  </div>
);

SortBar.displayName = 'SortBar';
