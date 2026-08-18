'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { storage } from './storage';

const FAVORITES_KEY = 'favorites';
const RECENT_KEY = 'recently-viewed';
const MAX_RECENT = 10;

let cachedFavorites: string[] = [];
const getFavorites = (): string[] => {
  const raw = storage.get<string[]>(FAVORITES_KEY, []);
  if (
    raw.length === cachedFavorites.length &&
    raw.every((v, i) => v === cachedFavorites[i])
  ) {
    return cachedFavorites;
  }
  cachedFavorites = raw;
  return raw;
};

type Unsubscribe = () => void;
const favoritesListeners = new Set<() => void>();

const subscribeFavorites = (cb: () => void): Unsubscribe => {
  const handler = (e: StorageEvent) => {
    if (e.key === 'store:' + FAVORITES_KEY) cb();
  };
  window.addEventListener('storage', handler);
  favoritesListeners.add(cb);
  return () => {
    window.removeEventListener('storage', handler);
    favoritesListeners.delete(cb);
  };
};

export const useFavorites = () => {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    getFavorites,
    () => []
  );

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const toggleFavorite = useCallback((slug: string) => {
    const current = getFavorites();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    cachedFavorites = next;
    storage.set(FAVORITES_KEY, next);
    favoritesListeners.forEach((l) => l());
  }, []);

  return { favorites, isFavorite, toggleFavorite };
};

let cachedRecent: string[] = [];
const getRecent = (): string[] => {
  const raw = storage.get<string[]>(RECENT_KEY, []);
  if (
    raw.length === cachedRecent.length &&
    raw.every((v, i) => v === cachedRecent[i])
  ) {
    return cachedRecent;
  }
  cachedRecent = raw;
  return raw;
};

const recentListeners = new Set<() => void>();

const subscribeRecent = (cb: () => void): Unsubscribe => {
  const handler = (e: StorageEvent) => {
    if (e.key === 'store:' + RECENT_KEY) cb();
  };
  window.addEventListener('storage', handler);
  recentListeners.add(cb);
  return () => {
    window.removeEventListener('storage', handler);
    recentListeners.delete(cb);
  };
};

export const useRecentlyViewed = () => {
  const slugs = useSyncExternalStore(subscribeRecent, getRecent, () => []);

  const addRecent = useCallback((slug: string) => {
    const current = getRecent();
    const next = [slug, ...current.filter((s) => s !== slug)].slice(
      0,
      MAX_RECENT
    );
    cachedRecent = next;
    storage.set(RECENT_KEY, next);
    recentListeners.forEach((l) => l());
  }, []);

  return { slugs, addRecent };
};
