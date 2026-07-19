import {
  parsePageRange,
  extractPdfTextSimple,
  mergePDFs,
  splitPDF,
  extractText,
  extractImages,
  compressPDF,
  rotatePDF,
  addWatermark,
  getPDFInfo,
  setPDFMetadata,
  ocrPDF,
  exportRedactedPdf,
  downloadBlob,
} from '@/lib/pdf-tools';

const mockPage = () => ({
  drawText: jest.fn(),
  drawRectangle: jest.fn(),
  setRotation: jest.fn(),
  getSize: jest.fn(() => ({ width: 595, height: 842 })),
  getHeight: jest.fn(() => 842),
  getWidth: jest.fn(() => 595),
});

const mockDoc = () => ({
  addPage: jest.fn(() => mockPage()),
  copyPages: jest.fn(async (_src: unknown, indices: number[]) =>
    indices.map(() => mockPage())
  ),
  save: jest.fn(async () => new Uint8Array([9, 8, 7])),
  getPageCount: jest.fn(() => 3),
  getPage: jest.fn(() => mockPage()),
  getPages: jest.fn(() => [mockPage(), mockPage(), mockPage()]),
  getPageIndices: jest.fn(() => [0, 1, 2]),
  embedFont: jest.fn(async () => ({})),
  setTitle: jest.fn(),
  setAuthor: jest.fn(),
  setSubject: jest.fn(),
  setKeywords: jest.fn(),
  getTitle: jest.fn<string | undefined, []>(() => 'Doc Title'),
  getAuthor: jest.fn<string | undefined, []>(() => 'Jane'),
  getSubject: jest.fn<string | undefined, []>(() => 'Subject'),
  getKeywords: jest.fn<string | undefined, []>(() => 'a, b,c'),
});

jest.mock('pdf-lib', () => ({
  PDFDocument: {
    create: jest.fn(async () => mockDoc()),
    load: jest.fn(async () => mockDoc()),
  },
  StandardFonts: { Helvetica: 'Helvetica' },
  rgb: jest.fn((r: number, g: number, b: number) => ({ r, g, b })),
  degrees: jest.fn((deg: number) => ({ degrees: deg })),
}));

jest.mock('react-pdf', () => ({
  pdfjs: { getDocument: jest.fn() },
}));

jest.mock('tesseract.js', () => ({
  recognize: jest.fn(async () => ({ data: { text: 'recognized text' } })),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const { PDFDocument } = jest.requireMock('pdf-lib') as {
  PDFDocument: { create: jest.Mock; load: jest.Mock };
};
const { pdfjs } = jest.requireMock('react-pdf') as {
  pdfjs: { getDocument: jest.Mock };
};
const { saveAs } = jest.requireMock('file-saver') as { saveAs: jest.Mock };

type MockDoc = ReturnType<typeof mockDoc>;
type MockPage = ReturnType<typeof mockPage>;

const makeFile = (content = 'pdf data'): File =>
  ({
    name: 'a.pdf',
    type: 'application/pdf',
    size: content.length,
    arrayBuffer: jest.fn(async () => new Uint8Array([1, 2, 3]).buffer),
  }) as unknown as File;

const lastLoadedDoc = async (): Promise<MockDoc> => {
  const results = PDFDocument.load.mock.results;
  return (await results[results.length - 1].value) as MockDoc;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('parsePageRange', () => {
  it('returns all pages for an empty range', () => {
    expect(parsePageRange('', 5)).toEqual([0, 1, 2, 3, 4]);
    expect(parsePageRange('   ', 3)).toEqual([0, 1, 2]);
  });

  it('parses comma separated single pages and ranges', () => {
    expect(parsePageRange('1,3-5', 5)).toEqual([0, 2, 3, 4]);
    expect(parsePageRange('2-4', 6)).toEqual([1, 2, 3]);
  });

  it('ignores out of range and non positive values', () => {
    expect(parsePageRange('0,6', 5)).toEqual([]);
    expect(parsePageRange('99', 3)).toEqual([]);
  });

  it('clamps ranges to the total page count', () => {
    expect(parsePageRange('3-9', 5)).toEqual([2, 3, 4]);
  });

  it('sorts and dedupes the result', () => {
    expect(parsePageRange('3-4,1,2', 5)).toEqual([0, 1, 2, 3]);
  });
});

describe('extractPdfTextSimple', () => {
  const bytes = (s: string) =>
    new TextEncoder().encode(s).buffer as ArrayBuffer;

  it('extracts text from simple Tj operators', () => {
    expect(extractPdfTextSimple(bytes('(Hello World)Tj'))).toBe('Hello World');
  });

  it('handles escaped parentheses inside strings', () => {
    expect(extractPdfTextSimple(bytes('(Hello \\(World)Tj'))).toBe(
      'Hello (World'
    );
    expect(extractPdfTextSimple(bytes('(A\\)B)Tj'))).toBe('A)B');
  });

  it('returns the failure message when no text operators exist', () => {
    expect(extractPdfTextSimple(bytes('not a pdf at all'))).toBe(
      'Text extraction failed. Try a different PDF.'
    );
  });

  it('skips operator fragments that do not look like Tj', () => {
    expect(extractPdfTextSimple(bytes('(ignored) BT'))).toBe(
      'Text extraction failed. Try a different PDF.'
    );
  });

  it('handles a trailing escape at the end of the buffer', () => {
    expect(extractPdfTextSimple(bytes('(abc\\'))).toBe(
      'Text extraction failed. Try a different PDF.'
    );
  });
});

describe('mergePDFs', () => {
  it('combines pages from multiple files', async () => {
    const result = await mergePDFs([makeFile('a'), makeFile('b')]);
    expect(PDFDocument.create).toHaveBeenCalledTimes(1);
    expect(PDFDocument.load).toHaveBeenCalledTimes(2);
    expect(result).toEqual(new Uint8Array([9, 8, 7]));
  });
});

describe('splitPDF', () => {
  it('splits into one pdf per requested page', async () => {
    const results = await splitPDF(makeFile(), '1-2');
    expect(results).toHaveLength(2);
    const created = PDFDocument.create.mock.results;
    expect(created).toHaveLength(2);
    const first = (await created[0].value) as MockDoc;
    const second = (await created[1].value) as MockDoc;
    expect(first.copyPages).toHaveBeenCalledWith(expect.anything(), [0]);
    expect(second.copyPages).toHaveBeenCalledWith(expect.anything(), [1]);
    expect(first.addPage).toHaveBeenCalledTimes(1);
    expect(first.save).toHaveBeenCalled();
  });

  it('splits all pages when no range is given', async () => {
    const results = await splitPDF(makeFile());
    expect(results).toHaveLength(3);
    expect(PDFDocument.create).toHaveBeenCalledTimes(3);
  });

  it('handles comma separated single pages', async () => {
    const results = await splitPDF(makeFile(), '1,3');
    expect(results).toHaveLength(2);
    const created = PDFDocument.create.mock.results;
    const first = (await created[0].value) as MockDoc;
    const second = (await created[1].value) as MockDoc;
    expect(first.copyPages).toHaveBeenCalledWith(expect.anything(), [0]);
    expect(second.copyPages).toHaveBeenCalledWith(expect.anything(), [2]);
  });

  it('ignores out of range single pages', async () => {
    const results = await splitPDF(makeFile(), '0,99');
    expect(results).toHaveLength(0);
  });

  it('handles an open ended range', async () => {
    const results = await splitPDF(makeFile(), '2-');
    expect(results).toHaveLength(1);
  });
});

describe('extractText', () => {
  it('extracts text from every page via pdfjs', async () => {
    pdfjs.getDocument.mockReturnValue({
      promise: Promise.resolve({
        numPages: 2,
        getPage: async (n: number) => ({
          getTextContent: async () => ({
            items:
              n === 1
                ? [{ noStr: true }]
                : [{ str: 'Hello' }, { str: 'World' }],
          }),
        }),
      }),
    });
    const text = await extractText(makeFile());
    expect(text).toBe('\n\nHello World');
  });
});

describe('extractImages', () => {
  beforeEach(() => {
    (global as unknown as { OffscreenCanvas: unknown }).OffscreenCanvas =
      class {
        width: number;
        height: number;
        constructor(width: number, height: number) {
          this.width = width;
          this.height = height;
        }
        getContext() {
          return {};
        }
        convertToBlob() {
          return Promise.resolve(new Blob());
        }
      };
  });

  it('renders every page to a blob', async () => {
    pdfjs.getDocument.mockReturnValue({
      promise: Promise.resolve({
        numPages: 1,
        getPage: async () => ({
          getViewport: () => ({ width: 100, height: 200 }),
          render: () => ({ promise: Promise.resolve() }),
        }),
      }),
    });
    const blobs = await extractImages(makeFile());
    expect(blobs).toHaveLength(1);
    expect(blobs[0]).toBeInstanceOf(Blob);
  });
});

describe('compressPDF', () => {
  it('re-saves the pdf with object streams', async () => {
    const result = await compressPDF(makeFile());
    const doc = await lastLoadedDoc();
    expect(doc.save).toHaveBeenCalledWith({ useObjectStreams: true });
    expect(result).toEqual(new Uint8Array([9, 8, 7]));
  });
});

describe('rotatePDF', () => {
  it('rotates every page when no page numbers are given', async () => {
    await rotatePDF(makeFile(), 90);
    const doc = await lastLoadedDoc();
    expect(doc.getPages).toHaveBeenCalled();
    const pages = doc.getPages.mock.results[0].value as MockPage[];
    for (const page of pages) {
      expect(page.setRotation).toHaveBeenCalledWith({ degrees: 90 });
    }
  });

  it('rotates only the requested pages', async () => {
    await rotatePDF(makeFile(), 180, [2]);
    const doc = await lastLoadedDoc();
    expect(doc.getPage).toHaveBeenCalledWith(1);
    const page = doc.getPage.mock.results[0].value as MockPage;
    expect(page.setRotation).toHaveBeenCalledWith({ degrees: 180 });
  });
});

describe('addWatermark', () => {
  it('draws the watermark text on every page', async () => {
    const result = await addWatermark(makeFile(), 'DRAFT');
    const doc = await lastLoadedDoc();
    expect(doc.embedFont).toHaveBeenCalled();
    const pages = doc.getPages.mock.results[0].value as MockPage[];
    for (const page of pages) {
      expect(page.drawText).toHaveBeenCalledWith(
        'DRAFT',
        expect.objectContaining({ size: 48 })
      );
    }
    expect(result).toEqual(new Uint8Array([9, 8, 7]));
  });
});

describe('getPDFInfo', () => {
  it('returns metadata for a document', async () => {
    const info = await getPDFInfo(makeFile('pdf data'));
    expect(info).toEqual({
      pageCount: 3,
      title: 'Doc Title',
      author: 'Jane',
      subject: 'Subject',
      keywords: ['a', 'b', 'c'],
      encrypted: false,
      fileSize: 8,
    });
  });

  it('falls back to empty strings for missing metadata', async () => {
    PDFDocument.load.mockImplementationOnce(async () => {
      const doc = mockDoc();
      doc.getTitle.mockReturnValue(undefined);
      doc.getAuthor.mockReturnValue(undefined);
      doc.getSubject.mockReturnValue(undefined);
      doc.getKeywords.mockReturnValue(undefined);
      return doc;
    });
    const info = await getPDFInfo(makeFile());
    expect(info.title).toBe('');
    expect(info.author).toBe('');
    expect(info.subject).toBe('');
    expect(info.keywords).toEqual([]);
  });
});

describe('setPDFMetadata', () => {
  it('sets every provided metadata field', async () => {
    await setPDFMetadata(makeFile(), {
      title: 'T',
      author: 'A',
      subject: 'S',
      keywords: 'k1, k2',
    });
    const doc = await lastLoadedDoc();
    expect(doc.setTitle).toHaveBeenCalledWith('T');
    expect(doc.setAuthor).toHaveBeenCalledWith('A');
    expect(doc.setSubject).toHaveBeenCalledWith('S');
    expect(doc.setKeywords).toHaveBeenCalledWith(['k1, k2']);
  });

  it('skips undefined metadata fields', async () => {
    await setPDFMetadata(makeFile(), {});
    const doc = await lastLoadedDoc();
    expect(doc.setTitle).not.toHaveBeenCalled();
    expect(doc.setAuthor).not.toHaveBeenCalled();
    expect(doc.setSubject).not.toHaveBeenCalled();
    expect(doc.setKeywords).not.toHaveBeenCalled();
  });
});

describe('ocrPDF', () => {
  it('runs tesseract and returns the recognized text', async () => {
    const text = await ocrPDF(makeFile(), 'eng');
    expect(text).toBe('recognized text');
  });
});

describe('exportRedactedPdf', () => {
  it('draws redaction rectangles and saves the file', async () => {
    await exportRedactedPdf(
      makeFile(),
      { 0: [{ x: 10, y: 20, width: 100, height: 50 }] },
      1
    );
    const doc = await lastLoadedDoc();
    const page = doc.getPage.mock.results[0].value as MockPage;
    expect(page.drawRectangle).toHaveBeenCalledWith(
      expect.objectContaining({ width: 100, height: 50 })
    );
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'redacted.pdf');
  });
});

describe('downloadBlob', () => {
  const originalCreateObjectURL = URL.createObjectURL;

  beforeEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
  });

  it('creates a download link from a Blob', () => {
    const blob = new Blob(['data'], { type: 'application/pdf' });
    const click = jest.fn();
    jest.spyOn(document, 'createElement').mockReturnValue({
      click,
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement);
    downloadBlob(blob, 'out.pdf');
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(click).toHaveBeenCalled();
  });

  it('wraps a Uint8Array in a Blob', () => {
    const data = new Uint8Array([1, 2, 3]);
    const click = jest.fn();
    jest.spyOn(document, 'createElement').mockReturnValue({
      click,
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement);
    downloadBlob(data, 'out.pdf');
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(click).toHaveBeenCalled();
  });
});
