import { downloadBlob, loadImage, processCanvas } from '@/lib/photo-tools';

const defineUrlMethods = (): void => {
  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: jest.fn(() => 'blob:mock'),
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    value: jest.fn(),
  });
};

describe('downloadBlob', () => {
  it('creates a link, clicks it, and revokes the URL', () => {
    defineUrlMethods();
    const click = jest.fn();
    const anchor = { click, href: '', download: '' };
    document.createElement = jest
      .fn()
      .mockReturnValue(anchor) as unknown as typeof document.createElement;

    downloadBlob(new Blob(['x']), 'out.png');

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
    expect(anchor.download).toBe('out.png');
  });
});

describe('loadImage', () => {
  it('resolves with the image on load', async () => {
    defineUrlMethods();
    const img = { onload: null, src: '' } as unknown as HTMLImageElement;
    (global.Image as unknown as jest.Mock) = jest.fn(() => img);

    const promise = loadImage({ name: 'a.png' } as File);
    img.onload?.(new Event('load'));
    await expect(promise).resolves.toBe(img);
    expect(img.src).toBe('blob:mock');
  });

  it('rejects on error', async () => {
    defineUrlMethods();
    const img = { onerror: null, src: '' } as unknown as HTMLImageElement;
    (global.Image as unknown as jest.Mock) = jest.fn(() => img);

    const promise = loadImage({ name: 'a.png' } as File);
    img.onerror?.(new Event('error'));
    await expect(promise).rejects.toBeInstanceOf(Event);
  });
});

describe('processCanvas', () => {
  it('runs the callback and downloads the processed blob', async () => {
    defineUrlMethods();
    let image:
      | { onload: (() => void) | null; width: number; height: number }
      | undefined;
    (global.Image as unknown as jest.Mock) = jest.fn(() => {
      image = { onload: null, width: 2, height: 2 };
      return image;
    });

    const ctx = { drawImage: jest.fn() } as unknown as CanvasRenderingContext2D;
    const toBlob = jest.fn((cb: (b: Blob | null) => void) => {
      cb(new Blob(['png']));
    });
    const anchor = { click: jest.fn(), href: '', download: '' };
    const canvas = {
      width: 0,
      height: 0,
      getContext: () => ctx,
      toBlob,
    };
    document.createElement = jest
      .fn()
      .mockReturnValueOnce(canvas)
      .mockReturnValueOnce(anchor) as unknown as typeof document.createElement;

    const cb = jest.fn();
    const promise = processCanvas(
      { name: 'a.png', type: 'image/png' } as File,
      cb,
      'image/png',
      'out.png'
    );
    image!.onload!();

    await promise;

    expect(cb).toHaveBeenCalledWith(ctx, image!, canvas);
    expect(anchor.click).toHaveBeenCalled();
    expect(URL.revokeObjectURL as jest.Mock).toHaveBeenCalled();
  });
});
