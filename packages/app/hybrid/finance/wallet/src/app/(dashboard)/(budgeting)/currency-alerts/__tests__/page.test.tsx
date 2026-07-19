jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import CurrencyAlertsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('CurrencyAlertsPage', () => {
  it('renders alerts with current rates', async () => {
    renderWithProviders(<CurrencyAlertsPage />);
    expect(
      await screen.findByText(
        'Get notified when exchange rates hit your targets'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('USD → EUR')).toBeInTheDocument();
    expect(screen.getByText('USD → GBP')).toBeInTheDocument();
    expect(screen.getAllByText(/Current:/).length).toBe(2);
  });

  it('adds a currency alert', async () => {
    renderWithProviders(<CurrencyAlertsPage />);
    await screen.findByText(
      'Get notified when exchange rates hit your targets'
    );

    fireEvent.click(screen.getByText('Add Currency Alert'));
    expect(screen.getByText('New Alert')).toBeInTheDocument();

    const addDisabled = screen
      .getByText('Add Alert')
      .closest('button') as HTMLButtonElement;
    expect(addDisabled).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Target Rate'), {
      target: { value: '0.9' },
    });
    fireEvent.change(screen.getByLabelText('Direction'), {
      target: { value: 'below' },
    });

    fireEvent.click(screen.getByText('Add Alert'));
    expect(
      await screen.findByText('Currency alert created!')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('New Alert')).not.toBeInTheDocument();
    });
  });

  it('toggles and deletes alerts', async () => {
    renderWithProviders(<CurrencyAlertsPage />);
    await screen.findByText(
      'Get notified when exchange rates hit your targets'
    );

    const eurRow = screen
      .getByText('USD → EUR')
      .closest('.card') as HTMLElement;
    fireEvent.click(within(eurRow).getAllByRole('button')[0]);
    expect(await screen.findByText('Alert paused')).toBeInTheDocument();

    const gbpRow = screen
      .getByText('USD → GBP')
      .closest('.card') as HTMLElement;
    fireEvent.click(within(gbpRow).getAllByRole('button')[0]);
    expect(await screen.findByText('Alert activated')).toBeInTheDocument();

    const eurRow2 = screen
      .getByText('USD → EUR')
      .closest('.card') as HTMLElement;
    fireEvent.click(within(eurRow2).getAllByRole('button')[1]);
    expect(await screen.findByText('Alert deleted')).toBeInTheDocument();
  });
});
