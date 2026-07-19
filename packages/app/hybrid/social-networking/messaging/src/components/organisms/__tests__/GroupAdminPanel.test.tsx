import { render, screen, fireEvent } from '@testing-library/react';

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

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  ...jest.requireActual('@/providers/DataProvider'),
  useData: (...args: any[]) => mockUseData(...args),
}));

const CONTACTS = [
  {
    id: 'me',
    name: 'You',
    phone: '+1 555 010 0000',
    username: 'you',
    avatarColor: '#ff0030',
    online: true,
    lastSeenAt: 1000,
    blocked: false,
    starred: false,
  },
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

const GROUP_CHAT = {
  id: 'g1',
  kind: 'group' as const,
  title: 'Hikers',
  avatarColor: '#ec4899',
  memberIds: ['me', 'alice', 'bob'],
  adminIds: ['me', 'alice'],
  pinned: false,
  muted: false,
  isSecret: false,
  disappearingSeconds: 0,
  unreadCount: 0,
  createdAt: 1000,
  lastMessageAt: 2000,
  settings: { wallpaper: '', notificationSound: true, disappearingSeconds: 0 },
};

const BASE_CONTEXT = {
  contacts: CONTACTS,
  promoteAdmin: jest.fn().mockResolvedValue(undefined),
  demoteAdmin: jest.fn().mockResolvedValue(undefined),
  removeGroupMember: jest.fn().mockResolvedValue(undefined),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue(BASE_CONTEXT);
});

import { GroupAdminPanel } from '@/components/organisms/GroupAdminPanel';

const wrap = (ui: React.ReactElement) => render(ui);

describe('GroupAdminPanel', () => {
  it('renders member names', () => {
    wrap(<GroupAdminPanel chat={GROUP_CHAT} onClose={jest.fn()} />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows "Admin" badge for non-owner admins', () => {
    wrap(<GroupAdminPanel chat={GROUP_CHAT} onClose={jest.fn()} />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('Promote button calls promoteAdmin for non-admin members', () => {
    const promoteAdmin = jest.fn().mockResolvedValue(undefined);
    const nonAdminChat = { ...GROUP_CHAT, adminIds: ['me'] };
    mockUseData.mockReturnValue({ ...BASE_CONTEXT, promoteAdmin });
    wrap(<GroupAdminPanel chat={nonAdminChat} onClose={jest.fn()} />);
    const buttons = screen.getAllByLabelText('Promote to admin');
    fireEvent.click(buttons[0]);
    expect(promoteAdmin).toHaveBeenCalledWith('g1', 'alice');
  });

  it('Demote button calls demoteAdmin for admin members', () => {
    const demoteAdmin = jest.fn().mockResolvedValue(undefined);
    mockUseData.mockReturnValue({ ...BASE_CONTEXT, demoteAdmin });
    wrap(<GroupAdminPanel chat={GROUP_CHAT} onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Demote admin'));
    expect(demoteAdmin).toHaveBeenCalledWith('g1', 'alice');
  });

  it('Remove button calls removeGroupMember', () => {
    const removeGroupMember = jest.fn().mockResolvedValue(undefined);
    mockUseData.mockReturnValue({ ...BASE_CONTEXT, removeGroupMember });
    wrap(<GroupAdminPanel chat={GROUP_CHAT} onClose={jest.fn()} />);
    const buttons = screen.getAllByLabelText('Remove member');
    fireEvent.click(buttons[0]);
    expect(removeGroupMember).toHaveBeenCalled();
  });

  it('Close button calls onClose', () => {
    const onClose = jest.fn();
    wrap(<GroupAdminPanel chat={GROUP_CHAT} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
