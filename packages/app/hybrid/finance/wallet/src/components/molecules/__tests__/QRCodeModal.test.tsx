import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QRCodeModal from '../QRCodeModal';
import { DataProvider } from '@/providers/DataProvider';

function renderModal(open: boolean, onClose = jest.fn()) {
  return render(
    <DataProvider>
      <QRCodeModal open={open} onClose={onClose} />
    </DataProvider>
  );
}

describe('QRCodeModal', () => {
  beforeEach(() => localStorage.clear());

  it('renders when open', () => {
    renderModal(true);
    expect(screen.getByText('Your QR Code')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal(false);
    expect(screen.queryByText('Your QR Code')).not.toBeInTheDocument();
  });

  it('renders scan instruction', () => {
    renderModal(true);
    expect(screen.getByText(/Scan this code to pay/)).toBeInTheDocument();
  });

  it('calls onClose when Close is clicked', async () => {
    const onClose = jest.fn();
    renderModal(true, onClose);
    await userEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
