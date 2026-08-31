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

const searchParams = { value: 'img-1' };
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => searchParams.value }),
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CropPage from '@/app/edit/crop/page';
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
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
  ...overrides,
});

const seedDb = (): void => {
  (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
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

beforeEach(() => {
  jest.clearAllMocks();
  mockPush.mockClear();
  searchParams.value = 'img-1';
  seedDb();
});

describe('CropPage', () => {
  it('renders and selects an aspect ratio', async () => {
    render(<CropPage />);
    expect(await screen.findByText('Crop & Transform')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '1:1' }));
    expect(screen.getByRole('button', { name: '1:1' }).className).toContain(
      'btn-primary'
    );
  });

  it('rotates the image', async () => {
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    fireEvent.click(screen.getByRole('button', { name: '+90°' }));
    fireEvent.click(screen.getByRole('button', { name: '-90°' }));
    expect(screen.getByText('Rotation: 0°')).toBeInTheDocument();
  });

  it('flips the image', async () => {
    render(<CropPage />);
    fireEvent.click(await screen.findByRole('button', { name: /Horizontal/i }));
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('applies the crop and returns to the editor', async () => {
    render(<CropPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Apply' }));
    expect(mockPush).toHaveBeenCalledWith('/edit?id=img-1');
  });

  it('shows nothing meaningful when image is not found', async () => {
    searchParams.value = 'missing';
    (db.images.getAll as jest.Mock).mockResolvedValue([]);
    render(<CropPage />);
    expect(await screen.findByText('Crop & Transform')).toBeInTheDocument();
  });

  it('flips vertically', async () => {
    searchParams.value = 'img-1';
    (db.images.getAll as jest.Mock).mockResolvedValue([
      image('img-1', { width: 200, height: 100 }),
    ]);
    render(<CropPage />);
    fireEvent.click(await screen.findByRole('button', { name: /Vertical/i }));
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('rotates with wrapping past 360', async () => {
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByRole('button', { name: '+90°' }));
    }
    expect(screen.getByText('Rotation: 90°')).toBeInTheDocument();
  });

  it('selects each aspect ratio', async () => {
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    for (const ratio of ['Free', '1:1', '4:3', '3:2', '16:9', '9:16']) {
      fireEvent.click(screen.getByRole('button', { name: ratio }));
      expect(screen.getByRole('button', { name: ratio }).className).toContain(
        'btn-primary'
      );
    }
  });

  it('rotates via slider', async () => {
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '30' } });
    expect(screen.getByText('Rotation: 30°')).toBeInTheDocument();
  });

  it('navigates back via back button', async () => {
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    const backBtn = document.querySelector(
      'button.btn-neutral'
    ) as HTMLButtonElement;
    fireEvent.click(backBtn);
    expect(mockPush).toHaveBeenCalledWith('/edit?id=img-1');
  });
});
