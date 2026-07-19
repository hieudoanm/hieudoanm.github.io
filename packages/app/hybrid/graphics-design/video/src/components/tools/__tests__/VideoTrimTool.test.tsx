import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoTrimTool } from '@/components/tools/VideoTrimTool';

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

describe('VideoTrimTool', () => {
  it('loads duration metadata and trims between timestamps', async () => {
    const { container } = render(<VideoTrimTool config={config} />);
    selectFile(container, 'clip.mp4');
    await loadMetadata();
    expect(screen.getByText('clip.mp4 (10.0s)')).toBeInTheDocument();

    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '8' } });
    fireEvent.change(container.querySelector('input[type="range"]')!, {
      target: { value: '9' },
    });

    const button = screen.getByRole('button', { name: 'Trim' });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      startTime: 5,
      endTime: 9,
      outputName: 'clip-trimmed.webm',
    });
    await waitFor(() => expect(button).toHaveTextContent('Trim'));
  });

  it('disables the button until a file is loaded and the range is valid', async () => {
    const { container } = render(<VideoTrimTool config={config} />);
    expect(screen.getByRole('button', { name: 'Trim' })).toBeDisabled();

    selectFile(container);
    await loadMetadata();
    expect(screen.getByRole('button', { name: 'Trim' })).toBeEnabled();

    const inputs = container.querySelectorAll('input[type="number"]');
    fireEvent.change(inputs[0], { target: { value: '10' } });
    expect(screen.getByRole('button', { name: 'Trim' })).toBeDisabled();
  });
});
