jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import TransferPage from '@/app/(dashboard)/(payments)/transfer/page';
import PayPage from '@/app/(dashboard)/(payments)/pay/page';
import PaymentRequestsPage from '@/app/(dashboard)/(payments)/payment-requests/page';
import SplitBillPage from '@/app/(dashboard)/(payments)/split-bill/page';
import ContactsPage from '@/app/(dashboard)/(payments)/contacts/page';
import LoansPage from '@/app/(dashboard)/(payments)/loans/page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('TransferPage', () => {
  it('runs the full 3-step transfer flow', async () => {
    renderWithProviders(<TransferPage />);

    expect(await screen.findByText('Send money to anyone')).toBeInTheDocument();

    const nextDisabled = screen
      .getByText('Next')
      .closest('button') as HTMLButtonElement;
    expect(nextDisabled).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Recipient'), {
      target: { value: 'Sarah Wilson' },
    });
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Note (optional)')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText('Note (optional)'), {
      target: { value: 'Birthday gift' },
    });

    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByLabelText('Recipient')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Next'));

    expect(await screen.findByText('Birthday gift')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Send'));
    expect(await screen.findByText('Transfer Sent!')).toBeInTheDocument();
    expect(screen.getByText(/sent to/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('New Transfer'));
    expect(await screen.findByText('Send money to anyone')).toBeInTheDocument();
  });

  it('keeps amount Next disabled for non-positive amounts', async () => {
    renderWithProviders(<TransferPage />);
    await screen.findByText('Send money to anyone');
    fireEvent.change(screen.getByLabelText('Recipient'), {
      target: { value: 'Michael Chen' },
    });
    fireEvent.click(screen.getByText('Next'));
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '0' },
    });
    expect(screen.getAllByText('Next')[0].closest('button')).toBeDisabled();
  });
});

describe('PayPage', () => {
  it('shows and closes the QR code modal', async () => {
    renderWithProviders(<PayPage />);
    expect(await screen.findByText('Quick payments')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Show QR Code'));
    expect(screen.getByText('Your QR Code')).toBeInTheDocument();
    expect(screen.getByText(/Scan this code to pay/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Your QR Code')).not.toBeInTheDocument();
  });

  it('scans a QR code with camera denied fallback', async () => {
    renderWithProviders(<PayPage />);
    await screen.findByText('Quick payments');

    fireEvent.click(screen.getByText('Scan QR Code'));
    expect(
      await screen.findByText(
        'Camera access denied. Tap anywhere to simulate scan.'
      )
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText('Camera access denied. Tap anywhere to simulate scan.')
    );
    expect(
      await screen.findByText('QR code scanned successfully!')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Camera access denied. Tap anywhere to simulate scan.')
    ).not.toBeInTheDocument();
  });

  it('quick pays via preset and custom amount', async () => {
    renderWithProviders(<PayPage />);
    await screen.findByText('Quick payments');

    const sendDisabled = screen
      .getByText('Send Payment')
      .closest('button') as HTMLButtonElement;
    expect(sendDisabled).toBeDisabled();

    fireEvent.click(screen.getByText('$25'));
    fireEvent.click(screen.getByText('Send Payment'));
    expect(await screen.findByText('Payment sent!')).toBeInTheDocument();
  });
});

describe('PaymentRequestsPage', () => {
  it('renders incoming and outgoing requests with statuses', async () => {
    renderWithProviders(<PaymentRequestsPage />);
    expect(await screen.findByText('Incoming (2)')).toBeInTheDocument();

    expect(screen.getByText('Outgoing (1)')).toBeInTheDocument();
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText(/Dinner split/)).toBeInTheDocument();
    expect(screen.getByText(/Rent share/)).toBeInTheDocument();
    expect(screen.getByText('To Michael Chen')).toBeInTheDocument();
    expect(screen.getByText(/Concert tickets/)).toBeInTheDocument();
    expect(screen.getAllByText('Pending')).toHaveLength(2);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.queryByText('No payment requests')).not.toBeInTheDocument();
  });
});

describe('SplitBillPage', () => {
  it('splits a bill equally', async () => {
    renderWithProviders(<SplitBillPage />);
    expect(
      await screen.findByText('Split a bill with your contacts')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Total Bill Amount'), {
      target: { value: '120' },
    });
    expect(await screen.findByText('Total Bill')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Sarah Wilson'));
    expect(screen.getAllByText('$60.00').length).toBeGreaterThan(0);
    expect(screen.getByText('Split with 1 people')).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByText('Split Bill', { selector: 'button' })[0]
    );
    expect(await screen.findByText('Bill Split!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Split Another Bill'));
    expect(
      await screen.findByText('Split a bill with your contacts')
    ).toBeInTheDocument();
  });

  it('splits a bill with custom amounts', async () => {
    renderWithProviders(<SplitBillPage />);
    await screen.findByText('Split a bill with your contacts');

    fireEvent.change(screen.getByLabelText('Total Bill Amount'), {
      target: { value: '200' },
    });
    await screen.findByText('Total Bill');

    fireEvent.click(screen.getByText('Custom Amounts'));
    fireEvent.click(screen.getByText('Michael Chen'));

    const customInput = screen.getAllByRole('spinbutton')[1];
    fireEvent.change(customInput, { target: { value: '150' } });

    expect(screen.getByText('$50.00')).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByText('Split Bill', { selector: 'button' })[0]
    );
    expect(await screen.findByText('Bill Split!')).toBeInTheDocument();
  });

  it('disables split when custom amounts exceed total', async () => {
    renderWithProviders(<SplitBillPage />);
    await screen.findByText('Split a bill with your contacts');

    fireEvent.change(screen.getByLabelText('Total Bill Amount'), {
      target: { value: '100' },
    });
    await screen.findByText('Total Bill');

    fireEvent.click(screen.getByText('Custom Amounts'));
    fireEvent.click(screen.getByText('Emily Davis'));
    fireEvent.change(screen.getAllByRole('spinbutton')[1], {
      target: { value: '120' },
    });

    const splitBtn = screen
      .getAllByText('Split Bill', { selector: 'button' })[0]
      .closest('button') as HTMLButtonElement;
    expect(splitBtn).toBeDisabled();
  });
});

describe('ContactsPage', () => {
  it('renders contacts with send links', async () => {
    renderWithProviders(<ContactsPage />);
    expect(await screen.findByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('sarah@example.com')).toBeInTheDocument();
    expect(screen.getByText('Michael Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('James Brown')).toBeInTheDocument();
    expect(screen.getByText('Lisa Anderson')).toBeInTheDocument();

    const sendLink = document.querySelector(
      'a[href="/transfer?recipient=Sarah%20Wilson"]'
    );
    expect(sendLink).toBeInTheDocument();
  });

  it('adds a new contact via the form', async () => {
    renderWithProviders(<ContactsPage />);
    await screen.findByText('Sarah Wilson');

    fireEvent.click(screen.getByText('Add Contact'));
    const submit = screen
      .getByText('Add Contact')
      .closest('button') as HTMLButtonElement;
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Taylor Reed' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'taylor@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone (optional)'), {
      target: { value: '+1 (555) 999-0000' },
    });

    expect(
      (screen.getByText('Add Contact').closest('button') as HTMLButtonElement)
        .disabled
    ).toBe(false);

    fireEvent.click(screen.getByText('Add Contact'));
    expect(await screen.findByText('Contact added!')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('New Contact')).not.toBeInTheDocument();
    });
  });
});

describe('LoansPage', () => {
  it('renders loan stats, active loans and products', async () => {
    renderWithProviders(<LoansPage />);
    expect(await screen.findByText('Total Borrowed')).toBeInTheDocument();
    expect(screen.getAllByText('Monthly EMI').length).toBeGreaterThan(0);
    expect(screen.getByText('Active Loans')).toBeInTheDocument();
    expect(screen.getAllByText('Total Interest').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Personal Loan').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Auto Loan').length).toBeGreaterThan(0);
    expect(screen.getByText('12 / 36')).toBeInTheDocument();
    expect(screen.getByText('24 / 60')).toBeInTheDocument();

    expect(screen.getByText('EMI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Loan Comparison')).toBeInTheDocument();
    expect(screen.getByText('Home Loan')).toBeInTheDocument();
    expect(screen.getByText('Education Loan')).toBeInTheDocument();
    expect(screen.getByText('8.5% - 14%')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();

    expect(screen.getAllByText('Apply for Loan').length).toBeGreaterThan(0);
  });

  it('recalculates EMI when calculator sliders change', async () => {
    renderWithProviders(<LoansPage />);
    await screen.findByText('Total Borrowed');

    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(3);

    fireEvent.change(sliders[0], { target: { value: '30000' } });
    expect(await screen.findByText('$30,000.00')).toBeInTheDocument();

    fireEvent.change(sliders[1], { target: { value: '10' } });
    expect(screen.getByText('10%')).toBeInTheDocument();

    fireEvent.change(sliders[2], { target: { value: '48' } });
    expect(screen.getByText('48 months')).toBeInTheDocument();
  });
});
