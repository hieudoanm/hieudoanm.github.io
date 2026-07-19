jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import TransferPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('TransferPage', () => {
  it('runs the full 3-step transfer flow', async () => {
    renderWithProviders(<TransferPage />);

    expect(await screen.findByText('Send money to anyone')).toBeInTheDocument();

    const nextDisabled = screen
      .getByText('Next')
      .closest('button') as HTMLButtonElement;
    expect(nextDisabled).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Recipient'), {
      target: { value: 'Sarah Wilson' },
    });
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Note (optional)')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText('Note (optional)'), {
      target: { value: 'Birthday gift' },
    });

    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByLabelText('Recipient')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Next'));

    expect(await screen.findByText('Birthday gift')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Send'));
    expect(await screen.findByText('Transfer Sent!')).toBeInTheDocument();
    expect(screen.getByText(/sent to/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('New Transfer'));
    expect(await screen.findByText('Send money to anyone')).toBeInTheDocument();
  });

  it('keeps amount Next disabled for non-positive amounts', async () => {
    renderWithProviders(<TransferPage />);
    await screen.findByText('Send money to anyone');
    fireEvent.change(screen.getByLabelText('Recipient'), {
      target: { value: 'Michael Chen' },
    });
    fireEvent.click(screen.getByText('Next'));
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '0' },
    });
    expect(screen.getAllByText('Next')[0].closest('button')).toBeDisabled();
  });
});
