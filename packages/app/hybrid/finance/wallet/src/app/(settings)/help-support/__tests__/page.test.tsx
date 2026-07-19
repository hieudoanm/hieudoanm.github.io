jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import HelpSupportPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('HelpSupportPage', () => {
  it('renders Help & Support', () => {
    renderWithProviders(<HelpSupportPage />);
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });
});
