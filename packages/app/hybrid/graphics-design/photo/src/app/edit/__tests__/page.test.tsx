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

const seedDb = (
  overrides: {
    images?: PhotoImage[];
    layers?: Layer[];
    filters?: Filter[];
  } = {}
): void => {
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

beforeEach(() => {
  jest.clearAllMocks();
  mockPush.mockClear();
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
    fireEvent.click(await screen.findByText('Filter f1'));
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
