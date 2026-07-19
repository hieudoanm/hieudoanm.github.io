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
import PrivacyPolicyPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('PrivacyPolicyPage', () => {
  it('renders Privacy Policy', () => {
    renderWithProviders(<PrivacyPolicyPage />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });
});
