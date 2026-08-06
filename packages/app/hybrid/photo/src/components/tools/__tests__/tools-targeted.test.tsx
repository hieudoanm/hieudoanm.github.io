import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { AiGenerateTool } from '@/components/tools/AiGenerateTool';
import { BarcodeTool } from '@/components/tools/BarcodeTool';
import { Base64Tool } from '@/components/tools/Base64Tool';
import { CameraTool } from '@/components/tools/CameraTool';
import { ColorsTool } from '@/components/tools/ColorsTool';
import { ContrastCheckerTool } from '@/components/tools/ContrastCheckerTool';
import { GradientGeneratorTool } from '@/components/tools/GradientGeneratorTool';
import { ImageBwTool } from '@/components/tools/ImageBwTool';
import { ImageResizeTool } from '@/components/tools/ImageResizeTool';
import { ImageTranslateTool } from '@/components/tools/ImageTranslateTool';
import { InvoiceParserTool } from '@/components/tools/InvoiceParserTool';
import { QRCodeTool } from '@/components/tools/QRCodeTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/jpeg;base64,QUJD'),
}));

jest.mock('jsbarcode', () => jest.fn());

jest.mock('tesseract.js', () => ({
  recognize: jest.fn().mockResolvedValue({
    data: { text: 'Total: $12.34\nAcme Corp\n01/02/2023' },
  }),
}));

jest.mock('onnxruntime-web', () => ({
  Tensor: jest.fn(),
  InferenceSession: {
    create: jest
      .fn()
      .mockResolvedValue({ run: jest.fn().mockResolvedValue({}) }),
  },
}));

jest.mock('@/utils/trpc', () => ({
  trpcClient: {
    openrouter: {
      generate: {
        mutate: jest.fn().mockResolvedValue({ text: 'Xin chao' }),
      },
    },
  },
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
  Object.defineProperty(HTMLAnchorElement.prototype, 'click', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: {
      getUserMedia: jest
        .fn()
        .mockResolvedValue({ getTracks: () => [{ stop: jest.fn() }] }),
    },
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

const config = (id: string) => ({
  id,
  title: id,
  emoji: 'x',
  description: id,
  category: 'edit' as const,
});

describe('Base64Tool', () => {
  const clickDecode = () => {
    const buttons = screen.getAllByRole('button', { name: 'Decode' });
    fireEvent.click(buttons[buttons.length - 1]);
  };
  const clickEncode = () => {
    const buttons = screen.getAllByRole('button', { name: 'Encode' });
    fireEvent.click(buttons[buttons.length - 1]);
  };

  it('decodes a data URL and renders a preview', async () => {
    render(<Base64Tool config={config('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'data:image/png;base64,aGVsbG8=' },
    });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('decodes plain base64', async () => {
    render(<Base64Tool config={config('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('shows an error for invalid base64', async () => {
    render(<Base64Tool config={config('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'not-valid!!!' } });
    clickDecode();
    expect(await screen.findByText('Invalid Base64 input')).toBeTruthy();
  });

  it('encodes text', async () => {
    render(<Base64Tool config={config('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: 'hello' } });
    clickEncode();
    expect(await screen.findByText('aGVsbG8=')).toBeTruthy();
  });

  it('copies and downloads decoded output', async () => {
    render(<Base64Tool config={config('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
  });

  it('decodes via Ctrl+Enter', async () => {
    render(<Base64Tool config={config('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    expect(await screen.findByText('hello')).toBeTruthy();
  });
});

describe('AiGenerateTool', () => {
  it('generates and downloads a pattern', async () => {
    render(<AiGenerateTool config={config('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/i), {
      target: { value: 'test prompt' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Pixel Art' }));
    fireEvent.click(screen.getByRole('button', { name: '256\u00d7256' }));
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    const download = await screen.findByRole(
      'button',
      { name: 'Download' },
      { timeout: 4000 }
    );
    fireEvent.click(download);
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'generated_test_prompt.png'
      )
    );
  });

  it('does not generate without a prompt', () => {
    render(<AiGenerateTool config={config('ai-generate')} />);
    expect(
      (screen.getByRole('button', { name: 'Generate' }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });
});

describe('ColorsTool', () => {
  it('updates color conversions from hex input', () => {
    render(<ColorsTool config={config('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.change(hexInput, { target: { value: '#ff0000' } });
    expect(screen.getByText('rgb(255, 0, 0)')).toBeTruthy();
  });

  it('randomizes on space key', () => {
    render(<ColorsTool config={config('colors')} />);
    const hexInput = screen.getByRole('textbox');
    fireEvent.keyDown(window, { key: ' ' });
    expect((hexInput as HTMLInputElement).value).not.toBe('#171717');
  });
});

describe('ContrastCheckerTool', () => {
  it('shows passing levels for white on black', () => {
    render(<ContrastCheckerTool config={config('contrast-checker')} />);
    expect(screen.getAllByText('PASS').length).toBe(4);
  });

  it('hides levels for invalid hex', () => {
    render(<ContrastCheckerTool config={config('contrast-checker')} />);
    const fg = screen.getAllByDisplayValue('#ffffff')[1];
    fireEvent.change(fg, { target: { value: 'xx' } });
    expect(screen.queryByText('PASS')).toBeNull();
  });
});

describe('GradientGeneratorTool', () => {
  it('switches to radial gradient', () => {
    render(<GradientGeneratorTool config={config('gradient-generator')} />);
    fireEvent.click(screen.getByRole('button', { name: 'radial' }));
    expect(screen.getAllByText(/radial-gradient/).length).toBeGreaterThan(0);
  });

  it('adds a stop and copies CSS', async () => {
    render(<GradientGeneratorTool config={config('gradient-generator')} />);
    fireEvent.click(screen.getByRole('button', { name: '+ Add' }));
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalled()
    );
  });

  it('updates angle from a direction button', () => {
    render(<GradientGeneratorTool config={config('gradient-generator')} />);
    fireEvent.click(screen.getByTitle('to right'));
    expect(screen.getByText('90°')).toBeTruthy();
  });
});

describe('BarcodeTool', () => {
  it('generates and downloads a barcode', async () => {
    render(<BarcodeTool config={config('barcode')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    const download = await screen.findByRole('button', {
      name: /Download PNG/i,
    });
    fireEvent.click(download);
  });
});

describe('QRCodeTool', () => {
  it('generates and downloads a QR code', async () => {
    render(<QRCodeTool config={config('qr')} />);
    fireEvent.change(screen.getByPlaceholderText(/https/i), {
      target: { value: 'https://example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gen' }));
    const download = await screen.findByRole('button', {
      name: /Download JPG/i,
    });
    fireEvent.click(download);
  });
});

describe('CameraTool', () => {
  it('toggles controls without camera errors', async () => {
    render(<CameraTool config={config('camera')} />);
    await waitFor(() =>
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled()
    );
    fireEvent.click(screen.getByRole('button', { name: 'symmetry' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clean' }));
    fireEvent.click(
      screen.getByText('Flip').parentElement!.querySelector('button')!
    );
    expect(screen.queryByText(/Could not access camera/i)).toBeNull();
  });
});

describe('ImageTranslateTool', () => {
  it('translates text via trpc', async () => {
    render(<ImageTranslateTool config={config('image-translate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter text/i), {
      target: { value: 'hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Translate' }));
    expect(await screen.findByText('Xin chao')).toBeTruthy();
  });
});

describe('InvoiceParserTool', () => {
  it('runs OCR and extracts fields', async () => {
    const { container } = render(
      <InvoiceParserTool config={config('invoice-parser')} />
    );
    uploadFile(container);
    fireEvent.click(screen.getByRole('button', { name: /Run OCR/i }));
    expect(await screen.findByText(/Acme Corp/)).toBeTruthy();
  });
});

describe('canvas tools', () => {
  it('ImageBwTool downloads a black and white image', async () => {
    const { container } = render(<ImageBwTool config={config('image-bw')} />);
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

  it('ImageResizeTool downloads a resized image', async () => {
    const { container } = render(
      <ImageResizeTool config={config('image-resize')} />
    );
    uploadFile(container);
    await flush();
    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: 'Resize & Download' }));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'resized_photo.png'
      )
    );
  });
});
