import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoMuteTool } from '@/components/tools/VideoMuteTool';

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

describe('VideoMuteTool', () => {
  it('mutes the selected video', async () => {
    const { container } = render(<VideoMuteTool config={config} />);
    selectFile(container, 'clip.mp4');
    expect(screen.getByText('clip.mp4')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Mute' });
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      outputName: 'clip-muted.webm',
    });
    await waitFor(() => expect(button).toHaveTextContent('Mute'));
  });
});
