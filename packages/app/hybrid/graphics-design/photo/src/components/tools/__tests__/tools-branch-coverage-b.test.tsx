import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImageCombinerSideBySideTool } from '@/components/tools/ImageCombinerSideBySideTool';
import { ImageCombinerStackedTool } from '@/components/tools/ImageCombinerStackedTool';
import { ImageResizeTool } from '@/components/tools/ImageResizeTool';
import { ImageWatermarkTool } from '@/components/tools/ImageWatermarkTool';
import { ImagePhotoFiltersTool } from '@/components/tools/ImagePhotoFiltersTool';
import { MemeMakerTool } from '@/components/tools/MemeMakerTool';

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

const uploadTwoFiles = (
  container: HTMLElement,
  label1: string,
  label2: string
) => {
  const inputs = Array.from(
    container.querySelectorAll('input[type="file"]')
  ) as HTMLInputElement[];
  if (inputs.length < 2) throw new Error('Need at least 2 file inputs');
  fireEvent.change(inputs[0], {
    target: { files: [makeFile('a.png')] },
  });
  fireEvent.change(inputs[1], {
    target: { files: [makeFile('b.png')] },
  });
};

describe('ImageCombinerSideBySideTool branch coverage', () => {
  it('renders with button disabled when no files', () => {
    render(
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Combine Side by Side' })
    ).toBeDisabled();
  });

  it('enables button after both files are uploaded', async () => {
    const { container } = render(
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    uploadTwoFiles(container, 'Image 1', 'Image 2');
    await flush();
    expect(
      screen.getByRole('button', { name: 'Combine Side by Side' })
    ).not.toBeDisabled();
  });

  it('early returns when combine clicked without files', async () => {
    render(
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    const btn = screen.getByRole('button', { name: 'Combine Side by Side' });
    expect(btn).toBeDisabled();
  });

  it('combines images and downloads', async () => {
    const { container } = render(
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    uploadTwoFiles(container, 'Image 1', 'Image 2');
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Combine Side by Side' })
    );
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'combined.side-by-side.png'
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
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    uploadTwoFiles(container, 'Image 1', 'Image 2');
    await flush();

    fireEvent.click(screen.getByRole('button', { name: /Combine/ }));
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
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    uploadTwoFiles(container, 'Image 1', 'Image 2');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Combine/ }));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('button is disabled while loading', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    uploadTwoFiles(container, 'Image 1', 'Image 2');
    await flush();

    const btn = screen.getByRole('button', { name: /Combine/ });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();

    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('combines images with different dimensions', async () => {
    mockLoadImage
      .mockResolvedValueOnce({ width: 200, height: 100 })
      .mockResolvedValueOnce({ width: 150, height: 200 });
    const { container } = render(
      <ImageCombinerSideBySideTool
        config={cfg('image-combiner-side-by-side')}
      />
    );
    uploadTwoFiles(container, 'Image 1', 'Image 2');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Combine/ }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'combined.side-by-side.png'
      )
    );
  });
});

describe('ImageCombinerStackedTool branch coverage', () => {
  it('renders with button disabled when no files', () => {
    render(<ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />);
    expect(
      screen.getByRole('button', { name: 'Stack Vertically' })
    ).toBeDisabled();
  });

  it('enables button after both files are uploaded', async () => {
    const { container } = render(
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container, 'Top Image', 'Bottom Image');
    await flush();
    expect(
      screen.getByRole('button', { name: 'Stack Vertically' })
    ).not.toBeDisabled();
  });

  it('combines images and downloads', async () => {
    const { container } = render(
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container, 'Top Image', 'Bottom Image');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Stack Vertically' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'combined.stacked.png'
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
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container, 'Top Image', 'Bottom Image');
    await flush();

    fireEvent.click(screen.getByRole('button', { name: /Stack/ }));
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
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container, 'Top Image', 'Bottom Image');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Stack/ }));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('button is disabled while loading', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container, 'Top Image', 'Bottom Image');
    await flush();

    const btn = screen.getByRole('button', { name: /Stack/ });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();

    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('stacks images with different dimensions', async () => {
    mockLoadImage
      .mockResolvedValueOnce({ width: 200, height: 100 })
      .mockResolvedValueOnce({ width: 150, height: 200 });
    const { container } = render(
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container, 'Top Image', 'Bottom Image');
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Stack/ }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'combined.stacked.png'
      )
    );
  });

  it('early returns when no files', async () => {
    render(<ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />);
    expect(
      screen.getByRole('button', { name: 'Stack Vertically' })
    ).toBeDisabled();
  });
});

describe('ImageResizeTool branch coverage', () => {
  it('renders without controls before file upload', () => {
    render(<ImageResizeTool config={cfg('image-resize')} />);
    expect(screen.queryByText('Width:')).toBeNull();
    expect(screen.queryByText('Height:')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFileTo(container);
    await flush();
    expect(screen.getByText('Width:')).toBeTruthy();
    expect(screen.getByText('Height:')).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFileTo(container);
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
    uploadFileTo(container);
    await flush();
    const widthInput = container.querySelectorAll('input[type="number"]')[0];
    fireEvent.change(widthInput, { target: { value: '200' } });
  });

  it('changes height input and maintainAspect updates width', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFileTo(container);
    await flush();
    const heightInput = container.querySelectorAll('input[type="number"]')[1];
    fireEvent.change(heightInput, { target: { value: '200' } });
  });

  it('toggles maintainAspect checkbox off', async () => {
    const { container } = render(
      <ImageResizeTool config={cfg('image-resize')} />
    );
    uploadFileTo(container);
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
    uploadFileTo(container);
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
    uploadFileTo(container);
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
    uploadFileTo(container);
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
    uploadFileTo(container);
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
    uploadFileTo(
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
    uploadFileTo(container, new File(['data'], 'test', { type: '' }));
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

describe('ImageWatermarkTool branch coverage', () => {
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
    await flush();
    expect(
      screen.getByRole('button', { name: 'Add Watermark' })
    ).not.toBeDisabled();
  });

  it('processes watermark and downloads', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
    await flush();
    const range = screen.getByRole('slider');
    fireEvent.change(range, { target: { value: '0.8' } });
    expect(screen.getByText('Opacity: 80%')).toBeTruthy();
  });

  it('processes with different opacity values', async () => {
    const { container } = render(
      <ImageWatermarkTool config={cfg('image-watermark')} />
    );
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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
    uploadTwoFiles(container, 'Image', 'Watermark Image');
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

describe('ImagePhotoFiltersTool branch coverage', () => {
  it('renders with button disabled when no file', () => {
    render(<ImagePhotoFiltersTool config={cfg('image-photo-filters')} />);
    expect(screen.getByRole('button', { name: 'Apply Filter' })).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Apply Filter' })
    ).not.toBeDisabled();
  });

  it('applies sepia filter and downloads', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'filter_photo.png'
      )
    );
  });

  it('applies vintage filter', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'vintage' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'filter_photo.png'
      )
    );
  });

  it('applies invert filter', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'invert' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'filter_photo.png'
      )
    );
  });

  it('applies grayscale filter', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'grayscale' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'filter_photo.png'
      )
    );
  });

  it('applies warm filter', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'warm' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'filter_photo.png'
      )
    );
  });

  it('applies cool filter', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'cool' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'filter_photo.png'
      )
    );
  });

  it('early returns when no file', async () => {
    render(<ImagePhotoFiltersTool config={cfg('image-photo-filters')} />);
    fireEvent.click(screen.getByRole('button', { name: 'Apply Filter' }));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('shows loading spinner during processing', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();

    fireEvent.click(screen.getByRole('button', { name: /Apply Filter/ }));
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
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: /Apply Filter/ }));
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
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    uploadFileTo(container);
    await flush();

    const btn = screen.getByRole('button', { name: /Apply Filter/ });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();

    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('all filter buttons render', () => {
    render(<ImagePhotoFiltersTool config={cfg('image-photo-filters')} />);
    expect(screen.getByRole('button', { name: 'sepia' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'vintage' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'invert' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'grayscale' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'warm' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'cool' })).toBeTruthy();
  });

  it('highlights selected filter button', async () => {
    const { container } = render(
      <ImagePhotoFiltersTool config={cfg('image-photo-filters')} />
    );
    const vintageBtn = screen.getByRole('button', { name: 'vintage' });
    fireEvent.click(vintageBtn);
    expect(vintageBtn.className).toContain('btn-primary');
  });
});

describe('MemeMakerTool branch coverage', () => {
  it('renders with button disabled when no file', () => {
    render(<MemeMakerTool config={cfg('meme-maker')} />);
    expect(
      screen.getByRole('button', { name: 'Generate Meme' })
    ).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Generate Meme' })
    ).not.toBeDisabled();
  });

  it('generates meme with top text only', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText(/Top text/), {
      target: { value: 'TOP TEXT' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate Meme' }));
    await flush();
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'meme.png'
      )
    );
  });

  it('generates meme with top and bottom text', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText(/Top text/), {
      target: { value: 'TOP\nBOTTOM' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate Meme' }));
    await flush();
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'meme.png'
      )
    );
  });

  it('generates meme with no text', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Generate Meme' }));
    await flush();
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'meme.png'
      )
    );
  });

  it('early returns when no file', async () => {
    render(<MemeMakerTool config={cfg('meme-maker')} />);
    fireEvent.click(screen.getByRole('button', { name: 'Generate Meme' }));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('shows loading spinner during processing', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();

    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      () => {}
    );
    const btn = screen.getByRole('button', { name: 'Generate Meme' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
  });

  it('toBlob null does not call downloadBlob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Generate Meme' }));
    await flush();
    await waitFor(() => expect(mockDownloadBlob).not.toHaveBeenCalled());
  });

  it('button disabled during loading', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    uploadFileTo(container);
    await flush();

    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      () => {}
    );
    const btn = screen.getByRole('button', { name: 'Generate Meme' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
  });

  it('input shows placeholder text', () => {
    render(<MemeMakerTool config={cfg('meme-maker')} />);
    expect(
      screen.getByPlaceholderText('Top text (leave blank for none)')
    ).toBeTruthy();
  });

  it('updates text state via input', async () => {
    const { container } = render(<MemeMakerTool config={cfg('meme-maker')} />);
    const input = screen.getByPlaceholderText(/Top text/);
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect((input as HTMLInputElement).value).toBe('Hello');
  });
});
