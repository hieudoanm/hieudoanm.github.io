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

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn().mockResolvedValue({
    width: 100,
    height: 100,
    naturalWidth: 100,
    naturalHeight: 100,
    src: '',
  }),
}));

jest.mock('@/utils/trpc', () => ({
  trpcClient: {
    openrouter: {
      generate: {
        mutate: jest.fn().mockResolvedValue({ text: 'ok' }),
      },
    },
  },
}));

jest.mock('next/link', () => {
  const React = require('react');
  const Link = React.forwardRef(
    (
      {
        children,
        href,
        ...props
      }: { children: React.ReactNode; href: string; [key: string]: unknown },
      ref: React.Ref<HTMLAnchorElement>
    ) => React.createElement('a', { ...props, href, ref }, children)
  );
  Link.displayName = 'Link';
  return { __esModule: true, default: Link };
});

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import AlbumsPage from '@/app/albums/page';
import { db } from '@/lib/db';
import type { Album, PhotoImage } from '@/types';

const image = (
  id: string,
  overrides: Partial<PhotoImage> = {}
): PhotoImage => ({
  id,
  name: `${id}.png`,
  type: 'image/png',
  width: 100,
  height: 100,
  size: 10,
  color: '#3b82f6',
  tags: ['test'],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
  ...overrides,
});

const album = (id: string, overrides: Partial<Album> = {}): Album => ({
  id,
  name: `Album ${id}`,
  coverId: null,
  imageIds: [],
  createdAt: 1,
  updatedAt: 1,
  ...overrides,
});

const seedDb = (): void => {
  (db.images.getAll as jest.Mock).mockResolvedValue([image('a')]);
  (db.albums.getAll as jest.Mock).mockResolvedValue([album('al1')]);
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

beforeEach(() => {
  jest.clearAllMocks();
  seedDb();
});

describe('AlbumsPage', () => {
  it('lists albums and creates a new one', async () => {
    render(<AlbumsPage />);
    expect(await screen.findByText('Album al1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Album name'), {
      target: { value: 'Holiday' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(db.albums.put).toHaveBeenCalled());
  });

  it('deletes an album', async () => {
    render(<AlbumsPage />);
    fireEvent.click(await screen.findByRole('button', { name: /Delete/i }));
    await waitFor(() => expect(db.albums.delete).toHaveBeenCalled());
  });

  it('early returns when album name is empty', async () => {
    render(<AlbumsPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'New' }));
    (db.albums.put as jest.Mock).mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await act(async () => {});
    expect(db.albums.put).not.toHaveBeenCalled();
  });
});
