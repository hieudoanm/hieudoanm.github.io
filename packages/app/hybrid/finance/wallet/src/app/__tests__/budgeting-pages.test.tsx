jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import BudgetPage from '@/app/(dashboard)/(budgeting)/budget/page';
import BillsPage from '@/app/(dashboard)/(budgeting)/bills/page';
import RecurringTransfersPage from '@/app/(dashboard)/(budgeting)/recurring-transfers/page';
import RatesPage from '@/app/(dashboard)/(budgeting)/rates/page';
import CurrencyAlertsPage from '@/app/(dashboard)/(budgeting)/currency-alerts/page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('BudgetPage', () => {
  it('renders summary and category cards', async () => {
    renderWithProviders(<BudgetPage />);
    expect(await screen.findByText('Track your spending')).toBeInTheDocument();

    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getAllByText('Budget').length).toBeGreaterThan(0);
    expect(screen.getByText(/1,580/)).toBeInTheDocument();
    expect(screen.getByText(/2,050/)).toBeInTheDocument();

    expect(screen.getByText('Food & Drink')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Over budget')).toBeInTheDocument();
  });
});

describe('BillsPage', () => {
  it('renders bills and total due', async () => {
    renderWithProviders(<BillsPage />);
    expect(
      await screen.findByText('Manage your recurring payments')
    ).toBeInTheDocument();

    expect(screen.getByText('Total Due This Month')).toBeInTheDocument();
    expect(screen.getByText(/255.97/)).toBeInTheDocument();

    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Internet')).toBeInTheDocument();
    expect(screen.getByText('Car Insurance')).toBeInTheDocument();
    expect(screen.getAllByText('Paid').length).toBeGreaterThan(0);
  });

  it('marks a bill as paid', async () => {
    renderWithProviders(<BillsPage />);
    await screen.findByText('Manage your recurring payments');

    const netflixRow = screen
      .getByText('Netflix')
      .closest('.rounded-xl') as HTMLElement;
    const payButton = within(netflixRow).getByText('Pay');
    fireEvent.click(payButton);

    expect(
      await screen.findByText('Netflix marked as paid')
    ).toBeInTheDocument();
  });

  it('adds a bill via the modal', async () => {
    renderWithProviders(<BillsPage />);
    await screen.findByText('Manage your recurring payments');

    fireEvent.click(screen.getAllByText('Add Bill', { selector: 'button' })[0]);
    expect(
      screen.getByText('Add Bill', { selector: 'h3' })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Bill Name'), {
      target: { value: 'Water Bill' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '35.5' },
    });
    fireEvent.change(screen.getByLabelText('Next Due Date'), {
      target: { value: '2026-09-01' },
    });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(
      await screen.findByText('Bill added successfully')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Bill Name')).not.toBeInTheDocument();
    });
  });
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

describe('RatesPage', () => {
  it('renders the rate list with all currencies', async () => {
    renderWithProviders(<RatesPage />);
    expect(
      await screen.findByText(/58 currencies available/)
    ).toBeInTheDocument();

    expect(screen.getAllByText('Exchange Rates').length).toBeGreaterThan(0);
    expect(screen.getByText('US Dollar')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('Vietnamese Dong')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('VND')).toBeInTheDocument();
  });
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
