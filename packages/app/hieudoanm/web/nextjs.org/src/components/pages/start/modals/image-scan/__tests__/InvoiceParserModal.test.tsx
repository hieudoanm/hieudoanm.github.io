import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { InvoiceParserModal } from '../InvoiceParserModal';

const mockRecognize = jest.fn().mockResolvedValue({
  data: { text: 'Mock OCR\nTotal: $123.45\n01/15/2024' },
});

jest.mock('tesseract.js', () => ({
  recognize: (...args: unknown[]) => mockRecognize(...args),
}));

const mockRun = jest.fn();
jest.mock('onnxruntime-web', () => ({
  InferenceSession: {
    create: jest
      .fn()
      .mockResolvedValue({ run: (...args: unknown[]) => mockRun(...args) }),
  },
  Tensor: jest.fn(),
}));

URL.createObjectURL = jest.fn().mockReturnValue('blob:mock');

describe('InvoiceParserModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal title', () => {
    render(<InvoiceParserModal onClose={onClose} />);
    expect(screen.getByText('📄 Smart Invoice Scanner')).toBeInTheDocument();
  });

  it('renders upload input', () => {
    render(<InvoiceParserModal onClose={onClose} />);
    expect(screen.getByText('Upload Invoice')).toBeInTheDocument();
  });

  it('renders file input', () => {
    render(<InvoiceParserModal onClose={onClose} />);
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('disables run OCR button when no image', () => {
    render(<InvoiceParserModal onClose={onClose} />);
    expect(screen.getByText('Run OCR + AI').closest('button')).toBeDisabled();
  });

  it('uploads image and shows preview', () => {
    render(<InvoiceParserModal onClose={onClose} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File([''], 'invoice.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('enables OCR button after image upload', () => {
    render(<InvoiceParserModal onClose={onClose} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File([''], 'invoice.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    expect(
      screen.getByText('Run OCR + AI').closest('button')
    ).not.toBeDisabled();
  });

  it('runs OCR and displays extracted fields', async () => {
    render(<InvoiceParserModal onClose={onClose} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File([''], 'invoice.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    fireEvent.click(screen.getByText('Run OCR + AI'));
    await waitFor(() => {
      expect(screen.getByText('Mock OCR')).toBeInTheDocument();
    });
    expect(screen.getByText(/Vendor:/)).toBeInTheDocument();
  });

  it('shows loading spinner during OCR', async () => {
    mockRecognize.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: { text: 'Delayed\nTotal: $10.00\n02/20/2024' },
              }),
            100
          )
        )
    );
    render(<InvoiceParserModal onClose={onClose} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File([''], 'invoice.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    fireEvent.click(screen.getByText('Run OCR + AI'));
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Processing...')).not.toBeInTheDocument();
    });
  });

  it('displays OCR output text', async () => {
    render(<InvoiceParserModal onClose={onClose} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File([''], 'invoice.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    fireEvent.click(screen.getByText('Run OCR + AI'));
    await waitFor(() => {
      expect(screen.getByText('OCR Output')).toBeInTheDocument();
    });
  });

  it('shows Extracted Fields section after OCR', async () => {
    render(<InvoiceParserModal onClose={onClose} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File([''], 'invoice.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);
    fireEvent.click(screen.getByText('Run OCR + AI'));
    await waitFor(() => {
      expect(screen.getByText('Extracted Fields')).toBeInTheDocument();
    });
  });
});
