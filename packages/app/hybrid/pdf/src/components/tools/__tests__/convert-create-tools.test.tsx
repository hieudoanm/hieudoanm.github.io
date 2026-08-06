import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { PdfToFormatTool } from '@/components/tools/PdfToFormatTool';
import { EbookConvertTool } from '@/components/tools/EbookConvertTool';
import { PdfToImagesTool } from '@/components/tools/PdfToImagesTool';
import { CreateTextToPdfTool } from '@/components/tools/CreateTextToPdfTool';
import { ImagesToPdfTool } from '@/components/tools/ImagesToPdfTool';
import { UrlToPdfTool } from '@/components/tools/UrlToPdfTool';
import { CreateUrlToPdfTool } from '@/components/tools/CreateUrlToPdfTool';
import { PdfPlaceholderTool } from '@/components/tools/PdfPlaceholderTool';
import type { PdfToolConfig } from '@/data/pdf-tools';

jest.mock('react-pdf', () => ({
  pdfjs: { getDocument: jest.fn() },
}));

jest.mock('pdf-lib', () => {
  const mockPage = () => ({
    drawImage: jest.fn(),
    drawText: jest.fn(),
    drawRectangle: jest.fn(),
    setRotation: jest.fn(),
    getSize: jest.fn(() => ({ width: 595, height: 842 })),
    getWidth: jest.fn(() => 595),
    getHeight: jest.fn(() => 842),
  });
  const mockDoc = () => ({
    addPage: jest.fn(() => mockPage()),
    save: jest.fn(async () => new Uint8Array([1, 2, 3])),
    embedPng: jest.fn(async () => ({ width: 100, height: 100 })),
    embedJpg: jest.fn(async () => ({ width: 100, height: 100 })),
    embedFont: jest.fn(async () => ({})),
    load: jest.fn(),
    copyPages: jest.fn(async () => [mockPage()]),
    getPages: jest.fn(() => [mockPage()]),
    getPage: jest.fn(() => mockPage()),
    getPageIndices: jest.fn(() => [0]),
    getPageCount: jest.fn(() => 1),
    setTitle: jest.fn(),
    setAuthor: jest.fn(),
    setSubject: jest.fn(),
    setKeywords: jest.fn(),
    getTitle: jest.fn(() => ''),
    getAuthor: jest.fn(() => ''),
    getSubject: jest.fn(() => ''),
    getKeywords: jest.fn(() => ''),
  });
  return {
    PDFDocument: {
      create: jest.fn(async () => mockDoc()),
      load: jest.fn(async () => mockDoc()),
    },
    StandardFonts: { Helvetica: 'Helvetica' },
    rgb: jest.fn((r, g, b) => ({ r, g, b })),
    degrees: jest.fn((deg) => ({ degrees: deg })),
  };
});

jest.mock('@/components/atoms/PdfFileUpload');

const upload = async () => {
  await act(async () => {
    fireEvent.click(screen.getByText('PdfFileUpload'));
  });
};

const { extractPdfTextSimple, downloadBlob } =
  jest.requireMock('@/lib/pdf-tools');
const { __setFile, __setNames } = jest.requireMock(
  '@/components/atoms/PdfFileUpload'
);

jest.mock('@/lib/pdf-tools', () => ({
  extractPdfTextSimple: jest.fn(),
  downloadBlob: jest.fn(),
}));

const baseConfig: PdfToolConfig = {
  id: 'pdf-to-epub',
  title: 'PDF to EPUB',
  emoji: '📖',
  description: 'Convert a PDF',
  category: 'convert',
  accept: '.pdf',
  outputExt: 'html',
  outputFormat: 'HTML',
  downloadLabel: 'Download',
  mimeType: 'text/html',
};

describe('PdfToFormatTool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    extractPdfTextSimple.mockReturnValue('Hello World\nSecond line');
  });

  it('extracts text and downloads as HTML', async () => {
    const download = jest.fn();
    downloadBlob.mockImplementation(download);
    render(<PdfToFormatTool config={baseConfig} />);
    await upload();
    expect(await screen.findByRole('textbox')).toHaveValue(
      'Hello World\nSecond line'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(download).toHaveBeenCalledWith(expect.any(Blob), 'a.html');
  });

  it('downloads CSV format and shows extraction failure text', async () => {
    render(
      <PdfToFormatTool
        config={{ ...baseConfig, outputExt: 'csv', mimeType: 'text/csv' }}
      />
    );
    await upload();
    expect(await screen.findByRole('textbox')).toHaveValue(
      'Hello World\nSecond line'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'a.csv');

    extractPdfTextSimple.mockImplementation(() => {
      throw new Error('nope');
    });
    await upload();
    await waitFor(() =>
      expect(screen.getByRole('textbox')).toHaveValue('Could not extract text.')
    );
  });
});

describe('EbookConvertTool', () => {
  it('shows file info and downloads with the target extension', async () => {
    const config: PdfToolConfig = {
      ...baseConfig,
      inputExt: '.pdf',
      outputExt: '.mobi',
      category: 'ebook',
    };
    render(<EbookConvertTool config={config} />);
    await upload();
    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'low' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Download MOBI' }));
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Object), 'a.mobi');
  });
});

describe('PdfToImagesTool', () => {
  const { pdfjs } = jest.requireMock('react-pdf');

  it('renders each page as a PNG', async () => {
    pdfjs.getDocument.mockResolvedValue({
      numPages: 2,
      getPage: async () => ({
        getViewport: () => ({ width: 100, height: 200 }),
        render: () => ({ promise: Promise.resolve() }),
      }),
    });
    render(<PdfToImagesTool />);
    await upload();
    await waitFor(() =>
      expect(pdfjs.getDocument).toHaveBeenCalledWith(expect.any(ArrayBuffer))
    );
  });

  it('logs an error when rendering fails', async () => {
    pdfjs.getDocument.mockReturnValue({
      promise: Promise.reject(new Error('bad pdf')),
    });
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<PdfToImagesTool />);
    await upload();
    await waitFor(() => expect(spy).toHaveBeenCalled());
    spy.mockRestore();
  });
});

describe('CreateTextToPdfTool', () => {
  it('creates a PDF from entered text', async () => {
    render(<CreateTextToPdfTool />);
    const button = screen.getByRole('button', { name: 'Create PDF' });
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '# Heading\nBody text\nmore' },
    });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('does nothing for whitespace-only text', () => {
    render(<CreateTextToPdfTool />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '  ' } });
    expect(screen.getByRole('button', { name: 'Create PDF' })).toBeDisabled();
  });
});

describe('ImagesToPdfTool', () => {
  const { PDFDocument } = jest.requireMock('pdf-lib');
  const pngBytes = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  const jpgBytes = Buffer.from(
    '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AVN//2Q==',
    'base64'
  );
  const toArrayBuffer = (b: Buffer) =>
    b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

  beforeEach(() => {
    jest.clearAllMocks();
    __setNames(['a.png', 'b.jpg']);
    __setFile((name: string) => ({
      name,
      size: 100,
      type: 'image/png',
      arrayBuffer: async () =>
        name.endsWith('.jpg')
          ? toArrayBuffer(jpgBytes)
          : toArrayBuffer(pngBytes),
    }));
  });

  it('embeds PNG images and downloads the PDF', async () => {
    render(<ImagesToPdfTool />);
    await upload();
    expect(screen.getByText('2 image(s) selected')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Create PDF' }));
    });
    expect(PDFDocument.create).toHaveBeenCalled();
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'output.pdf');
  });

  it('is disabled until images are selected', () => {
    render(<ImagesToPdfTool />);
    expect(screen.getByRole('button', { name: 'Create PDF' })).toBeDisabled();
  });
});

describe('UrlToPdfTool', () => {
  it('prints the URL via a new window', () => {
    const win = {
      document: { write: jest.fn(), close: jest.fn() },
      focus: jest.fn(),
      print: jest.fn(),
    };
    jest.spyOn(window, 'open').mockReturnValue(win as never);
    render(<UrlToPdfTool />);
    expect(screen.getByRole('button', { name: 'Print as PDF' })).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
      target: { value: 'https://example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Print as PDF' }));
    expect(window.open).toHaveBeenCalledWith('', '_blank');
    expect(win.document.write).toHaveBeenCalledWith(
      expect.stringContaining('example.com')
    );
    expect(win.print).toHaveBeenCalled();
  });

  it('does nothing when window.open returns null', () => {
    jest.spyOn(window, 'open').mockReturnValue(null);
    render(<UrlToPdfTool />);
    fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
      target: { value: 'https://example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Print as PDF' }));
    expect(window.open).toHaveBeenCalled();
  });
});

describe('CreateUrlToPdfTool', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchMock;
    jest.spyOn(window, 'open').mockReturnValue({
      document: { write: jest.fn(), close: jest.fn() },
      focus: jest.fn(),
      print: jest.fn(),
    } as never);
  });

  it('fetches a URL and prints the content', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      text: async () => '<p>fetched content</p>',
    });
    render(<CreateUrlToPdfTool />);
    fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
      target: { value: 'https://example.com' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Fetch' }));
    });
    expect(
      await screen.findByText('<p>fetched content</p>')
    ).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Print as PDF' }));
    });
    expect(window.open).toHaveBeenCalledWith('', '_blank');
  });

  it('shows an error when the fetch fails', async () => {
    fetchMock.mockResolvedValue({ ok: false });
    render(<CreateUrlToPdfTool />);
    fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
      target: { value: 'https://example.com' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Fetch' }));
    });
    expect(await screen.findByText(/Failed to fetch URL/)).toBeInTheDocument();
  });

  it('shows an error when fetch rejects', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    render(<CreateUrlToPdfTool />);
    fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
      target: { value: 'https://example.com' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Fetch' }));
    });
    expect(await screen.findByText(/network down/)).toBeInTheDocument();
  });
});

describe('PdfPlaceholderTool', () => {
  it('shows the description and selected file details', async () => {
    __setNames(['a.pdf']);
    __setFile((name: string) => ({
      name,
      size: 1024,
      type: 'application/pdf',
      arrayBuffer: async () => new ArrayBuffer(0),
    }));
    render(<PdfPlaceholderTool config={{ ...baseConfig, accept: '.pdf' }} />);
    expect(screen.getByText('Convert a PDF')).toBeInTheDocument();
    await upload();
    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Convert to PDF' })
    ).not.toBeDisabled();
  });
});
