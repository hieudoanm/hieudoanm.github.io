/**
 * @jest-environment jsdom
 */
import { svgToCanvas } from '../svgToCanvas';

describe('svgToCanvas', () => {
  const originalImage = global.Image;
  const originalCreateElement = document.createElement;

  beforeAll(() => {
    URL.createObjectURL = jest.fn(() => 'blob:http://localhost/test');
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.Image = originalImage;
  });

  const mockImage = (loads: boolean) => {
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_url: string) {
        setTimeout(() => (loads ? this.onload?.() : this.onerror?.()), 0);
      }
      get src() {
        return '';
      }
    } as unknown as typeof Image;
  };

  const mockCanvasContext = () => {
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(() => ({
              imageSmoothingEnabled: false,
              imageSmoothingQuality: 'low',
              drawImage: jest.fn(),
            })) as unknown as HTMLCanvasElement['getContext'];
          }
          return el;
        }
      );
  };

  it('rejects on image load error', async () => {
    mockImage(false);
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    await expect(svgToCanvas(svg, 100)).rejects.toThrow('Failed to render SVG');
  });

  it('rejects invalid svg without svg root', async () => {
    mockImage(true);
    await expect(svgToCanvas('<circle r="10"/>', 100)).rejects.toThrow(
      'Invalid SVG'
    );
  });

  it('resolves with canvas at requested size', async () => {
    mockImage(true);
    mockCanvasContext();
    const svg =
      '<svg width="100" height="50" xmlns="http://www.w3.org/2000/svg"></svg>';
    const canvas = await svgToCanvas(svg, 200);
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);
  });

  it('uses viewBox dimensions when width/height are absent', async () => {
    mockImage(true);
    mockCanvasContext();
    const svg =
      '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"></svg>';
    const canvas = await svgToCanvas(svg, 128);
    expect(canvas.width).toBe(128);
    expect(canvas.height).toBe(128);
  });

  it('rejects when 2d context is unavailable', async () => {
    mockImage(true);
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
    await expect(
      svgToCanvas('<svg xmlns="http://www.w3.org/2000/svg"/>', 100)
    ).rejects.toThrow('Canvas 2D context unavailable');
  });
});
