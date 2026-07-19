import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoResizeTool } from '@/components/tools/VideoResizeTool';

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

describe('VideoResizeTool', () => {
  it('resizes to the entered dimensions', async () => {
    const { container } = render(<VideoResizeTool config={config} />);
    selectFile(container, 'clip.mp4');
    await loadMetadata();

    const inputs = container.querySelectorAll('input[type="number"]');
    expect((inputs[0] as HTMLInputElement).value).toBe('640');
    expect((inputs[1] as HTMLInputElement).value).toBe('480');
    fireEvent.change(inputs[0], { target: { value: '1280' } });

    const button = screen.getByRole('button', { name: 'Resize' });
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      canvas: { width: 1280, height: 480 },
      outputName: 'clip-1280x480.webm',
    });
    await waitFor(() => expect(button).toHaveTextContent('Resize'));
  });

  it('resets the button when resizing fails', async () => {
    mockProcessVideo.mockRejectedValueOnce(new Error('boom'));
    const { container } = render(<VideoResizeTool config={config} />);
    selectFile(container);
    await loadMetadata();
    const button = screen.getByRole('button', { name: 'Resize' });
    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent('Resize'));
  });
});
