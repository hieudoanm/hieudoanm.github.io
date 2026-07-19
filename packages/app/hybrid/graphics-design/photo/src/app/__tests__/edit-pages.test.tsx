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
import EditPage from '@/app/edit/page';
import CropPage from '@/app/edit/crop/page';
import LayersPage from '@/app/edit/layers/page';
import { db } from '@/lib/db';
import type { Filter, Layer, PhotoImage } from '@/types';

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

const filter = (): Filter => ({
  id: 'warm',
  name: 'Warm',
  category: 'warm',
  adjustments: { brightness: 10, clarity: 40 },
});

const layer = (id: string, overrides: Partial<Layer> = {}): Layer => ({
  id,
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
  ...overrides,
});

const seedDb = (): void => {
  (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
  (db.albums.getAll as jest.Mock).mockResolvedValue([]);
  (db.filters.getAll as jest.Mock).mockResolvedValue([filter()]);
  (db.history.getAll as jest.Mock).mockResolvedValue([]);
  (db.layers.getAll as jest.Mock).mockResolvedValue([layer('l1')]);
  (db.settings.get as jest.Mock).mockResolvedValue({
    theme: 'nothing',
    defaultExportFormat: 'png',
    canvasBackground: 'checkerboard',
    defaultQuality: 85,
  });
};

beforeEach(() => {
  jest.clearAllMocks();
  searchParams.value = 'img-1';
  seedDb();
});

describe('EditPage', () => {
  it('renders the editor with the current image', async () => {
    render(<EditPage />);
    expect(await screen.findByText('img-1.png')).toBeInTheDocument();
    expect(screen.getByText('brightness')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('switches between tools', async () => {
    render(<EditPage />);
    await screen.findByText('img-1.png');
    for (const label of ['Move', 'Crop', 'Brush', 'Text', 'Shape']) {
      fireEvent.click(screen.getByTitle(label));
    }
    expect(screen.getByTitle('Shape').className).toContain('btn-primary');
  });

  it('toggles before/after comparison', async () => {
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Before' }));
    expect(screen.getByRole('button', { name: 'Before' }).className).toContain(
      'btn-warning'
    );
  });

  it('adjusts a slider value', async () => {
    render(<EditPage />);
    await screen.findByText('img-1.png');
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '30' } });
    expect(screen.getByText('brightness').parentElement?.textContent).toContain(
      '30'
    );
  });

  it('resets adjustments', async () => {
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Reset' }));
    expect(await screen.findByText('Adjustments reset')).toBeInTheDocument();
  });

  it('toggles favorite', async () => {
    const { container } = render(<EditPage />);
    await screen.findByText('img-1.png');
    const favoriteButtons = container.querySelectorAll('button.btn-circle');
    fireEvent.click(favoriteButtons[1] as HTMLButtonElement);
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('applies a filter and changes intensity', async () => {
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'filter' }));
    fireEvent.click(screen.getByText('Warm'));
    fireEvent.change(screen.getAllByRole('slider')[0], {
      target: { value: '50' },
    });
    expect(screen.getByText('Intensity: 50%')).toBeInTheDocument();
  });

  it('manages layers from the layer panel', async () => {
    (db.layers.getAll as jest.Mock).mockResolvedValue([]);
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    fireEvent.click(screen.getByRole('button', { name: /Add Layer/i }));
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
    expect(screen.getByText('Layer 1')).toBeInTheDocument();
    const circles = document.querySelectorAll('button.btn-circle');
    fireEvent.click(circles[2] as HTMLButtonElement);
    fireEvent.click(circles[3] as HTMLButtonElement);
    fireEvent.click(circles[4] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.delete).toHaveBeenCalled());
  });

  it('redirects to the library when the image is missing', async () => {
    searchParams.value = 'missing';
    render(<EditPage />);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
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
});

export {};
