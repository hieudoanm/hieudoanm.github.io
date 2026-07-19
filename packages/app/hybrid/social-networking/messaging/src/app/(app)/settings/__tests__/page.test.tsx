import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '@/app/(app)/settings/page';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ToastViewport } from '@/components/molecules/ToastViewport';

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

const { db } = jest.requireMock('@/lib/db');

const renderPage = () =>
  render(
    <ToastProvider>
      <DataProvider>
        <SettingsPage />
      </DataProvider>
      <ToastViewport />
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
    theme: 'messaging-light',
    notifications: true,
    readReceipts: true,
    typingIndicators: true,
    disappearingSeconds: 0,
  });
  db.settings.put.mockResolvedValue(undefined);
  db.auth.get.mockResolvedValue({
    id: 'session',
    method: 'phone',
    identifier: '+1 555 010 0000',
    signedInAt: 1000,
  });
});

describe('SettingsPage', () => {
  it('renders the settings sections with current values', async () => {
    renderPage();
    expect(await screen.findByText('Settings')).toBeInTheDocument();
    expect(await screen.findByText('Appearance')).toBeInTheDocument();
    expect(await screen.findByText('Privacy')).toBeInTheDocument();
    expect(await screen.findByLabelText('Read receipts')).toBeChecked();
  });

  it('changes the theme and applies it to the document', async () => {
    renderPage();
    const select = await screen.findByLabelText('Theme');
    fireEvent.change(select, { target: { value: 'messaging-dark' } });
    await waitFor(() =>
      expect(db.settings.put).toHaveBeenCalledWith(
        expect.objectContaining({ theme: 'messaging-dark' })
      )
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'messaging-dark'
    );
  });

  it('toggles read receipts', async () => {
    renderPage();
    const toggle = await screen.findByLabelText('Read receipts');
    fireEvent.click(toggle);
    await waitFor(() =>
      expect(db.settings.put).toHaveBeenCalledWith(
        expect.objectContaining({ readReceipts: false })
      )
    );
  });

  it('changes the disappearing messages default', async () => {
    renderPage();
    const select = await screen.findByLabelText('Disappearing messages');
    fireEvent.change(select, { target: { value: '300' } });
    await waitFor(() =>
      expect(db.settings.put).toHaveBeenCalledWith(
        expect.objectContaining({ disappearingSeconds: 300 })
      )
    );
  });
});
