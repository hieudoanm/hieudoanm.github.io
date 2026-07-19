import { render, screen, fireEvent } from '@testing-library/react';
import ToolsPage from '@/app/tools/page';

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => <div data-testid="dynamic-tool" />,
}));

jest.mock('@/components/atoms/PdfFileUpload', () => ({
  PdfFileUpload: () => <div>stub-upload</div>,
}));

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

describe('Tools page', () => {
  it('renders the empty state with all categories', () => {
    render(<ToolsPage />);
    expect(screen.getByText('PDF Tools')).toBeInTheDocument();
    expect(
      screen.getByText('Select a PDF tool from the sidebar')
    ).toBeInTheDocument();
    expect(screen.getByText('Convert')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Ebook')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Extract')).toBeInTheDocument();
    expect(screen.getByText('Misc')).toBeInTheDocument();
  });

  it('filters tools by search query', () => {
    render(<ToolsPage />);
    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'compress' },
    });
    expect(screen.getByText('Compress')).toBeInTheDocument();
    expect(screen.queryByText('PDF to EPUB')).not.toBeInTheDocument();
    expect(screen.queryByText('Convert')).not.toBeInTheDocument();
  });

  it('expands a category and renders a mapped tool component', () => {
    render(<ToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Convert/ }));
    fireEvent.click(screen.getByRole('button', { name: /PDF to Images/ }));
    expect(
      screen.getByRole('heading', { name: 'PDF to Images' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Render each PDF page as a PNG image.')
    ).toBeInTheDocument();
  });

  it('falls back to generic components for unmapped tools', () => {
    render(<ToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Convert/ }));
    fireEvent.click(screen.getByRole('button', { name: /PDF to EPUB/ }));
    expect(
      screen.getByRole('heading', { name: 'PDF to EPUB' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Ebook/ }));
    fireEvent.click(screen.getByRole('button', { name: /AZW3 to EPUB/ }));
    expect(
      screen.getByRole('heading', { name: 'AZW3 to EPUB' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Create/ }));
    fireEvent.click(screen.getByRole('button', { name: /EPUB to PDF/ }));
    expect(
      screen.getByRole('heading', { name: 'EPUB to PDF' })
    ).toBeInTheDocument();
  });

  it('renders the dynamically loaded redact tool', () => {
    render(<ToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Edit/ }));
    fireEvent.click(screen.getByRole('button', { name: /Redact/ }));
    expect(screen.getByRole('heading', { name: 'Redact' })).toBeInTheDocument();
    expect(screen.getByTestId('dynamic-tool')).toBeInTheDocument();
  });

  it('collapses a category when clicked again', () => {
    render(<ToolsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Convert/ }));
    expect(
      screen.getByRole('button', { name: /PDF to EPUB/ })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Convert/ }));
    expect(
      screen.queryByRole('button', { name: /PDF to EPUB/ })
    ).not.toBeInTheDocument();
  });
});
