'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  PhotoImage,
  Album,
  Filter,
  EditHistoryEntry,
  Layer,
  PhotoSettings,
  Adjustment,
} from '@/types';
import { db } from '@/lib/db';
import { seedDatabase } from '@/data/seed';
import { defaultAdjustments } from '@/data/models';
import { generateId } from '@/data/models';

interface DataContextType {
  images: PhotoImage[];
  albums: Album[];
  filters: Filter[];
  history: EditHistoryEntry[];
  layers: Layer[];
  settings: PhotoSettings;
  isLoading: boolean;
  currentImage: PhotoImage | null;
  setCurrentImage: (image: PhotoImage | null) => void;
  currentAdjustments: Adjustment;
  setCurrentAdjustments: (a: Adjustment) => void;
  createImage: (
    data: Omit<PhotoImage, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<PhotoImage>;
  updateImage: (id: string, updates: Partial<PhotoImage>) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  createAlbum: (name: string) => Promise<Album>;
  updateAlbum: (id: string, updates: Partial<Album>) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  addImageToAlbum: (imageId: string, albumId: string) => Promise<void>;
  removeImageFromAlbum: (imageId: string, albumId: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addHistoryEntry: (
    entry: Omit<EditHistoryEntry, 'id' | 'timestamp'>
  ) => Promise<void>;
  addLayer: (layer: Omit<Layer, 'id'>) => Promise<Layer>;
  updateLayer: (id: string, updates: Partial<Layer>) => Promise<void>;
  deleteLayer: (id: string) => Promise<void>;
  updateSettings: (s: Partial<PhotoSettings>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);
export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<PhotoImage[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [history, setHistory] = useState<EditHistoryEntry[]>([]);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [settings, setSettings] = useState<PhotoSettings>({
    theme: 'night',
    defaultExportFormat: 'png',
    canvasBackground: 'checkerboard',
    defaultQuality: 85,
  });
  const [currentImage, setCurrentImage] = useState<PhotoImage | null>(null);
  const [currentAdjustments, setCurrentAdjustments] =
    useState<Adjustment>(defaultAdjustments);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await seedDatabase();
    const [i, a, f, h, l, s] = await Promise.all([
      db.images.getAll(),
      db.albums.getAll(),
      db.filters.getAll(),
      db.history.getAll(),
      db.layers.getAll(),
      db.settings.get(),
    ]);
    setImages(i.sort((a, b) => b.updatedAt - a.updatedAt));
    setAlbums(a);
    setFilters(f);
    setHistory(h.sort((a, b) => b.timestamp - a.timestamp));
    setLayers(l);
    setSettings(s);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const createImage = useCallback(
    async (data: Omit<PhotoImage, 'id' | 'createdAt' | 'updatedAt'>) => {
      const image: PhotoImage = {
        ...data,
        id: generateId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.images.put(image);
      setImages((p) => [image, ...p]);
      return image;
    },
    []
  );

  const updateImage = useCallback(
    async (id: string, updates: Partial<PhotoImage>) => {
      const image = images.find((i) => i.id === id);
      if (image) {
        const updated = { ...image, ...updates, updatedAt: Date.now() };
        await db.images.put(updated);
        setImages((p) => p.map((i) => (i.id === id ? updated : i)));
      }
    },
    [images]
  );

  const deleteImage = useCallback(async (id: string) => {
    await db.images.delete(id);
    setImages((p) => p.filter((i) => i.id !== id));
  }, []);

  const createAlbum = useCallback(async (name: string) => {
    const album: Album = {
      id: `album-${Date.now()}`,
      name,
      coverId: null,
      imageIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.albums.put(album);
    setAlbums((p) => [...p, album]);
    return album;
  }, []);

  const updateAlbum = useCallback(
    async (id: string, updates: Partial<Album>) => {
      const album = albums.find((a) => a.id === id);
      if (album) {
        const updated = { ...album, ...updates, updatedAt: Date.now() };
        await db.albums.put(updated);
        setAlbums((p) => p.map((a) => (a.id === id ? updated : a)));
      }
    },
    [albums]
  );

  const deleteAlbum = useCallback(async (id: string) => {
    await db.albums.delete(id);
    setAlbums((p) => p.filter((a) => a.id !== id));
  }, []);

  const addImageToAlbum = useCallback(
    async (imageId: string, albumId: string) => {
      const album = albums.find((a) => a.id === albumId);
      if (album && !album.imageIds.includes(imageId)) {
        const updated = {
          ...album,
          imageIds: [...album.imageIds, imageId],
          updatedAt: Date.now(),
        };
        await db.albums.put(updated);
        setAlbums((p) => p.map((a) => (a.id === albumId ? updated : a)));
      }
    },
    [albums]
  );

  const removeImageFromAlbum = useCallback(
    async (imageId: string, albumId: string) => {
      const album = albums.find((a) => a.id === albumId);
      if (album) {
        const updated = {
          ...album,
          imageIds: album.imageIds.filter((id) => id !== imageId),
          updatedAt: Date.now(),
        };
        await db.albums.put(updated);
        setAlbums((p) => p.map((a) => (a.id === albumId ? updated : a)));
      }
    },
    [albums]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const image = images.find((i) => i.id === id);
      if (image) {
        const updated = {
          ...image,
          favorite: !image.favorite,
          updatedAt: Date.now(),
        };
        await db.images.put(updated);
        setImages((p) => p.map((i) => (i.id === id ? updated : i)));
      }
    },
    [images]
  );

  const addHistoryEntry = useCallback(
    async (entry: Omit<EditHistoryEntry, 'id' | 'timestamp'>) => {
      const e: EditHistoryEntry = {
        ...entry,
        id: `hist-${Date.now()}`,
        timestamp: Date.now(),
      };
      await db.history.put(e);
      setHistory((p) => [e, ...p]);
    },
    []
  );

  const addLayer = useCallback(async (layerData: Omit<Layer, 'id'>) => {
    const layer: Layer = { ...layerData, id: `layer-${Date.now()}` };
    await db.layers.put(layer);
    setLayers((p) => [...p, layer]);
    return layer;
  }, []);

  const updateLayer = useCallback(
    async (id: string, updates: Partial<Layer>) => {
      const layer = layers.find((l) => l.id === id);
      if (layer) {
        const updated = { ...layer, ...updates };
        await db.layers.put(updated);
        setLayers((p) => p.map((l) => (l.id === id ? updated : l)));
      }
    },
    [layers]
  );

  const deleteLayer = useCallback(async (id: string) => {
    await db.layers.delete(id);
    setLayers((p) => p.filter((l) => l.id !== id));
  }, []);

  const updateSettings = useCallback(
    async (partial: Partial<PhotoSettings>) => {
      const updated = { ...settings, ...partial };
      await db.settings.put(updated);
      setSettings(updated);
    },
    [settings]
  );

  return (
    <DataContext.Provider
      value={{
        images,
        albums,
        filters,
        history,
        layers,
        settings,
        isLoading,
        currentImage,
        setCurrentImage,
        currentAdjustments,
        setCurrentAdjustments,
        createImage,
        updateImage,
        deleteImage,
        createAlbum,
        updateAlbum,
        deleteAlbum,
        addImageToAlbum,
        removeImageFromAlbum,
        toggleFavorite,
        addHistoryEntry,
        addLayer,
        updateLayer,
        deleteLayer,
        updateSettings,
        refreshData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
