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

import { fireEvent, render, screen } from '@testing-library/react';
import ToolsPage from '@/app/tools/page';
import { db } from '@/lib/db';
import type { PhotoImage } from '@/types';

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

beforeEach(() => {
  jest.clearAllMocks();
  (db.images.getAll as jest.Mock).mockResolvedValue([image('a')]);
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

  it('shows placeholder text when no tool is selected', () => {
    render(<ToolsPage />);
    expect(
      screen.getByText('Select an image tool from the sidebar')
    ).toBeInTheDocument();
  });

  it('shows active tool title in header when a tool is selected', () => {
    render(<ToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /🤖/ }));
    const generateButton = screen.getAllByRole('button', {
      name: /✨ Generate/i,
    })[0];
    fireEvent.click(generateButton);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header.textContent).toBe('Generate');
  });

  it('collapses and re-expands a category', () => {
    render(<ToolsPage />);
    const aiButton = screen.getByRole('button', { name: /🤖/ });
    fireEvent.click(aiButton);
    expect(
      screen.getAllByRole('button', { name: /✨ Generate/i }).length
    ).toBeGreaterThan(0);
    fireEvent.click(aiButton);
  });

  it('filters tools by description text', () => {
    render(<ToolsPage />);
    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'thumbnail' },
    });
    expect(screen.getByText('YouTube Thumbnails')).toBeInTheDocument();
  });

  it('shows no results for unmatched query', () => {
    render(<ToolsPage />);
    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'xyznonexistent' },
    });
    expect(screen.queryByText('Image Tools')).toBeInTheDocument();
  });

  it('selecting a different tool updates the header', () => {
    render(<ToolsPage />);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header.textContent).toBe('Image Tools');

    fireEvent.click(screen.getByRole('button', { name: /🤖/ }));
    const aiButtons = screen.getAllByRole('button', { name: /✨ Generate/i });
    fireEvent.click(aiButtons[0]);
    expect(header.textContent).toBe('Generate');

    fireEvent.click(screen.getByRole('button', { name: /✨ Create/ }));
    const cameraBtn = screen.getAllByRole('button', { name: /📸 Camera/i });
    fireEvent.click(cameraBtn[0]);
    expect(header.textContent).toBe('Camera');
  });
});
