jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import BillsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('BillsPage', () => {
  it('renders bills and total due', async () => {
    renderWithProviders(<BillsPage />);
    expect(
      await screen.findByText('Manage your recurring payments')
    ).toBeInTheDocument();

    expect(screen.getByText('Total Due This Month')).toBeInTheDocument();
    expect(screen.getByText(/255.97/)).toBeInTheDocument();

    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Internet')).toBeInTheDocument();
    expect(screen.getByText('Car Insurance')).toBeInTheDocument();
    expect(screen.getAllByText('Paid').length).toBeGreaterThan(0);
  });

  it('marks a bill as paid', async () => {
    renderWithProviders(<BillsPage />);
    await screen.findByText('Manage your recurring payments');

    const netflixRow = screen
      .getByText('Netflix')
      .closest('.rounded-xl') as HTMLElement;
    const payButton = within(netflixRow).getByText('Pay');
    fireEvent.click(payButton);

    expect(
      await screen.findByText('Netflix marked as paid')
    ).toBeInTheDocument();
  });

  it('adds a bill via the modal', async () => {
    renderWithProviders(<BillsPage />);
    await screen.findByText('Manage your recurring payments');

    fireEvent.click(screen.getAllByText('Add Bill', { selector: 'button' })[0]);
    expect(
      screen.getByText('Add Bill', { selector: 'h3' })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Bill Name'), {
      target: { value: 'Water Bill' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '35.5' },
    });
    fireEvent.change(screen.getByLabelText('Next Due Date'), {
      target: { value: '2026-09-01' },
    });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(
      await screen.findByText('Bill added successfully')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Bill Name')).not.toBeInTheDocument();
    });
  });
});
