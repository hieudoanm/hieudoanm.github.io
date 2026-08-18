import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { PdfCompressTool } from '@/components/tools/PdfCompressTool';
import { PdfRotateTool } from '@/components/tools/PdfRotateTool';
import { PdfSplitTool } from '@/components/tools/PdfSplitTool';
import { PdfDeletePagesTool } from '@/components/tools/PdfDeletePagesTool';
import { PdfExtractImagesTool } from '@/components/tools/PdfExtractImagesTool';
import { PdfExtractTextTool } from '@/components/tools/PdfExtractTextTool';
import { PdfInfoTool } from '@/components/tools/PdfInfoTool';
import { PdfMergeTool } from '@/components/tools/PdfMergeTool';
import { PdfMetadataTool } from '@/components/tools/PdfMetadataTool';
import { PdfOcrTool } from '@/components/tools/PdfOcrTool';
import { PdfRearrangeTool } from '@/components/tools/PdfRearrangeTool';
import { PdfRepairTool } from '@/components/tools/PdfRepairTool';
import { PdfWatermarkTool } from '@/components/tools/PdfWatermarkTool';
import { PdfSecurityTool } from '@/components/tools/PdfSecurityTool';
import { PdfTranslateTool } from '@/components/tools/PdfTranslateTool';

jest.mock('pdf-lib', () => {
  const mockPage = () => ({
    drawText: jest.fn(),
    drawImage: jest.fn(),
    drawRectangle: jest.fn(),
    getSize: jest.fn(() => ({ width: 595, height: 842 })),
  });
  const mockDoc = () => ({
    addPage: jest.fn(() => mockPage()),
    save: jest.fn(async () => new Uint8Array([1, 2, 3])),
    copyPages: jest.fn(async (_src: unknown, indices: number[]) =>
      (indices ?? [0]).map(() => mockPage())
    ),
    getPageCount: jest.fn(() => 3),
    setTitle: jest.fn(),
    setAuthor: jest.fn(),
    setSubject: jest.fn(),
  });
  return {
    PDFDocument: {
      create: jest.fn(async () => mockDoc()),
      load: jest.fn(async () => mockDoc()),
    },
    StandardFonts: { Helvetica: 'Helvetica' },
    rgb: jest.fn((r: number, g: number, b: number) => ({ r, g, b })),
    degrees: jest.fn((deg: number) => ({ degrees: deg })),
  };
});

jest.mock('@/lib/pdf-tools', () => ({
  compressPDF: jest.fn(),
  rotatePDF: jest.fn(),
  splitPDF: jest.fn(),
  extractImages: jest.fn(),
  extractText: jest.fn(),
  getPDFInfo: jest.fn(),
  mergePDFs: jest.fn(),
  setPDFMetadata: jest.fn(),
  ocrPDF: jest.fn(),
  addWatermark: jest.fn(),
  exportRedactedPdf: jest.fn(),
  parsePageRange: jest.fn(),
  downloadBlob: jest.fn(),
}));

jest.mock('@/components/atoms/PdfFileUpload');

const { PDFDocument } = jest.requireMock('pdf-lib');
const {
  compressPDF,
  rotatePDF,
  splitPDF,
  extractImages,
  extractText,
  getPDFInfo,
  mergePDFs,
  setPDFMetadata,
  ocrPDF,
  addWatermark,
  parsePageRange,
  downloadBlob,
} = jest.requireMock('@/lib/pdf-tools');
const { __setNames } = jest.requireMock('@/components/atoms/PdfFileUpload');

const upload = async () => {
  await act(async () => {
    fireEvent.click(screen.getByText('PdfFileUpload'));
  });
};

const realCreateElement = document.createElement.bind(document);

const mockAnchor = (click: jest.Mock) =>
  jest
    .spyOn(document, 'createElement')
    .mockImplementation((tag: string) =>
      tag === 'a'
        ? ({ click, href: '', download: '' } as unknown as HTMLElement)
        : realCreateElement(tag)
    );

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('PdfCompressTool', () => {
  it('compresses the file and shows size reduction', async () => {
    compressPDF.mockResolvedValue(new Uint8Array(2_000_000));
    render(<PdfCompressTool />);
    expect(screen.getByRole('button', { name: 'Compress' })).toBeDisabled();
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Compress' }));
    });
    expect(compressPDF).toHaveBeenCalled();
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.any(Uint8Array),
      'compressed.pdf'
    );
    expect(screen.getByText('Original: 1.0 KB')).toBeInTheDocument();
    expect(screen.getByText('Compressed: 2.0 MB')).toBeInTheDocument();
    expect(screen.getByText(/reduction$/)).toBeInTheDocument();
  });

  it('formats small sizes as bytes', async () => {
    compressPDF.mockResolvedValue(new Uint8Array(500));
    render(<PdfCompressTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Compress' }));
    });
    expect(screen.getByText('Compressed: 500 B')).toBeInTheDocument();
  });
});

describe('PdfRotateTool', () => {
  it('rotates with the selected angle', async () => {
    rotatePDF.mockResolvedValue(new Uint8Array([1]));
    render(<PdfRotateTool />);
    await upload();
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '180' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Rotate' }));
    });
    expect(rotatePDF).toHaveBeenCalledWith(expect.anything(), 180);
    expect(downloadBlob).toHaveBeenCalledWith(expect.anything(), 'rotated.pdf');
  });
});

describe('PdfSplitTool', () => {
  it('splits by page range and downloads each part', async () => {
    splitPDF.mockResolvedValue([new Uint8Array([1]), new Uint8Array([2])]);
    render(<PdfSplitTool />);
    await upload();
    fireEvent.change(screen.getByPlaceholderText('1,3-5'), {
      target: { value: '1-2' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Split' }));
    });
    expect(splitPDF).toHaveBeenCalledWith(expect.anything(), '1-2');
    expect(downloadBlob).toHaveBeenCalledTimes(2);
    expect(downloadBlob).toHaveBeenCalledWith(expect.anything(), 'page_1.pdf');
    expect(downloadBlob).toHaveBeenCalledWith(expect.anything(), 'page_2.pdf');
    expect(
      screen.getByRole('button', { name: 'Split into 2 files' })
    ).toBeInTheDocument();
  });

  it('splits all pages when the range is empty', async () => {
    splitPDF.mockResolvedValue([new Uint8Array([1])]);
    render(<PdfSplitTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Split' }));
    });
    expect(splitPDF).toHaveBeenCalledWith(expect.anything(), undefined);
  });
});

describe('PdfDeletePagesTool', () => {
  it('deletes the requested pages and downloads the trimmed pdf', async () => {
    parsePageRange.mockReturnValue([0, 2]);
    render(<PdfDeletePagesTool />);
    await upload();
    fireEvent.change(screen.getByPlaceholderText('1,3-5'), {
      target: { value: '1,3' },
    });
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Delete & Download' })
      );
    });
    expect(PDFDocument.load).toHaveBeenCalled();
    expect(parsePageRange).toHaveBeenCalledWith('1,3', 3);
    expect(PDFDocument.create).toHaveBeenCalled();
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'trimmed.pdf');
  });

  it('logs an error when loading fails', async () => {
    PDFDocument.load.mockRejectedValueOnce(new Error('broken'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<PdfDeletePagesTool />);
    await upload();
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Delete & Download' })
      );
    });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('PdfExtractImagesTool', () => {
  it('shows previews for every extracted page', async () => {
    extractImages.mockResolvedValue([new Blob(), new Blob()]);
    const click = jest.fn();
    mockAnchor(click);
    render(<PdfExtractImagesTool />);
    await upload();
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Extract Images (as page snapshots)',
        })
      );
    });
    expect(await screen.findByAltText('Page 1')).toBeInTheDocument();
    expect(screen.getByAltText('Page 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Download Page 1' }));
    expect(click).toHaveBeenCalled();
  });
});

describe('PdfExtractTextTool', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn() },
      configurable: true,
    });
  });

  it('extracts, copies and downloads the text', async () => {
    extractText.mockResolvedValue('Some extracted text');
    render(<PdfExtractTextTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Extract Text' }));
    });
    expect(screen.getByText('Some extracted text')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Some extracted text'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'a.pdf.txt');
  });
});

describe('PdfInfoTool', () => {
  it('displays metadata rows for the loaded file', async () => {
    getPDFInfo.mockResolvedValue({
      pageCount: 3,
      title: 'Doc Title',
      author: 'Jane',
      subject: 'Subject',
      keywords: ['a', 'b'],
      encrypted: false,
      fileSize: 2_000_000,
    });
    render(<PdfInfoTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Load Info' }));
    });
    expect(screen.getByText('Doc Title')).toBeInTheDocument();
    expect(screen.getByText('a, b')).toBeInTheDocument();
    expect(screen.getByText('2.0 MB')).toBeInTheDocument();
  });

  it('formats small sizes and falls back for missing metadata', async () => {
    getPDFInfo.mockResolvedValue({
      pageCount: 1,
      title: '',
      author: '',
      subject: '',
      keywords: [],
      encrypted: false,
      fileSize: 500,
    });
    render(<PdfInfoTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Load Info' }));
    });
    expect(screen.getByText('500 B')).toBeInTheDocument();
    expect(screen.getAllByText('(none)')).toHaveLength(4);
  });

  it('formats kilobyte sizes', async () => {
    getPDFInfo.mockResolvedValue({
      pageCount: 1,
      title: 'T',
      author: 'A',
      subject: 'S',
      keywords: ['k'],
      encrypted: false,
      fileSize: 5000,
    });
    render(<PdfInfoTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Load Info' }));
    });
    expect(screen.getByText('5.0 KB')).toBeInTheDocument();
  });
});

describe('PdfMergeTool', () => {
  beforeEach(() => {
    __setNames(['a.pdf', 'b.pdf']);
  });

  it('merges two selected files and downloads the result', async () => {
    mergePDFs.mockResolvedValue(new Uint8Array([1, 2, 3]));
    render(<PdfMergeTool />);
    expect(
      screen.getByRole('button', { name: 'Merge 0 files' })
    ).toBeDisabled();
    await upload();
    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    expect(screen.getByText('b.pdf')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Merge 2 files' }));
    });
    expect(mergePDFs).toHaveBeenCalledTimes(1);
    expect(downloadBlob).toHaveBeenCalledWith(expect.anything(), 'merged.pdf');
  });

  it('reorders files via drag-and-drop', async () => {
    render(<PdfMergeTool />);
    await upload();
    const row = (name: string) =>
      screen.getByText(name).closest('li') as HTMLElement;
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => '0'),
      effectAllowed: 'move',
    } as unknown as DataTransfer;
    fireEvent.dragStart(row('a.pdf'), { dataTransfer });
    fireEvent.drop(row('b.pdf'), { dataTransfer });
    fireEvent.click(screen.getByRole('button', { name: 'Merge 2 files' }));
    expect(mergePDFs).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'b.pdf' }),
      expect.objectContaining({ name: 'a.pdf' }),
    ]);
  });

  it('reorders and removes files', async () => {
    render(<PdfMergeTool />);
    await upload();
    fireEvent.click(screen.getAllByRole('button', { name: '↓' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: '↑' })[1]);
    fireEvent.click(screen.getAllByRole('button', { name: '✕' })[0]);
    expect(screen.getByText('b.pdf')).toBeInTheDocument();
    expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
  });

  it('ignores dropping a file onto itself', async () => {
    render(<PdfMergeTool />);
    await upload();
    const row = (name: string) =>
      screen.getByText(name).closest('li') as HTMLElement;
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => '0'),
      effectAllowed: 'move',
    } as unknown as DataTransfer;
    fireEvent.dragStart(row('a.pdf'), { dataTransfer });
    fireEvent.drop(row('a.pdf'), { dataTransfer });
    fireEvent.click(screen.getByRole('button', { name: 'Merge 2 files' }));
    expect(mergePDFs).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'a.pdf' }),
      expect.objectContaining({ name: 'b.pdf' }),
    ]);
  });

  it('ignores a drop with an invalid drag index', async () => {
    render(<PdfMergeTool />);
    await upload();
    const row = (name: string) =>
      screen.getByText(name).closest('li') as HTMLElement;
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => 'abc'),
      effectAllowed: 'move',
    } as unknown as DataTransfer;
    fireEvent.dragStart(row('a.pdf'), { dataTransfer });
    fireEvent.drop(row('b.pdf'), { dataTransfer });
    fireEvent.click(screen.getByRole('button', { name: 'Merge 2 files' }));
    expect(mergePDFs).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'a.pdf' }),
      expect.objectContaining({ name: 'b.pdf' }),
    ]);
  });
});

describe('PdfMetadataTool', () => {
  it('loads and saves metadata', async () => {
    getPDFInfo.mockResolvedValue({
      pageCount: 1,
      title: 'Title',
      author: 'Author',
      subject: 'Subject',
      keywords: ['k1', 'k2'],
      encrypted: false,
      fileSize: 100,
    });
    setPDFMetadata.mockResolvedValue(new Uint8Array([1]));
    render(<PdfMetadataTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Load Metadata' }));
    });
    const titleInput = screen.getByDisplayValue('Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save & Download' }));
    });
    expect(setPDFMetadata).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ title: 'New Title', keywords: 'k1, k2' })
    );
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.anything(),
      'metadata_updated.pdf'
    );
  });

  it('saves with undefined fields when the metadata is empty', async () => {
    getPDFInfo.mockResolvedValue({
      pageCount: 1,
      title: '',
      author: '',
      subject: '',
      keywords: [],
      encrypted: false,
      fileSize: 100,
    });
    setPDFMetadata.mockResolvedValue(new Uint8Array([1]));
    render(<PdfMetadataTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Load Metadata' }));
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save & Download' }));
    });
    expect(setPDFMetadata).toHaveBeenCalledWith(expect.anything(), {
      title: undefined,
      author: undefined,
      subject: undefined,
      keywords: undefined,
    });
  });
});

describe('PdfOcrTool', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn() },
      configurable: true,
    });
  });

  it('runs OCR and downloads the result', async () => {
    ocrPDF.mockResolvedValue('Recognized text');
    render(<PdfOcrTool />);
    await upload();
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'fra' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Run OCR' }));
    });
    expect(ocrPDF).toHaveBeenCalledWith(expect.anything(), 'fra');
    expect(screen.getByText('Recognized text')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Recognized text'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'a.pdf.txt');
  });
});

describe('PdfRearrangeTool', () => {
  it('loads pages, reorders and saves', async () => {
    render(<PdfRearrangeTool />);
    await upload();
    expect(
      screen.getByText('3 pages — drag to reorder (↑↓ buttons):')
    ).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: '↓' })[0]);
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Save Rearranged PDF' })
      );
    });
    expect(PDFDocument.create).toHaveBeenCalled();
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'rearranged.pdf'
    );
  });
});

describe('PdfRepairTool', () => {
  it('re-saves the file as repaired.pdf', async () => {
    compressPDF.mockResolvedValue(new Uint8Array([1]));
    render(<PdfRepairTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Repair' }));
    });
    expect(compressPDF).toHaveBeenCalled();
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.anything(),
      'repaired.pdf'
    );
  });
});

describe('PdfWatermarkTool', () => {
  it('adds a watermark once text is provided', async () => {
    addWatermark.mockResolvedValue(new Uint8Array([1]));
    render(<PdfWatermarkTool />);
    await upload();
    expect(
      screen.getByRole('button', { name: 'Add Watermark' })
    ).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('DRAFT'), {
      target: { value: 'CONFIDENTIAL' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Add Watermark' }));
    });
    expect(addWatermark).toHaveBeenCalledWith(
      expect.anything(),
      'CONFIDENTIAL'
    );
    expect(downloadBlob).toHaveBeenCalledWith(
      expect.anything(),
      'watermarked.pdf'
    );
  });
});

describe('PdfSecurityTool', () => {
  it('updates metadata and downloads the file', async () => {
    const click = jest.fn();
    mockAnchor(click);
    render(<PdfSecurityTool />);
    await upload();
    fireEvent.change(screen.getByPlaceholderText('Title (optional)'), {
      target: { value: 'New Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Author (optional)'), {
      target: { value: 'Author' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Update Metadata' }));
    });
    expect(PDFDocument.load).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('shows an error message when processing fails', async () => {
    PDFDocument.load.mockRejectedValueOnce(new Error('corrupt'));
    render(<PdfSecurityTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Update Metadata' }));
    });
    expect(await screen.findByText('corrupt')).toBeInTheDocument();
  });

  it('sets only the subject when the other fields are empty', async () => {
    const click = jest.fn();
    mockAnchor(click);
    render(<PdfSecurityTool />);
    await upload();
    fireEvent.change(screen.getByPlaceholderText('Subject (optional)'), {
      target: { value: 'Subject' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Update Metadata' }));
    });
    const loadedDoc = await PDFDocument.load.mock.results[0].value;
    expect(loadedDoc.setTitle).not.toHaveBeenCalled();
    expect(loadedDoc.setAuthor).not.toHaveBeenCalled();
    expect(loadedDoc.setSubject).toHaveBeenCalledWith('Subject');
  });

  it('shows the generic message for a non-Error failure', async () => {
    PDFDocument.load.mockRejectedValueOnce('boom');
    render(<PdfSecurityTool />);
    await upload();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Update Metadata' }));
    });
    expect(
      await screen.findByText('Failed to update metadata')
    ).toBeInTheDocument();
  });
});

describe('PdfTranslateTool', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    global.fetch = fetchMock;
  });

  it('translates text via the google endpoint', async () => {
    fetchMock.mockResolvedValue({
      json: async () => [
        [
          ['Xin chào', 'Hello'],
          ['!', '!'],
        ],
      ],
    });
    render(<PdfTranslateTool />);
    expect(screen.getByRole('button', { name: 'Translate' })).toBeDisabled();
    fireEvent.change(
      screen.getByPlaceholderText('Enter text to translate...'),
      {
        target: { value: 'Hello!' },
      }
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Translate' }));
    });
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('tl=vi'));
    expect(await screen.findByText('Xin chào!')).toBeInTheDocument();
  });

  it('shows a placeholder when the request fails', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    render(<PdfTranslateTool />);
    fireEvent.change(
      screen.getByPlaceholderText('Enter text to translate...'),
      {
        target: { value: 'Hello' },
      }
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Translate' }));
    });
    expect(
      await screen.findByText(/requires API key or proxy/)
    ).toBeInTheDocument();
  });

  it('does not translate whitespace-only input', async () => {
    render(<PdfTranslateTool />);
    fireEvent.change(
      screen.getByPlaceholderText('Enter text to translate...'),
      {
        target: { value: '   ' },
      }
    );
    expect(screen.getByRole('button', { name: 'Translate' })).toBeDisabled();
  });

  it('shows no output when the response has no segments', async () => {
    fetchMock.mockResolvedValue({ json: async () => [[]] });
    render(<PdfTranslateTool />);
    fireEvent.change(
      screen.getByPlaceholderText('Enter text to translate...'),
      {
        target: { value: 'Hello' },
      }
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Translate' }));
    });
    expect(fetchMock).toHaveBeenCalled();
    expect(screen.getAllByText('Hello')).toHaveLength(1);
  });
});
