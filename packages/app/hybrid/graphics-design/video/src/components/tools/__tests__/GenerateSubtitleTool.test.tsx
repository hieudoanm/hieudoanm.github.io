import { render, screen, fireEvent } from '@testing-library/react';
import type { VideoToolConfig } from '@/data/video-tools';
import { GenerateSubtitleTool } from '@/components/tools/GenerateSubtitleTool';

const config: VideoToolConfig = {
  id: 'audio-transcribe',
  title: 'Transcribe',
  emoji: '🎤',
  description: 'Transcribe speech from microphone',
  category: 'audio',
};

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
