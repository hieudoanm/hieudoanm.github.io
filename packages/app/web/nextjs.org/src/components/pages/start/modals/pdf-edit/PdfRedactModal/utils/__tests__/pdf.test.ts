import { exportRedactedPdf } from '../pdf';

jest.mock('pdf-lib', () => ({
  PDFDocument: {
    load: jest.fn(),
  },
  rgb: jest.fn(() => ({ r: 0, g: 0, b: 0 })),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

describe('exportRedactedPdf', () => {
  const mockDrawRectangle = jest.fn();
  const mockGetPage = jest.fn();
  const mockSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetPage.mockReturnValue({
      drawRectangle: mockDrawRectangle,
      getHeight: () => 500,
    });

    mockSave.mockResolvedValue(new Uint8Array([1, 2, 3]));

    (PDFDocument.load as jest.Mock).mockResolvedValue({
      getPage: mockGetPage,
      save: mockSave,
    });
  });

  it('loads PDF, draws redactions, and saves', async () => {
    const blob = new Blob(['fake-pdf-content'], { type: 'application/pdf' });
    const file = Object.assign(blob, {
      name: 'test.pdf',
      lastModified: Date.now(),
    }) as File;
    Object.defineProperty(file, 'arrayBuffer', {
      value: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    });
    const redactions = {
      0: [{ x: 10, y: 20, width: 100, height: 30 }],
    };

    await exportRedactedPdf(file, redactions, 1);

    expect(PDFDocument.load).toHaveBeenCalled();
    expect(mockGetPage).toHaveBeenCalledWith(0);
    expect(mockDrawRectangle).toHaveBeenCalledWith({
      x: 10,
      y: 450,
      width: 100,
      height: 30,
      color: { r: 0, g: 0, b: 0 },
    });
    expect(rgb).toHaveBeenCalledWith(0, 0, 0);
    expect(mockSave).toHaveBeenCalled();
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'redacted.pdf');
  });
});
