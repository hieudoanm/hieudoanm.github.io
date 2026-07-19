import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatSettingsPanel } from '@/components/organisms/ChatSettingsPanel';
import type { Chat } from '@/types';

const makeChat = (overrides: Partial<Chat> = {}): Chat => ({
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
  lastMessageAt: 1000,
  settings: {
    wallpaper: '',
    notificationSound: true,
    disappearingSeconds: 0,
  },
  ...overrides,
});

const mockUseData = jest.fn();
jest.mock('@/providers/DataProvider', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useData: () => mockUseData(),
}));

const baseData = {
  toggleMute: jest.fn(),
  toggleSecret: jest.fn(),
  updateChatSettings: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue({ ...baseData });
});

describe('ChatSettingsPanel', () => {
  it('mute checkbox calls toggleMute', () => {
    const toggleMute = jest.fn();
    mockUseData.mockReturnValue({ ...baseData, toggleMute });
    render(<ChatSettingsPanel chat={makeChat()} onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Toggle mute'));
    expect(toggleMute).toHaveBeenCalledWith('c1');
  });

  it('notification checkbox calls updateChatSettings', () => {
    const updateChatSettings = jest.fn();
    mockUseData.mockReturnValue({ ...baseData, updateChatSettings });
    render(<ChatSettingsPanel chat={makeChat()} onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Toggle notification sound'));
    expect(updateChatSettings).toHaveBeenCalledWith('c1', {
      notificationSound: false,
    });
  });

  it('wallpaper buttons call updateChatSettings', () => {
    const updateChatSettings = jest.fn();
    mockUseData.mockReturnValue({ ...baseData, updateChatSettings });
    render(<ChatSettingsPanel chat={makeChat()} onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Set wallpaper to Dark navy'));
    expect(updateChatSettings).toHaveBeenCalledWith('c1', {
      wallpaper: '#1a1b26',
    });
  });

  it('disappearing messages select calls updateChatSettings', () => {
    const updateChatSettings = jest.fn();
    mockUseData.mockReturnValue({ ...baseData, updateChatSettings });
    render(<ChatSettingsPanel chat={makeChat()} onClose={jest.fn()} />);
    fireEvent.change(screen.getByDisplayValue('Off'), {
      target: { value: '30' },
    });
    expect(updateChatSettings).toHaveBeenCalledWith('c1', {
      disappearingSeconds: 30,
    });
  });

  it('secret chat toggle calls toggleSecret', () => {
    const toggleSecret = jest.fn();
    mockUseData.mockReturnValue({ ...baseData, toggleSecret });
    render(<ChatSettingsPanel chat={makeChat()} onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Toggle secret chat'));
    expect(toggleSecret).toHaveBeenCalledWith('c1');
  });

  it('shows screenshot warning when chat.isSecret is true', () => {
    render(
      <ChatSettingsPanel
        chat={makeChat({ isSecret: true })}
        onClose={jest.fn()}
      />
    );
    expect(
      screen.getByText(/Screenshot protection is enabled/)
    ).toBeInTheDocument();
  });

  it('close button calls onClose', () => {
    const onClose = jest.fn();
    render(<ChatSettingsPanel chat={makeChat()} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close settings'));
    expect(onClose).toHaveBeenCalled();
  });
});
