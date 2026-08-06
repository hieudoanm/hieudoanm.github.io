import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { processVideo } from '@/lib/video-tools';
import type { VideoToolConfig } from '@/data/video-tools';
import { VideoConvertTool } from '@/components/tools/VideoConvertTool';
import { VideoTrimTool } from '@/components/tools/VideoTrimTool';
import { VideoMergeTool } from '@/components/tools/VideoMergeTool';
import { VideoCropTool } from '@/components/tools/VideoCropTool';
import { VideoSpeedTool } from '@/components/tools/VideoSpeedTool';
import { VideoCompressTool } from '@/components/tools/VideoCompressTool';
import { VideoMuteTool } from '@/components/tools/VideoMuteTool';
import { VideoResizeTool } from '@/components/tools/VideoResizeTool';
import { VideoStabilizeTool } from '@/components/tools/VideoStabilizeTool';

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
  mockProcessVideo.mockResolvedValue(undefined);
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
});

afterEach(() => {
  createSpy.mockRestore();
});

describe('VideoConvertTool', () => {
  it('starts with a disabled convert button', () => {
    render(<VideoConvertTool config={config} />);
    expect(screen.getByRole('button', { name: 'Convert' })).toBeDisabled();
  });

  it('shows the selected file and converts it', async () => {
    const { container } = render(<VideoConvertTool config={config} />);
    selectFile(container, 'song.aac');
    expect(screen.getByText('song.aac')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Convert' });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      mimeType: 'audio/mpeg',
      outputName: 'song.mp3',
    });
    await waitFor(() => expect(button).toHaveTextContent('Convert'));
  });

  it('resets the button when conversion fails', async () => {
    mockProcessVideo.mockRejectedValueOnce(new Error('boom'));
    const { container } = render(<VideoConvertTool config={config} />);
    selectFile(container);
    const button = screen.getByRole('button', { name: 'Convert' });
    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent('Convert'));
  });

  it('falls back to a generic heading when no formats are declared', () => {
    const bare: VideoToolConfig = {
      id: 'video-to-gif',
      title: 'Video to GIF',
      emoji: '🎞️',
      description: 'Convert any video to animated GIF',
      category: 'convert',
      outputExt: 'gif',
      mimeType: 'image/gif',
    };
    render(<VideoConvertTool config={bare} />);
    expect(
      screen.getByRole('heading', { name: 'Video to gif' })
    ).toBeInTheDocument();
    expect(document.querySelector('input[type="file"]')).toHaveAttribute(
      'accept',
      'video/*'
    );
  });
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

describe('VideoCropTool', () => {
  it('loads dimensions and crops using onFrame', async () => {
    const { container } = render(<VideoCropTool config={config} />);
    selectFile(container, 'clip.mp4');
    await loadMetadata();

    const inputs = container.querySelectorAll('input[type="number"]');
    expect((inputs[2] as HTMLInputElement).value).toBe('640');
    expect((inputs[3] as HTMLInputElement).value).toBe('480');
    fireEvent.change(inputs[2], { target: { value: '100' } });

    const button = screen.getByRole('button', { name: 'Crop' });
    fireEvent.click(button);
    const [fileArg, opts] = mockProcessVideo.mock.calls[0];
    expect(fileArg).toBeInstanceOf(File);
    expect(opts).toMatchObject({
      canvas: { width: 100, height: 480 },
      outputName: 'clip-cropped.webm',
    });
    expect(typeof opts.onFrame).toBe('function');
    const drawImage = jest.fn();
    opts.onFrame({}, { drawImage });
    expect(drawImage).toHaveBeenCalledWith({}, 0, 0, 100, 480, 0, 0, 100, 480);
    await waitFor(() => expect(button).toHaveTextContent('Crop'));
  });

  it('keeps the crop button disabled until a file is selected', () => {
    render(<VideoCropTool config={config} />);
    expect(screen.getByRole('button', { name: 'Crop' })).toBeDisabled();
  });
});

describe('VideoSpeedTool', () => {
  it('applies the selected playback rate', async () => {
    const { container } = render(<VideoSpeedTool config={config} />);
    expect(screen.getByRole('button', { name: 'Change Speed' })).toBeDisabled();
    selectFile(container, 'clip.mp4');
    fireEvent.change(container.querySelector('input[type="range"]')!, {
      target: { value: '2' },
    });
    const button = screen.getByRole('button', { name: 'Change Speed' });
    fireEvent.click(button);
    expect(mockProcessVideo).toHaveBeenCalledWith(expect.any(File), {
      playbackRate: 2,
      outputName: 'clip-2x.webm',
    });
    await waitFor(() => expect(button).toHaveTextContent('Change Speed'));
  });
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
