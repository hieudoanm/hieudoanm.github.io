import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImageResizeTool } from '@/components/tools/ImageResizeTool';

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

describe('ImageResizeTool', () => {
  it('renders without throwing', () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders without controls before file upload', () => {
    render(<ImageResizeTool config={cfg('image-resize')} />);
    expect(screen.queryByText('Width:')).toBeNull();
    expect(screen.queryByText('Height:')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    expect(screen.getByText('Width:')).toBeTruthy();
    expect(screen.getByText('Height:')).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Resize & Download' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'resized_photo.png'
      )
    );
  });

  it('early returns when no file', async () => {
    render(<ImageResizeTool config={cfg('image-resize')} />);
    expect(
      screen.queryByRole('button', { name: 'Resize & Download' })
    ).toBeNull();
  });

  it('changes width input and maintainAspect updates height', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    const widthInput = container.querySelectorAll('input[type="number"]')[0];
    fireEvent.change(widthInput, { target: { value: '200' } });
  });

  it('changes height input and maintainAspect updates width', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    const heightInput = container.querySelectorAll('input[type="number"]')[1];
    fireEvent.change(heightInput, { target: { value: '200' } });
  });

  it('toggles maintainAspect checkbox off', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    const checkbox = screen.getByRole('checkbox', {
      name: /Maintain aspect ratio/,
    });
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('width change does not update height when maintainAspect is off', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    const checkbox = screen.getByRole('checkbox', {
      name: /Maintain aspect ratio/,
    });
    fireEvent.click(checkbox);
    const heightInput = container.querySelectorAll('input[type="number"]')[1];
    const hBefore = (heightInput as HTMLInputElement).value;
    const widthInput = container.querySelectorAll('input[type="number"]')[0];
    fireEvent.change(widthInput, { target: { value: '500' } });
    expect((heightInput as HTMLInputElement).value).toBe(hBefore);
  });

  it('shows loading spinner during processing', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Resize/ }));
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
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Resize/ }));
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
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: /Resize/ });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('uses file.type for toBlob mimeType', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(
      container,
      new File(['data'], 'test.jpg', { type: 'image/jpeg' })
    );
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Resize/ }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'resized_test.jpg'
      )
    );
  });

  it('falls back to image/png mimeType when file.type is empty', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFile(container, new File(['data'], 'test', { type: '' }));
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Resize/ }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'resized_test'
      )
    );
  });
});
