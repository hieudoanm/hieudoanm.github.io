import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoStabilizeTool } from '@/components/tools/VideoStabilizeTool';

jest.mock('@/lib/video-tools', () => ({
  processVideo: jest.fn(),
  downloadBlob: jest.fn(),
}));

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
let createdCanvases: HTMLCanvasElement[] = [];
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
  createdVideos = [];
  createdCanvases = [];
  createSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation((tag: string) => {
      const el = realCreateElement(tag);
      const t = String(tag).toLowerCase();
      if (t === 'video') createdVideos.push(el as HTMLVideoElement);
      if (t === 'canvas') createdCanvases.push(el as HTMLCanvasElement);
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

describe('VideoStabilizeTool', () => {
  it('crops a 10% border and stabilizes the video', async () => {
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const { container } = render(<VideoStabilizeTool config={config} />);
    selectFile(container, 'clip.mp4');

    fireEvent.click(screen.getByRole('button', { name: 'Stabilize' }));
    await flush();
    expect(createdVideos).toHaveLength(1);
    await act(async () => {
      createdVideos[0].onloadedmetadata!(new Event('loadedmetadata'));
    });
    await actFlush();

    expect(createdCanvases[0].width).toBe(512);
    expect(createdCanvases[0].height).toBe(384);
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
    await waitFor(() => expect(clickSpy).toHaveBeenCalled());
    clickSpy.mockRestore();
  });

  it('resets the button when stabilization fails', async () => {
    jest
      .spyOn(HTMLCanvasElement.prototype, 'captureStream')
      .mockImplementationOnce(() => {
        throw new Error('boom');
      });
    const { container } = render(<VideoStabilizeTool config={config} />);
    selectFile(container);
    const button = screen.getByRole('button', { name: 'Stabilize' });
    fireEvent.click(button);
    await flush();
    await act(async () => {
      createdVideos[0].onloadedmetadata!(new Event('loadedmetadata'));
    });
    await actFlush();
    expect(button).toHaveTextContent('Stabilize');
  });
});
