jest.mock(
  '@/lib/wallet/db',
  () => require('@/test-helpers/wallet').mockDbModule
);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers/wallet').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers/wallet').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers/wallet';
import BudgetPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('BudgetPage', () => {
  it('renders summary and category cards', async () => {
    renderWithProviders(<BudgetPage />);
    expect(await screen.findByText('Track your spending')).toBeInTheDocument();

    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getAllByText('Budget').length).toBeGreaterThan(0);
    expect(screen.getByText(/1,580/)).toBeInTheDocument();
    expect(screen.getByText(/2,050/)).toBeInTheDocument();

    expect(screen.getByText('Food & Drink')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Over budget')).toBeInTheDocument();
  });
});
