import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoiceRecorder } from '@/components/molecules/VoiceRecorder';

const mockStop = jest.fn();
const mockStart = jest.fn();
const mockGetTracks = jest.fn(() => [{ stop: jest.fn() }]);
const mockStream = { getTracks: mockGetTracks };

class MockMediaRecorder {
  ondataavailable: ((e: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  constructor(public stream: unknown) {}
  start() {
    mockStart();
  }
  stop() {
    mockStop();
    this.onstop?.();
  }
}

(globalThis as any).MediaRecorder = MockMediaRecorder;

const mockGetUserMedia = jest.fn().mockResolvedValue(mockStream);
Object.defineProperty(navigator, 'mediaDevices', {
  value: { getUserMedia: mockGetUserMedia },
  writable: true,
});

jest.mock('react-icons/fa', () => ({
  FaMicrophone: () => <span data-testid="fa-microphone" />,
  FaStop: () => <span data-testid="fa-stop" />,
  FaTimes: () => <span data-testid="fa-times" />,
  FaPaperPlane: () => <span data-testid="fa-paper-plane" />,
}));

jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  mockGetUserMedia.mockResolvedValue(mockStream);
});

afterEach(() => {
  jest.useRealTimers();
});

describe('VoiceRecorder', () => {
  const mockOnSend = jest.fn();
  const mockOnCancel = jest.fn();

  it('shows stop recording button when recording', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    expect(screen.getByLabelText('Stop recording')).toBeInTheDocument();
    expect(screen.getByTestId('fa-stop')).toBeInTheDocument();
  });

  it('stop button calls stopRecording', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));
    expect(mockStop).toHaveBeenCalled();
  });

  it('cancel button calls onCancel', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows "0:00" duration format', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  it('increments duration while recording', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('0:03')).toBeInTheDocument();
  });

  it('formats duration with minutes and seconds', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    act(() => {
      jest.advanceTimersByTime(61000);
    });
    expect(screen.getByText('1:01')).toBeInTheDocument();
  });

  it('shows audio playback after stopping', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));

    const audioEl = document.querySelector('audio');
    expect(audioEl).toBeInTheDocument();
  });

  it('shows re-record and send buttons after stopping', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));

    expect(screen.getByLabelText('Re-record')).toBeInTheDocument();
    expect(screen.getByLabelText('Send voice message')).toBeInTheDocument();
    expect(screen.queryByLabelText('Stop recording')).not.toBeInTheDocument();
  });

  it('re-record resets and starts new recording', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Re-record'));
    });

    expect(screen.getByLabelText('Stop recording')).toBeInTheDocument();
    expect(mockStart).toHaveBeenCalled();
  });

  it('send button fetches blob and calls onSend', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      blob: jest
        .fn()
        .mockResolvedValue(new Blob(['audio'], { type: 'audio/webm' })),
    });

    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Send voice message'));
    });

    expect(global.fetch).toHaveBeenCalledWith('blob:mock-url');
    expect(mockOnSend).toHaveBeenCalled();
    global.fetch = originalFetch;
  });

  it('send is no-op when audioUrl is null', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn();

    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    expect(
      screen.queryByLabelText('Send voice message')
    ).not.toBeInTheDocument();
    expect(mockOnSend).not.toHaveBeenCalled();
    global.fetch = originalFetch;
  });

  it('cleans up on unmount', async () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = await act(async () => {
      return render(
        <VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />
      );
    });

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(mockStop).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  it('handles getUserMedia error by calling onCancel', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('Permission denied'));

    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('cancel stops timer and recorder', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Cancel'));
    expect(mockStop).toHaveBeenCalled();
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('onstop creates blob and sets audioUrl', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('onstop stops stream tracks', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));
    expect(mockGetTracks).toHaveBeenCalled();
  });

  it('does not show recording indicator after stopping', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    expect(screen.getByText('0:00')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Stop recording'));
    expect(screen.queryByText('0:00')).not.toBeInTheDocument();
  });

  it('does not show audio player while recording', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    expect(
      document.querySelector('audio[src="blob:mock-url"]')
    ).not.toBeInTheDocument();
  });

  it('shows recording indicator with pulse dot while recording', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    const pulseDot = document.querySelector('.animate-pulse');
    expect(pulseDot).toBeInTheDocument();
  });

  it('does not show pulse dot after stopping', async () => {
    await act(async () => {
      render(<VoiceRecorder onSend={mockOnSend} onCancel={mockOnCancel} />);
    });

    fireEvent.click(screen.getByLabelText('Stop recording'));
    expect(document.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });
});
