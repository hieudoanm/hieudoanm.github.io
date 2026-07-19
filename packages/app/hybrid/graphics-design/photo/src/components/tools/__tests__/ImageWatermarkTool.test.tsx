import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImageWatermarkTool } from '@/components/tools/ImageWatermarkTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
}));

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

const uploadTwoFiles = (container: HTMLElement) => {
  const inputs = Array.from(
    container.querySelectorAll('input[type="file"]')
  ) as HTMLInputElement[];
  fireEvent.change(inputs[0], { target: { files: [makeFile('a.png')] } });
  fireEvent.change(inputs[1], { target: { files: [makeFile('b.png')] } });
};

describe('ImageWatermarkTool', () => {
  it('renders without throwing', () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with button disabled when no files', () => {
    render(<ImageWatermarkTool config={cfg('image-watermark')} />);
    expect(
      screen.getByRole('button', { name: 'Add Watermark' })
    ).toBeDisabled();
  });

  it('enables button after both files uploaded', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Add Watermark' })
    ).not.toBeDisabled();
  });

  it('processes watermark and downloads', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'watermark_a.png'
      )
    );
  });

  it('early returns when no files', async () => {
    render(<ImageWatermarkTool config={cfg('image-watermark')} />);
    expect(
      screen.getByRole('button', { name: 'Add Watermark' })
    ).toBeDisabled();
  });

  it('changes position to top-left', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'top-left' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'watermark_a.png'
      )
    );
  });

  it('changes position to top-right', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'top-right' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'watermark_a.png'
      )
    );
  });

  it('changes position to bottom-left', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'bottom-left' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'watermark_a.png'
      )
    );
  });

  it('changes position to center', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'center' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'watermark_a.png'
      )
    );
  });

  it('changes opacity via slider', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const range = screen.getByRole('slider');
    fireEvent.change(range, { target: { value: '0.8' } });
    expect(screen.getByText('Opacity: 80%')).toBeTruthy();
  });

  it('processes with different opacity values', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const range = screen.getByRole('slider');
    fireEvent.change(range, { target: { value: '0.3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'watermark_a.png'
      )
    );
  });

  it('shows loading spinner during processing', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Watermark/ }));
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('toBlob null does not call downloadBlob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Watermark/ }));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('button disabled during loading', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container);
    await flush();
    const btn = screen.getByRole('button', { name: /Watermark/ });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('position select shows all options', () => {
    render(<ImageWatermarkTool config={cfg('image-watermark')} />);
    const select = screen.getByRole('combobox');
    const options = Array.from(select.querySelectorAll('option'));
    expect(options.map((o) => o.value)).toEqual([
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      'center',
    ]);
  });
});
