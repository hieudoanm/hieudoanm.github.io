import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

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
    contacts: { getAll: jest.fn(), put: jest.fn() },
    chats: { getAll: jest.fn(), get: jest.fn(), put: jest.fn() },
    messages: {
      getAll: jest.fn(),
      getByChat: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
    },
    settings: { get: jest.fn(), put: jest.fn() },
    auth: { get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'id'),
}));

jest.mock('@/lib/url', () => ({
  getChatIdFromURL: jest.fn(() => null),
}));

const { db } = jest.requireMock('@/lib/db');
const { getChatIdFromURL } = jest.requireMock('@/lib/url') as {
  getChatIdFromURL: jest.Mock;
};

const renderPage = () =>
  render(
    <ToastProvider>
      <DataProvider>
        <HomePage />
      </DataProvider>
    </ToastProvider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  db.account.get.mockResolvedValue(null);
  db.contacts.getAll.mockResolvedValue([]);
  db.chats.getAll.mockResolvedValue([]);
  db.messages.getAll.mockResolvedValue([]);
  db.settings.get.mockResolvedValue({
    id: 'default',
    theme: 'nothing',
    notifications: true,
    readReceipts: true,
    typingIndicators: true,
    disappearingSeconds: 0,
  });
  db.auth.get.mockResolvedValue({
    id: 'session',
    method: 'phone',
    identifier: '+1 555 010 0000',
    signedInAt: 1000,
  });
});

describe('HomePage', () => {
  it('shows a loading spinner while data loads', () => {
    renderPage();
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('renders the app shell once loaded', async () => {
    renderPage();
    expect(await screen.findByText('Messaging')).toBeInTheDocument();
    expect(screen.queryByText('No chats')).toBeInTheDocument();
  });

  it('reads chat id from query params for deep-linking', () => {
    getChatIdFromURL.mockReturnValue('c1');
    renderPage();
    expect(getChatIdFromURL).toHaveBeenCalled();
  });
});
