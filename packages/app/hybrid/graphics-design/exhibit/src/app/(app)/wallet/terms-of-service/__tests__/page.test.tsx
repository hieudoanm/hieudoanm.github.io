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
import TermsOfServicePage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('TermsOfServicePage', () => {
  it('renders Terms of Service', () => {
    renderWithProviders(<TermsOfServicePage />);
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});
