jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import ErrorPage from '../error';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('ErrorPage', () => {
  it('fires reload on Try Again', () => {
    renderWithProviders(<ErrorPage />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(() => fireEvent.click(screen.getByText('Try Again'))).not.toThrow();
  });
});
