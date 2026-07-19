jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import PaymentRequestsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('PaymentRequestsPage', () => {
  it('renders incoming and outgoing requests with statuses', async () => {
    renderWithProviders(<PaymentRequestsPage />);
    expect(await screen.findByText('Incoming (2)')).toBeInTheDocument();

    expect(screen.getByText('Outgoing (1)')).toBeInTheDocument();
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText(/Dinner split/)).toBeInTheDocument();
    expect(screen.getByText(/Rent share/)).toBeInTheDocument();
    expect(screen.getByText('To Michael Chen')).toBeInTheDocument();
    expect(screen.getByText(/Concert tickets/)).toBeInTheDocument();
    expect(screen.getAllByText('Pending')).toHaveLength(2);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.queryByText('No payment requests')).not.toBeInTheDocument();
  });
});
