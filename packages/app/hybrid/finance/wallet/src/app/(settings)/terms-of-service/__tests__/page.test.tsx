jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
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
