import { render, screen, fireEvent, act } from '@testing-library/react';
import { downloadBlob } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { AudioTranscribeTool } from '@/components/tools/AudioTranscribeTool';

jest.mock('@/lib/video-tools', () => ({
  processVideo: jest.fn(),
  downloadBlob: jest.fn(),
}));

const mockDownloadBlob = downloadBlob as jest.Mock;

const config: VideoToolConfig = {
  id: 'audio-transcribe',
  title: 'Transcribe',
  emoji: '🎤',
  description: 'Transcribe speech from microphone',
  category: 'audio',
};

class MockSpeechRecognition {
  static instances: MockSpeechRecognition[] = [];
  continuous = false;
  interimResults = false;
  lang = '';
  onresult: ((e: unknown) => void) | null = null;
  onerror: ((e: unknown) => void) | null = null;
  start = jest.fn();
  stop = jest.fn();
  abort = jest.fn();

  constructor() {
    MockSpeechRecognition.instances.push(this);
  }
}

beforeEach(() => {
  mockDownloadBlob.mockReset();
  MockSpeechRecognition.instances = [];
  (window as any).SpeechRecognition = undefined;
  (window as any).webkitSpeechRecognition = undefined;
});

describe('AudioTranscribeTool', () => {
  it('shows a message when speech recognition is unsupported', () => {
    render(<AudioTranscribeTool config={config} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Recording' }));
    expect(
      screen.getByText('Speech recognition not supported.')
    ).toBeInTheDocument();
  });

  it('records continuously and stops on request', () => {
    (window as any).SpeechRecognition = MockSpeechRecognition;
    render(<AudioTranscribeTool config={config} />);

    fireEvent.click(screen.getByRole('button', { name: 'Start Recording' }));
    const sr = MockSpeechRecognition.instances[0];
    expect(sr.continuous).toBe(true);
    expect(sr.interimResults).toBe(true);
    expect(sr.lang).toBe('en-US');
    expect(sr.start).toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'Stop Recording' })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Stop Recording' }));
    expect(sr.stop).toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'Start Recording' })
    ).toBeInTheDocument();
  });

  it('fills the transcript from recognition results', async () => {
    (window as any).SpeechRecognition = MockSpeechRecognition;
    render(<AudioTranscribeTool config={config} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Recording' }));
    const sr = MockSpeechRecognition.instances[0];

    await act(async () => {
      sr.onresult!({
        resultIndex: 0,
        results: [{ 0: { transcript: 'hello world' } }],
      });
    });
    expect(screen.getByDisplayValue('hello world')).toBeInTheDocument();
  });

  it('downloads the transcript as a text file', async () => {
    (window as any).SpeechRecognition = MockSpeechRecognition;
    render(<AudioTranscribeTool config={config} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Recording' }));
    const sr = MockSpeechRecognition.instances[0];
    await act(async () => {
      sr.onresult!({ resultIndex: 0, results: [{ 0: { transcript: 'hi' } }] });
    });

    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'transcript.txt'
    );
  });

  it('stops recording when the recognizer errors', async () => {
    (window as any).SpeechRecognition = MockSpeechRecognition;
    render(<AudioTranscribeTool config={config} />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Recording' }));
    const sr = MockSpeechRecognition.instances[0];

    await act(async () => {
      sr.onerror!(new Event('error'));
    });
    expect(
      screen.getByRole('button', { name: 'Start Recording' })
    ).toBeInTheDocument();
  });
});
