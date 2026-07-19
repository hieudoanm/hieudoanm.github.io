import { downloadBlob, processVideo } from '@/lib/video-tools';

const realCreateElement = document.createElement.bind(document);

interface CreatedElement {
  tag: string;
  el: any;
}

let created: CreatedElement[] = [];

const getVideo = () => created.find((c) => c.tag === 'video')!.el as any;
const getAnchor = () =>
  created.find((c) => c.tag === 'a')!.el as HTMLAnchorElement;
const getCanvas = () =>
  created.find((c) => c.tag === 'canvas')!.el as HTMLCanvasElement;

const flush = async () => {
  await new Promise((r) => setTimeout(r, 0));
};

describe('downloadBlob', () => {
  const anchorClick = jest.fn();

  beforeEach(() => {
    created = [];
    anchorClick.mockClear();
    jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(anchorClick);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = realCreateElement(tag);
      created.push({ tag: String(tag).toLowerCase(), el });
      return el;
    });
  });

  afterEach(() => {
    (document.createElement as jest.Mock).mockRestore();
    (HTMLAnchorElement.prototype.click as jest.Mock).mockRestore();
  });

  it('creates a download link with the given blob and name', () => {
    const blob = new Blob(['payload'], { type: 'video/webm' });
    downloadBlob(blob, 'result.webm');

    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    const anchor = getAnchor();
    expect(anchor.href).toBe('blob:mock');
    expect(anchor.download).toBe('result.webm');
    expect(anchorClick).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });
});

describe('processVideo', () => {
  const file = new File(['data'], 'clip.mp4', { type: 'video/mp4' });

  beforeEach(() => {
    created = [];
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = realCreateElement(tag);
      created.push({ tag: String(tag).toLowerCase(), el });
      return el;
    });
    const recs = (globalThis as any).MediaRecorder;
    recs.instances = [];
  });

  afterEach(() => {
    (document.createElement as jest.Mock).mockRestore();
  });

  it('encodes a default webm and downloads it on completion', async () => {
    const promise = processVideo(file, { outputName: 'out.webm' });
    const video = getVideo();
    Object.defineProperty(video, 'videoWidth', { value: 640 });
    Object.defineProperty(video, 'videoHeight', { value: 480 });

    await video.onloadedmetadata();

    const canvas = getCanvas();
    expect(canvas.width).toBe(640);
    expect(canvas.height).toBe(480);
    expect(canvas.captureStream).toHaveBeenCalledWith(30);

    const recs = (globalThis as any).MediaRecorder.instances;
    expect(recs).toHaveLength(1);
    expect(recs[0].options.mimeType).toBe('video/webm;codecs=vp8,opus');
    expect(recs[0].start).toHaveBeenCalled();
    expect(video.play).toHaveBeenCalled();

    video.ontimeupdate();
    expect(recs[0].stop).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(URL.revokeObjectURL).toHaveBeenCalled();
    await expect(promise).resolves.toBeUndefined();
  });

  it('samples gif output at 10 fps and honours canvas options', async () => {
    const promise = processVideo(file, {
      canvas: { width: 320, height: 240 },
      mimeType: 'image/gif',
      outputName: 'out.gif',
    });
    const video = getVideo();

    await video.onloadedmetadata();

    const canvas = getCanvas();
    expect(canvas.width).toBe(320);
    expect(canvas.height).toBe(240);
    expect(canvas.captureStream).toHaveBeenCalledWith(10);

    const recs = (globalThis as any).MediaRecorder.instances;
    expect(recs[0].options.mimeType).toBe('image/gif');

    video.ontimeupdate();
    await expect(promise).resolves.toBeUndefined();
  });

  it('seeks to startTime and applies playback rate', async () => {
    const promise = processVideo(file, {
      startTime: 2,
      playbackRate: 2,
      outputName: 'out.webm',
    });
    const video = getVideo();

    await video.onloadedmetadata();

    expect(video.currentTime).toBe(2);
    expect(video.playbackRate).toBe(2);

    video.ontimeupdate();
    await expect(promise).resolves.toBeUndefined();
  });

  it('stops recording once endTime is reached', async () => {
    const promise = processVideo(file, {
      endTime: 5,
      outputName: 'out.webm',
    });
    const video = getVideo();
    Object.defineProperty(video, 'currentTime', { value: 10 });

    await video.onloadedmetadata();
    video.ontimeupdate();

    const recs = (globalThis as any).MediaRecorder.instances;
    expect(recs[0].stop).toHaveBeenCalled();
    await expect(promise).resolves.toBeUndefined();
  });

  it('draws each frame via the canvas by default', async () => {
    const promise = processVideo(file, { outputName: 'out.webm' });
    const video = getVideo();
    Object.defineProperty(video, 'videoWidth', { value: 640 });
    Object.defineProperty(video, 'videoHeight', { value: 480 });

    await video.onloadedmetadata();

    const ctx = getCanvas().getContext('2d') as any;
    Object.defineProperty(video, 'paused', {
      value: false,
      configurable: true,
    });
    video.ontimeupdate();
    expect(ctx.drawImage).toHaveBeenCalledWith(video, 0, 0, 640, 480);
    expect(requestAnimationFrame).toHaveBeenCalled();

    Object.defineProperty(video, 'paused', { value: true, configurable: true });
    video.ontimeupdate();
    await expect(promise).resolves.toBeUndefined();
  });

  it('invokes onFrame instead of drawing the whole frame', async () => {
    const onFrame = jest.fn();
    const promise = processVideo(file, {
      canvas: { width: 320, height: 240 },
      outputName: 'out.webm',
      onFrame,
    });
    const video = getVideo();

    await video.onloadedmetadata();

    Object.defineProperty(video, 'paused', {
      value: false,
      configurable: true,
    });
    video.ontimeupdate();
    expect(onFrame).toHaveBeenCalledWith(video, getCanvas().getContext('2d'));

    Object.defineProperty(video, 'paused', { value: true, configurable: true });
    video.ontimeupdate();
    await expect(promise).resolves.toBeUndefined();
  });

  it('rejects when the video fails to load', async () => {
    const promise = processVideo(file, { outputName: 'out.webm' });
    const video = getVideo();
    await flush();

    video.onerror(new Error('load failed'));
    await expect(promise).rejects.toThrow('load failed');
  });
});
