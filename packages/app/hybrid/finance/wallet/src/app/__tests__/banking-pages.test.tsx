jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import CardRewardsPage from '@/app/(dashboard)/(banking)/card-rewards/page';
import SavingsGoalsPage from '@/app/(dashboard)/(banking)/savings-goals/page';
import InsurancePage from '@/app/(dashboard)/(banking)/insurance/page';
import FixedDepositsPage from '@/app/(dashboard)/(banking)/fixed-deposits/page';
import RecurringDepositsPage from '@/app/(dashboard)/(banking)/recurring-deposits/page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('CardRewardsPage', () => {
  it('renders stats, per-card rewards and catalog', async () => {
    renderWithProviders(<CardRewardsPage />);
    expect(
      await screen.findByText('Earn and redeem rewards')
    ).toBeInTheDocument();

    expect(screen.getByText('64,037')).toBeInTheDocument();
    expect(screen.getByText('$1,280.75')).toBeInTheDocument();
    expect(screen.getAllByText('platinum').length).toBe(2);

    expect(screen.getByText('Main Card')).toBeInTheDocument();
    expect(screen.getByText('Business Card')).toBeInTheDocument();
    expect(screen.getByText('Travel Card')).toBeInTheDocument();
    expect(screen.getByText('$46.81')).toBeInTheDocument();
    expect(screen.getByText('$312.50')).toBeInTheDocument();
    expect(screen.getByText('44,500')).toBeInTheDocument();

    expect(screen.getByText('Flight Voucher')).toBeInTheDocument();
    expect(screen.getByText('Gift Card')).toBeInTheDocument();
    expect(screen.getByText('Cashback')).toBeInTheDocument();
    expect(screen.getAllByText('Redeem').length).toBe(6);
  });

  it('submits a redeem request with a toast', async () => {
    renderWithProviders(<CardRewardsPage />);
    await screen.findByText('Earn and redeem rewards');

    const giftCard = screen
      .getByText('Gift Card')
      .closest('.card') as HTMLElement;
    fireEvent.click(within(giftCard).getByText('Redeem'));
    expect(
      await screen.findByText('Gift Card redeem request submitted')
    ).toBeInTheDocument();
  });

  it('renders the tier benefits table', async () => {
    renderWithProviders(<CardRewardsPage />);
    await screen.findByText('Earn and redeem rewards');

    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('Basic rewards')).toBeInTheDocument();
    expect(screen.getAllByText(/Lounge access/).length).toBe(3);
    expect(screen.getAllByText(/Concierge/).length).toBe(2);
    expect(screen.getByText('5x')).toBeInTheDocument();
  });
});

describe('SavingsGoalsPage', () => {
  it('renders stats and goal progress', async () => {
    renderWithProviders(<SavingsGoalsPage />);
    expect(
      await screen.findByText('Track your savings progress')
    ).toBeInTheDocument();

    expect(screen.getByText('Total Goals')).toBeInTheDocument();
    expect(screen.getByText('$17,450.00')).toBeInTheDocument();
    expect(screen.getByText('$40,000.00')).toBeInTheDocument();
    expect(screen.getByText('44%')).toBeInTheDocument();

    expect(screen.getByText('Emergency Fund')).toBeInTheDocument();
    expect(screen.getByText('Japan Trip')).toBeInTheDocument();
    expect(screen.getByText('Wedding Fund')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('64%')).toBeInTheDocument();
    expect(screen.getByText('23%')).toBeInTheDocument();
    expect(screen.getByText('vacation')).toBeInTheDocument();
    expect(screen.getByText('wedding')).toBeInTheDocument();
    expect(screen.getByText(/5,250/)).toBeInTheDocument();
    expect(screen.getByText(/600\.00\/mo/)).toBeInTheDocument();
    expect(screen.getAllByText(/days left/).length).toBe(3);
  });

  it('creates a new savings goal', async () => {
    renderWithProviders(<SavingsGoalsPage />);
    await screen.findByText('Track your savings progress');

    fireEvent.click(screen.getByText('New Goal'));
    expect(screen.getByText('New Savings Goal')).toBeInTheDocument();

    const goalName = (
      screen.getByText('Goal Name').closest('.floating-label') as HTMLElement
    ).querySelector('input') as HTMLInputElement;
    const targetAmount = (
      screen
        .getByText('Target Amount ($)')
        .closest('.floating-label') as HTMLElement
    ).querySelector('input') as HTMLInputElement;
    fireEvent.change(goalName, {
      target: { value: 'House Down Payment' },
    });
    fireEvent.change(targetAmount, {
      target: { value: '50000' },
    });

    fireEvent.click(screen.getByText('Create Goal'));
    await waitFor(() => {
      expect(screen.queryByText('New Savings Goal')).not.toBeInTheDocument();
    });
  });
});

describe('InsurancePage', () => {
  it('renders coverage stats and policy cards', async () => {
    renderWithProviders(<InsurancePage />);
    expect(await screen.findByText('Manage your policies')).toBeInTheDocument();

    expect(screen.getAllByText('$650,000.00').length).toBe(2);
    expect(screen.getByText('$445.00')).toBeInTheDocument();

    expect(screen.getByText('Term Life Insurance')).toBeInTheDocument();
    expect(screen.getByText('SecureLife')).toBeInTheDocument();
    expect(screen.getByText('SL-2024-88421')).toBeInTheDocument();
    expect(screen.getByText('Health Plus')).toBeInTheDocument();
    expect(screen.getByText('Auto Shield')).toBeInTheDocument();
    expect(screen.getByText('DriveSafe')).toBeInTheDocument();
    expect(screen.getByText('$45.00/monthly')).toBeInTheDocument();
    expect(screen.getAllByText('active').length).toBe(3);
    expect(screen.getAllByText('life').length).toBe(2);
    expect(screen.getAllByText('Pay Premium').length).toBe(3);
  });

  it('pays a premium with a toast', async () => {
    renderWithProviders(<InsurancePage />);
    await screen.findByText('Manage your policies');

    const termLife = screen
      .getByText('Term Life Insurance')
      .closest('.card') as HTMLElement;
    fireEvent.click(within(termLife).getByText('Pay Premium'));
    expect(
      await screen.findByText('Term Life Insurance premium payment simulated')
    ).toBeInTheDocument();
  });
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
