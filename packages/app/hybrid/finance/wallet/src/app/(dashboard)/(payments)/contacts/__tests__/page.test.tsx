jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import ContactsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
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
