jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import PayPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('PayPage', () => {
  it('shows and closes the QR code modal', async () => {
    renderWithProviders(<PayPage />);
    expect(await screen.findByText('Quick payments')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Show QR Code'));
    expect(screen.getByText('Your QR Code')).toBeInTheDocument();
    expect(screen.getByText(/Scan this code to pay/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Your QR Code')).not.toBeInTheDocument();
  });

  it('scans a QR code with camera denied fallback', async () => {
    renderWithProviders(<PayPage />);
    await screen.findByText('Quick payments');

    fireEvent.click(screen.getByText('Scan QR Code'));
    expect(
      await screen.findByText(
        'Camera access denied. Tap anywhere to simulate scan.'
      )
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText('Camera access denied. Tap anywhere to simulate scan.')
    );
    expect(
      await screen.findByText('QR code scanned successfully!')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Camera access denied. Tap anywhere to simulate scan.')
    ).not.toBeInTheDocument();
  });

  it('quick pays via preset and custom amount', async () => {
    renderWithProviders(<PayPage />);
    await screen.findByText('Quick payments');

    const sendDisabled = screen
      .getByText('Send Payment')
      .closest('button') as HTMLButtonElement;
    expect(sendDisabled).toBeDisabled();

    fireEvent.click(screen.getByText('$25'));
    fireEvent.click(screen.getByText('Send Payment'));
    expect(await screen.findByText('Payment sent!')).toBeInTheDocument();
  });
});
