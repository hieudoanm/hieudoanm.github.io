'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { VaultItem, Folder, Settings } from '@/types';
import { db } from '@/lib/db';
import { seedDatabase } from '@/data/seed';

interface DataContextType {
  items: VaultItem[];
  folders: Folder[];
  settings: Settings;
  isLoading: boolean;
  currentItem: VaultItem | null;
  setCurrentItem: (item: VaultItem | null) => void;
  createItem: (
    item: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<VaultItem>;
  updateItem: (id: string, updates: Partial<VaultItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  updateSettings: (s: Partial<Settings>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);
export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [settings, setSettings] = useState<Settings>({
    theme: 'night',
    autoLockTimeout: 5,
    clipboardClear: 30,
  });
  const [currentItem, setCurrentItem] = useState<VaultItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await seedDatabase();
    const [i, f, s] = await Promise.all([
      db.items.getAll(),
      db.folders.getAll(),
      db.settings.get(),
    ]);
    setItems(i.sort((a, b) => b.updatedAt - a.updatedAt));
    setFolders(f);
    setSettings(s);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const createItem = useCallback(
    async (data: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>) => {
      const item: VaultItem = {
        ...data,
        id: `v-${Date.now()}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.items.put(item);
      setItems((p) => [item, ...p]);
      return item;
    },
    []
  );

  const updateItem = useCallback(
    async (id: string, updates: Partial<VaultItem>) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        const updated = { ...item, ...updates, updatedAt: Date.now() };
        await db.items.put(updated);
        setItems((p) => p.map((i) => (i.id === id ? updated : i)));
      }
    },
    [items]
  );

  const deleteItem = useCallback(async (id: string) => {
    await db.items.delete(id);
    setItems((p) => p.filter((i) => i.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    async (id: string) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        const updated = {
          ...item,
          favorite: !item.favorite,
          updatedAt: Date.now(),
        };
        await db.items.put(updated);
        setItems((p) => p.map((i) => (i.id === id ? updated : i)));
      }
    },
    [items]
  );

  const updateSettings = useCallback(
    async (partial: Partial<Settings>) => {
      const updated = { ...settings, ...partial };
      await db.settings.put(updated);
      setSettings(updated);
    },
    [settings]
  );

  return (
    <DataContext.Provider
      value={{
        items,
        folders,
        settings,
        isLoading,
        currentItem,
        setCurrentItem,
        createItem,
        updateItem,
        deleteItem,
        toggleFavorite,
        updateSettings,
        refreshData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
