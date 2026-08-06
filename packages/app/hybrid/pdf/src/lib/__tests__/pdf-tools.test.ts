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
import { PDFDocument } from 'pdf-lib';

jest.mock('react-pdf', () => ({ pdfjs: { getDocument: jest.fn() } }));
jest.mock('tesseract.js', () => ({ recognize: jest.fn() }));
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));

const mockedPdf = jest.requireMock('react-pdf');
const { getDocument } = mockedPdf.pdfjs;
const { recognize } = jest.requireMock('tesseract.js');
const { saveAs } = jest.requireMock('file-saver');

const createPdfBytes = async (pageCount = 2): Promise<Uint8Array> => {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) doc.addPage([595, 842]);
  return doc.save();
};

const makePdfFile = async (
  pageCount = 2,
  filename = 'test.pdf'
): Promise<File> => {
  const bytes = await createPdfBytes(pageCount);
  return {
    name: filename,
    type: 'application/pdf',
    size: bytes.length,
    arrayBuffer: async () => bytes.slice().buffer,
  } as File;
};

const makePdfFileWithMetadata = async (): Promise<File> => {
  const doc = await PDFDocument.create();
  doc.addPage([595, 842]);
  doc.setTitle('My Title');
  doc.setAuthor('Jane');
  doc.setSubject('Subject');
  doc.setKeywords(['one', 'two']);
  const bytes = await doc.save();
  return {
    name: 'meta.pdf',
    type: 'application/pdf',
    size: bytes.length,
    arrayBuffer: async () => bytes.slice().buffer,
  } as File;
};

describe('parsePageRange', () => {
  it('returns all pages for an empty range', () => {
    expect(parsePageRange('', 3)).toEqual([0, 1, 2]);
    expect(parsePageRange('   ', 3)).toEqual([0, 1, 2]);
  });

  it('parses explicit pages and ranges', () => {
    expect(parsePageRange('1-3,5', 6)).toEqual([0, 1, 2, 4]);
  });

  it('ignores out-of-bounds and zero pages', () => {
    expect(parsePageRange('0,7,2', 5)).toEqual([1]);
  });

  it('clamps ranges to the total page count', () => {
    expect(parsePageRange('1-99', 3)).toEqual([0, 1, 2]);
  });

  it('deduplicates and sorts the selection', () => {
    expect(parsePageRange('5,1-3,2', 6)).toEqual([0, 1, 2, 4]);
  });
});

describe('extractPdfTextSimple', () => {
  it('extracts text from parenthesized Tj strings', () => {
    const bytes = new Uint8Array([...Buffer.from('(Hello world)Tj', 'binary')]);
    expect(extractPdfTextSimple(bytes.buffer)).toBe('Hello world');
  });

  it('handles escaped parentheses inside strings', () => {
    const bytes = new Uint8Array([
      ...Buffer.from('(Hello \\(world\\)\\n)Tj', 'binary'),
    ]);
    expect(extractPdfTextSimple(bytes.buffer)).toBe('Hello (world)n');
  });

  it('returns fallback text when no text is found', () => {
    const bytes = new Uint8Array([1, 2, 3, 4]);
    expect(extractPdfTextSimple(bytes.buffer)).toBe(
      'Text extraction failed. Try a different PDF.'
    );
  });
});

describe('mergePDFs', () => {
  it('combines all pages from every file', async () => {
    const files = [await makePdfFile(1), await makePdfFile(2, 'second.pdf')];
    const bytes = await mergePDFs(files);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(3);
  });
});

describe('splitPDF', () => {
  it('splits into one document per page by default', async () => {
    const file = await makePdfFile(3);
    const results = await splitPDF(file);
    expect(results).toHaveLength(3);
    const doc = await PDFDocument.load(results[0]);
    expect(doc.getPageCount()).toBe(1);
  });

  it('splits only the requested page ranges', async () => {
    const file = await makePdfFile(5);
    const results = await splitPDF(file, '2-3,5');
    expect(results).toHaveLength(3);
    expect((await PDFDocument.load(results[0])).getPageCount()).toBe(1);
  });
});

describe('extractText', () => {
  it('joins text content from every page', async () => {
    getDocument.mockReturnValue({
      promise: Promise.resolve({
        numPages: 1,
        getPage: jest.fn().mockResolvedValue({
          getTextContent: jest.fn().mockResolvedValue({
            items: [{ str: 'Hello' }, { str: 'World' }, { num: 42 }],
          }),
        }),
      }),
    });
    const text = await extractText(await makePdfFile());
    expect(text).toBe('Hello World ');
  });
});

describe('extractImages', () => {
  it('renders each page to a blob', async () => {
    const convertToBlob = jest.fn().mockResolvedValue(new Blob(['png']));
    class MockCanvas {
      getContext = jest.fn().mockReturnValue({});
      convertToBlob = convertToBlob;
    }
    Object.defineProperty(globalThis, 'OffscreenCanvas', {
      writable: true,
      value: MockCanvas,
    });
    getDocument.mockReturnValue({
      promise: Promise.resolve({
        numPages: 1,
        getPage: jest.fn().mockResolvedValue({
          getViewport: jest.fn().mockReturnValue({ width: 595, height: 842 }),
          render: jest.fn().mockReturnValue({ promise: Promise.resolve() }),
        }),
      }),
    });
    const blobs = await extractImages(await makePdfFile());
    expect(blobs).toHaveLength(1);
    expect(convertToBlob).toHaveBeenCalledWith({ type: 'image/png' });
  });
});

describe('compressPDF', () => {
  it('re-saves the PDF with object streams', async () => {
    const file = await makePdfFile(2);
    const bytes = await compressPDF(file);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
  });
});

describe('rotatePDF', () => {
  it('rotates every page when no page numbers are given', async () => {
    const file = await makePdfFile(2);
    const bytes = await rotatePDF(file, 90);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPages().every((p) => p.getRotation().angle === 90)).toBe(
      true
    );
  });

  it('rotates only the given page numbers', async () => {
    const file = await makePdfFile(3);
    const bytes = await rotatePDF(file, 180, [1, 3]);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPage(0).getRotation().angle).toBe(180);
    expect(doc.getPage(1).getRotation().angle).toBe(0);
    expect(doc.getPage(2).getRotation().angle).toBe(180);
  });
});

describe('addWatermark', () => {
  it('draws the watermark text on every page', async () => {
    const file = await makePdfFile(2);
    const bytes = await addWatermark(file, 'CONFIDENTIAL');
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
  });
});

describe('getPDFInfo', () => {
  it('reads metadata from the document', async () => {
    const file = await makePdfFileWithMetadata();
    const info = await getPDFInfo(file);
    expect(info).toMatchObject({
      pageCount: 1,
      title: 'My Title',
      author: 'Jane',
      subject: 'Subject',
      keywords: ['one', 'two'],
      encrypted: false,
      fileSize: file.size,
    });
  });

  it('returns empty metadata fields when unset', async () => {
    const file = await makePdfFile();
    const info = await getPDFInfo(file);
    expect(info.title).toBe('');
    expect(info.author).toBe('');
    expect(info.subject).toBe('');
    expect(info.keywords).toEqual([]);
  });
});

describe('setPDFMetadata', () => {
  it('sets every provided metadata field', async () => {
    const file = await makePdfFile();
    const bytes = await setPDFMetadata(file, {
      title: 'New Title',
      author: 'New Author',
      subject: 'New Subject',
      keywords: 'alpha,beta',
    });
    const doc = await PDFDocument.load(bytes);
    expect(doc.getTitle()).toBe('New Title');
    expect(doc.getAuthor()).toBe('New Author');
    expect(doc.getSubject()).toBe('New Subject');
    expect(doc.getKeywords()).toBe('alpha,beta');
  });

  it('leaves fields untouched when not provided', async () => {
    const file = await makePdfFileWithMetadata();
    const bytes = await setPDFMetadata(file, {});
    const doc = await PDFDocument.load(bytes);
    expect(doc.getTitle()).toBe('My Title');
  });
});

describe('ocrPDF', () => {
  it('returns recognized text', async () => {
    recognize.mockResolvedValue({ data: { text: 'Recognized text' } });
    const text = await ocrPDF(await makePdfFile(), 'eng');
    expect(text).toBe('Recognized text');
    expect(recognize).toHaveBeenCalledWith(expect.any(Object), 'eng');
  });
});

describe('exportRedactedPdf', () => {
  it('draws redaction boxes and saves the result', async () => {
    const file = await makePdfFile(1);
    const redactions = {
      0: [{ x: 10, y: 20, width: 30, height: 40 }],
    };
    await exportRedactedPdf(file, redactions, 1.5);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'redacted.pdf');
  });
});

describe('downloadBlob', () => {
  beforeAll(() => {
    Object.defineProperty(URL, 'createObjectURL', {
      writable: true,
      value: jest.fn().mockReturnValue('blob:mock'),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      writable: true,
      value: jest.fn(),
    });
  });

  it('downloads an existing Blob', () => {
    const blob = new Blob(['data'], { type: 'application/pdf' });
    downloadBlob(blob, 'out.pdf');
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });

  it('wraps Uint8Array data in a Blob', () => {
    const bytes = new Uint8Array([1, 2, 3]);
    downloadBlob(bytes, 'out.pdf');
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });
});
