import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoMergeTool } from '@/components/tools/VideoMergeTool';

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

const flush = async () => {
  await new Promise((r) => setTimeout(r, 0));
};

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
  const recs = (globalThis as any).MediaRecorder;
  recs.instances = [];
});

afterEach(() => {
  createSpy.mockRestore();
});

describe('VideoMergeTool', () => {
  it('requires at least two files before merging', () => {
    const { container } = render(<VideoMergeTool config={config} />);
    const button = screen.getByRole('button', { name: 'Merge' });
    expect(button).toBeDisabled();
    selectFile(container, 'a.mp4');
    expect(button).toBeDisabled();
    selectFile(container, 'b.mp4');
    expect(button).toBeEnabled();
  });

  it('merges the selected videos into a single webm', async () => {
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const { container } = render(<VideoMergeTool config={config} />);
    selectFile(container, 'a.mp4');
    selectFile(container, 'b.mp4');
    expect(screen.getByText('1. a.mp4')).toBeInTheDocument();
    expect(screen.getByText('2. b.mp4')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Merge' }));
    await flush();
    expect(createdVideos).toHaveLength(2);
    for (const video of createdVideos) {
      video.onloadedmetadata!(new Event('loadedmetadata'));
    }
    await actFlush();
    Object.defineProperty(createdVideos[0], 'paused', {
      configurable: true,
      value: false,
    });
    await act(async () => {
      createdVideos[0].ontimeupdate!(new Event('timeupdate'));
    });
    Object.defineProperty(createdVideos[0], 'paused', {
      configurable: true,
      value: true,
    });
    await act(async () => {
      createdVideos[0].ontimeupdate!(new Event('timeupdate'));
    });
    await actFlush();
    await act(async () => {
      createdVideos[1].ontimeupdate!(new Event('timeupdate'));
    });
    await waitFor(() => expect(clickSpy).toHaveBeenCalled());
    const recs = (globalThis as any).MediaRecorder.instances;
    expect(recs[0].stop).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('resets the button when merging fails', async () => {
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {
        throw new Error('download failed');
      });
    const { container } = render(<VideoMergeTool config={config} />);
    selectFile(container, 'a.mp4');
    selectFile(container, 'b.mp4');
    fireEvent.click(screen.getByRole('button', { name: 'Merge' }));
    await flush();
    for (const video of createdVideos) {
      video.onloadedmetadata!(new Event('loadedmetadata'));
    }
    await actFlush();
    await act(async () => {
      createdVideos[0].ontimeupdate!(new Event('timeupdate'));
    });
    await actFlush();
    await act(async () => {
      createdVideos[1].ontimeupdate!(new Event('timeupdate'));
    });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Merge' })).toBeEnabled()
    );
    clickSpy.mockRestore();
  });
});
