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

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import ToolsPage from '@/app/tools/page';
import AlbumsPage from '@/app/albums/page';
import SettingsPage from '@/app/settings/page';
import NotFoundPage from '@/app/not-found';
import ErrorPage from '@/app/error';
import AboutPage from '@/app/about/page';
import VersionPage from '@/app/version/page';
import ProfilePage from '@/app/profile/page';
import RootLayout from '@/app/layout';
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
  (db.images.getAll as jest.Mock).mockResolvedValue([
    image('a', { name: 'sunset.png', updatedAt: 300, favorite: true }),
    image('b', { name: 'mountains.png', updatedAt: 100, size: 5000 }),
  ]);
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

describe('HomePage', () => {
  it('renders the library with seeded images and albums', async () => {
    render(<HomePage />);
    expect(await screen.findByText('sunset.png')).toBeInTheDocument();
    expect(screen.getByText('mountains.png')).toBeInTheDocument();
    expect(screen.getByText('Album al1')).toBeInTheDocument();
  });

  it('filters images by search', async () => {
    render(<HomePage />);
    await screen.findByText('sunset.png');
    fireEvent.change(screen.getByPlaceholderText('Search images...'), {
      target: { value: 'mountain' },
    });
    expect(screen.queryByText('sunset.png')).not.toBeInTheDocument();
    expect(screen.getByText('mountains.png')).toBeInTheDocument();
  });

  it('sorts by name', async () => {
    render(<HomePage />);
    await screen.findByText('sunset.png');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'name' },
    });
    expect(screen.getByText('mountains.png')).toBeInTheDocument();
  });

  it('switches between grid and list views', async () => {
    const { container } = render(<HomePage />);
    await screen.findByText('sunset.png');
    const toggle = container.querySelector<HTMLButtonElement>(
      'main button.btn-circle'
    );
    expect(toggle).not.toBeNull();
    fireEvent.click(toggle as HTMLButtonElement);
    expect(screen.getAllByText(/\d+ (B|KB|MB)/).length).toBeGreaterThan(0);
  });

  it('toggles favorite', async () => {
    render(<HomePage />);
    await screen.findByText('sunset.png');
    fireEvent.click(screen.getAllByRole('button')[3]);
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('uploads an image from the modal', async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: /Upload/i }));
    const uploadButtons = screen.getAllByRole('button', { name: 'Upload' });
    fireEvent.click(uploadButtons[uploadButtons.length - 1]);
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('creates a new album', async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Album name'), {
      target: { value: 'Trip' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() => expect(db.albums.put).toHaveBeenCalled());
  });

  it('shows an empty message when no images match', async () => {
    render(<HomePage />);
    await screen.findByText('sunset.png');
    fireEvent.change(screen.getByPlaceholderText('Search images...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No images found')).toBeInTheDocument();
  });
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
});

describe('SettingsPage', () => {
  it('saves updated settings', async () => {
    render(<SettingsPage />);
    expect(await screen.findByText('Settings')).toBeInTheDocument();
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: 'webp' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Save Settings/i }));
    await waitFor(() =>
      expect(db.settings.put).toHaveBeenCalledWith(
        expect.objectContaining({ defaultExportFormat: 'webp' })
      )
    );
  });
});

describe('ToolsPage', () => {
  it('renders the tool sidebar and search', () => {
    render(<ToolsPage />);
    expect(screen.getByText('Image Tools')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument();
  });

  it('expands a category and selects a tool', () => {
    render(<ToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /🤖/ }));
    expect(
      screen.getAllByRole('button', { name: /✨ Generate/i }).length
    ).toBeGreaterThan(0);
  });

  it('filters tools by search', () => {
    render(<ToolsPage />);
    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'gradient' },
    });
    expect(screen.getByText('Gradient Generator')).toBeInTheDocument();
  });
});

describe('Static pages', () => {
  it('renders the not-found page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the error page with a retry action', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(reset).toHaveBeenCalled();
  });

  it('renders the about page', () => {
    render(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders the version page with a generated timestamp', async () => {
    render(<VersionPage />);
    expect(
      await screen.findByText(/^\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/)
    ).toBeInTheDocument();
  });

  it('renders the profile page and saves', async () => {
    render(<ProfilePage />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(await screen.findByText('Profile saved')).toBeInTheDocument();
  });

  it('renders the root layout around children', () => {
    render(
      <RootLayout>
        <p>child content</p>
      </RootLayout>
    );
    expect(document.querySelector('html')).not.toBeNull();
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});
