import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JsBarcode from 'jsbarcode';
import { BarcodeModal } from '../BarcodeModal';

jest.mock('jsbarcode', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockJsBarcode = JsBarcode as jest.Mock;

const renderModal = (onClose = jest.fn()) =>
  render(<BarcodeModal onClose={onClose} />);

describe('BarcodeModal', () => {
  beforeEach(() => {
    mockJsBarcode.mockClear();
    jest
      .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
      .mockReturnValue('data:image/png;base64,mockbarcode');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render with empty input', () => {
    renderModal();
    expect(
      screen.getByPlaceholderText('Enter text for barcode')
    ).toBeInTheDocument();
    expect(screen.getByText('Barcode appears here')).toBeInTheDocument();
  });

  it('should update text on input change', () => {
    renderModal();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: 'ABC-123' } });
    expect(screen.getByDisplayValue('ABC-123')).toBeInTheDocument();
  });

  it('should not generate when text is empty', () => {
    renderModal();
    fireEvent.click(screen.getByText('Gen'));
    expect(mockJsBarcode).not.toHaveBeenCalled();
  });

  it('should not generate when text is whitespace only', () => {
    renderModal();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Gen'));
    expect(mockJsBarcode).not.toHaveBeenCalled();
  });

  it('should generate barcode on button click', async () => {
    renderModal();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: 'ABC-123' } });
    fireEvent.click(screen.getByText('Gen'));
    expect(mockJsBarcode).toHaveBeenCalledWith(
      expect.any(HTMLCanvasElement),
      'ABC-123',
      {
        format: 'CODE128',
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 14,
        margin: 10,
        background: '#FFFFFF',
      }
    );
    await waitFor(() => {
      expect(screen.getByText('↓ Download PNG')).toBeInTheDocument();
    });
  });

  it('should generate barcode on Enter key', async () => {
    renderModal();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: 'ABC-123' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText('↓ Download PNG')).toBeInTheDocument();
    });
  });

  it('should disable Gen button when text is empty', () => {
    renderModal();
    expect(screen.getByText('Gen').closest('button')).toBeDisabled();
  });

  it('should show download button after barcode generation', async () => {
    renderModal();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: 'ABC-123' } });
    fireEvent.click(screen.getByText('Gen'));
    await waitFor(() => {
      expect(screen.getByText('↓ Download PNG')).toBeInTheDocument();
    });
  });

  it('should hide placeholder after generation', async () => {
    renderModal();
    expect(screen.getByText('Barcode appears here')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: 'ABC-123' } });
    fireEvent.click(screen.getByText('Gen'));
    await waitFor(() => {
      expect(
        screen.queryByText('Barcode appears here')
      ).not.toBeInTheDocument();
    });
  });

  it('should support format switching', () => {
    renderModal();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'EAN-13' } });
    expect(screen.getByDisplayValue('EAN-13')).toBeInTheDocument();
  });

  it('should download barcode when download button clicked', async () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    renderModal();
    const input = screen.getByPlaceholderText('Enter text for barcode');
    fireEvent.change(input, { target: { value: 'ABC-123' } });
    fireEvent.click(screen.getByText('Gen'));
    await waitFor(() => {
      expect(screen.getByText('↓ Download PNG')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('↓ Download PNG'));
    expect(createElementSpy).toHaveBeenCalledWith('a');
    createElementSpy.mockRestore();
  });
});
