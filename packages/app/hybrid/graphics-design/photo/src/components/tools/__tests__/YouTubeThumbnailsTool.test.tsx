import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { YouTubeThumbnailsTool } from '@/components/tools/YouTubeThumbnailsTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
}));

beforeEach(() => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ blob: async () => new Blob(['x']) });
});

const mockLoadImage = loadImage as jest.Mock;
const mockDownloadBlob = downloadBlob as jest.Mock;

const canvasCtxStub = {
  filter: '',
  fillStyle: '',
  strokeStyle: '',
  font: '',
  textAlign: '',
  globalCompositeOperation: '',
  createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createPattern: jest.fn(() => ({})),
  measureText: jest.fn(() => ({ width: 10 })),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(16),
    width: 2,
    height: 2,
  })),
  createImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(16),
    width: 2,
    height: 2,
  })),
  putImageData: jest.fn(),
  drawImage: jest.fn(),
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  strokeRect: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  rect: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  scale: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  setTransform: jest.fn(),
  reset: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  fillText: jest.fn(),
  strokeText: jest.fn(),
  clip: jest.fn(),
  ellipse: jest.fn(),
  quadraticCurveTo: jest.fn(),
  bezierCurveTo: jest.fn(),
  shadowColor: '',
  shadowBlur: 0,
  lineWidth: 1,
  globalAlpha: 1,
  imageSmoothingEnabled: true,
  textBaseline: '',
  lineJoin: '',
  lineCap: '',
  setLineDash: jest.fn(),
  getLineDash: jest.fn(() => []),
};

const makeBlob = () => new Blob(['fake'], { type: 'image/png' });

const images: HTMLImageElement[] = [];

class FakeImage {
  width = 100;
  height = 100;
  naturalWidth = 100;
  naturalHeight = 100;
  src = '';
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor() {
    images.push(this as unknown as HTMLImageElement);
  }
}

class FakeImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  constructor(
    data: Uint8ClampedArray | number,
    width?: number,
    height?: number
  ) {
    if (typeof data === 'number') {
      this.width = data;
      this.height = width ?? 1;
      this.data = new Uint8ClampedArray(this.width * this.height * 4);
    } else {
      this.width = width ?? 1;
      this.height = height ?? 1;
      this.data = data;
    }
  }
}

beforeAll(() => {
  Object.defineProperty(global, 'Image', { writable: true, value: FakeImage });
  Object.defineProperty(global, 'ImageData', {
    writable: true,
    value: FakeImageData,
  });
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn(() => 'blob:fake'),
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    writable: true,
    value: jest.fn(() => canvasCtxStub),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    writable: true,
    value: jest.fn((cb: (b: Blob | null) => void) => cb(makeBlob())),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    writable: true,
    value: jest.fn(() => 'data:image/png;base64,QUJD'),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
    writable: true,
    value: jest.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
    })),
  });
  Object.defineProperty(HTMLAnchorElement.prototype, 'click', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  images.length = 0;
  mockLoadImage.mockResolvedValue({
    width: 100,
    height: 100,
    naturalWidth: 100,
    naturalHeight: 100,
    src: 'blob:fake',
  });
});

const flush = async () => {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
    for (const img of images) img.onload?.(new Event('load'));
  });
};

const cfg = (id: string) => ({
  id,
  title: id,
  emoji: 'x',
  description: id,
  category: 'edit' as const,
});

const makeFile = (name = 'photo.png') =>
  new File(['fake-image-data'], name, { type: 'image/png' });

const uploadFile = (container: HTMLElement, file = makeFile()) => {
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement | null;
  if (!input) throw new Error('No file input found');
  fireEvent.change(input, { target: { files: [file] } });
};

describe('YouTubeThumbnailsTool', () => {
  it('renders URL input with load disabled', () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    expect(
      screen.getByPlaceholderText(/Paste YouTube URL or video ID/)
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Load' })).toBeDisabled();
  });

  it('extracts from watch URL', async () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Paste YouTube URL or video ID/),
      {
        target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText(/Video ID/)).toBeTruthy());
    expect(screen.getByText('dQw4w9WgXcQ')).toBeTruthy();
  });

  it('extracts from raw ID, embed and shorts via Enter', async () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    const input = screen.getByPlaceholderText(/Paste YouTube URL or video ID/);
    fireEvent.change(input, { target: { value: 'abcdefghijk' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(screen.getByText(/Video ID/)).toBeTruthy());

    fireEvent.change(input, {
      target: { value: 'https://youtube.com/embed/aaaaaaaaaaa' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText('aaaaaaaaaaa')).toBeTruthy());

    fireEvent.change(input, {
      target: { value: 'https://youtube.com/shorts/bbbbbbbbbbb' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText('bbbbbbbbbbb')).toBeTruthy());

    fireEvent.change(input, {
      target: { value: 'https://youtu.be/ccccccccccc' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText('ccccccccccc')).toBeTruthy());
  });

  it('shows error for invalid ID', async () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Paste YouTube URL or video ID/),
      {
        target: { value: 'not a valid youtube thing!' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() =>
      expect(
        screen.getByText('Could not find a valid YouTube video ID.')
      ).toBeTruthy()
    );
  });

  it('clicking an example loads it', async () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    const ex = screen
      .getAllByRole('button')
      .find((b) => b.textContent?.includes('watch?v='))!;
    fireEvent.click(ex);
    await waitFor(() => expect(screen.getByText(/Video ID/)).toBeTruthy());
  });

  it('toggles selection, selects All and None, downloads selected', async () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Paste YouTube URL or video ID/),
      {
        target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText(/Video ID/)).toBeTruthy());

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    fireEvent.click(screen.getByRole('button', { name: /Download selected/ }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    fireEvent.click(screen.getByRole('button', { name: 'None' }));
    fireEvent.click(screen.getByRole('button', { name: /Download selected/ }));
  });

  it('downloads a single thumbnail via its button', async () => {
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Paste YouTube URL or video ID/),
      {
        target: { value: 'dQw4w9WgXcQ' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText('dQw4w9WgXcQ')).toBeTruthy());
    const dlBtns = screen
      .getAllByRole('button')
      .filter((b) => b.textContent === '⬇');
    fireEvent.click(dlBtns[0]);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('handles download failure gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('n'));
    render(<YouTubeThumbnailsTool config={cfg('youtube-thumbnails')} />);
    fireEvent.change(
      screen.getByPlaceholderText(/Paste YouTube URL or video ID/),
      {
        target: { value: 'dQw4w9WgXcQ' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Load' }));
    await waitFor(() => expect(screen.getByText('dQw4w9WgXcQ')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: /Download selected/ }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
