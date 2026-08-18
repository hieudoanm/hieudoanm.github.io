import { render, screen, fireEvent, act } from '@testing-library/react';

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
    settings: { get: jest.fn(), put: jest.fn() },
    auth: { get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'test-id'),
}));

jest.mock('@/components/atoms/Avatar', () => ({
  Avatar: () => null,
}));

jest.mock('@/components/molecules/SearchBar', () => ({
  SearchBar: ({ value, onChange }: any) => (
    <input
      aria-label="search"
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
    />
  ),
}));

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  ...jest.requireActual('@/providers/DataProvider'),
  useData: (...args: any[]) => mockUseData(...args),
}));

const CHATS = [
  {
    id: 'c1',
    kind: 'direct',
    title: 'Alice',
    avatarColor: '#4da3ff',
    memberIds: ['me', 'alice'],
    adminIds: [],
    pinned: false,
    muted: false,
    isSecret: false,
    disappearingSeconds: 0,
    unreadCount: 0,
    createdAt: 1000,
    lastMessageAt: 2000,
  },
  {
    id: 'c2',
    kind: 'group',
    title: 'Hikers',
    avatarColor: '#ec4899',
    memberIds: ['me', 'alice', 'bob'],
    adminIds: ['me'],
    pinned: false,
    muted: false,
    isSecret: false,
    disappearingSeconds: 0,
    unreadCount: 0,
    createdAt: 1000,
    lastMessageAt: 3000,
  },
  {
    id: 'c3',
    kind: 'direct',
    title: 'Bob',
    avatarColor: '#00c853',
    memberIds: ['me', 'bob'],
    adminIds: [],
    pinned: false,
    muted: false,
    isSecret: false,
    disappearingSeconds: 0,
    unreadCount: 0,
    createdAt: 1000,
    lastMessageAt: 1000,
  },
];

const CONTACTS = [
  {
    id: 'alice',
    name: 'Alice',
    phone: '+1 555 010 1001',
    username: 'alice',
    avatarColor: '#4da3ff',
    online: true,
    lastSeenAt: 1000,
    blocked: false,
    starred: false,
  },
  {
    id: 'bob',
    name: 'Bob',
    phone: '+1 555 010 1002',
    username: 'bob',
    avatarColor: '#00c853',
    online: false,
    lastSeenAt: 1000,
    blocked: false,
    starred: false,
  },
];

const BASE_CONTEXT = {
  chats: CHATS,
  contacts: CONTACTS,
  forwardToMultiple: jest.fn().mockResolvedValue(undefined),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue(BASE_CONTEXT);
});

import { ForwardModal } from '@/components/organisms/ForwardModal';

const wrap = (ui: React.ReactElement) => render(ui);

describe('ForwardModal', () => {
  it('renders chat titles', () => {
    wrap(<ForwardModal messageId="msg-1" onClose={jest.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Hikers')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('search filters chats', () => {
    wrap(<ForwardModal messageId="msg-1" onClose={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('search'), {
      target: { value: 'hiker' },
    });
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Hikers')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('toggle selects and deselects chats', () => {
    wrap(<ForwardModal messageId="msg-1" onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Alice'));
    expect(screen.getByText('Forward (1)')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Alice'));
    expect(screen.getByText('Forward (0)')).toBeInTheDocument();
  });

  it('Forward button is disabled when none selected', () => {
    wrap(<ForwardModal messageId="msg-1" onClose={jest.fn()} />);
    const buttons = screen.getAllByRole('button');
    const forwardBtn = buttons.find((b) =>
      /^Forward \(\d+\)$/.test(b.textContent ?? '')
    );
    expect(forwardBtn).toBeDisabled();
  });

  it('Forward calls forwardToMultiple and onClose', async () => {
    const forwardToMultiple = jest.fn().mockResolvedValue(undefined);
    const onClose = jest.fn();
    mockUseData.mockReturnValue({ ...BASE_CONTEXT, forwardToMultiple });
    wrap(<ForwardModal messageId="msg-1" onClose={onClose} />);
    fireEvent.click(screen.getByText('Alice'));
    fireEvent.click(screen.getByText('Hikers'));
    await act(async () => {
      fireEvent.click(screen.getByText('Forward (2)'));
    });
    expect(forwardToMultiple).toHaveBeenCalledWith('msg-1', ['c1', 'c2']);
    expect(onClose).toHaveBeenCalled();
  });

  it('Cancel calls onClose', () => {
    const onClose = jest.fn();
    wrap(<ForwardModal messageId="msg-1" onClose={onClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
