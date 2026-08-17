import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { AiRemoveObjectTool } from '@/components/tools/AiRemoveObjectTool';
import { ImageMorphingTool } from '@/components/tools/ImageMorphingTool';
import { Base64Tool } from '@/components/tools/Base64Tool';

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

describe('AiRemoveObjectTool branch coverage', () => {
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

describe('ImageMorphingTool branch coverage', () => {
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

  it('handles null src or tgt refs in redraw early return', async () => {
    render(<ImageMorphingTool config={cfg('image-morphing')} />);
    expect(screen.queryByText(/Morph Progress/)).toBeNull();
  });
});

describe('Base64Tool branch coverage', () => {
  const clickDecode = () => {
    const buttons = screen.getAllByRole('button', { name: 'Decode' });
    fireEvent.click(buttons[buttons.length - 1]);
  };
  const clickEncode = () => {
    const buttons = screen.getAllByRole('button', { name: 'Encode' });
    fireEvent.click(buttons[buttons.length - 1]);
  };

  it('clears state when switching tabs', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'test data' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const decoded = screen.getByPlaceholderText(/Type text/i);
    expect((decoded as HTMLTextAreaElement).value).toBe('');
  });

  it('decodes plain base64', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('decodes data URL with base64 prefix (shows preview)', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'data:image/png;base64,aGVsbG8=' },
    });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('takes first token when base64 has trailing text', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'aGVsbG8= trailing junk' },
    });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('does not decode empty input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    clickDecode();
    expect(screen.queryByText('hello')).toBeNull();
    expect(screen.queryByText('Invalid Base64 input')).toBeNull();
  });

  it('does not encode empty input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    clickEncode();
    expect(screen.queryByText(/Output/)).toBeNull();
  });

  it('shows error for invalid base64', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: '!!!invalid!!!' } });
    clickDecode();
    expect(await screen.findByText('Invalid Base64 input')).toBeTruthy();
  });

  it('shows error for non-Latin1 encode input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: '\ud800\udc00' } });
    clickEncode();
    expect(
      await screen.findByText('Invalid input — check for non-Latin1 characters')
    ).toBeTruthy();
  });

  it('encodes text', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: 'hello' } });
    clickEncode();
    expect(await screen.findByText('aGVsbG8=')).toBeTruthy();
  });

  it('decodes via Ctrl+Enter', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('decodes via Cmd+Enter', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'Enter', metaKey: true });
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('encodes via Ctrl+Enter in encode tab', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    expect(await screen.findByText('dGVzdA==')).toBeTruthy();
  });

  it('does nothing on non-Enter key', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    expect(screen.queryByText('hello')).toBeNull();
  });

  it('sniffs PNG mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('\x89PNG\r\n\x1a\n');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs JPEG mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('\xff\xd8\xff');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs GIF89a mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('GIF89a');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs GIF87a mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('GIF87a');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs WEBP mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('RIFF\x00\x00\x00WEBP');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs SVG from <svg prefix', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('<svg></svg>');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs SVG from <?xml prefix', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('<?xml version="1.0"?>');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs BMP mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('BM');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('does not show preview for unknown binary data', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('plain text data');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    await waitFor(() => {});
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('falls back to data URL mime when sniffMime returns null', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: {
        value: 'data:application/octet-stream;base64,aGVsbG8=',
      },
    });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('does not show preview when sniffMime null and not data URL', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('copies output to clipboard', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    );
  });

  it('handles clipboard write failure', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error('denied')
    );
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith('Failed to copy')
    );
    (window.alert as jest.Mock).mockRestore();
  });

  it('downloads output with known mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('\x89PNG\r\n\x1a\n');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    await screen.findByAltText('Preview');
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('downloads output with unknown mime type (bin extension)', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('shows output size in bytes', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    expect(screen.getByText(/B\)/)).toBeTruthy();
  });

  it('shows text output when no previewUrl', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('shows file upload only in encode tab', () => {
    const { container } = render(<Base64Tool config={cfg('base64')} />);
    expect(container.querySelector('input[type="file"]')).toBeNull();
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('reads file and sets input in encode mode', async () => {
    const { container } = render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const fileInput = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      const textarea = screen.getByPlaceholderText(/Type text/i);
      expect((textarea as HTMLTextAreaElement).value).toBeTruthy();
    });
  });

  it('handles FileReader error', async () => {
    const origFileReader = global.FileReader;
    class FailingReader {
      result: string | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      readAsDataURL() {
        setTimeout(() => this.onerror?.(), 0);
      }
    }
    global.FileReader = FailingReader as unknown as typeof FileReader;

    const { container } = render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const fileInput = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['x'], 'bad.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText('Failed to read file')).toBeTruthy();
    });
    global.FileReader = origFileReader;
  });

  it('decodes non-image data URL as text output', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'data:text/plain;base64,aGVsbG8=' },
    });
    clickDecode();
    await waitFor(() => {
      expect(screen.queryByAltText('Preview')).toBeNull();
    });
  });

  it('switches back to decode and clears encode input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const textarea = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(textarea, { target: { value: 'some text' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Decode' })[0]);
    const decodedTextarea = screen.getByPlaceholderText(/Paste Base64/i);
    expect((decodedTextarea as HTMLTextAreaElement).value).toBe('');
  });
});
