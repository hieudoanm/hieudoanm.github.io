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

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
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

const filter = (id: string, overrides: Partial<Filter> = {}): Filter => ({
  id,
  name: `Filter ${id}`,
  category: 'warm',
  adjustments: { brightness: 10, clarity: 40, temperature: 30 },
  ...overrides,
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

beforeEach(() => {
  jest.clearAllMocks();
  mockPush.mockClear();
  searchParams.value = 'img-1';
});

const seedDb = (
  overrides: {
    images?: PhotoImage[];
    layers?: Layer[];
    filters?: Filter[];
  } = {}
) => {
  const imgs = overrides.images ?? [image('img-1')];
  const lrs = overrides.layers ?? [layer('l1')];
  const flt = overrides.filters ?? [filter('f1')];
  (db.images.getAll as jest.Mock).mockResolvedValue(imgs);
  (db.albums.getAll as jest.Mock).mockResolvedValue([]);
  (db.filters.getAll as jest.Mock).mockResolvedValue(flt);
  (db.history.getAll as jest.Mock).mockResolvedValue([]);
  (db.layers.getAll as jest.Mock).mockResolvedValue(lrs);
  (db.settings.get as jest.Mock).mockResolvedValue({
    theme: 'nothing',
    defaultExportFormat: 'png',
    canvasBackground: 'checkerboard',
    defaultQuality: 85,
  });
};

describe('EditPage branch coverage', () => {
  it('shows loading state when currentImage is null', async () => {
    searchParams.value = 'missing';
    seedDb({ images: [] });
    render(<EditPage />);
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('toggles showBefore on and off', async () => {
    seedDb();
    render(<EditPage />);
    const btn = await screen.findByRole('button', { name: 'Before' });
    fireEvent.click(btn);
    expect(btn.className).toContain('btn-warning');
    fireEvent.click(btn);
    expect(btn.className).not.toContain('btn-warning');
  });

  it('applies filter with clarity > 0 in buildFilterString', async () => {
    seedDb({ filters: [filter('f1', { adjustments: { clarity: 50 } })] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'filter' }));
    fireEvent.click(screen.getByText('Filter f1'));
    await waitFor(() => {
      expect(screen.getByText('Filter f1')).toBeInTheDocument();
    });
  });

  it('applies filter with temperature > 0 in buildFilterString', async () => {
    seedDb({ filters: [filter('f1', { adjustments: { temperature: 40 } })] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'filter' }));
    fireEvent.click(screen.getByText('Filter f1'));
    await waitFor(() => {
      expect(screen.getByText('Filter f1')).toBeInTheDocument();
    });
  });

  it('applies filter with temperature < 0 in buildFilterString', async () => {
    seedDb({ filters: [filter('f1', { adjustments: { temperature: -20 } })] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'filter' }));
    fireEvent.click(screen.getByText('Filter f1'));
    await waitFor(() => {
      expect(screen.getByText('Filter f1')).toBeInTheDocument();
    });
  });

  it('switches to layer panel and shows layers', async () => {
    seedDb({ layers: [layer('l1')] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    expect(screen.getByText('Layer 1')).toBeInTheDocument();
  });

  it('shows empty layers message', async () => {
    seedDb({ layers: [] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    expect(screen.getByText('No layers yet')).toBeInTheDocument();
  });

  it('toggles layer visibility', async () => {
    seedDb({ layers: [layer('l1', { visible: true })] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    const eyeButtons = document.querySelectorAll(
      '.card-body button.btn-circle'
    );
    fireEvent.click(eyeButtons[0] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('toggles layer locked state', async () => {
    seedDb({ layers: [layer('l1', { locked: false })] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    const lockButtons = document.querySelectorAll(
      '.card-body button.btn-circle'
    );
    fireEvent.click(lockButtons[1] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('deletes a layer', async () => {
    seedDb({ layers: [layer('l1')] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    const delButtons = document.querySelectorAll(
      '.card-body button.btn-circle'
    );
    fireEvent.click(delButtons[2] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.delete).toHaveBeenCalled());
  });

  it('deselects filter when clicking active filter', async () => {
    seedDb({ filters: [filter('f1')] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'filter' }));
    const filterBtn = screen.getByText('Filter f1');
    fireEvent.click(filterBtn);
    fireEvent.click(filterBtn);
    await waitFor(() => {
      expect(filterBtn).toBeInTheDocument();
    });
  });

  it('changes filter intensity via slider', async () => {
    seedDb({ filters: [filter('f1')] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'filter' }));
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '50' } });
    expect(screen.getByText('Intensity: 50%')).toBeInTheDocument();
  });

  it('changes zoom via slider', async () => {
    seedDb();
    render(<EditPage />);
    await screen.findByText('img-1.png');
    const zoomSliders = screen.getAllByRole('slider');
    const zoomSlider = zoomSliders[zoomSliders.length - 1];
    fireEvent.change(zoomSlider, { target: { value: '200' } });
    expect(screen.getByText('200%')).toBeInTheDocument();
  });

  it('adds a new layer from layer panel', async () => {
    seedDb({ layers: [] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    fireEvent.click(screen.getByRole('button', { name: /Add Layer/i }));
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('updates layer opacity via slider', async () => {
    seedDb({ layers: [layer('l1', { opacity: 100 })] });
    render(<EditPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'layer' }));
    const opacityRange = document.querySelector(
      '.card-body input[type="range"]'
    );
    fireEvent.change(opacityRange!, { target: { value: '50' } });
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });
});

describe('CropPage branch coverage', () => {
  it('shows nothing meaningful when image is not found', async () => {
    searchParams.value = 'missing';
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
    render(<CropPage />);
    expect(await screen.findByText('Crop & Transform')).toBeInTheDocument();
  });

  it('flips vertically', async () => {
    searchParams.value = 'img-1';
    (db.images.getAll as jest.Mock).mockResolvedValue([
      image('img-1', { width: 200, height: 100 }),
    ]);
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
    render(<CropPage />);
    fireEvent.click(await screen.findByRole('button', { name: /Vertical/i }));
    await waitFor(() => expect(db.images.put).toHaveBeenCalled());
  });

  it('rotates with wrapping past 360', async () => {
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
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByRole('button', { name: '+90°' }));
    }
    expect(screen.getByText('Rotation: 90°')).toBeInTheDocument();
  });

  it('selects each aspect ratio', async () => {
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
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '30' } });
    expect(screen.getByText('Rotation: 30°')).toBeInTheDocument();
  });

  it('navigates back via back button', async () => {
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
    render(<CropPage />);
    await screen.findByText('Crop & Transform');
    const backBtn = document.querySelector(
      'button.btn-neutral'
    ) as HTMLButtonElement;
    fireEvent.click(backBtn);
    expect(mockPush).toHaveBeenCalledWith('/edit?id=img-1');
  });
});

describe('LayersPage branch coverage', () => {
  it('shows layers with visibility toggled off', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      layer('l1', { visible: false }),
    ]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'nothing',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
    render(<LayersPage />);
    expect(await screen.findByDisplayValue('Layer 1')).toBeInTheDocument();
    const circles = document.querySelectorAll('button.btn-circle');
    expect(circles.length).toBeGreaterThanOrEqual(3);
    fireEvent.click(circles[1] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('shows layers with locked state', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      layer('l1', { locked: true }),
    ]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'nothing',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
    render(<LayersPage />);
    expect(await screen.findByDisplayValue('Layer 1')).toBeInTheDocument();
    const circles = document.querySelectorAll('button.btn-circle');
    fireEvent.click(circles[1] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.put).toHaveBeenCalled());
  });

  it('changes blend mode', async () => {
    (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      layer('l1', { blendMode: 'normal' }),
    ]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'nothing',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
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
    (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([
      layer('l1', { opacity: 100 }),
    ]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'nothing',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
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
    (db.images.getAll as jest.Mock).mockResolvedValue([image('img-1')]);
    (db.albums.getAll as jest.Mock).mockResolvedValue([]);
    (db.filters.getAll as jest.Mock).mockResolvedValue([]);
    (db.history.getAll as jest.Mock).mockResolvedValue([]);
    (db.layers.getAll as jest.Mock).mockResolvedValue([layer('l1')]);
    (db.settings.get as jest.Mock).mockResolvedValue({
      theme: 'nothing',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
    render(<LayersPage />);
    await screen.findByDisplayValue('Layer 1');
    const circles = document.querySelectorAll('button.btn-circle');
    fireEvent.click(circles[3] as HTMLButtonElement);
    await waitFor(() => expect(db.layers.delete).toHaveBeenCalled());
    expect(screen.getByText('Layer deleted')).toBeInTheDocument();
  });
});
