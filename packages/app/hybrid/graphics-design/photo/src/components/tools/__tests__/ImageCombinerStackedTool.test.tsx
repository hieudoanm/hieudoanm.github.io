import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImageCombinerStackedTool } from '@/components/tools/ImageCombinerStackedTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
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
    value: jest.fn(() => ({ drawImage: jest.fn() })),
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

const uploadTwoFiles = (container: HTMLElement) => {
  const inputs = Array.from(
    container.querySelectorAll('input[type="file"]')
  ) as HTMLInputElement[];
  fireEvent.change(inputs[0], { target: { files: [makeFile('a.png')] } });
  fireEvent.change(inputs[1], { target: { files: [makeFile('b.png')] } });
};

describe('ImageCombinerStackedTool', () => {
  it('renders without throwing', () => {
    const { container } = render(
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    expect(container.firstChild).toBeTruthy();
  });

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
    uploadTwoFiles(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Stack Vertically' })
    ).not.toBeDisabled();
  });

  it('combines images and downloads', async () => {
    const { container } = render(
      <ImageCombinerStackedTool config={cfg('image-combiner-stacked')} />
    );
    uploadTwoFiles(container);
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
    uploadTwoFiles(container);
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
    uploadTwoFiles(container);
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
    uploadTwoFiles(container);
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
    uploadTwoFiles(container);
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
