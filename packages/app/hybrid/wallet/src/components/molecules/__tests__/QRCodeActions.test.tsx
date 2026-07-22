import { render, screen, fireEvent } from '@testing-library/react';
import QRCodeActions from '../QRCodeActions';

describe('QRCodeActions', () => {
  it('renders show and scan QR code buttons', () => {
    render(<QRCodeActions onShowQR={jest.fn()} />);
    expect(screen.getByText('Show QR Code')).toBeInTheDocument();
    expect(screen.getByText('Scan QR Code')).toBeInTheDocument();
  });

  it('calls onShowQR when show button is clicked', () => {
    const onShowQR = jest.fn();
    render(<QRCodeActions onShowQR={onShowQR} />);
    fireEvent.click(screen.getByText('Show QR Code'));
    expect(onShowQR).toHaveBeenCalledTimes(1);
  });
});
