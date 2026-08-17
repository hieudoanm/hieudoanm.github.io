import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { BarcodeReadTool } from '@/components/tools/BarcodeReadTool';
import { ChartMakerTool } from '@/components/tools/ChartMakerTool';
import { InstaSizeTool } from '@/components/tools/InstaSizeTool';
import { AiGenerateTool } from '@/components/tools/AiGenerateTool';
import { AiRemoveWatermarkTool } from '@/components/tools/AiRemoveWatermarkTool';
import { AiRestoreTool } from '@/components/tools/AiRestoreTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
}));

jest.mock('@ericblade/quagga2', () => ({
  __esModule: true,
  default: {
    decodeSingle: jest.fn(),
  },
}));

const mockLoadImage = loadImage as jest.Mock;
const mockDownloadBlob = downloadBlob as jest.Mock;
const quagga = require('@ericblade/quagga2');

const gradientStub = { addColorStop: jest.fn() };

const canvasCtxStub = {
  filter: '',
  fillStyle: '',
  font: '',
  textAlign: '',
  measureText: jest.fn(() => ({ width: 10 })),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(16),
    width: 2,
    height: 2,
  })),
  putImageData: jest.fn(),
  drawImage: jest.fn(),
  fillRect: jest.fn(),
  fillText: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  createRadialGradient: jest.fn(() => gradientStub),
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

beforeAll(() => {
  Object.defineProperty(global, 'Image', { writable: true, value: FakeImage });
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn(() => 'blob:fake'),
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
});

beforeEach(() => {
  jest.clearAllMocks();
  images.length = 0;
  quagga.default.decodeSingle.mockReset();
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

const doubleFlush = async () => {
  await flush();
  await flush();
};

const cfg = (id: string) => ({
  id,
  title: id,
  emoji: 'x',
  description: id,
  category: 'edit' as const,
});

const makeFile = (name = 'photo.png', type = 'image/png') =>
  new File(['fake-image-data'], name, { type });

const uploadFile = (container: HTMLElement, file = makeFile()) => {
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement | null;
  if (!input) throw new Error('No file input found');
  fireEvent.change(input, { target: { files: [file] } });
};

describe('BarcodeReadTool branch coverage', () => {
  beforeEach(() => {
    quagga.default.decodeSingle.mockImplementation(
      (_opts: unknown, cb: (res: unknown) => void) => {
        cb({ codeResult: { code: '12345' } });
      }
    );
  });

  it('shows no result initially', () => {
    render(<BarcodeReadTool config={cfg('barcode-read')} />);
    expect(screen.queryByText('No barcode found.')).toBeNull();
  });

  it('shows barcode result when code is found', async () => {
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await doubleFlush();
    expect(screen.getByText('12345')).toBeTruthy();
  });

  it('shows "No barcode found." when res has no code', async () => {
    quagga.default.decodeSingle.mockImplementationOnce(
      (_opts: unknown, cb: (res: unknown) => void) => {
        cb({ codeResult: { code: null } });
      }
    );
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await doubleFlush();
    expect(screen.getByText('No barcode found.')).toBeTruthy();
  });

  it('shows "No barcode found." when res is null', async () => {
    quagga.default.decodeSingle.mockImplementationOnce(
      (_opts: unknown, cb: (res: unknown) => void) => {
        cb(null);
      }
    );
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await doubleFlush();
    expect(screen.getByText('No barcode found.')).toBeTruthy();
  });

  it('catches Error instance and shows error message', async () => {
    quagga.default.decodeSingle.mockImplementationOnce(() => {
      throw new Error('decode failed');
    });
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await doubleFlush();
    expect(screen.getByText('Error: decode failed')).toBeTruthy();
  });

  it('catches non-Error exception and shows generic message', async () => {
    quagga.default.decodeSingle.mockImplementationOnce(() => {
      throw 'string error';
    });
    const { container } = render(
      <BarcodeReadTool config={cfg('barcode-read')} />
    );
    uploadFile(container);
    await doubleFlush();
    expect(screen.getByText('Error: Barcode reading failed')).toBeTruthy();
  });
});

describe('ChartMakerTool branch coverage', () => {
  it('renders with default inputs', () => {
    render(<ChartMakerTool config={cfg('chart-maker')} />);
    expect(screen.getByText('Generate Chart')).toBeTruthy();
  });

  it('button shows loading spinner when generating', async () => {
    const { container } = render(
      <ChartMakerTool config={cfg('chart-maker')} />
    );
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      () => {}
    );
    fireEvent.click(screen.getByText('Generate Chart'));
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
  });

  it('calls downloadBlob when toBlob returns a blob', async () => {
    render(<ChartMakerTool config={cfg('chart-maker')} />);
    fireEvent.click(screen.getByText('Generate Chart'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'chart.png'
      )
    );
  });

  it('does not call downloadBlob when toBlob returns null', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    render(<ChartMakerTool config={cfg('chart-maker')} />);
    fireEvent.click(screen.getByText('Generate Chart'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('updates title input', () => {
    render(<ChartMakerTool config={cfg('chart-maker')} />);
    const input = screen.getByPlaceholderText('Title');
    fireEvent.change(input, { target: { value: 'New Title' } });
    expect((input as HTMLInputElement).value).toBe('New Title');
  });

  it('updates labels input', () => {
    render(<ChartMakerTool config={cfg('chart-maker')} />);
    const input = screen.getByPlaceholderText('Labels (comma-separated)');
    fireEvent.change(input, { target: { value: 'X,Y' } });
    expect((input as HTMLInputElement).value).toBe('X,Y');
  });

  it('updates values input', () => {
    render(<ChartMakerTool config={cfg('chart-maker')} />);
    const input = screen.getByPlaceholderText('Values (comma-separated)');
    fireEvent.change(input, { target: { value: '5,10' } });
    expect((input as HTMLInputElement).value).toBe('5,10');
  });
});

describe('InstaSizeTool branch coverage', () => {
  it('renders file upload initially', () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('rejects non-image file', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(
      container,
      new File(['data'], 'test.txt', { type: 'text/plain' })
    );
    await act(async () => {});
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('shows editor after image upload', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    expect(screen.getByText('Preview')).toBeTruthy();
    expect(screen.getByText('Filter')).toBeTruthy();
    expect(screen.getByText('Padding')).toBeTruthy();
  });

  it('canvas toDataURL is called during render', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalled();
  });

  it('clear button resets to upload state', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    fireEvent.click(screen.getByText('✕ Clear'));
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('selects a filter and re-renders', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    fireEvent.click(screen.getByText('Grayscale'));
    expect(screen.getByText('Filter: Grayscale')).toBeTruthy();
  });

  it('changes padding via preset button', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    fireEvent.click(screen.getByText('20%'));
    expect(screen.getByText(/Filter:/)).toBeTruthy();
  });

  it('download button creates anchor and clicks', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    fireEvent.click(screen.getByText('Download PNG'));
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('upload different image resets state', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await doubleFlush();
    fireEvent.click(screen.getByText('Upload different image'));
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('img.onerror triggers cb with empty string', async () => {
    const { container } = render(<InstaSizeTool config={cfg('instasize')} />);
    uploadFile(container);
    await flush();
    const lastImg = images[images.length - 1];
    if (lastImg) {
      lastImg.onerror?.(new Event('error'));
    }
    await act(async () => {});
  });
});

describe('AiGenerateTool branch coverage', () => {
  it('renders with generate button disabled', () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    expect(screen.getByText('Generate')).toBeDisabled();
  });

  it('enables button when prompt is entered', () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'a cat' },
    });
    expect(screen.getByText('Generate')).not.toBeDisabled();
  });

  it('shows loading spinner during generation', async () => {
    const { container } = render(
      <AiGenerateTool config={cfg('ai-generate')} />
    );
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'a cat' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {});
    expect(container.querySelector('.loading-spinner')).toBeTruthy();
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
  });

  it('shows generated canvas and download button', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'a cat' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    expect(screen.getByText('Download')).toBeTruthy();
  });

  it('handleDownload calls downloadBlob when blob exists', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'test prompt' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    fireEvent.click(screen.getByText('Download'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        expect.stringContaining('generated_')
      )
    );
  });

  it('handleDownload with null blob does not call downloadBlob', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    fireEvent.click(screen.getByText('Download'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('selects Oil Painting style (styleSeed 2, blur filter)', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'cat' },
    });
    fireEvent.click(screen.getByText('Oil Painting'));
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    expect(screen.getByText('Download')).toBeTruthy();
  });

  it('selects Pixel Art style (styleSeed 4, contrast filter)', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'cat' },
    });
    fireEvent.click(screen.getByText('Pixel Art'));
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    expect(screen.getByText('Download')).toBeTruthy();
  });

  it('selects Sketch style (styleSeed 5, grayscale filter)', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'cat' },
    });
    fireEvent.click(screen.getByText('Sketch'));
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    expect(screen.getByText('Download')).toBeTruthy();
  });

  it('selects Realistic style (styleSeed 0, saturate filter)', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'cat' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    expect(screen.getByText('Download')).toBeTruthy();
  });

  it('changes size selection to 256x256', async () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    fireEvent.change(screen.getByPlaceholderText(/Describe the image/), {
      target: { value: 'cat' },
    });
    fireEvent.click(screen.getByText('256\u00d7256'));
    fireEvent.click(screen.getByText('Generate'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 900));
    });
    expect(screen.getByText('Download')).toBeTruthy();
  });

  it('shows hidden canvas before generation', () => {
    const { container } = render(
      <AiGenerateTool config={cfg('ai-generate')} />
    );
    expect(container.querySelector('canvas.hidden')).toBeTruthy();
  });

  it('negative prompt input updates state', () => {
    render(<AiGenerateTool config={cfg('ai-generate')} />);
    const input = screen.getByPlaceholderText(/Negative prompt/);
    fireEvent.change(input, { target: { value: 'blurry' } });
    expect((input as HTMLTextAreaElement).value).toBe('blurry');
  });
});

describe('AiRemoveWatermarkTool branch coverage', () => {
  it('renders file upload and controls', () => {
    render(<AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />);
    expect(screen.getByText('Remove Watermark')).toBeTruthy();
    expect(screen.getByText(/Brightness Threshold/)).toBeTruthy();
    expect(screen.getByText(/Patch Radius/)).toBeTruthy();
    expect(screen.getByText(/Iterations/)).toBeTruthy();
  });

  it('button is disabled when no file', () => {
    render(<AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />);
    expect(screen.getByText('Remove Watermark')).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(
      <AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />
    );
    uploadFile(container);
    await flush();
    expect(screen.getByText('Remove Watermark')).not.toBeDisabled();
  });

  it('processes in bright mode and downloads', async () => {
    const { container } = render(
      <AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByText('Remove Watermark'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'clean_photo.png'
      )
    );
  });

  it('toBlob null does not call downloadBlob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(
      <AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />
    );
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByText('Remove Watermark'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('updates brightness threshold', () => {
    render(<AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />);
    const slider = screen.getAllByRole('slider')[0];
    fireEvent.change(slider, { target: { value: '180' } });
    expect(screen.getByText('Brightness Threshold: 180')).toBeTruthy();
  });

  it('updates patch radius', () => {
    render(<AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />);
    const slider = screen.getAllByRole('slider')[1];
    fireEvent.change(slider, { target: { value: '5' } });
    expect(screen.getByText('Patch Radius: 5px')).toBeTruthy();
  });

  it('updates iterations', () => {
    render(<AiRemoveWatermarkTool config={cfg('ai-remove-watermark')} />);
    const slider = screen.getAllByRole('slider')[2];
    fireEvent.change(slider, { target: { value: '3' } });
    expect(screen.getByText('Iterations: 3')).toBeTruthy();
  });
});

describe('AiRestoreTool branch coverage', () => {
  it('renders file upload and all sliders', () => {
    render(<AiRestoreTool config={cfg('ai-restore')} />);
    expect(screen.getByText('Apply Restoration')).toBeTruthy();
    expect(screen.getByText(/brightness/i)).toBeTruthy();
    expect(screen.getByText(/contrast/i)).toBeTruthy();
    expect(screen.getByText(/sharpen/i)).toBeTruthy();
    expect(screen.getByText(/denoise/i)).toBeTruthy();
  });

  it('button is disabled when no file', () => {
    render(<AiRestoreTool config={cfg('ai-restore')} />);
    expect(screen.getByText('Apply Restoration')).toBeDisabled();
  });

  it('enables button after file upload', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    expect(screen.getByText('Apply Restoration')).not.toBeDisabled();
  });

  it('processes with default settings and downloads', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'restored_photo.png'
      )
    );
  });

  it('denoise > 0 triggers reduceNoise branch', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[3], { target: { value: '2' } });
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'restored_photo.png'
      )
    );
  });

  it('sharpen > 0 triggers applySharpen branch', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[2], { target: { value: '0.5' } });
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'restored_photo.png'
      )
    );
  });

  it('brightness != 0 triggers brightness/contrast branch', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '0.3' } });
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'restored_photo.png'
      )
    );
  });

  it('contrast != 0 triggers brightness/contrast branch', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[1], { target: { value: '0.5' } });
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'restored_photo.png'
      )
    );
  });

  it('toBlob null does not call downloadBlob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementationOnce(
      (cb: (b: Blob | null) => void) => cb(null)
    );
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() => expect(mockLoadImage).toHaveBeenCalled());
    expect(mockDownloadBlob).not.toHaveBeenCalled();
  });

  it('all four sliders at max', async () => {
    const { container } = render(<AiRestoreTool config={cfg('ai-restore')} />);
    uploadFile(container);
    await flush();
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '1' } });
    fireEvent.change(sliders[1], { target: { value: '1' } });
    fireEvent.change(sliders[2], { target: { value: '1' } });
    fireEvent.change(sliders[3], { target: { value: '5' } });
    fireEvent.click(screen.getByText('Apply Restoration'));
    await waitFor(() =>
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'restored_photo.png'
      )
    );
  });
});
