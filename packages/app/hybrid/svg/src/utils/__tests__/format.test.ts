import {
  formatRelativeTime,
  formatFileSize,
  generateId,
  snapToGrid,
  generateShapeSVG,
  exportAsSVG,
  downloadFile,
  copyToClipboard,
  exportAsPNG,
} from '@/utils/format';
import type { SVGDocument, SVGShape } from '@/types';

const shape = (overrides: Partial<SVGShape> = {}): SVGShape => ({
  id: 's1',
  type: 'rect',
  name: 'Rect',
  x: 10,
  y: 20,
  width: 100,
  height: 50,
  rotation: 0,
  fill: { type: 'solid', color: '#3b82f6', opacity: 1 },
  stroke: {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round',
    join: 'round',
  },
  opacity: 1,
  locked: false,
  visible: true,
  ...overrides,
});

describe('formatRelativeTime', () => {
  it('returns "just now" for less than a minute', () => {
    expect(formatRelativeTime(Date.now() - 1000)).toBe('just now');
  });

  it('returns minutes ago', () => {
    expect(formatRelativeTime(Date.now() - 60000 * 5)).toBe('5 min ago');
  });

  it('returns hours ago', () => {
    expect(formatRelativeTime(Date.now() - 3600000 * 3)).toBe('3h ago');
  });

  it('returns days ago', () => {
    expect(formatRelativeTime(Date.now() - 86400000 * 4)).toBe('4d ago');
  });

  it('returns a locale date string for a week or more', () => {
    const ts = Date.now() - 86400000 * 10;
    expect(formatRelativeTime(ts)).toBe(new Date(ts).toLocaleDateString());
  });
});

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(2097152)).toBe('2.0 MB');
  });
});

describe('generateId', () => {
  it('generates unique timestamp-prefixed ids', () => {
    const a = generateId();
    const b = generateId();
    expect(a).toContain('-');
    expect(a).not.toBe(b);
  });
});

describe('snapToGrid', () => {
  it('snaps a value to the nearest grid multiple', () => {
    expect(snapToGrid(23, 10)).toBe(20);
    expect(snapToGrid(25, 10)).toBe(30);
  });
});

describe('generateShapeSVG', () => {
  it('renders a rect with rotation and rx', () => {
    const svg = generateShapeSVG(shape({ rotation: 15, rx: 8 }));
    expect(svg).toContain('<rect');
    expect(svg).toContain('rx="8"');
    expect(svg).toContain('rotate(15 60 45)');
    expect(svg).toContain('stroke-width="2"');
  });

  it('renders an ellipse', () => {
    const svg = generateShapeSVG(shape({ type: 'ellipse' }));
    expect(svg).toContain('<ellipse');
    expect(svg).toContain('cx="60"');
  });

  it('renders a line', () => {
    const svg = generateShapeSVG(shape({ type: 'line' }));
    expect(svg).toContain('<line');
    expect(svg).toContain('x1="10"');
  });

  it('renders a path with pathData', () => {
    const svg = generateShapeSVG(
      shape({ type: 'path', pathData: 'M0 0 L10 10' })
    );
    expect(svg).toContain('<path');
    expect(svg).toContain('d="M0 0 L10 10"');
  });

  it('renders text with font properties', () => {
    const svg = generateShapeSVG(
      shape({
        type: 'text',
        text: 'Hello',
        fontFamily: 'Georgia',
        fontSize: 20,
      })
    );
    expect(svg).toContain('<text');
    expect(svg).toContain('font-family="Georgia"');
    expect(svg).toContain('>Hello</text>');
  });

  it('falls back to defaults for a path without pathData', () => {
    const svg = generateShapeSVG(shape({ type: 'path' }));
    expect(svg).toContain('d=""');
  });

  it('falls back to defaults for text without font and content', () => {
    const svg = generateShapeSVG(shape({ type: 'text' }));
    expect(svg).toContain('font-family="Arial"');
    expect(svg).toContain('font-size="16"');
    expect(svg).toContain('></text>');
  });

  it('uses none, gradient url, and no-stroke variants', () => {
    expect(
      generateShapeSVG(shape({ fill: { type: 'none', color: '', opacity: 0 } }))
    ).toContain('fill="none"');
    expect(
      generateShapeSVG(
        shape({
          fill: { type: 'gradient', color: '', gradientId: 'g1', opacity: 1 },
        })
      )
    ).toContain('fill="url(#g1)"');
    expect(
      generateShapeSVG(shape({ stroke: { ...shape().stroke, width: 0 } }))
    ).toContain('stroke="none"');
  });

  it('omits the transform when rotation is zero', () => {
    expect(generateShapeSVG(shape())).not.toContain('transform');
  });

  it('returns an empty string for unsupported shape types', () => {
    expect(generateShapeSVG(shape({ type: 'star' }))).toBe('');
  });
});

describe('exportAsSVG', () => {
  it('serializes shapes into an svg document', () => {
    const doc: SVGDocument = {
      id: 'doc-1',
      title: 'Doc',
      width: 200,
      height: 100,
      shapes: [shape()],
      layers: [],
      symbols: [],
      gradients: [],
      createdAt: 0,
      updatedAt: 0,
    };
    const svg = exportAsSVG(doc);
    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 200 100"');
    expect(svg).toContain('<rect');
  });
});

describe('downloadFile', () => {
  it('creates a link and clicks it', () => {
    const clickSpy = jest.fn();
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return {
          href: '',
          download: '',
          click: clickSpy,
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tag);
    });
    URL.createObjectURL = jest.fn(() => 'blob:url');
    URL.revokeObjectURL = jest.fn();
    downloadFile('<svg/>', 'doc.svg');
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});

describe('copyToClipboard', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('returns true when the write succeeds', async () => {
    writeText.mockResolvedValue(undefined);
    await expect(copyToClipboard('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false when the write fails', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    await expect(copyToClipboard('hello')).resolves.toBe(false);
  });
});

describe('exportAsPNG', () => {
  const originalCreateElement = document.createElement;
  const originalImage = global.Image;

  afterEach(() => {
    jest.restoreAllMocks();
    document.createElement = originalCreateElement;
    global.Image = originalImage;
  });

  const mockCanvas = () => {
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(() => ({
              scale: jest.fn(),
              drawImage: jest.fn(),
            })) as unknown as HTMLCanvasElement['getContext'];
            (el as HTMLCanvasElement).toBlob = jest.fn(
              (cb: (b: Blob | null) => void) => cb(new Blob())
            );
          }
          return el;
        }
      );
  };

  const mockImage = () => {
    global.Image = class {
      width = 50;
      height = 40;
      onload: (() => void) | null = null;
      set src(_url: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      get src() {
        return '';
      }
    } as unknown as typeof Image;
  };

  it('resolves with a blob after the image loads', async () => {
    mockCanvas();
    mockImage();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const blob = await exportAsPNG(svg as unknown as SVGSVGElement, 2);
    expect(blob).toBeInstanceOf(Blob);
  });

  it('resolves null when the 2d context is unavailable', async () => {
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(
              () => null
            ) as unknown as HTMLCanvasElement['getContext'];
          }
          return el;
        }
      );
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    await expect(
      exportAsPNG(svg as unknown as SVGSVGElement)
    ).resolves.toBeNull();
  });
});
