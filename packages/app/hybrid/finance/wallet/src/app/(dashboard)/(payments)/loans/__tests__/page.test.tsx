jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import LoansPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('LoansPage', () => {
  it('renders loan stats, active loans and products', async () => {
    renderWithProviders(<LoansPage />);
    expect(await screen.findByText('Total Borrowed')).toBeInTheDocument();
    expect(screen.getAllByText('Monthly EMI').length).toBeGreaterThan(0);
    expect(screen.getByText('Active Loans')).toBeInTheDocument();
    expect(screen.getAllByText('Total Interest').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Personal Loan').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Auto Loan').length).toBeGreaterThan(0);
    expect(screen.getByText('12 / 36')).toBeInTheDocument();
    expect(screen.getByText('24 / 60')).toBeInTheDocument();

    expect(screen.getByText('EMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Loan Comparison')).toBeInTheDocument();
    expect(screen.getByText('Home Loan')).toBeInTheDocument();
    expect(screen.getByText('Education Loan')).toBeInTheDocument();
    expect(screen.getByText('8.5% - 14%')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();

    expect(screen.getAllByText('Apply for Loan').length).toBeGreaterThan(0);
  });

  it('recalculates EMI when calculator sliders change', async () => {
    renderWithProviders(<LoansPage />);
    await screen.findByText('Total Borrowed');

    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(3);

    fireEvent.change(sliders[0], { target: { value: '30000' } });
    expect(await screen.findByText('$30,000.00')).toBeInTheDocument();

    fireEvent.change(sliders[1], { target: { value: '10' } });
    expect(screen.getByText('10%')).toBeInTheDocument();

    fireEvent.change(sliders[2], { target: { value: '48' } });
    expect(screen.getByText('48 months')).toBeInTheDocument();
  });
});
