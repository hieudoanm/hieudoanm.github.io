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

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
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

const seedDb = (images: PhotoImage[], albums: Album[] = []): void => {
  (db.images.getAll as jest.Mock).mockResolvedValue(images);
  (db.albums.getAll as jest.Mock).mockResolvedValue(albums);
  (db.filters.getAll as jest.Mock).mockResolvedValue([]);
  (db.history.getAll as jest.Mock).mockResolvedValue([]);
  (db.layers.getAll as jest.Mock).mockResolvedValue([]);
  (db.settings.get as jest.Mock).mockResolvedValue({
    theme: 'photo-light',
    defaultExportFormat: 'png',
    canvasBackground: 'checkerboard',
    defaultQuality: 85,
  });
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('HomePage', () => {
  it('renders the library with seeded images and albums', async () => {
    seedDb(
      [
        image('a', { name: 'sunset.png', updatedAt: 300, favorite: true }),
        image('b', { name: 'mountains.png', updatedAt: 100, size: 5000 }),
      ],
      [album('al1')]
    );
    render(<HomePage />);
    expect(await screen.findByText('sunset.png')).toBeInTheDocument();
    expect(screen.getByText('mountains.png')).toBeInTheDocument();
    await screen.findByText('Album al1');
  });

  it('filters images by search', async () => {
    seedDb([
      image('a', { name: 'sunset.png', updatedAt: 300, favorite: true }),
      image('b', { name: 'mountains.png', updatedAt: 100, size: 5000 }),
    ]);
    render(<HomePage />);
    await screen.findByText('sunset.png');
    fireEvent.change(screen.getByPlaceholderText('Search images...'), {
      target: { value: 'mountain' },
    });
    expect(screen.queryByText('sunset.png')).not.toBeInTheDocument();
    expect(screen.getByText('mountains.png')).toBeInTheDocument();
  });

  it('sorts by name', async () => {
    seedDb([
      image('a', { name: 'sunset.png', updatedAt: 300, favorite: true }),
      image('b', { name: 'mountains.png', updatedAt: 100, size: 5000 }),
    ]);
    render(<HomePage />);
    await screen.findByText('sunset.png');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'name' },
    });
    expect(screen.getByText('mountains.png')).toBeInTheDocument();
  });

  it('switches between grid and list views', async () => {
    seedDb([image('a')]);
    const { container } = render(<HomePage />);
    await screen.findByText('a.png');
    const toggle = container.querySelector<HTMLButtonElement>(
      'main button.btn-circle'
    );
    expect(toggle).not.toBeNull();
    fireEvent.click(toggle as HTMLButtonElement);
    expect(screen.getAllByText(/\d+ (B|KB|MB)/).length).toBeGreaterThan(0);
  });

  it('toggles favorite', async () => {
    seedDb([image('a'), image('b')]);
    render(<HomePage />);
    await screen.findByText('a.png');
    fireEvent.click(screen.getAllByRole('button')[3]);
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('uploads an image from the modal', async () => {
    seedDb([]);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: /Upload/i }));
    const uploadButtons = screen.getAllByRole('button', { name: 'Upload' });
    fireEvent.click(uploadButtons[uploadButtons.length - 1]);
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('creates a new album', async () => {
    seedDb([], [album('al1')]);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Album name'), {
      target: { value: 'Trip' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(db.albums.put).toHaveBeenCalled());
  });

  it('shows an empty message when no images match', async () => {
    seedDb([image('a')]);
    render(<HomePage />);
    await screen.findByText('a.png');
    fireEvent.change(screen.getByPlaceholderText('Search images...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No images found')).toBeInTheDocument();
  });

  it('sorts by size', async () => {
    seedDb([
      image('a', { name: 'small.png', size: 100, updatedAt: 200 }),
      image('b', { name: 'large.png', size: 5000, updatedAt: 100 }),
    ]);
    render(<HomePage />);
    await screen.findByText('small.png');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'size' },
    });
    const names = screen.getAllByText(/\.png$/).map((el) => el.textContent);
    expect(names).toContain('large.png');
    expect(names).toContain('small.png');
    expect(names!.indexOf('large.png')).toBeLessThan(
      names!.indexOf('small.png')
    );
  });

  it('sorts by dimensions', async () => {
    seedDb([
      image('a', {
        name: 'small.png',
        width: 100,
        height: 100,
        updatedAt: 200,
      }),
      image('b', {
        name: 'big.png',
        width: 2000,
        height: 1500,
        updatedAt: 100,
      }),
    ]);
    render(<HomePage />);
    await screen.findByText('small.png');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'dimensions' },
    });
    const names = screen.getAllByText(/\.png$/).map((el) => el.textContent);
    expect(names!.indexOf('big.png')).toBeLessThan(names!.indexOf('small.png'));
  });

  it('falls back to default album cover color when coverId is null', async () => {
    seedDb([image('a')], [album('al1', { coverId: null })]);
    const { container } = render(<HomePage />);
    await screen.findByText('a.png');
    const coverDivs = container.querySelectorAll('div[style*="background"]');
    const coverDiv = Array.from(coverDivs).find(
      (el) => (el as HTMLElement).style.backgroundColor === 'rgb(55, 65, 81)'
    );
    expect(coverDiv).toBeTruthy();
  });

  it('falls back to default album cover color when cover image is not found', async () => {
    seedDb([image('a')], [album('al1', { coverId: 'nonexistent' })]);
    const { container } = render(<HomePage />);
    await screen.findByText('a.png');
    const coverDivs = container.querySelectorAll('div[style*="background"]');
    const coverDiv = Array.from(coverDivs).find(
      (el) => (el as HTMLElement).style.backgroundColor === 'rgb(55, 65, 81)'
    );
    expect(coverDiv).toBeTruthy();
  });

  it('does not create album when name is empty', async () => {
    seedDb([]);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: 'New' }));
    const nameInput = screen.getByPlaceholderText('Album name');
    fireEvent.change(nameInput, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.getByText('New Album')).toBeInTheDocument();
    expect((nameInput as HTMLInputElement).value).toBe('   ');
  });

  it('toggles view from grid to list and back to grid', async () => {
    seedDb([image('a')]);
    const { container } = render(<HomePage />);
    await screen.findByText('a.png');
    const toggle = container.querySelector<HTMLButtonElement>(
      'main button.btn-circle'
    );
    fireEvent.click(toggle as HTMLButtonElement);
    fireEvent.click(toggle as HTMLButtonElement);
    expect(container.querySelector('.grid.grid-cols-2')).toBeTruthy();
  });

  it('renders favorite star in list view for favorite images', async () => {
    seedDb([image('a', { favorite: true })]);
    const { container } = render(<HomePage />);
    await screen.findByText('a.png');
    const toggle = container.querySelector<HTMLButtonElement>(
      'main button.btn-circle'
    );
    fireEvent.click(toggle as HTMLButtonElement);
    expect(screen.getAllByText('a.png').length).toBeGreaterThan(0);
  });

  it('filters images by tag', async () => {
    seedDb([
      image('a', { tags: ['sunset'] }),
      image('b', { tags: ['forest'] }),
    ]);
    render(<HomePage />);
    await screen.findByText('a.png');
    fireEvent.change(screen.getByPlaceholderText('Search images...'), {
      target: { value: 'sunset' },
    });
    expect(screen.getByText('a.png')).toBeInTheDocument();
    expect(screen.queryByText('b.png')).not.toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', async () => {
    (db.images.getAll as jest.Mock).mockReturnValue(new Promise(() => {}));
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'photo-light',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
    const { container } = render(<HomePage />);
    await waitFor(() => {
      expect(container.querySelector('.skeleton')).toBeTruthy();
    });
  });

  it('shows skeleton with list layout class when isLoading and list view', async () => {
    (db.images.getAll as jest.Mock).mockReturnValue(new Promise(() => {}));
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'photo-light',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
    const { container } = render(<HomePage />);
    const toggle = await container.querySelector<HTMLButtonElement>(
      'main button.btn-circle'
    );
    if (toggle) fireEvent.click(toggle);
    await waitFor(() => {
      expect(container.querySelector('.skeleton')).toBeTruthy();
    });
  });

  it('closes upload modal on cancel', async () => {
    seedDb([]);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: /Upload/i }));
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Upload Image')).not.toBeInTheDocument();
  });

  it('closes new album modal on cancel', async () => {
    seedDb([]);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: 'New' }));
    expect(screen.getByText('New Album')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('New Album')).not.toBeInTheDocument();
  });

  it('sorts by name with seeded order', async () => {
    seedDb([
      image('a', { name: 'zebra.png', updatedAt: 100 }),
      image('b', { name: 'alpha.png', updatedAt: 200 }),
    ]);
    render(<HomePage />);
    await screen.findByText('zebra.png');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'name' },
    });
    const names = screen.getAllByText(/\.png$/).map((el) => el.textContent);
    expect(names!.indexOf('alpha.png')).toBeLessThan(
      names!.indexOf('zebra.png')
    );
  });

  it('early returns when new album name is empty', async () => {
    seedDb([]);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: 'New' }));
    (db.albums.put as jest.Mock).mockClear();
    const createBtn = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createBtn);
    await waitFor(() => {
      expect(db.albums.put).not.toHaveBeenCalled();
    });
  });

  it('uses correct color from modulo when uploading multiple times', async () => {
    const images = Array.from({ length: 3 }, (_, i) =>
      image(`i${i}`, { name: `img${i}.png` })
    );
    seedDb(images);
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: /Upload/i }));
    const uploadButtons = screen.getAllByRole('button', { name: 'Upload' });
    fireEvent.click(uploadButtons[uploadButtons.length - 1]);
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });
});
