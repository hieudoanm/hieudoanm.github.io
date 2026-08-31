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
import LayersPage from '@/app/edit/layers/page';
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

describe('LayersPage', () => {
  it('shows the empty state and adds a layer', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([]);
    render(<LayersPage />);
    expect(
      await screen.findByText('No layers. Click Add to create one.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
    expect(screen.getByText('Layer added')).toBeInTheDocument();
  });

  it('edits and deletes a layer', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      {
        id: 'l1',
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
      },
    ]);
    render(<LayersPage />);
    expect(await screen.findByDisplayValue('Layer 1')).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue('Layer 1'), {
      target: { value: 'Renamed' },
    });
    await waitFor(() =>
      expect(db.layers.put).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Renamed' })
      )
    );
    fireEvent.change(screen.getAllByRole('slider')[0], {
      target: { value: '40' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'multiply' },
    });
    const circles = document.querySelectorAll('button.btn-circle');
    fireEvent.click(circles[1] as HTMLButtonElement);
    fireEvent.click(circles[2] as HTMLButtonElement);
    fireEvent.click(circles[3] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.delete).toHaveBeenCalled());
  });

  it('shows layers with visibility toggled off', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      {
        id: 'l1',
        name: 'Layer 1',
        type: 'image',
        visible: false,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
      },
    ]);
    render(<LayersPage />);
    expect(await screen.findByDisplayValue('Layer 1')).toBeInTheDocument();
    const circles = document.querySelectorAll('button.btn-circle');
    expect(circles.length).toBeGreaterThanOrEqual(3);
    fireEvent.click(circles[1] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('shows layers with locked state', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      {
        id: 'l1',
        name: 'Layer 1',
        type: 'image',
        visible: true,
        locked: true,
        opacity: 100,
        blendMode: 'normal',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
      },
    ]);
    render(<LayersPage />);
    expect(await screen.findByDisplayValue('Layer 1')).toBeInTheDocument();
    const circles = document.querySelectorAll('button.btn-circle');
    fireEvent.click(circles[1] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('changes blend mode', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      {
        id: 'l1',
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
      },
    ]);
    render(<LayersPage />);
    await screen.findByDisplayValue('Layer 1');
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'overlay' },
    });
    await waitFor(() =>
      expect(db.layers.put).toHaveBeenCalledWith(
        expect.objectContaining({ blendMode: 'overlay' })
      )
    );
  });

  it('changes opacity', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      {
        id: 'l1',
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
      },
    ]);
    render(<LayersPage />);
    await screen.findByDisplayValue('Layer 1');
    fireEvent.change(screen.getByRole('slider'), {
      target: { value: '30' },
    });
    await waitFor(() =>
      expect(db.layers.put).toHaveBeenCalledWith(
        expect.objectContaining({ opacity: 30 })
      )
    );
  });

  it('deletes layer and shows toast', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      {
        id: 'l1',
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
      },
    ]);
    render(<LayersPage />);
    await screen.findByDisplayValue('Layer 1');
    const circles = document.querySelectorAll('button.btn-circle');
    fireEvent.click(circles[3] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.delete).toHaveBeenCalled());
    expect(screen.getByText('Layer deleted')).toBeInTheDocument();
  });
});
