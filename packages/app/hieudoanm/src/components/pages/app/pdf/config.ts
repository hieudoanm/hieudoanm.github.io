export interface PdfToolConfig {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: 'convert' | 'create' | 'ebook' | 'edit' | 'extract' | 'misc';
  accept?: string;
  outputFormat?: string;
  outputExt?: string;
  downloadLabel?: string;
  mimeType?: string;
  inputFormat?: string;
  inputExt?: string;
}

export const CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: 'convert', label: 'Convert', emoji: '🔄' },
  { key: 'create', label: 'Create', emoji: '📄' },
  { key: 'ebook', label: 'Ebook', emoji: '📚' },
  { key: 'edit', label: 'Edit', emoji: '✏️' },
  { key: 'extract', label: 'Extract', emoji: '🔍' },
  { key: 'misc', label: 'Misc', emoji: '🔧' },
];

export const TOOLS: PdfToolConfig[] = [
  // ── Convert ──────────────────────────────────────
  {
    id: 'pdf-to-epub',
    title: 'PDF to EPUB',
    emoji: '📖',
    description:
      'Extract text from PDF and download as HTML (simplified EPUB-like format)',
    category: 'convert',
    accept: '.pdf',
    outputFormat: 'HTML',
    outputExt: 'html',
    downloadLabel: 'Download HTML',
    mimeType: 'text/html',
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    emoji: '📊',
    description: 'Extract text from PDF and download as CSV',
    category: 'convert',
    accept: '.pdf',
    outputFormat: 'CSV',
    outputExt: 'csv',
    downloadLabel: 'Download CSV',
    mimeType: 'text/csv',
  },
  {
    id: 'pdf-to-images',
    title: 'PDF to Images',
    emoji: '🖼️',
    description: 'Render each PDF page as a PNG image',
    category: 'convert',
    accept: '.pdf',
  },
  {
    id: 'pdf-to-ppt',
    title: 'PDF to PPT',
    emoji: '📽️',
    description: 'Extract text from PDF as slide-like content',
    category: 'convert',
    accept: '.pdf',
    outputFormat: 'HTML',
    outputExt: 'html',
    downloadLabel: 'Download HTML (PPT-like)',
    mimeType: 'text/html',
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    emoji: '📝',
    description: 'Extract text from PDF and download as Word-like document',
    category: 'convert',
    accept: '.pdf',
    outputFormat: 'HTML',
    outputExt: 'html',
    downloadLabel: 'Download HTML (DOCX-like)',
    mimeType: 'text/html',
  },

  // ── Create ────────────────────────────────────────
  {
    id: 'create-text-to-pdf',
    title: 'Text to PDF',
    emoji: '📝',
    description: 'Type or paste text and generate a PDF document',
    category: 'create',
  },
  {
    id: 'create-url-to-pdf',
    title: 'Fetch URL to PDF',
    emoji: '🌐',
    description: 'Fetch a URL and create a printable PDF',
    category: 'create',
  },
  {
    id: 'epub-to-pdf',
    title: 'EPUB to PDF',
    emoji: '📚',
    description: 'Convert EPUB ebooks to PDF format',
    category: 'create',
    accept: '.epub',
    inputFormat: 'EPUB',
  },
  {
    id: 'images-to-pdf',
    title: 'Images to PDF',
    emoji: '🖼️',
    description: 'Convert images (PNG/JPG) to PDF',
    category: 'create',
    accept: 'image/*',
  },
  {
    id: 'ppt-to-pdf',
    title: 'PPT to PDF',
    emoji: '📽️',
    description: 'Convert PowerPoint presentations to PDF',
    category: 'create',
    accept: '.ppt,.pptx',
    inputFormat: 'PPT',
  },
  {
    id: 'url-to-pdf',
    title: 'URL to PDF',
    emoji: '🌐',
    description: 'Create a PDF from a URL content',
    category: 'create',
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    emoji: '📝',
    description: 'Convert Word documents to PDF',
    category: 'create',
    accept: '.doc,.docx',
    inputFormat: 'Word',
  },

  // ── Ebook ─────────────────────────────────────────
  {
    id: 'azw3-to-epub',
    title: 'AZW3 to EPUB',
    emoji: '📖',
    description: 'Convert AZW3 ebooks to EPUB format',
    category: 'ebook',
    accept: '.azw3',
    inputExt: '.azw3',
    outputExt: '.epub',
  },
  {
    id: 'azw3-to-mobi',
    title: 'AZW3 to MOBI',
    emoji: '📱',
    description: 'Convert AZW3 ebooks to MOBI format (Kindle)',
    category: 'ebook',
    accept: '.azw3',
    inputExt: '.azw3',
    outputExt: '.mobi',
  },
  {
    id: 'epub-to-azw3',
    title: 'EPUB to AZW3',
    emoji: '📱',
    description: 'Convert EPUB ebooks to AZW3 format (Kindle)',
    category: 'ebook',
    accept: '.epub',
    inputExt: '.epub',
    outputExt: '.azw3',
  },
  {
    id: 'epub-to-mobi',
    title: 'EPUB to MOBI',
    emoji: '📱',
    description: 'Convert EPUB ebooks to MOBI format (Kindle)',
    category: 'ebook',
    accept: '.epub',
    inputExt: '.epub',
    outputExt: '.mobi',
  },
  {
    id: 'mobi-to-azw3',
    title: 'MOBI to AZW3',
    emoji: '📱',
    description: 'Convert MOBI ebooks to AZW3 format (Kindle)',
    category: 'ebook',
    accept: '.mobi',
    inputExt: '.mobi',
    outputExt: '.azw3',
  },
  {
    id: 'mobi-to-epub',
    title: 'MOBI to EPUB',
    emoji: '📖',
    description: 'Convert MOBI ebooks to EPUB format',
    category: 'ebook',
    accept: '.mobi',
    inputExt: '.mobi',
    outputExt: '.epub',
  },

  // ── Edit ───────────────────────────────────────────
  {
    id: 'pdf-annotate',
    title: 'Annotate',
    emoji: '🖊️',
    description: 'Draw freehand annotations on a canvas overlay',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-compress',
    title: 'Compress',
    emoji: '📦',
    description: 'Reduce PDF file size by re-saving with optimizations',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-crop',
    title: 'Crop Pages',
    emoji: '✂️',
    description: 'Set crop margins for PDF pages',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-delete-pages',
    title: 'Delete Pages',
    emoji: '🗑️',
    description: 'Remove specific pages from a PDF',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-merge',
    title: 'Merge',
    emoji: '🔗',
    description: 'Combine multiple PDFs into one',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-page-numbers',
    title: 'Page Numbers',
    emoji: '🔢',
    description: 'Add page numbers to your PDF',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-rearrange',
    title: 'Rearrange',
    emoji: '🔀',
    description: 'Reorder pages in a PDF',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-redact',
    title: 'Redact',
    emoji: '⬛',
    description: 'Hide sensitive information from PDF documents',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-rotate',
    title: 'Rotate',
    emoji: '🔄',
    description: 'Rotate PDF pages by 90, 180, or 270 degrees',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-split',
    title: 'Split',
    emoji: '✂️',
    description: 'Split a PDF into separate pages or ranges',
    category: 'edit',
    accept: '.pdf',
  },
  {
    id: 'pdf-watermark',
    title: 'Watermark',
    emoji: '💧',
    description: 'Add watermark text to PDF pages',
    category: 'edit',
    accept: '.pdf',
  },

  // ── Extract ───────────────────────────────────────
  {
    id: 'pdf-extract-images',
    title: 'Extract Images',
    emoji: '🖼️',
    description: 'Extract images from PDF as page snapshots',
    category: 'extract',
    accept: '.pdf',
  },
  {
    id: 'pdf-extract-text',
    title: 'Extract Text',
    emoji: '📝',
    description: 'Extract text content from PDF using pdfjs',
    category: 'extract',
    accept: '.pdf',
  },
  {
    id: 'pdf-info',
    title: 'Info',
    emoji: 'ℹ️',
    description: 'View PDF document information and metadata',
    category: 'extract',
    accept: '.pdf',
  },
  {
    id: 'pdf-metadata',
    title: 'Metadata',
    emoji: '🏷️',
    description:
      'View and edit PDF metadata (title, author, subject, keywords)',
    category: 'extract',
    accept: '.pdf',
  },
  {
    id: 'pdf-ocr',
    title: 'OCR',
    emoji: '👁️',
    description: 'Run OCR on scanned PDF to extract text',
    category: 'extract',
    accept: '.pdf',
  },
  {
    id: 'pdf-repair',
    title: 'Repair',
    emoji: '🔧',
    description: 'Re-save PDF to fix structural issues',
    category: 'extract',
    accept: '.pdf',
  },

  // ── Misc ──────────────────────────────────────────
  {
    id: 'pdf-esign',
    title: 'eSign',
    emoji: '✍️',
    description: 'Draw your signature and download as PNG',
    category: 'misc',
  },
  {
    id: 'pdf-security',
    title: 'Edit Metadata',
    emoji: '🔒',
    description: 'Edit PDF metadata (title, author, subject)',
    category: 'misc',
    accept: '.pdf',
  },
  {
    id: 'pdf-translate',
    title: 'Translate',
    emoji: '🌍',
    description: 'Translate text between languages',
    category: 'misc',
  },
];

export const CATEGORY_TOOLS: Record<string, string[]> = {};
for (const t of TOOLS) {
  (CATEGORY_TOOLS[t.category] ??= []).push(t.id);
}

let preselectedToolId: string | null = null;

export const preselectPdfTool = (id: string | null) => {
  preselectedToolId = id;
};

export const popPreselectedPdfTool = (): string | null => {
  const id = preselectedToolId;
  preselectedToolId = null;
  return id;
};
