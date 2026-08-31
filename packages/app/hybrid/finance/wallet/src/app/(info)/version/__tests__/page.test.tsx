jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import VersionPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('VersionPage', () => {
  it('renders version segments', () => {
    renderWithProviders(<VersionPage />);
    expect(screen.getByText('Wallet Version')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('copies the version to clipboard', async () => {
    renderWithProviders(<VersionPage />);
    const writeText = navigator.clipboard.writeText as jest.Mock;
    fireEvent.click(screen.getByText('Copy version'));
    await waitFor(() => {
      expect(writeText).toHaveBeenCalled();
    });
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
});
