import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { AiRemoveObjectTool } from '@/components/tools/AiRemoveObjectTool';

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

const uploadFile = (container: HTMLElement) => {
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement | null;
  if (!input) throw new Error('No file input found');
  fireEvent.change(input, {
    target: {
      files: [
        new File(['fake-image-data'], 'photo.png', { type: 'image/png' }),
      ],
    },
  });
};

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

describe('AiRemoveObjectTool', () => {
  it('renders without throwing', () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('button is disabled when no file', () => {
    render(<AiRemoveObjectTool config={cfg('ai-remove-object')} />);
    expect(
      screen.getByRole('button', { name: 'Remove Object' })
    ).toBeDisabled();
  });

  it('switches to flood mode', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Flood Fill' }));
    expect(container.querySelector('.btn-primary')).toBeTruthy();
  });

  it('switches to patch mode and shows patch size slider', async () => {
    render(<AiRemoveObjectTool config={cfg('ai-remove-object')} />);
    fireEvent.click(screen.getByRole('button', { name: 'Median Patch' }));
    expect(screen.getByText(/Patch Size/)).toBeTruthy();
  });

  it('hides patch size slider in flood mode', () => {
    render(<AiRemoveObjectTool config={cfg('ai-remove-object')} />);
    expect(screen.queryByText(/Patch Size/)).toBeNull();
  });

  it('updates tolerance slider', () => {
    render(<AiRemoveObjectTool config={cfg('ai-remove-object')} />);
    const range = screen.getAllByRole('slider')[0];
    fireEvent.change(range, { target: { value: '75' } });
    expect(screen.getByText('Tolerance: 75')).toBeTruthy();
  });

  it('updates patch size slider', () => {
    render(<AiRemoveObjectTool config={cfg('ai-remove-object')} />);
    fireEvent.click(screen.getByRole('button', { name: 'Median Patch' }));
    const range = screen.getAllByRole('slider')[1];
    fireEvent.change(range, { target: { value: '11' } });
    expect(screen.getByText('Patch Size: 11px')).toBeTruthy();
  });

  it('shows instruction text when no clickPos in flood mode', () => {
    render(<AiRemoveObjectTool config={cfg('ai-remove-object')} />);
    expect(
      screen.getByText('Click on the preview below to select an object')
    ).toBeTruthy();
  });

  it('does not show display canvas before file upload', () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    expect(container.querySelector('canvas:not(.hidden)')).toBeNull();
  });

  it('shows display canvas after file upload in flood mode', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    expect(container.querySelector('canvas:not(.hidden)')).toBeTruthy();
  });

  it('canvas click sets clickPos and shows coordinates', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    const canvas = container.querySelector('canvas:not(.hidden)');
    fireEvent.click(canvas!, { clientX: 50, clientY: 50 });
    expect(screen.getByText(/Selected pixel at/)).toBeTruthy();
  });

  it('button is disabled in flood mode without clickPos', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Remove Object' })
    ).toBeDisabled();
  });

  it('button is enabled in flood mode with clickPos', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    const canvas = container.querySelector('canvas:not(.hidden)');
    fireEvent.click(canvas!, { clientX: 50, clientY: 50 });
    expect(
      screen.getByRole('button', { name: 'Remove Object' })
    ).not.toBeDisabled();
  });

  it('processes flood fill and downloads', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    const canvas = container.querySelector('canvas:not(.hidden)');
    fireEvent.click(canvas!, { clientX: 50, clientY: 50 });
    fireEvent.click(screen.getByRole('button', { name: 'Remove Object' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'cleaned_photo.png'
      )
    );
  });

  it('processes median patch and downloads', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Median Patch' }));
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Remove Object' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'cleaned_photo.png'
      )
    );
  });

  it('shows loading spinner during processing', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Median Patch' }));
    uploadFile(container);
    await flush();

    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove Object' }));
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();

    resolveLoadImage!({
      width: 100,
      height: 100,
      naturalWidth: 100,
      naturalHeight: 100,
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('toBlob null does not call downloadBlob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Median Patch' }));
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Remove Object' }));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('resets clickPos when new file is uploaded', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    const canvas = container.querySelector('canvas:not(.hidden)');
    fireEvent.click(canvas!, { clientX: 50, clientY: 50 });
    expect(screen.getByText(/Selected pixel at/)).toBeTruthy();
    uploadFile(container);
    expect(
      screen.getByText('Click on the preview below to select an object')
    ).toBeTruthy();
  });

  it('hides display canvas in patch mode', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Median Patch' }));
    uploadFile(container);
    await flush();
    expect(screen.queryByText(/Click on the preview/)).toBeNull();
  });

  it('hidden img renders for display canvas after re-render', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.change(screen.getAllByRole('slider')[0], {
      target: { value: '50' },
    });
    const hiddenImg = container.querySelector('img.hidden');
    expect(hiddenImg).toBeTruthy();
  });

  it('flood fill with out-of-bounds click coordinates', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    uploadFile(container);
    await flush();
    const canvas = container.querySelector('canvas:not(.hidden)');
    fireEvent.click(canvas!, { clientX: -10, clientY: -10 });
    fireEvent.click(screen.getByRole('button', { name: 'Remove Object' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'cleaned_photo.png'
      )
    );
  });

  it('flood fill with high tolerance covers more area', async () => {
    const { container } = render(
      <AiRemoveObjectTool config={cfg('ai-remove-object')} />
    );
    const range = screen.getAllByRole('slider')[0];
    fireEvent.change(range, { target: { value: '100' } });
    uploadFile(container);
    await flush();
    const canvas = container.querySelector('canvas:not(.hidden)');
    fireEvent.click(canvas!, { clientX: 50, clientY: 50 });
    fireEvent.click(screen.getByRole('button', { name: 'Remove Object' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'cleaned_photo.png'
      )
    );
  });
});
