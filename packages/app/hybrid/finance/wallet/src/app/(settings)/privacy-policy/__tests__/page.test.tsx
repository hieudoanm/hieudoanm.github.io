jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
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
