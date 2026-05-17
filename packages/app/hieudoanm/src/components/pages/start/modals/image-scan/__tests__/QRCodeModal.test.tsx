import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toDataURL } from 'qrcode';
import { QRCodeModal } from '../QRCodeModal';

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
}));

const mockToDataURL = toDataURL as jest.Mock;

const renderQR = (onClose = jest.fn()) =>
  render(<QRCodeModal onClose={onClose} />);

describe('QRCodeModal', () => {
  beforeEach(() => {
    mockToDataURL.mockReset();
    mockToDataURL.mockResolvedValue('data:image/jpeg;base64,mockqrdata');
  });

  it('should render with default URL', () => {
    renderQR();
    expect(screen.getByDisplayValue('https://')).toBeInTheDocument();
    expect(screen.getByText('QR appears here')).toBeInTheDocument();
  });

  it('should update URL on input change', () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
  });

  it('should not generate when URL is empty', () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByText('Gen'));
    expect(mockToDataURL).not.toHaveBeenCalled();
  });

  it('should generate QR on button click', async () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('Gen'));
    expect(mockToDataURL).toHaveBeenCalledWith('https://example.com', {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 512,
      margin: 1,
      color: { dark: '#F5F5F5', light: '#171717' },
    });
    await waitFor(() => {
      expect(screen.getByText('↓ Download JPG')).toBeInTheDocument();
    });
  });

  it('should generate QR on Enter key', async () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText('↓ Download JPG')).toBeInTheDocument();
    });
  });

  it('should show loading spinner while generating', async () => {
    mockToDataURL.mockImplementation(
      () => new Promise((r) => setTimeout(r, 100))
    );
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('Gen'));
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('should disable generate button when URL is empty', () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Gen').closest('button')).toBeDisabled();
  });

  it('should show download button after QR generation', async () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('Gen'));
    await waitFor(() => {
      expect(screen.getByText('↓ Download JPG')).toBeInTheDocument();
    });
  });

  it('should download QR when download button clicked', async () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('Gen'));
    await waitFor(() => {
      expect(screen.getByText('↓ Download JPG')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('↓ Download JPG'));
    expect(createElementSpy).toHaveBeenCalledWith('a');
    createElementSpy.mockRestore();
  });

  it('should hide QR placeholder after generation', async () => {
    renderQR();
    expect(screen.getByText('QR appears here')).toBeInTheDocument();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByText('Gen'));
    await waitFor(() => {
      expect(screen.queryByText('QR appears here')).not.toBeInTheDocument();
    });
  });

  it('should not trim whitespace-only URLs', () => {
    renderQR();
    const input = screen.getByDisplayValue('https://');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Gen'));
    expect(mockToDataURL).not.toHaveBeenCalled();
  });
});
