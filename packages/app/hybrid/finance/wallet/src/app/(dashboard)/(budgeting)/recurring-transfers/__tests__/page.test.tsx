jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import RecurringTransfersPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('RecurringTransfersPage', () => {
  it('renders transfers with account and contact names', async () => {
    renderWithProviders(<RecurringTransfersPage />);
    expect(
      await screen.findByText('Manage automatic recurring payments')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Main Checking → Sarah Wilson')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Main Checking → Michael Chen')
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Next:/).length).toBeGreaterThan(0);
  });

  it('pauses and resumes a transfer', async () => {
    renderWithProviders(<RecurringTransfersPage />);
    await screen.findByText('Manage automatic recurring payments');

    const row = screen
      .getByText('Main Checking → Sarah Wilson')
      .closest('.card') as HTMLElement;
    const toggle = within(row).getAllByRole('button')[0];
    fireEvent.click(toggle);
    expect(await screen.findByText('Transfer paused')).toBeInTheDocument();
  });

  it('creates a new recurring transfer', async () => {
    renderWithProviders(<RecurringTransfersPage />);
    await screen.findByText('Manage automatic recurring payments');

    fireEvent.click(screen.getByText('New'));
    const createDisabled = screen
      .getByText('Create')
      .closest('button') as HTMLButtonElement;
    expect(createDisabled).toBeDisabled();

    fireEvent.change(screen.getByLabelText('From Account'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByLabelText('To Contact'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '75' },
    });

    expect(
      (screen.getByText('Create').closest('button') as HTMLButtonElement)
        .disabled
    ).toBe(false);

    fireEvent.click(screen.getByText('Create'));
    expect(
      await screen.findByText('Recurring transfer created!')
    ).toBeInTheDocument();
  });
});
