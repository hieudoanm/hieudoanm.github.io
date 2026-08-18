import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImageBorderTool } from '@/components/tools/ImageBorderTool';
import { ImageRoundTool } from '@/components/tools/ImageRoundTool';
import { ImageVignetteTool } from '@/components/tools/ImageVignetteTool';
import { ImageFlipTool } from '@/components/tools/ImageFlipTool';
import { ImageRotateTool } from '@/components/tools/ImageRotateTool';
import { ImageShadowTool } from '@/components/tools/ImageShadowTool';
import { ImageDominantColorTool } from '@/components/tools/ImageDominantColorTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
}));

const mockLoadImage = loadImage as jest.Mock;
const mockDownloadBlob = downloadBlob as jest.Mock;

const canvasCtxStub = {
  filter: '',
  fillStyle: '',
  strokeStyle: '',
  shadowColor: '',
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  font: '',
  textAlign: '',
  textBaseline: '',
  lineWidth: 0,
  globalAlpha: 1,
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

const uploadFileTo = (container: HTMLElement, file = makeFile()) => {
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement | null;
  if (!input) throw new Error('No file input found');
  fireEvent.change(input, { target: { files: [file] } });
};

describe('ImageBorderTool branch coverage', () => {
  it('renders without file controls initially', () => {
    render(<ImageBorderTool config={cfg('image-border')} />);
    expect(screen.queryByText('Border width:')).toBeNull();
    expect(screen.queryByText('Add Border')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(
      <ImageBorderTool config={cfg('image-border')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Border width:')).toBeTruthy();
    expect(screen.getByText('Add Border')).toBeTruthy();
  });

  it('updates border width via input', async () => {
    const { container } = render(
      <ImageBorderTool config={cfg('image-border')} />
    );
    uploadFileTo(container);
    await flush();
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '20' } });
    expect((input as HTMLInputElement).value).toBe('20');
  });

  it('updates border color via input', async () => {
    const { container } = render(
      <ImageBorderTool config={cfg('image-border')} />
    );
    uploadFileTo(container);
    await flush();
    const colorInput = container.querySelector('input[type="color"]');
    expect(colorInput).toBeTruthy();
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageBorderTool config={cfg('image-border')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Add Border'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'bordered_photo.png'
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
      <ImageBorderTool config={cfg('image-border')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Add Border'));
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

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageBorderTool config={cfg('image-border')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Add Border'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('processImage returns early when no file', async () => {
    render(<ImageBorderTool config={cfg('image-border')} />);
    expect(screen.queryByText('Add Border')).toBeNull();
    expect(mockLoadImage).not.toHaveBeenCalled();
  });
});

describe('ImageRoundTool branch coverage', () => {
  it('renders without controls initially', () => {
    render(<ImageRoundTool config={cfg('image-round')} />);
    expect(screen.queryByText(/Border radius/)).toBeNull();
    expect(screen.queryByText('Make Round')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(
      <ImageRoundTool config={cfg('image-round')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText(/Border radius/)).toBeTruthy();
    expect(screen.getByText('Make Round')).toBeTruthy();
  });

  it('updates border radius via slider', async () => {
    const { container } = render(
      <ImageRoundTool config={cfg('image-round')} />
    );
    uploadFileTo(container);
    await flush();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '50' } });
    expect(screen.getByText(/50px/)).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageRoundTool config={cfg('image-round')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Make Round'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'rounded_photo.png'
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
      <ImageRoundTool config={cfg('image-round')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Make Round'));
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

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageRoundTool config={cfg('image-round')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Make Round'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('processImage returns early when no file', async () => {
    render(<ImageRoundTool config={cfg('image-round')} />);
    expect(screen.queryByText('Make Round')).toBeNull();
    expect(mockLoadImage).not.toHaveBeenCalled();
  });
});

describe('ImageVignetteTool branch coverage', () => {
  it('renders with controls', () => {
    render(<ImageVignetteTool config={cfg('image-vignette')} />);
    expect(screen.getByText(/Strength/)).toBeTruthy();
    expect(screen.getByText('Apply Vignette')).toBeTruthy();
  });

  it('button is disabled when no file', () => {
    render(<ImageVignetteTool config={cfg('image-vignette')} />);
    expect(screen.getByText('Apply Vignette')).toBeDisabled();
  });

  it('button is enabled after file upload', async () => {
    const { container } = render(
      <ImageVignetteTool config={cfg('image-vignette')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Apply Vignette')).not.toBeDisabled();
  });

  it('updates vignette strength via slider', async () => {
    render(<ImageVignetteTool config={cfg('image-vignette')} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.8' } });
    expect(screen.getByText(/80%/)).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageVignetteTool config={cfg('image-vignette')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Vignette'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'vignette_photo.png'
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
      <ImageVignetteTool config={cfg('image-vignette')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Vignette'));
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

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageVignetteTool config={cfg('image-vignette')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Vignette'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('process returns early when no file', async () => {
    render(<ImageVignetteTool config={cfg('image-vignette')} />);
    fireEvent.click(screen.getByText('Apply Vignette'));
    await act(async () => {});
    expect(mockLoadImage).not.toHaveBeenCalled();
  });
});

describe('ImageFlipTool branch coverage', () => {
  it('renders without controls initially', () => {
    render(<ImageFlipTool config={cfg('image-flip')} />);
    expect(screen.queryByText('Flip Horizontal')).toBeNull();
    expect(screen.queryByText('Flip Vertical')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(<ImageFlipTool config={cfg('image-flip')} />);
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Flip Horizontal')).toBeTruthy();
    expect(screen.getByText('Flip Vertical')).toBeTruthy();
  });

  it('flip horizontal downloads with horizontal prefix', async () => {
    const { container } = render(<ImageFlipTool config={cfg('image-flip')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Flip Horizontal'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'horizontal_photo.png'
      )
    );
  });

  it('flip vertical downloads with vertical prefix', async () => {
    const { container } = render(<ImageFlipTool config={cfg('image-flip')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Flip Vertical'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'vertical_photo.png'
      )
    );
  });

  it('shows loading spinner during horizontal flip', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(<ImageFlipTool config={cfg('image-flip')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Flip Horizontal'));
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

  it('shows loading spinner during vertical flip', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(<ImageFlipTool config={cfg('image-flip')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Flip Vertical'));
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

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(<ImageFlipTool config={cfg('image-flip')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Flip Horizontal'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('flip returns early when no file', async () => {
    render(<ImageFlipTool config={cfg('image-flip')} />);
    expect(screen.queryByText('Flip Horizontal')).toBeNull();
    expect(mockLoadImage).not.toHaveBeenCalled();
  });
});

describe('ImageRotateTool branch coverage', () => {
  it('renders with controls', () => {
    render(<ImageRotateTool config={cfg('image-rotate')} />);
    expect(screen.getByText('Angle°:')).toBeTruthy();
    expect(screen.getByText('90°')).toBeTruthy();
    expect(screen.getByText('180°')).toBeTruthy();
    expect(screen.getByText('270°')).toBeTruthy();
  });

  it('button is disabled when no file', () => {
    render(<ImageRotateTool config={cfg('image-rotate')} />);
    expect(screen.getByText('Apply Rotate')).toBeDisabled();
  });

  it('button is enabled after file upload', async () => {
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Apply Rotate')).not.toBeDisabled();
  });

  it('updates angle via number input', async () => {
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '45' } });
    expect((input as HTMLInputElement).value).toBe('45');
  });

  it('sets angle to 90 via quick button', async () => {
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('90°'));
    const input = screen.getByRole('spinbutton');
    expect((input as HTMLInputElement).value).toBe('90');
  });

  it('sets angle to 180 via quick button', async () => {
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('180°'));
    const input = screen.getByRole('spinbutton');
    expect((input as HTMLInputElement).value).toBe('180');
  });

  it('sets angle to 270 via quick button', async () => {
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('270°'));
    const input = screen.getByRole('spinbutton');
    expect((input as HTMLInputElement).value).toBe('270');
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Rotate'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'rotate_photo.png'
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
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Rotate'));
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

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageRotateTool config={cfg('image-rotate')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Rotate'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('process returns early when no file', async () => {
    render(<ImageRotateTool config={cfg('image-rotate')} />);
    fireEvent.click(screen.getByText('Apply Rotate'));
    await act(async () => {});
    expect(mockLoadImage).not.toHaveBeenCalled();
  });
});

describe('ImageShadowTool branch coverage', () => {
  it('renders with all controls', () => {
    render(<ImageShadowTool config={cfg('image-shadow')} />);
    expect(screen.getByText(/Color/)).toBeTruthy();
    expect(screen.getByText(/Blur/)).toBeTruthy();
    expect(screen.getByText(/Offset X/)).toBeTruthy();
    expect(screen.getByText(/Offset Y/)).toBeTruthy();
    expect(screen.getByText('Add Shadow')).toBeTruthy();
  });

  it('button is disabled when no file', () => {
    render(<ImageShadowTool config={cfg('image-shadow')} />);
    expect(screen.getByText('Add Shadow')).toBeDisabled();
  });

  it('button is enabled after file upload', async () => {
    const { container } = render(
      <ImageShadowTool config={cfg('image-shadow')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Add Shadow')).not.toBeDisabled();
  });

  it('updates shadow color', async () => {
    const { container } = render(
      <ImageShadowTool config={cfg('image-shadow')} />
    );
    const colorInput = container.querySelector('input[type="color"]');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });
  });

  it('updates shadow blur via slider', () => {
    render(<ImageShadowTool config={cfg('image-shadow')} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '25' } });
    expect(screen.getByText('Blur: 25')).toBeTruthy();
  });

  it('updates offset X via slider', () => {
    render(<ImageShadowTool config={cfg('image-shadow')} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[1], { target: { value: '15' } });
    expect(screen.getByText('Offset X: 15')).toBeTruthy();
  });

  it('updates offset Y via slider', () => {
    render(<ImageShadowTool config={cfg('image-shadow')} />);
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[2], { target: { value: '20' } });
    expect(screen.getByText('Offset Y: 20')).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageShadowTool config={cfg('image-shadow')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Add Shadow'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'shadow_photo.png'
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
      <ImageShadowTool config={cfg('image-shadow')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Add Shadow'));
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

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageShadowTool config={cfg('image-shadow')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByText('Add Shadow'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('process returns early when no file', async () => {
    render(<ImageShadowTool config={cfg('image-shadow')} />);
    fireEvent.click(screen.getByText('Add Shadow'));
    await act(async () => {});
    expect(mockLoadImage).not.toHaveBeenCalled();
  });
});

describe('ImageDominantColorTool branch coverage', () => {
  it('renders with file upload and hidden canvas', () => {
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('does not show results before file upload', () => {
    render(<ImageDominantColorTool config={cfg('image-dominant-color')} />);
    expect(screen.queryByText('Dominant:')).toBeNull();
    expect(screen.queryByText('Palette:')).toBeNull();
  });

  it('shows dominant color and palette after file upload', async () => {
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Dominant:')).toBeTruthy();
    expect(screen.getByText('Palette:')).toBeTruthy();
  });

  it('shows loading spinner during processing', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    uploadFileTo(container);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
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

  it('hides loading spinner after processing completes', async () => {
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    uploadFileTo(container);
    await flush();
    expect(container.querySelector('.loading-spinner')).toBeNull();
  });

  it('downloads blob after processing', async () => {
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    uploadFileTo(container);
    await flush();
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'dominant_photo.png'
      )
    );
  });

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    uploadFileTo(container);
    await flush();
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('handles multiple palette colors', async () => {
    const richData = new Uint8ClampedArray([
      255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 0, 255,
    ]);
    canvasCtxStub.getImageData.mockReturnValueOnce({
      data: richData,
      width: 2,
      height: 2,
    });
    const { container } = render(
      <ImageDominantColorTool config={cfg('image-dominant-color')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Dominant:')).toBeTruthy();
    expect(screen.getByText('Palette:')).toBeTruthy();
  });
});
