import { render, screen, fireEvent, act } from '@testing-library/react';
import { downloadBlob } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoExtractAudioTool } from '@/components/tools/VideoExtractAudioTool';

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

describe('VideoExtractAudioTool', () => {
  it('records the audio stream and downloads it when the video ends', async () => {
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const { container } = render(<VideoExtractAudioTool config={config} />);
    selectFile(container);
    fireEvent.click(screen.getByRole('button', { name: 'Extract Audio' }));

    await flush();
    expect(createdVideos).toHaveLength(1);
    const video = createdVideos[0];
    await act(async () => {
      video.onloadedmetadata!(new Event('loadedmetadata'));
    });
    await actFlush();

    const recs = (globalThis as any).MediaRecorder.instances;
    expect(recs).toHaveLength(1);
    expect(recs[0].options.mimeType).toBe('audio/webm;codecs=opus');
    expect(recs[0].start).toHaveBeenCalled();

    await act(async () => {
      video.onended!(new Event('ended'));
    });
    expect(recs[0].stop).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(video.src);
    clickSpy.mockRestore();
  });

  it('recovers when the audio graph cannot be built', async () => {
    const realAudioCtx = (globalThis as any).AudioContext;
    (globalThis as any).AudioContext = class {
      constructor() {
        throw new Error('no audio');
      }
    };
    try {
      const { container } = render(<VideoExtractAudioTool config={config} />);
      selectFile(container);
      const button = screen.getByRole('button', { name: 'Extract Audio' });
      fireEvent.click(button);
      await flush();
      await act(async () => {
        createdVideos[0].onloadedmetadata!(new Event('loadedmetadata'));
      });
      await actFlush();
      expect(button).toHaveTextContent('Extract Audio');
      expect((globalThis as any).MediaRecorder.instances).toHaveLength(0);
    } finally {
      (globalThis as any).AudioContext = realAudioCtx;
    }
  });
});
