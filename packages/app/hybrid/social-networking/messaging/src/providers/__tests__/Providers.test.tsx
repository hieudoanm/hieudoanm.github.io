import { render, screen } from '@testing-library/react';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn().mockResolvedValue(undefined),
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
      get: jest.fn().mockResolvedValue({
        id: 'session',
        method: 'phone',
        identifier: '+1 555 010 0000',
        signedInAt: 1000,
      }),
      put: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'id'),
}));

const Probe = () => {
  const { isLoading } = useData();
  const { showToast } = useToast();
  return (
    <button type="button" onClick={() => showToast('hi')}>
      {isLoading ? 'loading' : 'ready'}
    </button>
  );
};

describe('Providers', () => {
  it('wraps children with data and toast providers', async () => {
    render(
      <Providers>
        <Probe />
      </Providers>
    );
    expect(await screen.findByText('ready')).toBeInTheDocument();
  });
});
