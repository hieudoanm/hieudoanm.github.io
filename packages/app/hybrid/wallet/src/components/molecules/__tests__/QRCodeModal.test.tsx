import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QRCodeModal from '../QRCodeModal';

describe('QRCodeModal', () => {
  it('renders when open', () => {
    render(<QRCodeModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText('Your QR Code')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<QRCodeModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByText('Your QR Code')).not.toBeInTheDocument();
  });

  it('renders scan instruction', () => {
    render(<QRCodeModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText(/Scan this code to pay/)).toBeInTheDocument();
  });

  it('calls onClose when Close is clicked', async () => {
    const onClose = jest.fn();
    render(<QRCodeModal open={true} onClose={onClose} />);
    await userEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
