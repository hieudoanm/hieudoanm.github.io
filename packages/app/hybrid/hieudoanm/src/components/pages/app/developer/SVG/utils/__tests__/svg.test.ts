/**
 * @jest-environment jsdom
 */
import { svgToCanvas } from '../svg';

describe('svgToCanvas', () => {
  beforeAll(() => {
    URL.createObjectURL = jest.fn(() => 'blob:http://localhost/test');
    URL.revokeObjectURL = jest.fn();
  });

  it('rejects on image load error', async () => {
    const OrigImage = global.Image;
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_url: string) {
        setTimeout(() => this.onerror?.(), 0);
      }
      get src() {
        return '';
      }
    } as any;

    const svg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    await expect(svgToCanvas(svg, 100)).rejects.toThrow('Failed to render SVG');

    global.Image = OrigImage;
  });

  it('resolves with canvas element with correct dimensions', async () => {
    const OrigImage = global.Image;
    const origCreateElement = document.createElement.bind(document);
    let capturedCanvas: HTMLCanvasElement | null = null;

    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = origCreateElement(tagName, options);
          if (tagName === 'canvas') {
            capturedCanvas = el as HTMLCanvasElement;
            const ctx = capturedCanvas.getContext('2d')!;
            ctx.drawImage = jest.fn() as any;
          }
          return el;
        }
      );

    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      naturalWidth = 100;
      naturalHeight = 100;
      set src(_url: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      get src() {
        return '';
      }
    } as any;

    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>';
    const canvas = await svgToCanvas(svg, 200);

    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);

    global.Image = OrigImage;
    jest.restoreAllMocks();
  });
});
