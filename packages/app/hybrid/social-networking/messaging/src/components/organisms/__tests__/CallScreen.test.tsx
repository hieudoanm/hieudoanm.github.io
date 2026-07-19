import { render, screen, fireEvent } from '@testing-library/react';
import { CallScreen } from '@/components/organisms/CallScreen';
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
  CallControls: ({
    onEndCall,
    isMuted,
    isVideoOff,
    isSpeakerOff,
    isGroup,
    onToggleMute,
    onToggleVideo,
    onToggleSpeaker,
    onShareScreen,
  }: any) => (
    <div>
      <button onClick={onEndCall}>End</button>
      <button onClick={onToggleMute}>Mute</button>
      <button onClick={onToggleVideo}>Video</button>
      <button onClick={onToggleSpeaker}>Speaker</button>
      {onShareScreen && <button onClick={onShareScreen}>Share Screen</button>}
      <span data-testid="muted">{String(isMuted)}</span>
      <span data-testid="videoOff">{String(isVideoOff)}</span>
      <span data-testid="speakerOff">{String(isSpeakerOff)}</span>
      <span data-testid="isGroup">{String(isGroup)}</span>
    </div>
  ),
}));

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
    </ToastProvider>
  );

const makeParticipant = (id: string, name: string) => ({
  userId: id,
  name,
  avatarColor: '#4da3ff',
  audioMuted: false,
  videoOff: false,
  joinedAt: Date.now(),
});

const noop = jest.fn();

const baseCall: Call = {
  id: 'call-1',
  chatId: 'c1',
  type: 'voice',
  status: 'active',
  participants: [
    makeParticipant('me', 'You'),
    makeParticipant('alice', 'Alice'),
  ],
  startedAt: Date.now(),
  isGroup: false,
  quality: { bitrate: 256, latency: 30, packetLoss: 0.5 },
};

const videoCall: Call = {
  ...baseCall,
  type: 'video',
};

const originalMediaDevices = navigator.mediaDevices;

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(navigator, 'mediaDevices', {
    value: {
      getUserMedia: jest.fn().mockResolvedValue({
        getTracks: jest.fn(() => [{ stop: jest.fn() }]),
      }),
    },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    value: originalMediaDevices,
    writable: true,
    configurable: true,
  });
});

describe('CallScreen', () => {
  it('shows the remote participant name', () => {
    wrap(
      <CallScreen
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
    expect(screen.getAllByText('Alice').length).toBeGreaterThan(0);
  });

  it('shows "Unknown" when no remote participant found', () => {
    const callNoRemote: Call = {
      ...baseCall,
      participants: [makeParticipant('me', 'You')],
    };
    wrap(
      <CallScreen
        call={callNoRemote}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('shows elapsed time starting at 0:00', () => {
    wrap(
      <CallScreen
        call={{ ...baseCall, startedAt: Date.now() }}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  it('shows quality stats', () => {
    wrap(
      <CallScreen
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
    expect(
      screen.getByText(`${baseCall.quality!.bitrate} kbps`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${baseCall.quality!.latency}ms`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${baseCall.quality!.packetLoss}% loss`)
    ).toBeInTheDocument();
  });

  it('end button calls onEndCall', () => {
    const onEndCall = jest.fn();
    wrap(
      <CallScreen
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

  it('passes muted/video/speaker props to CallControls', () => {
    wrap(
      <CallScreen
        call={baseCall}
        isMuted={true}
        isVideoOff={true}
        isSpeakerOff={true}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByTestId('muted')).toHaveTextContent('true');
    expect(screen.getByTestId('videoOff')).toHaveTextContent('true');
    expect(screen.getByTestId('speakerOff')).toHaveTextContent('true');
  });

  it('passes isGroup to CallControls', () => {
    wrap(
      <CallScreen
        call={{ ...baseCall, isGroup: true }}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByTestId('isGroup')).toHaveTextContent('true');
  });

  it('passes onShareScreen to CallControls', () => {
    const onShareScreen = jest.fn();
    wrap(
      <CallScreen
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
        onShareScreen={onShareScreen}
      />
    );
    fireEvent.click(screen.getByText('Share Screen'));
    expect(onShareScreen).toHaveBeenCalledTimes(1);
  });

  it('toggle callbacks are called when buttons clicked', () => {
    const onToggleMute = jest.fn();
    const onToggleVideo = jest.fn();
    const onToggleSpeaker = jest.fn();
    wrap(
      <CallScreen
        call={baseCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={onToggleMute}
        onToggleVideo={onToggleVideo}
        onToggleSpeaker={onToggleSpeaker}
        onEndCall={noop}
      />
    );
    fireEvent.click(screen.getByText('Mute'));
    expect(onToggleMute).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Video'));
    expect(onToggleVideo).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Speaker'));
    expect(onToggleSpeaker).toHaveBeenCalled();
  });

  it('renders without quality stats when quality is undefined', () => {
    const callNoQuality: Call = { ...baseCall, quality: undefined };
    wrap(
      <CallScreen
        call={callNoQuality}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.queryByText(/kbps/)).not.toBeInTheDocument();
  });

  it('cleans up intervals on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = wrap(
      <CallScreen
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
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('renders group call with multiple participants', () => {
    const groupCall: Call = {
      ...baseCall,
      isGroup: true,
      participants: [
        makeParticipant('me', 'You'),
        makeParticipant('alice', 'Alice'),
        makeParticipant('bob', 'Bob'),
      ],
    };
    wrap(
      <CallScreen
        call={groupCall}
        isMuted={false}
        isVideoOff={false}
        isSpeakerOff={false}
        onToggleMute={noop}
        onToggleVideo={noop}
        onToggleSpeaker={noop}
        onEndCall={noop}
      />
    );
    expect(screen.getByTestId('isGroup')).toHaveTextContent('true');
  });

  describe('video call', () => {
    it('renders video elements for video calls when video is on', () => {
      wrap(
        <CallScreen
          call={videoCall}
          isMuted={false}
          isVideoOff={false}
          isSpeakerOff={false}
          onToggleMute={noop}
          onToggleVideo={noop}
          onToggleSpeaker={noop}
          onEndCall={noop}
        />
      );
      const videos = document.querySelectorAll('video');
      expect(videos.length).toBeGreaterThanOrEqual(1);
    });

    it('does not render video element when video is off', () => {
      wrap(
        <CallScreen
          call={videoCall}
          isMuted={false}
          isVideoOff={true}
          isSpeakerOff={false}
          onToggleMute={noop}
          onToggleVideo={noop}
          onToggleSpeaker={noop}
          onEndCall={noop}
        />
      );
      const videos = document.querySelectorAll('video');
      expect(videos.length).toBe(0);
    });

    it('does not render video for voice calls', () => {
      wrap(
        <CallScreen
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
      const videos = document.querySelectorAll('video');
      expect(videos.length).toBe(0);
    });

    it('calls getUserMedia for video calls', () => {
      const mockGetUserMedia = jest.fn().mockResolvedValue({
        getTracks: jest.fn(() => []),
      });
      Object.defineProperty(navigator, 'mediaDevices', {
        value: { getUserMedia: mockGetUserMedia },
        writable: true,
        configurable: true,
      });

      wrap(
        <CallScreen
          call={videoCall}
          isMuted={false}
          isVideoOff={false}
          isSpeakerOff={false}
          onToggleMute={noop}
          onToggleVideo={noop}
          onToggleSpeaker={noop}
          onEndCall={noop}
        />
      );

      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: true,
        audio: true,
      });
    });

    it('does not call getUserMedia when video is off', () => {
      const mockGetUserMedia = jest.fn();
      Object.defineProperty(navigator, 'mediaDevices', {
        value: { getUserMedia: mockGetUserMedia },
        writable: true,
        configurable: true,
      });

      wrap(
        <CallScreen
          call={videoCall}
          isMuted={false}
          isVideoOff={true}
          isSpeakerOff={false}
          onToggleMute={noop}
          onToggleVideo={noop}
          onToggleSpeaker={noop}
          onEndCall={noop}
        />
      );

      expect(mockGetUserMedia).not.toHaveBeenCalled();
    });

    it('does not call getUserMedia for voice calls', () => {
      const mockGetUserMedia = jest.fn();
      Object.defineProperty(navigator, 'mediaDevices', {
        value: { getUserMedia: mockGetUserMedia },
        writable: true,
        configurable: true,
      });

      wrap(
        <CallScreen
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

      expect(mockGetUserMedia).not.toHaveBeenCalled();
    });

    it('getUserMedia error is silently handled', () => {
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {
          getUserMedia: jest
            .fn()
            .mockRejectedValue(new Error('Permission denied')),
        },
        writable: true,
        configurable: true,
      });

      expect(() => {
        wrap(
          <CallScreen
            call={videoCall}
            isMuted={false}
            isVideoOff={false}
            isSpeakerOff={false}
            onToggleMute={noop}
            onToggleVideo={noop}
            onToggleSpeaker={noop}
            onEndCall={noop}
          />
        );
      }).not.toThrow();
    });
  });
});
