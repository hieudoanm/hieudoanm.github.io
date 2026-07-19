import { render, screen, fireEvent } from '@testing-library/react';
import { downloadBlob } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoDownloadTool } from '@/components/tools/VideoDownloadTool';

jest.mock('@/lib/video-tools', () => ({
  processVideo: jest.fn(),
  downloadBlob: jest.fn(),
}));

const downloadConfig: VideoToolConfig = {
  id: 'video-download-facebook',
  title: 'Facebook',
  emoji: '📘',
  description: 'Download Facebook video',
  category: 'download',
  platform: 'Facebook',
};

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
