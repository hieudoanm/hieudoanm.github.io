import { render, screen, fireEvent, act } from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoCompressTool } from '@/components/tools/VideoCompressTool';

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

const realCreateElement = document.createElement.bind(document);
let createdVideos: HTMLVideoElement[] = [];
let createSpy: jest.SpyInstance;

async function actFlush() {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}

function selectFile(container: HTMLElement, name = 'clip.mp4') {
  const input = container.querySelector('input[type="file"]')!;
  const file = new File(['data'], name, { type: 'video/mp4' });
  fireEvent.change(input, { target: { files: [file] } });
  return file;
}

async function loadMetadata() {
  await actFlush();
  for (const video of createdVideos) {
    await act(async () => {
      video.onloadedmetadata!(new Event('loadedmetadata'));
    });
  }
  await actFlush();
}

beforeEach(() => {
  mockProcessVideo.mockReset();
  createdVideos = [];
  createSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation((tag: string) => {
      const el = realCreateElement(tag);
      if (String(tag).toLowerCase() === 'video')
        createdVideos.push(el as HTMLVideoElement);
      return el;
    });
  Object.defineProperty(HTMLVideoElement.prototype, 'videoWidth', {
    configurable: true,
    get: () => 640,
  });
  Object.defineProperty(HTMLVideoElement.prototype, 'videoHeight', {
    configurable: true,
    get: () => 480,
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
    configurable: true,
    get: () => 10,
  });
});

afterEach(() => {
  createSpy.mockRestore();
});

describe('VideoCompressTool', () => {
  it('halves the resolution when quality is below 0.5', async () => {
    const { container } = render(<VideoCompressTool config={config} />);
    selectFile(container, 'clip.mp4');
    fireEvent.change(container.querySelector('input[type="range"]')!, {
      target: { value: '0.4' },
    });
    expect(screen.getByText('Quality: 40%')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Compress' }));
    await loadMetadata();
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      canvas: { width: 320, height: 240 },
      mimeType: 'video/webm;codecs=vp8,opus',
      outputName: 'clip-compressed.webm',
    });
  });

  it('keeps full resolution when quality is at least 0.5', async () => {
    const { container } = render(<VideoCompressTool config={config} />);
    selectFile(container, 'clip.mp4');
    fireEvent.change(container.querySelector('input[type="range"]')!, {
      target: { value: '0.6' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Compress' }));
    await loadMetadata();
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      canvas: { width: 640, height: 480 },
      mimeType: 'video/webm;codecs=vp8,opus',
      outputName: 'clip-compressed.webm',
    });
  });
});
