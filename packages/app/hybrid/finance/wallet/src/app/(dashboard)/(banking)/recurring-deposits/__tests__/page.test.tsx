jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import RecurringDepositsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('RecurringDepositsPage', () => {
  it('renders summary stats and active RDs', async () => {
    renderWithProviders(<RecurringDepositsPage />);
    expect(
      await screen.findByText(
        'Grow your savings with systematic monthly deposits'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('$8,400.00')).toBeInTheDocument();
    expect(screen.getByText('$14,017.00')).toBeInTheDocument();
    expect(screen.getByText('5.25%')).toBeInTheDocument();

    expect(screen.getByText('12-Month RD')).toBeInTheDocument();
    expect(screen.getByText('5% p.a.')).toBeInTheDocument();
    expect(screen.getByText('6/12 months')).toBeInTheDocument();
    expect(screen.getByText(/6,175/)).toBeInTheDocument();
    expect(screen.getByText('24-Month RD')).toBeInTheDocument();
    expect(screen.getByText('5.5% p.a.')).toBeInTheDocument();
    expect(screen.getByText('18/24 months')).toBeInTheDocument();
    expect(screen.getByText(/7,842/)).toBeInTheDocument();
    expect(screen.getAllByText('Maturity Amount').length).toBe(3);
  });

  it('recalculates RD maturity when the monthly amount changes', async () => {
    renderWithProviders(<RecurringDepositsPage />);
    await screen.findByText(
      'Grow your savings with systematic monthly deposits'
    );

    expect(screen.getByText('$12,000.00')).toBeInTheDocument();
    expect(screen.getByText('$12,984.01')).toBeInTheDocument();
    expect(screen.getByText('$984.01')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Monthly Amount'), {
      target: { value: '1000' },
    });
    expect(screen.getByText('$24,000.00')).toBeInTheDocument();
    expect(screen.getByText('$25,968.01')).toBeInTheDocument();
  });
});
