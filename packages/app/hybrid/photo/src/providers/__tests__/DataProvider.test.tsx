jest.mock('@/lib/db', () => ({
  db: {
    images: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    albums: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    filters: { getAll: jest.fn(), put: jest.fn() },
    history: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    layers: { getAll: jest.fn(), put: jest.fn(), delete: jest.fn() },
    settings: { get: jest.fn(), put: jest.fn() },
  },
}));

import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { DataProvider, useData } from '@/providers/DataProvider';
import { db } from '@/lib/db';
import type { Adjustment, PhotoImage } from '@/types';

const image = (id: string): PhotoImage => ({
  id,
  name: `${id}.png`,
  width: 100,
  height: 100,
  size: 10,
  type: 'image/png',
  color: '#ff0000',
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
});

const adjustments = (overrides: Partial<Adjustment> = {}): Adjustment => ({
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
  temperature: 0,
  exposure: 0,
  highlights: 0,
  shadows: 0,
  clarity: 0,
  vibrance: 0,
  sharpness: 0,
  noiseReduction: 0,
  vignette: 0,
  ...overrides,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <DataProvider>{children}</DataProvider>
);

const emptyDb = (): void => {
  (db.images.getAll as jest.Mock).mockResolvedValue([]);
  (db.albums.getAll as jest.Mock).mockResolvedValue([]);
  (db.filters.getAll as jest.Mock).mockResolvedValue([]);
  (db.history.getAll as jest.Mock).mockResolvedValue([]);
  (db.layers.getAll as jest.Mock).mockResolvedValue([]);
  (db.settings.get as jest.Mock).mockResolvedValue({
    theme: 'nothing',
    defaultExportFormat: 'png',
    canvasBackground: 'checkerboard',
    defaultQuality: 85,
  });
};

describe('useData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    emptyDb();
  });

  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used within DataProvider'
    );
  });

  it('loads data on mount', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([image('a')]);
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.images).toHaveLength(1);
    expect(result.current.images[0].id).toBe('a');
  });

  it('creates an image', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {
      await result.current.createImage({
        name: 'new.png',
        width: 10,
        height: 10,
        size: 5,
        type: 'image/png',
        color: '#ff0000',
        tags: [],
        favorite: false,
        albumId: null,
      });
    });
    expect(db.images.put).toHaveBeenCalled();
    expect(result.current.images[0].name).toBe('new.png');
  });

  it('updates and deletes an image', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([image('a')]);
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.images).toHaveLength(1));

    await act(async () => {
      await result.current.updateImage('a', { name: 'renamed.png' });
    });
    expect(result.current.images[0].name).toBe('renamed.png');

    await act(async () => {
      await result.current.deleteImage('a');
    });
    expect(result.current.images).toHaveLength(0);
  });

  it('toggles favorite', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([image('a')]);
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.images).toHaveLength(1));

    await act(async () => {
      await result.current.toggleFavorite('a');
    });
    expect(result.current.images[0].favorite).toBe(true);
  });

  it('creates albums and manages album membership', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let albumId = '';
    await act(async () => {
      albumId = (await result.current.createAlbum('Vacation')).id;
    });
    expect(result.current.albums).toHaveLength(1);

    await act(async () => {
      await result.current.addImageToAlbum('img1', albumId);
      await result.current.removeImageFromAlbum('img1', albumId);
    });
    expect(db.albums.put).toHaveBeenCalled();
  });

  it('updates settings', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.updateSettings({ defaultExportFormat: 'jpeg' });
    });
    expect(result.current.settings.defaultExportFormat).toBe('jpeg');
  });

  it('adds history entries and layers', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addHistoryEntry({
        imageId: 'a',
        label: 'Brightness',
        adjustments: adjustments(),
        filterId: null,
      });
      await result.current.addLayer({
        name: 'Layer 1',
        type: 'image',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
      });
    });
    expect(result.current.history).toHaveLength(1);
    expect(result.current.layers).toHaveLength(1);

    const layerId = result.current.layers[0].id;
    await act(async () => {
      await result.current.updateLayer(layerId, { opacity: 50 });
      await result.current.deleteLayer(layerId);
    });
    expect(result.current.layers).toHaveLength(0);
  });

  it('sets the current image and adjustments', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.setCurrentImage(image('a')));
    expect(result.current.currentImage?.id).toBe('a');
    act(() =>
      result.current.setCurrentAdjustments(adjustments({ brightness: 10 }))
    );
    expect(result.current.currentAdjustments.brightness).toBe(10);
  });

  it('exposes filters', async () => {
    (db.filters.getAll as jest.Mock).mockResolvedValue([
      { id: 'f1', name: 'Warm' },
    ]);
    const { result } = renderHook(() => useData(), { wrapper });
    await waitFor(() => expect(result.current.filters).toHaveLength(1));
  });
});
