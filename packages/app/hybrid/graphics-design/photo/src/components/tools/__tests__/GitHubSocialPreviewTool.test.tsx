import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
import { GitHubSocialPreviewTool } from '@/components/tools/GitHubSocialPreviewTool';

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
}));

const REPO = {
  full_name: 'vercel/next.js',
  description: 'The React Framework',
  language: 'TypeScript',
  stargazers_count: 120000,
  forks_count: 25000,
  owner: { avatar_url: 'https://avatars/1.png', login: 'vercel' },
  html_url: 'https://github.com/vercel/next.js',
};

class MockClipboardItem {
  constructor(private payload: Record<string, unknown>) {}
}
Object.defineProperty(global, 'ClipboardItem', {
  writable: true,
  value: MockClipboardItem,
});
beforeEach(() => {
  global.fetch = jest.fn();
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: jest.fn(),
      write: jest.fn().mockResolvedValue(undefined),
    },
  });
});

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

describe('GitHubSocialPreviewTool', () => {
  it('renders repo input and generate button', () => {
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    expect(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo')
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeDisabled();
  });

  it('fetches and renders repo preview', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => REPO,
    });
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'vercel/next.js' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Download PNG/ })).toBeTruthy()
    );
    await flush();
  });

  it('fetches via Enter key from github.com URL', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => REPO,
    });
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, {
      target: { value: 'https://github.com/vercel/next.js' },
    });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Download PNG/ })).toBeTruthy()
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/vercel/next.js'
    );
  });

  it('shows error for invalid repo format', async () => {
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'justaslug' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(
        screen.getByText('Enter a valid repo in owner/repo format.')
      ).toBeTruthy()
    );
  });

  it('shows not found for 404', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'a/b' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByText('Repository not found.')).toBeTruthy()
    );
  });

  it('shows error when fetch rejects', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('boom'));
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'a/b' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() => expect(screen.getByText('boom')).toBeTruthy());
  });

  it('shows generic error on non-Error rejection', async () => {
    (global.fetch as jest.Mock).mockRejectedValue('string-err');
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'a/b' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByText('Failed to fetch repository.')).toBeTruthy()
    );
  });

  it('clicking an example loads it', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => REPO,
    });
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.click(screen.getByRole('button', { name: /facebook\/react/ }));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Download PNG/ })).toBeTruthy()
    );
  });

  it('downloads the repo preview', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => REPO,
    });
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'vercel/next.js' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Download PNG/ })).toBeTruthy()
    );
    fireEvent.click(screen.getByRole('button', { name: /Download PNG/ }));
    await flush();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('copies to clipboard via toBlob', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => REPO,
    });
    render(<GitHubSocialPreviewTool config={cfg('github-social-preview')} />);
    fireEvent.change(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo'),
      {
        target: { value: 'vercel/next.js' },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: '📋 Copy' })).toBeTruthy()
    );
    fireEvent.click(screen.getByRole('button', { name: '📋 Copy' }));
    await flush();
    await waitFor(() =>
      expect(navigator.clipboard.write as jest.Mock).toHaveBeenCalled()
    );
  });
});
