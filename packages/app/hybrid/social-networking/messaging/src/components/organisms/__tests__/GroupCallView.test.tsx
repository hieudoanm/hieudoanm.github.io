import { render, screen, fireEvent } from '@testing-library/react';
import { GroupCallView } from '@/components/organisms/GroupCallView';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import type { Call } from '@/types';

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
  Avatar: ({ name }: any) => <span>{name}</span>,
}));

jest.mock('@/components/molecules/CallControls', () => ({
  CallControls: ({ onEndCall }: any) => (
    <button onClick={onEndCall}>End</button>
  ),
}));

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
    </ToastProvider>
  );

const baseCall: Call = {
  id: 'call-1',
  chatId: 'c1',
  type: 'voice',
  status: 'active',
  participants: [
    {
      userId: 'me',
      name: 'You',
      avatarColor: '#ff0030',
      audioMuted: false,
      videoOff: false,
      joinedAt: Date.now(),
    },
    {
      userId: 'alice',
      name: 'Alice',
      avatarColor: '#4da3ff',
      audioMuted: true,
      videoOff: false,
      joinedAt: Date.now(),
    },
    {
      userId: 'bob',
      name: 'Bob',
      avatarColor: '#00cc66',
      audioMuted: false,
      videoOff: true,
      joinedAt: Date.now(),
    },
  ],
  startedAt: Date.now(),
  isGroup: true,
};

const noop = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('GroupCallView', () => {
  it('shows the Group Call heading', () => {
    wrap(
      <GroupCallView
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByText('Group Call')).toBeInTheDocument();
  });

  it('shows the participant count', () => {
    wrap(
      <GroupCallView
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByText(/3 participants/)).toBeInTheDocument();
  });

  it('shows all participant names', () => {
    wrap(
      <GroupCallView
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getAllByText('You').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Alice').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bob').length).toBeGreaterThan(0);
  });

  it('shows Muted for muted participants', () => {
    wrap(
      <GroupCallView
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByText('Muted')).toBeInTheDocument();
  });

  it('shows Camera off for video-off participants', () => {
    wrap(
      <GroupCallView
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByText('Camera off')).toBeInTheDocument();
  });

  it('end button calls onEndCall', () => {
    const onEndCall = jest.fn();
    wrap(
      <GroupCallView
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={onEndCall}
      />
    );
    fireEvent.click(screen.getByText('End'));
    expect(onEndCall).toHaveBeenCalledTimes(1);
  });
});
