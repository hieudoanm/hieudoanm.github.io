import { render, screen, fireEvent, act } from '@testing-library/react';
import { downloadBlob } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoExtractFramesTool } from '@/components/tools/VideoExtractFramesTool';

jest.mock('@/lib/video-tools', () => ({
  processVideo: jest.fn(),
  downloadBlob: jest.fn(),
}));

const mockDownloadBlob = downloadBlob as jest.Mock;

const config: VideoToolConfig = {
  id: 'video-extract-audio',
  title: 'Extract Audio',
  emoji: '🔊',
  description: 'Extract audio track from video',
  category: 'edit',
  accept: 'video/*',
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

beforeEach(() => {
  mockDownloadBlob.mockReset();
  createdVideos = [];
  createSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation((tag: string) => {
      const el = realCreateElement(tag);
      if (String(tag).toLowerCase() === 'video')
        createdVideos.push(el as HTMLVideoElement);
      return el;
    });
  const recs = (globalThis as any).MediaRecorder;
  recs.instances = [];
});

afterEach(() => {
  createSpy.mockRestore();
});

function selectFile(container: HTMLElement, name = 'clip.mp4') {
  fireEvent.change(container.querySelector('input[type="file"]')!, {
    target: { files: [new File(['data'], name, { type: 'video/mp4' })] },
  });
}

describe('VideoExtractFramesTool', () => {
  it('extracts one frame per second and downloads each frame', async () => {
    const { container } = render(<VideoExtractFramesTool config={config} />);
    selectFile(container);
    fireEvent.click(screen.getByRole('button', { name: 'Extract Frames' }));

    await flush();
    expect(createdVideos).toHaveLength(1);
    const video = createdVideos[0];
    Object.defineProperty(video, 'duration', { value: 2, configurable: true });
    Object.defineProperty(video, 'videoWidth', {
      value: 100,
      configurable: true,
    });
    Object.defineProperty(video, 'videoHeight', {
      value: 50,
      configurable: true,
    });

    await act(async () => {
      video.onloadedmetadata!(new Event('loadedmetadata'));
    });
    await actFlush();
    await act(async () => {
      video.onseeked!(new Event('seeked'));
    });
    await actFlush();
    await act(async () => {
      video.onseeked!(new Event('seeked'));
    });
    await actFlush();

    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'frame_0001.png'
    );
    expect(mockDownloadBlob).toHaveBeenCalledWith(
      expect.any(Blob),
      'frame_0002.png'
    );
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(video.src);
  });

  it('reflects a custom frames-per-second value', () => {
    const { container } = render(<VideoExtractFramesTool config={config} />);
    selectFile(container);
    const fps = container.querySelector('input[type="number"]')!;
    fireEvent.change(fps, { target: { value: '2' } });
    expect((fps as HTMLInputElement).value).toBe('2');
  });
});
