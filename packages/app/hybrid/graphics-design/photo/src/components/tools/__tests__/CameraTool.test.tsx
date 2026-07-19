import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { CameraTool } from '@/components/tools/CameraTool';

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
  shadowColor: '',
  shadowBlur: 0,
  lineWidth: 1,
  globalAlpha: 1,
  imageSmoothingEnabled: true,
  textBaseline: '',
  lineJoin: '',
  lineCap: '',
  setLineDash: jest.fn(),
  getLineDash: jest.fn(() => []),
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

Object.defineProperty(navigator, 'mediaDevices', {
  configurable: true,
  value: {
    getUserMedia: jest
      .fn()
      .mockResolvedValue({ getTracks: () => [{ stop: jest.fn() }] }),
  },
});
const setVideoDims = (container: HTMLElement, w: number, h: number) => {
  const video = container.querySelector('video') as HTMLVideoElement | null;
  if (video) {
    Object.defineProperty(video, 'videoWidth', {
      configurable: true,
      value: w,
    });
    Object.defineProperty(video, 'videoHeight', {
      configurable: true,
      value: h,
    });
  }
};
const captureBtn = (container: HTMLElement) =>
  container.querySelector('button.group') as HTMLButtonElement | null;

describe('CameraTool', () => {
  it('initialises camera and renders controls', async () => {
    const { container } = render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
    expect(container.querySelector('video')).toBeTruthy();
    expect(screen.getByText('Ratio')).toBeTruthy();
    expect(screen.getByText('Flip')).toBeTruthy();
  });

  it('switches overlay modes', async () => {
    render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    fireEvent.click(screen.getByRole('button', { name: 'thirds' }));
    fireEvent.click(screen.getByRole('button', { name: 'symmetry' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clean' }));
  });

  it('switches ratio and camera facing', async () => {
    const { container } = render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    fireEvent.click(screen.getByRole('button', { name: '1:1' }));
    const camBtn = Array.from(container.querySelectorAll('button')).find(
      (b) => b !== captureBtn(container) && b.querySelector('path') !== null
    );
    if (camBtn) fireEvent.click(camBtn);
  });

  it('captures landscape video (crop width, user mirror)', async () => {
    const { container } = render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    setVideoDims(container, 1280, 720);
    const btn = captureBtn(container);
    fireEvent.click(btn!);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('captures portrait video (crop height) after switching camera', async () => {
    const { container } = render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    const flip = container.querySelector('button.btn-circle[data-flip]');
    const camBtn = Array.from(container.querySelectorAll('button')).find(
      (b) =>
        b !== captureBtn(container) &&
        b.querySelector('path') &&
        !b.querySelector('span')
    );
    if (camBtn) fireEvent.click(camBtn);
    setVideoDims(container, 720, 1280);
    const btn = captureBtn(container);
    fireEvent.click(btn!);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  });

  it('shows generic error when getUserMedia rejects with non-Error', async () => {
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValue(
      'denied'
    );
    render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(screen.getByText('Could not access camera')).toBeTruthy();
  });

  it('shows message when getUserMedia rejects with Error', async () => {
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValue(
      new Error('denied')
    );
    render(<CameraTool config={cfg('camera')} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(screen.getByText('denied')).toBeTruthy();
  });
});
