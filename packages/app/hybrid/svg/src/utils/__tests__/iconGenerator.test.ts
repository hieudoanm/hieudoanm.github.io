/**
 * @jest-environment jsdom
 */
import { generateIcons, readSvgFile, downloadIconsZip } from '../iconGenerator';
import { svgToCanvas } from '../svgToCanvas';

jest.mock('../svgToCanvas', () => ({
  svgToCanvas: jest.fn(),
}));

const mockedSvgToCanvas = svgToCanvas as jest.MockedFunction<
  typeof svgToCanvas
>;

const mockCanvas = (): HTMLCanvasElement =>
  ({
    toDataURL: jest.fn(() => 'data:image/png;base64,aaa'),
  }) as unknown as HTMLCanvasElement;

describe('generateIcons', () => {
  beforeEach(() => jest.clearAllMocks());

  it('generates an icon for each requested size', async () => {
    const canvas = mockCanvas();
    mockedSvgToCanvas.mockResolvedValue(canvas);

    const icons = await generateIcons('<svg/>', [16, 32]);

    expect(mockedSvgToCanvas).toHaveBeenCalledTimes(2);
    expect(mockedSvgToCanvas).toHaveBeenCalledWith('<svg/>', 16);
    expect(mockedSvgToCanvas).toHaveBeenCalledWith('<svg/>', 32);
    expect(icons).toEqual([
      { size: 16, dataUrl: 'data:image/png;base64,aaa', canvas },
      { size: 32, dataUrl: 'data:image/png;base64,aaa', canvas },
    ]);
  });

  it('rejects when svgToCanvas fails', async () => {
    mockedSvgToCanvas.mockRejectedValue(new Error('Render failed'));
    await expect(generateIcons('<svg/>', [16])).rejects.toThrow(
      'Render failed'
    );
  });
});

describe('readSvgFile', () => {
  it('rejects non-svg file type', async () => {
    const file = new File(['x'], 'test.txt', { type: 'text/plain' });
    await expect(readSvgFile(file)).resolves.toEqual({
      ok: false,
      reason: 'type',
    });
  });

  it('rejects svg file without svg content', async () => {
    const file = new File(['not svg'], 'test.svg', { type: 'image/svg+xml' });
    await expect(readSvgFile(file)).resolves.toEqual({
      ok: false,
      reason: 'content',
    });
  });

  it('accepts valid svg file', async () => {
    const file = new File(['<svg>ok</svg>'], 'test.svg', {
      type: 'image/svg+xml',
    });
    await expect(readSvgFile(file)).resolves.toEqual({
      ok: true,
      text: '<svg>ok</svg>',
    });
  });
});

describe('downloadIconsZip', () => {
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:url');
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => jest.restoreAllMocks());

  it('creates a zip and triggers a download', async () => {
    const clickSpy = jest.fn();
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

    const icons = [
      {
        size: 16,
        dataUrl: 'data:image/png;base64,aaa',
        canvas: {
          toBlob: (cb: (b: Blob | null) => void) => cb(new Blob()),
        } as unknown as HTMLCanvasElement,
      },
    ];

    await downloadIconsZip(icons, 'custom.zip');

    expect(clickSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('rejects when canvas toBlob returns null', async () => {
    const icons = [
      {
        size: 16,
        dataUrl: 'data:image/png;base64,aaa',
        canvas: {
          toBlob: (cb: (b: Blob | null) => void) => cb(null),
        } as unknown as HTMLCanvasElement,
      },
    ];

    await expect(downloadIconsZip(icons)).rejects.toThrow(
      'Failed to convert canvas to blob'
    );
  });
});
