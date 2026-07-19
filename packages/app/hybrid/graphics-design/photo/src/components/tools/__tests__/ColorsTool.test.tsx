import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ColorsTool } from '@/components/tools/ColorsTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
}));

const mockLoadImage = loadImage as jest.Mock;
const mockDownloadBlob = downloadBlob as jest.Mock;

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

beforeAll(() => {
  Object.defineProperty(global, 'Image', { writable: true, value: FakeImage });
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
    value: jest.fn(() => ({
      drawImage: jest.fn(),
      fillRect: jest.fn(),
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
      fillText: jest.fn(),
      strokeText: jest.fn(),
      measureText: jest.fn(() => ({ width: 10 })),
      createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
      createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
      filter: '',
      font: '',
      fillStyle: '',
      strokeStyle: '',
      textAlign: '',
      globalCompositeOperation: '',
    })),
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

describe('ColorsTool', () => {
  it('renders without throwing', () => {
    const { container } = render(<ColorsTool config={cfg('colors')} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders initial HEX value', () => {
    render(<ColorsTool config={cfg('colors')} />);
    expect(screen.getAllByDisplayValue('#171717').length).toBeGreaterThan(0);
  });

  it('shows RGB, HSL, and OKLCH values', () => {
    render(<ColorsTool config={cfg('colors')} />);
    expect(screen.getByText('rgb(23, 23, 23)')).toBeTruthy();
    expect(screen.getByText(/hsl\(/)).toBeTruthy();
    expect(screen.getByText(/oklch\(/)).toBeTruthy();
  });

  it('updates values when hex text changes', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const textInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(textInput, { target: { value: '#ff0000' } });
    expect(screen.getByText('rgb(255, 0, 0)')).toBeTruthy();
  });

  it('updates value when a palette swatch is clicked', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const swatch = screen.getByTitle('red-500: #ef4444');
    fireEvent.click(swatch);
    expect(screen.getAllByDisplayValue('#ef4444').length).toBeGreaterThan(0);
  });

  it('handles invalid hex gracefully', () => {
    render(<ColorsTool config={cfg('colors')} />);
    const textInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(textInput, { target: { value: '#zz' } });
  });
});
