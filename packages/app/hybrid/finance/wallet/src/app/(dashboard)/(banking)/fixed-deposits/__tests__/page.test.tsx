jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import FixedDepositsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('FixedDepositsPage', () => {
  it('renders summary stats and active deposits', async () => {
    renderWithProviders(<FixedDepositsPage />);
    expect(await screen.findByText(/active FDs/)).toBeInTheDocument();

    expect(screen.getByText('$35,000.00')).toBeInTheDocument();
    expect(screen.getByText('$40,372.50')).toBeInTheDocument();
    expect(screen.getByText('5.67%')).toBeInTheDocument();

    expect(screen.getByText('1-Year FD')).toBeInTheDocument();
    expect(screen.getByText('5.25%')).toBeInTheDocument();
    expect(screen.getByText(/10,525/)).toBeInTheDocument();
    expect(screen.getByText('3-Year FD')).toBeInTheDocument();
    expect(screen.getByText('6.1%')).toBeInTheDocument();
    expect(screen.getByText(/29,847/)).toBeInTheDocument();
  });

  it('recalculates maturity when the deposit amount changes', async () => {
    renderWithProviders(<FixedDepositsPage />);
    await screen.findByText(/active FDs/);

    expect(screen.getByText('$10,776.33')).toBeInTheDocument();
    expect(screen.getByText('$776.33')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Deposit Amount'), {
      target: { value: '50000' },
    });
    expect(screen.getByText('$53,881.63')).toBeInTheDocument();
  });

  it('toggles auto-renew on a deposit', async () => {
    renderWithProviders(<FixedDepositsPage />);
    await screen.findByText(/active FDs/);

    const threeYear = screen
      .getByText('3-Year FD')
      .closest('.rounded-box') as HTMLElement;
    const toggle = within(threeYear).getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('shows the FD vs RD comparison', async () => {
    renderWithProviders(<FixedDepositsPage />);
    await screen.findByText(/active FDs/);

    fireEvent.click(screen.getByText('Show Comparison'));
    expect(screen.getByText('Fixed Deposit')).toBeInTheDocument();
    expect(screen.getByText('Recurring Deposit')).toBeInTheDocument();
    expect(screen.getByText('$833.33')).toBeInTheDocument();
    expect(screen.getByText(/FD earns higher returns/)).toBeInTheDocument();
  });
});
