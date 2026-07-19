import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoConvertTool } from '@/components/tools/VideoConvertTool';

jest.mock('@/lib/video-tools', () => ({
  processVideo: jest.fn(),
  downloadBlob: jest.fn(),
}));

const mockProcessVideo = processVideo as jest.Mock;

const config: VideoToolConfig = {
  id: 'video-aac-to-mp3',
  title: 'AAC to MP3',
  emoji: '🔊',
  description: 'Convert AAC audio to MP3',
  category: 'convert',
  inputFormat: 'AAC',
  outputFormat: 'MP3',
  outputExt: 'mp3',
  mimeType: 'audio/mpeg',
  accept: '.aac,audio/aac',
};

function selectFile(container: HTMLElement, name = 'clip.mp4') {
  const input = container.querySelector('input[type="file"]')!;
  const file = new File(['data'], name, { type: 'video/mp4' });
  fireEvent.change(input, { target: { files: [file] } });
  return file;
}

beforeEach(() => {
  mockProcessVideo.mockReset();
  mockProcessVideo.mockResolvedValue(undefined);
});

describe('VideoConvertTool', () => {
  it('starts with a disabled convert button', () => {
    render(<VideoConvertTool config={config} />);
    expect(screen.getByRole('button', { name: 'Convert' })).toBeDisabled();
  });

  it('shows the selected file and converts it', async () => {
    const { container } = render(<VideoConvertTool config={config} />);
    selectFile(container, 'song.aac');
    expect(screen.getByText('song.aac')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Convert' });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      mimeType: 'audio/mpeg',
      outputName: 'song.mp3',
    });
    await waitFor(() => expect(button).toHaveTextContent('Convert'));
  });

  it('resets the button when conversion fails', async () => {
    mockProcessVideo.mockRejectedValueOnce(new Error('boom'));
    const { container } = render(<VideoConvertTool config={config} />);
    selectFile(container);
    const button = screen.getByRole('button', { name: 'Convert' });
    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent('Convert'));
  });

  it('falls back to a generic heading when no formats are declared', () => {
    const bare: VideoToolConfig = {
      id: 'video-to-gif',
      title: 'Video to GIF',
      emoji: '🎞️',
      description: 'Convert any video to animated GIF',
      category: 'convert',
      outputExt: 'gif',
      mimeType: 'image/gif',
    };
    render(<VideoConvertTool config={bare} />);
    expect(
      screen.getByRole('heading', { name: 'Video to gif' })
    ).toBeInTheDocument();
    expect(document.querySelector('input[type="file"]')).toHaveAttribute(
      'accept',
      'video/*'
    );
  });
});
