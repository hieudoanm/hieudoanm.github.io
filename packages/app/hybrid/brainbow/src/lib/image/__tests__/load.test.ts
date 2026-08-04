import {
  ImageLoadError,
  loadImageFile,
  loadImageFiles,
} from '@/lib/image/load';

describe('loadImageFile', () => {
  const makeBitmap = (width: number, height: number): ImageBitmap =>
    ({ width, height, close: jest.fn() }) as unknown as ImageBitmap;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('rejects unsupported file types', async () => {
    const file = new File(['x'], 'data.tiff', { type: 'image/tiff' });
    await expect(loadImageFile(file)).rejects.toThrow(ImageLoadError);
  });

  it('throws when createImageBitmap is unavailable', async () => {
    const file = new File(['x'], 'data.png', { type: 'image/png' });
    Object.defineProperty(window, 'createImageBitmap', {
      configurable: true,
      value: undefined,
    });
    await expect(loadImageFile(file)).rejects.toThrow('not supported');
  });

  it('returns a raster matching the decoded bitmap', async () => {
    const file = new File(['x'], 'data.png', { type: 'image/png' });
    Object.defineProperty(window, 'createImageBitmap', {
      configurable: true,
      value: jest.fn().mockResolvedValue(makeBitmap(4, 3)),
    });
    document.createElement = jest.fn().mockReturnValue({
      width: 0,
      height: 0,
      getContext: jest.fn().mockReturnValue({
        drawImage: jest.fn(),
        getImageData: jest.fn().mockReturnValue({
          data: new Uint8ClampedArray(4 * 3 * 4).fill(1),
        }),
      }),
    }) as jest.Mock;

    const raster = await loadImageFile(file);
    expect(raster.width).toBe(4);
    expect(raster.height).toBe(3);
    expect(raster.data.length).toBe(48);
  });
});

describe('loadImageFiles', () => {
  it('returns only successfully decoded files', async () => {
    const good = new File(['x'], 'a.png', { type: 'image/png' });
    const bad = new File(['x'], 'b.tiff', { type: 'image/tiff' });
    Object.defineProperty(window, 'createImageBitmap', {
      configurable: true,
      value: jest
        .fn()
        .mockResolvedValue({ width: 1, height: 1, close: jest.fn() }),
    });
    document.createElement = jest.fn().mockReturnValue({
      width: 0,
      height: 0,
      getContext: jest.fn().mockReturnValue({
        drawImage: jest.fn(),
        getImageData: jest.fn().mockReturnValue({
          data: new Uint8ClampedArray(4),
        }),
      }),
    }) as jest.Mock;

    const rasters = await loadImageFiles([good, bad]);
    expect(rasters).toHaveLength(1);
    expect(rasters[0].width).toBe(1);
  });
});
