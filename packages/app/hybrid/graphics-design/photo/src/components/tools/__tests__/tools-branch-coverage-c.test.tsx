import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { ImagePixelateTool } from '@/components/tools/ImagePixelateTool';
import { ImagePixelateFaceTool } from '@/components/tools/ImagePixelateFaceTool';
import { ImageTextTool } from '@/components/tools/ImageTextTool';
import { ImageBwTool } from '@/components/tools/ImageBwTool';
import { ImageConvertTool } from '@/components/tools/ImageConvertTool';
import { ImageCropTool } from '@/components/tools/ImageCropTool';
import { ImageAdjustTool } from '@/components/tools/ImageAdjustTool';
import { ImageSplitTool } from '@/components/tools/ImageSplitTool';
import { ImageOcrTool } from '@/components/tools/ImageOcrTool';
import { BarcodeTool } from '@/components/tools/BarcodeTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
}));

jest.mock('jsbarcode', () => jest.fn());

jest.mock('tesseract.js', () => ({
  recognize: jest.fn().mockResolvedValue({ data: { text: 'Hello OCR' } }),
}));

const mockLoadImage = loadImage as jest.Mock;
const mockDownloadBlob = downloadBlob as jest.Mock;

const canvasCtxStub = {
  filter: '',
  imageSmoothingEnabled: true,
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
    data: new Uint8ClampedArray([
      128, 64, 32, 255, 10, 20, 30, 255, 0, 0, 0, 255, 50, 50, 50, 255,
    ]),
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

const cfg = (id: string, overrides?: Record<string, unknown>) => ({
  id,
  title: id,
  emoji: 'x',
  description: id,
  category: 'edit' as const,
  ...overrides,
});

const makeFile = (name = 'photo.png') =>
  new File(['fake-image-data'], name, { type: 'image/png' });

const uploadFile = (container: HTMLElement) => {
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement | null;
  if (!input) throw new Error('No file input found');
  fireEvent.change(input, { target: { files: [makeFile()] } });
};

const makeFileInput = () => {
  const input = document.createElement('input');
  input.type = 'file';
  return input;
};

describe('ImagePixelateTool branch coverage', () => {
  it('does not process when no file', async () => {
    render(<ImagePixelateTool config={cfg('image-pixelate')} />);
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('uploads file and shows controls', async () => {
    const { container } = render(
      <ImagePixelateTool config={cfg('image-pixelate')} />
    );
    uploadFile(container);
    await flush();
    expect(screen.getByText(/Pixel size/)).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Pixelate & Download' })
    ).toBeTruthy();
  });

  it('changes pixel size', async () => {
    const { container } = render(
      <ImagePixelateTool config={cfg('image-pixelate')} />
    );
    uploadFile(container);
    await flush();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '10' } });
    expect(screen.getByText('Pixel size: 10')).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImagePixelateTool config={cfg('image-pixelate')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Pixelate & Download' })
    );
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'pixelated_photo.png'
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
      <ImagePixelateTool config={cfg('image-pixelate')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Pixelate & Download' })
    );
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
      <ImagePixelateTool config={cfg('image-pixelate')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Pixelate & Download' })
    );
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
      <ImagePixelateTool config={cfg('image-pixelate')} />
    );
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: 'Pixelate & Download' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });
});

describe('ImagePixelateFaceTool branch coverage', () => {
  it('button is disabled when no file', () => {
    render(<ImagePixelateFaceTool config={cfg('image-pixelate-face')} />);
    expect(
      screen.getByRole('button', { name: 'Apply Pixelate Face' })
    ).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(
      <ImagePixelateFaceTool config={cfg('image-pixelate-face')} />
    );
    uploadFile(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Apply Pixelate Face' })
    ).not.toBeDisabled();
  });

  it('changes pixel size slider', () => {
    render(<ImagePixelateFaceTool config={cfg('image-pixelate-face')} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '20' } });
    expect(screen.getByText('Pixel Size: 20')).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImagePixelateFaceTool config={cfg('image-pixelate-face')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply Pixelate Face' })
    );
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'pixelate_photo.png'
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
      <ImagePixelateFaceTool config={cfg('image-pixelate-face')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply Pixelate Face' })
    );
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
      <ImagePixelateFaceTool config={cfg('image-pixelate-face')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply Pixelate Face' })
    );
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
      <ImagePixelateFaceTool config={cfg('image-pixelate-face')} />
    );
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: 'Apply Pixelate Face' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('early returns when no file set', async () => {
    const { container } = render(
      <ImagePixelateFaceTool config={cfg('image-pixelate-face')} />
    );
    const btn = screen.getByRole('button', { name: 'Apply Pixelate Face' });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });
});

describe('ImageTextTool branch coverage', () => {
  it('does not process when no file', async () => {
    render(<ImageTextTool config={cfg('image-text')} />);
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('does not show controls without file', () => {
    render(<ImageTextTool config={cfg('image-text')} />);
    expect(screen.queryByPlaceholderText('Text to overlay')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    expect(screen.getByPlaceholderText('Text to overlay')).toBeTruthy();
    expect(screen.getByText('Size:')).toBeTruthy();
    expect(screen.getByText('Color:')).toBeTruthy();
    expect(screen.getByText('X:')).toBeTruthy();
    expect(screen.getByText('Y:')).toBeTruthy();
  });

  it('button disabled when text is empty', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    expect(screen.getByRole('button', { name: 'Add Text' })).toBeDisabled();
  });

  it('enables button when text is entered', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText('Text to overlay'), {
      target: { value: 'Hello' },
    });
    expect(screen.getByRole('button', { name: 'Add Text' })).not.toBeDisabled();
  });

  it('processes image and downloads', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText('Text to overlay'), {
      target: { value: 'Hello World' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Text' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'text_photo.png'
      )
    );
  });

  it('changes text size', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    const sizeInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(sizeInput, { target: { value: '48' } });
  });

  it('changes text color', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    const colorInput = screen.getByDisplayValue('#ffffff');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
  });

  it('changes X and Y positions', async () => {
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    const spinbuttons = screen.getAllByRole('spinbutton');
    fireEvent.change(spinbuttons[1], { target: { value: '100' } });
    fireEvent.change(spinbuttons[2], { target: { value: '200' } });
  });

  it('shows loading spinner during processing', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText('Text to overlay'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Text' }));
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
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText('Text to overlay'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Text' }));
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
    const { container } = render(<ImageTextTool config={cfg('image-text')} />);
    uploadFile(container);
    await flush();
    fireEvent.change(screen.getByPlaceholderText('Text to overlay'), {
      target: { value: 'test' },
    });
    const btn = screen.getByRole('button', { name: 'Add Text' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });
});

describe('ImageBwTool branch coverage', () => {
  it('button is hidden when no file', () => {
    render(<ImageBwTool config={cfg('image-bw')} />);
    expect(screen.queryByRole('button', { name: 'Convert to B&W' })).toBeNull();
  });

  it('shows button after file upload', async () => {
    const { container } = render(<ImageBwTool config={cfg('image-bw')} />);
    uploadFile(container);
    await flush();
    expect(screen.getByRole('button', { name: 'Convert to B&W' })).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(<ImageBwTool config={cfg('image-bw')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Convert to B&W' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'bw_photo.png'
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
    const { container } = render(<ImageBwTool config={cfg('image-bw')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Convert to B&W' }));
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
    const { container } = render(<ImageBwTool config={cfg('image-bw')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Convert to B&W' }));
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
    const { container } = render(<ImageBwTool config={cfg('image-bw')} />);
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: 'Convert to B&W' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('does not process when no file', async () => {
    render(<ImageBwTool config={cfg('image-bw')} />);
    await flush();
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });
});

describe('ImageConvertTool branch coverage', () => {
  it('renders with default accept', () => {
    const { container } = render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'png',
          mimeType: 'image/png',
        })}
      />
    );
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('renders with config accept', () => {
    render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'webp',
          mimeType: 'image/webp',
          accept: 'image/webp',
        })}
      />
    );
  });

  it('converts non-SVG and downloads', async () => {
    const { container } = render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'webp',
          mimeType: 'image/webp',
        })}
      />
    );
    uploadFile(container);
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'photo.webp'
      )
    );
  });

  it('converts to SVG format', async () => {
    const { container } = render(
      <ImageConvertTool
        config={cfg('image-convert', { outputExt: 'svg', isSvg: true })}
      />
    );
    uploadFile(container);
    await waitFor(() => {
      expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    });
  });

  it('shows loading spinner during conversion', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'webp',
          mimeType: 'image/webp',
        })}
      />
    );
    uploadFile(container);
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('toBlob null does not call downloadBlob for non-SVG', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'webp',
          mimeType: 'image/webp',
        })}
      />
    );
    uploadFile(container);
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('handles error during conversion', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockLoadImage.mockRejectedValueOnce(new Error('load failed'));
    const { container } = render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'webp',
          mimeType: 'image/webp',
        })}
      />
    );
    uploadFile(container);
    await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
    consoleSpy.mockRestore();
  });

  it('shows loading text in p element', () => {
    render(
      <ImageConvertTool
        config={cfg('image-convert', {
          outputExt: 'png',
          mimeType: 'image/png',
        })}
      />
    );
    expect(screen.getByText('Convert to PNG format.')).toBeTruthy();
  });
});

describe('ImageCropTool branch coverage', () => {
  it('does not show controls without file', () => {
    render(<ImageCropTool config={cfg('image-crop')} />);
    expect(screen.queryByText('X:')).toBeNull();
  });

  it('shows controls after file upload', async () => {
    const { container } = render(<ImageCropTool config={cfg('image-crop')} />);
    uploadFile(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Crop & Download' })
    ).toBeTruthy();
  });

  it('processes image and downloads', async () => {
    const { container } = render(<ImageCropTool config={cfg('image-crop')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Crop & Download' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'cropped_photo.png'
      )
    );
  });

  it('changes crop parameters', async () => {
    const { container } = render(<ImageCropTool config={cfg('image-crop')} />);
    uploadFile(container);
    await flush();
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '10' } });
    fireEvent.change(inputs[1], { target: { value: '20' } });
    fireEvent.change(inputs[2], { target: { value: '200' } });
    fireEvent.change(inputs[3], { target: { value: '300' } });
  });

  it('shows loading spinner during processing', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(<ImageCropTool config={cfg('image-crop')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Crop & Download' }));
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
    const { container } = render(<ImageCropTool config={cfg('image-crop')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Crop & Download' }));
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
    const { container } = render(<ImageCropTool config={cfg('image-crop')} />);
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: 'Crop & Download' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });
});

describe('ImageAdjustTool branch coverage', () => {
  it('button is disabled when no file', () => {
    render(<ImageAdjustTool config={cfg('image-adjust')} />);
    expect(screen.getByRole('button', { name: 'Apply Adjust' })).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Apply Adjust' })
    ).not.toBeDisabled();
  });

  it('renders all three sliders', () => {
    render(<ImageAdjustTool config={cfg('image-adjust')} />);
    expect(screen.getByText(/Brightness/)).toBeTruthy();
    expect(screen.getByText(/Contrast/)).toBeTruthy();
    expect(screen.getByText(/Saturation/)).toBeTruthy();
  });

  it('shows default values as 0 without + prefix', () => {
    render(<ImageAdjustTool config={cfg('image-adjust')} />);
    expect(screen.getByText('Brightness: 0')).toBeTruthy();
    expect(screen.getByText('Contrast: 0')).toBeTruthy();
    expect(screen.getByText('Saturation: 0')).toBeTruthy();
  });

  it('shows + prefix for positive values', async () => {
    const { container } = render(
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '50' } });
    expect(screen.getByText('Brightness: +50')).toBeTruthy();
  });

  it('shows no + prefix for negative values', async () => {
    const { container } = render(
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '-30' } });
    expect(screen.getByText('Brightness: -30')).toBeTruthy();
  });

  it('changes brightness, contrast, and saturation', async () => {
    const { container } = render(
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '25' } });
    fireEvent.change(sliders[1], { target: { value: '-10' } });
    fireEvent.change(sliders[2], { target: { value: '40' } });
  });

  it('processes image and downloads', async () => {
    const { container } = render(
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Apply Adjust' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'adjust_photo.png'
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
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Apply Adjust' }));
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
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Apply Adjust' }));
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
      <ImageAdjustTool config={cfg('image-adjust')} />
    );
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: 'Apply Adjust' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('early returns when no file set', () => {
    render(<ImageAdjustTool config={cfg('image-adjust')} />);
    const btn = screen.getByRole('button', { name: 'Apply Adjust' });
    expect(btn).toBeDisabled();
    (btn as HTMLButtonElement).disabled = false;
    fireEvent.click(btn);
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });
});

describe('ImageSplitTool branch coverage', () => {
  it('button is disabled when no file', () => {
    render(<ImageSplitTool config={cfg('image-split')} />);
    expect(screen.getByRole('button', { name: 'Split Image' })).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(
      <ImageSplitTool config={cfg('image-split')} />
    );
    uploadFile(container);
    await flush();
    expect(
      screen.getByRole('button', { name: 'Split Image' })
    ).not.toBeDisabled();
  });

  it('changes rows and cols', async () => {
    const { container } = render(
      <ImageSplitTool config={cfg('image-split')} />
    );
    uploadFile(container);
    await flush();
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '3' } });
    fireEvent.change(inputs[1], { target: { value: '4' } });
  });

  it('splits image into multiple pieces', async () => {
    const { container } = render(
      <ImageSplitTool config={cfg('image-split')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Split Image' }));
    await waitFor(() => {
      expect(mockDownloadBlob).toHaveBeenCalledTimes(4);
    });
    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'split_1_1.png'
    );
    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'split_1_2.png'
    );
    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'split_2_1.png'
    );
    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'split_2_2.png'
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
      <ImageSplitTool config={cfg('image-split')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Split Image' }));
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
      <ImageSplitTool config={cfg('image-split')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByRole('button', { name: 'Split Image' }));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
  });

  it('button disabled during loading', async () => {
    let resolveLoadImage: (v: unknown) => void;
    mockLoadImage.mockReturnValue(
      new Promise((r) => {
        resolveLoadImage = r;
      })
    );
    const { container } = render(
      <ImageSplitTool config={cfg('image-split')} />
    );
    uploadFile(container);
    await flush();
    const btn = screen.getByRole('button', { name: 'Split Image' });
    fireEvent.click(btn);
    await act(async () => {});
    expect(btn).toBeDisabled();
    resolveLoadImage!({ width: 100, height: 100 });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('early returns when no file set', () => {
    render(<ImageSplitTool config={cfg('image-split')} />);
    const btn = screen.getByRole('button', { name: 'Split Image' });
    expect(btn).toBeDisabled();
    (btn as HTMLButtonElement).disabled = false;
    fireEvent.click(btn);
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('does not process when no file', async () => {
    render(<ImageSplitTool config={cfg('image-split')} />);
    await flush();
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });
});

describe('ImageOcrTool branch coverage', () => {
  it('runs OCR on file upload and displays result', async () => {
    const { container } = render(<ImageOcrTool config={cfg('image-ocr')} />);
    uploadFile(container);
    expect(await screen.findByText('Hello OCR')).toBeTruthy();
  });

  it('handles OCR error with Error instance', async () => {
    const Tesseract = await import('tesseract.js');
    (Tesseract.recognize as jest.Mock).mockRejectedValueOnce(
      new Error('OCR error')
    );
    const { container } = render(<ImageOcrTool config={cfg('image-ocr')} />);
    uploadFile(container);
    expect(await screen.findByText('Error: OCR error')).toBeTruthy();
  });

  it('handles OCR error with non-Error instance', async () => {
    const Tesseract = await import('tesseract.js');
    (Tesseract.recognize as jest.Mock).mockRejectedValueOnce('string error');
    const { container } = render(<ImageOcrTool config={cfg('image-ocr')} />);
    uploadFile(container);
    expect(await screen.findByText('Error: OCR failed')).toBeTruthy();
  });

  it('shows loading spinner during OCR', async () => {
    let resolveRecognize: (v: unknown) => void;
    const Tesseract = await import('tesseract.js');
    (Tesseract.recognize as jest.Mock).mockReturnValueOnce(
      new Promise((r) => {
        resolveRecognize = r;
      })
    );
    const { container } = render(<ImageOcrTool config={cfg('image-ocr')} />);
    uploadFile(container);
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
    resolveRecognize!({ data: { text: 'done' } });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('hides loading spinner after OCR completes', async () => {
    const { container } = render(<ImageOcrTool config={cfg('image-ocr')} />);
    uploadFile(container);
    await waitFor(() => expect(screen.getByText('Hello OCR')).toBeTruthy());
    expect(container.querySelector('.loading-spinner')).toBeNull();
  });

  it('clears previous result on new file', async () => {
    const { container } = render(<ImageOcrTool config={cfg('image-ocr')} />);
    uploadFile(container);
    await waitFor(() => expect(screen.getByText('Hello OCR')).toBeTruthy());
    uploadFile(container);
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
  });

  it('does not show result when empty', () => {
    render(<ImageOcrTool config={cfg('image-ocr')} />);
    expect(screen.queryByText('Hello OCR')).toBeNull();
  });
});

describe('BarcodeTool branch coverage', () => {
  it('does not generate with empty text', () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    expect(screen.getByRole('button', { name: 'Gen' })).toBeDisabled();
  });

  it('disables gen button when text is only whitespace', () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '   ' },
    });
    expect(screen.getByRole('button', { name: 'Gen' })).toBeDisabled();
  });

  it('generates barcode and shows download button', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    const download = await screen.findByRole('button', {
      name: /Download PNG/i,
    });
    expect(download).toBeTruthy();
  });

  it('shows placeholder when no dataURL', () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    expect(screen.getByText('Barcode appears here')).toBeTruthy();
  });

  it('hides placeholder when dataURL is set', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    await waitFor(() => {
      expect(screen.queryByText('Barcode appears here')).toBeNull();
    });
  });

  it('downloads barcode', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    const downloadBtn = await screen.findByRole('button', {
      name: /Download PNG/i,
    });
    fireEvent.click(downloadBtn);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('generates on Enter key', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    const input = screen.getByPlaceholderText(/Enter text/i);
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    const download = await screen.findByRole('button', {
      name: /Download PNG/i,
    });
    expect(download).toBeTruthy();
  });

  it('does not generate on non-Enter key', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    const input = screen.getByPlaceholderText(/Enter text/i);
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.keyDown(input, { key: 'a' });
    expect(screen.queryByRole('button', { name: /Download PNG/i })).toBeNull();
  });

  it('does not generate on Enter with empty text', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    const input = screen.getByPlaceholderText(/Enter text/i);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.queryByRole('button', { name: /Download PNG/i })).toBeNull();
  });

  it('changes barcode format', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    await screen.findByRole('button', { name: /Download PNG/i });
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'EAN-13' } });
  });

  it('does not show loading spinner because generate has no await', async () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Download PNG/i })
      ).toBeTruthy();
    });
  });

  it('select shows all format options', () => {
    render(<BarcodeTool config={cfg('barcode')} />);
    const select = screen.getByRole('combobox');
    const options = Array.from(select.querySelectorAll('option'));
    expect(options.map((o) => o.value)).toEqual([
      'CODE128',
      'EAN-13',
      'UPC-A',
      'CODE39',
      'ITF',
      'Codabar',
      'Pharmacode',
    ]);
  });
});
