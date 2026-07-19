import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { BarcodeReadTool } from '@/components/tools/BarcodeReadTool';
import Quagga from '@ericblade/quagga2';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
}));

jest.mock('@ericblade/quagga2', () => ({
  __esModule: true,
  default: { decodeSingle: jest.fn() },
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

const mockDecodeSingle = (Quagga as unknown as { decodeSingle: jest.Mock })
  .decodeSingle;

describe('BarcodeReadTool', () => {
  it('renders upload area initially', () => {
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('reads barcode successfully', async () => {
    mockDecodeSingle.mockImplementation((opts, cb) =>
      cb({ codeResult: { code: '1234567890' } })
    );
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await waitFor(() => expect(screen.getByText('1234567890')).toBeTruthy());
  });

  it('shows not found when decoding fails', async () => {
    mockDecodeSingle.mockImplementation((opts, cb) => cb({}));
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await waitFor(() =>
      expect(screen.getByText('No barcode found.')).toBeTruthy()
    );
  });

  it('shows error when decodeSingle throws', async () => {
    mockDecodeSingle.mockImplementation(() => {
      throw new Error('boom');
    });
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await waitFor(() => expect(screen.getByText(/Error:/)).toBeTruthy());
  });
});
