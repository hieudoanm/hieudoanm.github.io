import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImageMorphingTool } from '@/components/tools/ImageMorphingTool';

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

const uploadFileTo = async (container: HTMLElement, label: string) => {
  const divs = container.querySelectorAll('.flex-1');
  const targetDiv = Array.from(divs).find((d) =>
    d.querySelector('p')?.textContent?.includes(label)
  );
  const input = targetDiv?.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  if (!input) throw new Error(`No file input for ${label}`);
  fireEvent.change(input, {
    target: {
      files: [new File(['fake'], `${label}.png`, { type: 'image/png' })],
    },
  });
};

describe('ImageMorphingTool', () => {
  it('renders without throwing', () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('does not show morph controls without files', () => {
    render(<ImageMorphingTool config={cfg('image-morphing')} />);
    expect(screen.queryByText(/Morph Progress/)).toBeNull();
  });

  it('does not show controls with only source file', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    expect(screen.queryByText(/Morph Progress/)).toBeNull();
  });

  it('does not show controls with only target file', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Target');
    expect(screen.queryByText(/Morph Progress/)).toBeNull();
  });

  it('shows morph controls after both files uploaded', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    expect(screen.getByText(/Morph Progress/)).toBeTruthy();
  });

  it('renders canvas after both files uploaded', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('does not render canvas before both files uploaded', () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    expect(container.querySelector('canvas')).toBeNull();
  });

  it('updates morph progress via slider', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.75' } });
    expect(screen.getByText(/75%/)).toBeTruthy();
  });

  it('exports frame and downloads', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Export Frame' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'morph_0.50.png'
      )
    );
  });

  it('shows loading spinner during export', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();

    let resolveBlob: (v: Blob | null) => void;
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => {
        resolveBlob = cb;
      }
    );

    fireEvent.click(screen.getByRole('button', { name: 'Export Frame' }));
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();

    await act(async () => {
      resolveBlob!(makeBlob());
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('handles toBlob returning null during export', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Export Frame' }));
    await waitFor(() => expect(mockDownloadBlob).not.toHaveBeenCalled());
  });

  it('export button is disabled during loading', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();

    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      () => {}
    );

    const btn = screen.getByRole('button', { name: 'Export Frame' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
  });

  it('triggers redraw when slider changes', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.1' } });
    fireEvent.change(slider, { target: { value: '0.9' } });
    expect(screen.getByText(/90%/)).toBeTruthy();
  });

  it('exports with different morph values', async () => {
    const { container } = render(
      <ImageMorphingTool config={cfg('image-morphing')} />
    );
    await uploadFileTo(container, 'Source');
    await uploadFileTo(container, 'Target');
    await flush();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.25' } });
    fireEvent.click(screen.getByRole('button', { name: 'Export Frame' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'morph_0.25.png'
      )
    );
  });
});
