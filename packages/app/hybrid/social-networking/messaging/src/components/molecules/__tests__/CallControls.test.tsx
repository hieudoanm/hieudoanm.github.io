import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallControls } from '@/components/molecules/CallControls';

jest.mock('react-icons/fa', () => ({
  FaMicrophone: () => <span data-testid="icon-mic" />,
  FaMicrophoneSlash: () => <span data-testid="icon-mic-slash" />,
  FaVideo: () => <span data-testid="icon-video" />,
  FaVideoSlash: () => <span data-testid="icon-video-slash" />,
  FaPhoneSlash: () => <span data-testid="icon-end" />,
  FaVolumeUp: () => <span data-testid="icon-volume" />,
  FaVolumeMute: () => <span data-testid="icon-volume-mute" />,
  FaDesktop: () => <span data-testid="icon-desktop" />,
  FaUserPlus: () => <span data-testid="icon-user-plus" />,
}));

const defaultProps = {
  isMuted: false,
  isVideoOff: false,
  isSpeakerOff: false,
  isGroup: false,
  onToggleMute: jest.fn(),
  onToggleVideo: jest.fn(),
  onToggleSpeaker: jest.fn(),
  onEndCall: jest.fn(),
};

describe('CallControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all core buttons', () => {
    render(<CallControls {...defaultProps} />);
    expect(screen.getByLabelText('Mute')).toBeInTheDocument();
    expect(screen.getByLabelText('Turn camera off')).toBeInTheDocument();
    expect(screen.getByLabelText('Speaker off')).toBeInTheDocument();
    expect(screen.getByLabelText('End call')).toBeInTheDocument();
  });

  it('shows "Unmute" aria-label when muted', () => {
    render(<CallControls {...defaultProps} isMuted />);
    expect(screen.getByLabelText('Unmute')).toBeInTheDocument();
    expect(screen.queryByLabelText('Mute')).not.toBeInTheDocument();
  });

  it('shows "Turn camera on" aria-label when video is off', () => {
    render(<CallControls {...defaultProps} isVideoOff />);
    expect(screen.getByLabelText('Turn camera on')).toBeInTheDocument();
  });

  it('shows "Speaker on" aria-label when speaker is off', () => {
    render(<CallControls {...defaultProps} isSpeakerOff />);
    expect(screen.getByLabelText('Speaker on')).toBeInTheDocument();
  });

  it('calls onToggleMute when mute button is clicked', () => {
    render(<CallControls {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Mute'));
    expect(defaultProps.onToggleMute).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleVideo when video button is clicked', () => {
    render(<CallControls {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Turn camera off'));
    expect(defaultProps.onToggleVideo).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleSpeaker when speaker button is clicked', () => {
    render(<CallControls {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Speaker off'));
    expect(defaultProps.onToggleSpeaker).toHaveBeenCalledTimes(1);
  });

  it('calls onEndCall when end call button is clicked', () => {
    render(<CallControls {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('End call'));
    expect(defaultProps.onEndCall).toHaveBeenCalledTimes(1);
  });

  it('shows share screen button when onShareScreen is provided', () => {
    const onShareScreen = jest.fn();
    render(<CallControls {...defaultProps} onShareScreen={onShareScreen} />);
    expect(screen.getByLabelText('Share screen')).toBeInTheDocument();
  });

  it('does not show share screen button when onShareScreen is not provided', () => {
    render(<CallControls {...defaultProps} />);
    expect(screen.queryByLabelText('Share screen')).not.toBeInTheDocument();
  });

  it('shows add participant button when isGroup and onAddParticipant provided', () => {
    const onAddParticipant = jest.fn();
    render(
      <CallControls
        {...defaultProps}
        isGroup
        onAddParticipant={onAddParticipant}
      />
    );
    expect(screen.getByLabelText('Add participant')).toBeInTheDocument();
  });

  it('does not show add participant button when isGroup is false', () => {
    const onAddParticipant = jest.fn();
    render(
      <CallControls {...defaultProps} onAddParticipant={onAddParticipant} />
    );
    expect(screen.queryByLabelText('Add participant')).not.toBeInTheDocument();
  });
});
