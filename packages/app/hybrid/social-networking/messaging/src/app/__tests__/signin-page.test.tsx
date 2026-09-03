import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '@/app/(auth)/signin/page';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ToastViewport } from '@/components/molecules/ToastViewport';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn(),
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
    contacts: { getAll: jest.fn().mockResolvedValue([]), put: jest.fn() },
    chats: {
      getAll: jest.fn().mockResolvedValue([]),
      get: jest.fn(),
      put: jest.fn(),
    },
    messages: {
      getAll: jest.fn().mockResolvedValue([]),
      getByChat: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
    },
    settings: {
      get: jest.fn().mockResolvedValue({
        id: 'default',
        theme: 'messaging-light',
        notifications: true,
        readReceipts: true,
        typingIndicators: true,
        disappearingSeconds: 0,
      }),
      put: jest.fn(),
    },
    auth: {
      get: jest.fn().mockResolvedValue(null),
      put: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn(),
    },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'id'),
}));

const { db } = jest.requireMock('@/lib/db');

const renderPage = () =>
  render(
    <ToastProvider>
      <DataProvider>
        <SignInPage />
      </DataProvider>
      <ToastViewport />
    </ToastProvider>
  );

describe('SignInPage', () => {
  it('renders the sign-in form with phone method selected', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: 'Sign in' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
  });

  it('switches to username method', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Username' }));
    expect(await screen.findByLabelText('Username')).toBeInTheDocument();
  });

  it('shows an error when identifier is empty', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(
      await screen.findByText('Enter your phone number or username')
    ).toBeInTheDocument();
  });

  it('calls signIn and navigates on success', async () => {
    const replace = jest.fn();
    jest
      .mocked(require('next/navigation').useRouter)
      .mockReturnValue({ replace });
    db.account.getAll.mockResolvedValue([
      { id: 'me', name: 'You', phone: '+1 555 010 0000', username: 'you' },
    ]);
    db.auth.put.mockResolvedValue(undefined);
    renderPage();
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '+1 555 010 0000' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/'));
  });

  it('displays an error when account not found', async () => {
    db.account.getAll.mockResolvedValue([]);
    renderPage();
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '+1 555 999 9999' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByText('Account not found')).toBeInTheDocument();
  });
});
