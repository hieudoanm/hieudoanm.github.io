import { renderToCanvas } from '../render';

describe('renderToCanvas', () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d')!;
    ctx.drawImage = jest.fn() as any;
    jest.clearAllMocks();
  });

  it('calls callback with data URL on successful load', (done) => {
    const OrigImage = global.Image;
    const origToDataURL = HTMLCanvasElement.prototype.toDataURL;

    HTMLCanvasElement.prototype.toDataURL = jest.fn(
      () => 'data:image/png;base64,mock'
    );

    global.Image = class {
      onload: (() => void) | null = null;
      naturalWidth = 100;
      naturalHeight = 200;
      set src(_url: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      get src() {
        return '';
      }
    } as any;

    renderToCanvas(canvas, 'img.png', 10, '', (url) => {
      expect(url).toContain('data:image/png');
      global.Image = OrigImage;
      HTMLCanvasElement.prototype.toDataURL = origToDataURL;
      done();
    });
  });

  it('calculates padding and canvas size correctly', (done) => {
    const OrigImage = global.Image;
    const origToDataURL = HTMLCanvasElement.prototype.toDataURL;

    HTMLCanvasElement.prototype.toDataURL = jest.fn(
      () => 'data:image/png;base64,mock'
    );

    global.Image = class {
      onload: (() => void) | null = null;
      naturalWidth = 100;
      naturalHeight = 100;
      set src(_url: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      get src() {
        return '';
      }
    } as any;

    renderToCanvas(canvas, 'img.png', 50, '', () => {
      const maxDim = 100;
      const paddingPx = Math.round((50 / 100) * maxDim);
      const size = maxDim + paddingPx * 2;
      expect(canvas.width).toBe(size);
      expect(canvas.height).toBe(size);
      global.Image = OrigImage;
      HTMLCanvasElement.prototype.toDataURL = origToDataURL;
      done();
    });
  });
});
