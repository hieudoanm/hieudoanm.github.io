import { DetectionResult } from '../types';

const STORAGE_KEY = 'shopify-history';

export const loadHistory = (): DetectionResult[] => {
  if (typeof window === 'undefined') return [];
  try {
    const h = localStorage.getItem(STORAGE_KEY);
    return h ? JSON.parse(h) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (items: DetectionResult[]): DetectionResult[] => {
  try {
    const existing = loadHistory();
    const merged = [...items, ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return items;
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
