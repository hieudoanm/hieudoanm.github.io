jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import SavingsGoalsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
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
