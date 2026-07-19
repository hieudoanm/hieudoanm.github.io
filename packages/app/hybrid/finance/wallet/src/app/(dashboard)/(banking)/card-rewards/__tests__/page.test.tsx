jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import CardRewardsPage from '../page';

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
