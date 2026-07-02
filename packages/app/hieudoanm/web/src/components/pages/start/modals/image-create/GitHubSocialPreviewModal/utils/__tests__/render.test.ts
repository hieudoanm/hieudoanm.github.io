import { renderPreview } from '../render';

const createMockContext = () => ({
  fillRect: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 50 })),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  quadraticCurveTo: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn(),
  clip: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  strokeStyle: '',
  fillStyle: '',
  lineWidth: 1,
  font: '',
  textAlign: 'left' as CanvasTextAlign,
});

const createMockCanvas = (ctx: ReturnType<typeof createMockContext>) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  jest
    .spyOn(canvas, 'getContext')
    .mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
  return canvas;
};

const mockRepo = {
  full_name: 'facebook/react',
  description: 'A declarative library for building UIs.',
  stargazers_count: 200000,
  forks_count: 42000,
  watchers_count: 5000,
  language: 'TypeScript',
  topics: [
    'react',
    'ui',
    'javascript',
    'declarative',
    'components',
    'virtual-dom',
  ],
  owner: { login: 'facebook', avatar_url: 'https://example.com/avatar.png' },
  license: { spdx_id: 'MIT' },
  open_issues_count: 500,
};

beforeAll(() => {
  globalThis.Image = class Image {
    crossOrigin: string | null = null;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src = '';
    constructor() {
      setTimeout(() => this.onload?.(), 0);
    }
  } as unknown as typeof Image;
});

describe('renderPreview', () => {
  it('should render the preview canvas with repo data', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, mockRepo);

    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.fillText).toHaveBeenCalled();
    expect(ctx.createLinearGradient).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalled();
  });

  it('should render repo fields on canvas', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, mockRepo);

    const calls = (ctx.fillText as jest.Mock).mock.calls;
    const textContent = calls.map((c: string[]) => c[0]).join(' ');
    expect(textContent).toContain('facebook');
    expect(textContent).toContain('react');
    expect(textContent).toContain('A declarative library');
    expect(textContent).toContain('200.0k');
  });

  it('should round rect for stat cards', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, mockRepo);

    expect(ctx.quadraticCurveTo).toHaveBeenCalled();
  });

  it('should handle null description', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, { ...mockRepo, description: null });

    expect(ctx.fillText).toHaveBeenCalled();
  });

  it('should handle missing license', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, { ...mockRepo, license: null });

    expect(ctx.fillRect).toHaveBeenCalled();
  });

  it('should handle missing language', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, { ...mockRepo, language: null });

    expect(ctx.fillRect).toHaveBeenCalled();
  });

  it('should handle empty topics', async () => {
    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, { ...mockRepo, topics: [] });

    expect(ctx.fillRect).toHaveBeenCalled();
  });

  it('should handle avatar load error gracefully', async () => {
    globalThis.Image = class Image {
      crossOrigin: string | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src = '';
      constructor() {
        setTimeout(() => this.onerror?.(), 0);
      }
    } as unknown as typeof Image;

    const ctx = createMockContext();
    const canvas = createMockCanvas(ctx);

    await renderPreview(canvas, mockRepo);

    expect(ctx.fillRect).toHaveBeenCalled();
  });
});
