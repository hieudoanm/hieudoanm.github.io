jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import RootLayout from '../layout';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('RootLayout', () => {
  it('wraps children with providers', () => {
    localStorage.setItem('wallet-auth', 'true');
    renderWithProviders(
      <RootLayout>
        <div data-testid="child">Child</div>
      </RootLayout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
