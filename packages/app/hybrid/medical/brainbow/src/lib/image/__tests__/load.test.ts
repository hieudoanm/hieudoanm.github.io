import {
  ImageLoadError,
  loadChannelImageFile,
  loadImageFile,
  loadImageFiles,
} from '@/lib/image/load';

const tinyTiff = (pixel: number): Uint8Array<ArrayBuffer> => {
  const bytes = new Uint8Array(123);
  const view = new DataView(bytes.buffer);
  bytes.set([0x49, 0x49, 0x2a, 0x00]);
  view.setUint32(4, 8, true);
  const entries = [
    [0x0100, 4, 1],
    [0x0101, 4, 1],
    [0x0102, 3, 8],
    [0x0103, 3, 1],
    [0x0106, 3, 1],
    [0x0111, 4, 122],
    [0x0115, 3, 1],
    [0x0116, 4, 1],
    [0x0117, 4, 1],
  ];
  view.setUint16(8, entries.length, true);
  entries.forEach(([tag, type, value], i) => {
    const pos = 10 + i * 12;
    view.setUint16(pos, tag, true);
    view.setUint16(pos + 2, type, true);
    view.setUint32(pos + 4, 1, true);
    view.setUint32(pos + 8, value, true);
  });
  bytes[122] = pixel;
  return bytes;
};

describe('loadImageFile', () => {
  const makeBitmap = (width: number, height: number): ImageBitmap =>
    ({ width, height, close: jest.fn() }) as unknown as ImageBitmap;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('rejects unsupported file types', async () => {
    const file = new File(['x'], 'data.pdf', { type: 'application/pdf' });
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
    const bad = new File(['x'], 'b.pdf', { type: 'application/pdf' });
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

describe('loadChannelImageFile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('parses TIFF bytes into a channel raster', async () => {
    const bytes = tinyTiff(123);
    const file = new File([bytes], 'tiny.tif', { type: 'image/tiff' });
    file.arrayBuffer = jest.fn().mockResolvedValue(bytes.buffer as ArrayBuffer);
    const loaded = await loadChannelImageFile(file);
    expect(loaded.name).toBe('tiny.tif');
    expect(loaded.raster.width).toBe(1);
    expect(loaded.raster.height).toBe(1);
    expect(loaded.raster.planes).toHaveLength(1);
    expect(Array.from(loaded.raster.planes[0].data)).toEqual([123]);
    expect(loaded.calibration.pixelsPerMicron).toBeNull();
  });

  it('falls back to PNG decoding with no calibration', async () => {
    Object.defineProperty(window, 'createImageBitmap', {
      configurable: true,
      value: jest.fn().mockResolvedValue({
        width: 2,
        height: 1,
        close: jest.fn(),
      }),
    });
    document.createElement = jest.fn().mockReturnValue({
      width: 0,
      height: 0,
      getContext: jest.fn().mockReturnValue({
        drawImage: jest.fn(),
        getImageData: jest.fn().mockReturnValue({
          data: new Uint8ClampedArray(8).fill(0),
        }),
      }),
    }) as jest.Mock;

    const file = new File(['x'], 'a.png', { type: 'image/png' });
    file.arrayBuffer = jest
      .fn()
      .mockResolvedValue(new Uint8Array([1, 2]).buffer as ArrayBuffer);
    const loaded = await loadChannelImageFile(file);
    expect(loaded.raster.planes).toHaveLength(3);
    expect(loaded.calibration.pixelsPerMicron).toBeNull();
  });
});
