import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoSpeedTool } from '@/components/tools/VideoSpeedTool';

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
});

describe('VideoSpeedTool', () => {
  it('applies the selected playback rate', async () => {
    const { container } = render(<VideoSpeedTool config={config} />);
    expect(screen.getByRole('button', { name: 'Change Speed' })).toBeDisabled();
    selectFile(container, 'clip.mp4');
    fireEvent.change(container.querySelector('input[type="range"]')!, {
      target: { value: '2' },
    });
    const button = screen.getByRole('button', { name: 'Change Speed' });
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      playbackRate: 2,
      outputName: 'clip-2x.webm',
    });
    await waitFor(() => expect(button).toHaveTextContent('Change Speed'));
  });
});
