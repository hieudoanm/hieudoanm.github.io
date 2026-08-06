import { render, screen, fireEvent, act } from '@testing-library/react';
import { downloadBlob } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { AudioTranscribeTool } from '@/components/tools/AudioTranscribeTool';
import { GenerateSubtitleTool } from '@/components/tools/GenerateSubtitleTool';
import { VideoDownloadTool } from '@/components/tools/VideoDownloadTool';

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

const downloadConfig: VideoToolConfig = {
  id: 'video-download-facebook',
  title: 'Facebook',
  emoji: '📘',
  description: 'Download Facebook video',
  category: 'download',
  platform: 'Facebook',
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

describe('GenerateSubtitleTool', () => {
  it('shows the selected file and enables the button', () => {
    const { container } = render(<GenerateSubtitleTool config={config} />);
    const button = screen.getByRole('button', { name: 'Generate Subtitles' });
    expect(button).toBeDisabled();

    fireEvent.change(container.querySelector('input[type="file"]')!, {
      target: {
        files: [new File(['data'], 'clip.mp4', { type: 'video/mp4' })],
      },
    });
    expect(screen.getByText('clip.mp4')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('stays disabled when the dialog is cancelled without a file', () => {
    const { container } = render(<GenerateSubtitleTool config={config} />);
    fireEvent.change(container.querySelector('input[type="file"]')!, {
      target: { files: [] },
    });
    expect(screen.queryByText('clip.mp4')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Generate Subtitles' })
    ).toBeDisabled();
  });
});

describe('VideoDownloadTool', () => {
  it('requires a URL before allowing download', () => {
    const { container } = render(<VideoDownloadTool config={downloadConfig} />);
    expect(
      screen.getByRole('heading', { name: 'Facebook Download' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Paste a Facebook video URL to download via server-side component.'
      )
    ).toBeInTheDocument();

    const input = container.querySelector('input[type="url"]')!;
    expect(input).toHaveAttribute('placeholder', 'https://facebook.com/...');

    const button = screen.getByRole('button', { name: 'Download' });
    expect(button).toBeDisabled();
    fireEvent.change(input, { target: { value: 'https://facebook.com/v/1' } });
    expect(button).toBeEnabled();
  });
});
