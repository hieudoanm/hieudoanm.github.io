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
import RatesPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('RatesPage', () => {
  it('renders the rate list with all currencies', async () => {
    renderWithProviders(<RatesPage />);
    expect(
      await screen.findByText(/58 currencies available/)
    ).toBeInTheDocument();

    expect(screen.getAllByText('Exchange Rates').length).toBeGreaterThan(0);
    expect(screen.getByText('US Dollar')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('Vietnamese Dong')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('VND')).toBeInTheDocument();
  });
});
