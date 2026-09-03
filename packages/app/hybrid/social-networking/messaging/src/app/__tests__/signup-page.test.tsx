import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from '@/app/(auth)/signup/page';
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
        <SignUpPage />
      </DataProvider>
      <ToastViewport />
    </ToastProvider>
  );

describe('SignUpPage', () => {
  it('renders the sign-up form', () => {
    renderPage();
    expect(screen.getByText('Create account')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows an error when fields are empty', async () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
    expect(
      await screen.findByText('All fields are required')
    ).toBeInTheDocument();
  });

  it('calls signUp and navigates on success', async () => {
    const replace = jest.fn();
    jest
      .mocked(require('next/navigation').useRouter)
      .mockReturnValue({ replace });
    db.auth.put.mockResolvedValue(undefined);
    db.account.put.mockResolvedValue(undefined);
    renderPage();
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '+1 555 111 2222' },
    });
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'alice' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/'));
  });

  it('displays an error on failure', async () => {
    db.auth.put.mockRejectedValueOnce(new Error('Account exists'));
    renderPage();
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '+1 555 222 3333' },
    });
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'bob' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
    expect(await screen.findByText('Account exists')).toBeInTheDocument();
  });
});
