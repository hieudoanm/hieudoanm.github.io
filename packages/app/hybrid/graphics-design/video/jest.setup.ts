import '@testing-library/jest-dom';

class MockMediaRecorder {
  static instances: MockMediaRecorder[] = [];
  ondataavailable: ((e: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: ((e: unknown) => void) | null = null;
  start = jest.fn(() => {
    this.ondataavailable?.({ data: new Blob(['chunk']) });
  });
  stop = jest.fn(() => {
    this.onstop?.();
  });

  constructor(
    public stream: unknown,
    public options: { mimeType: string }
  ) {
    MockMediaRecorder.instances.push(this);
  }
}

Object.defineProperty(globalThis, 'MediaRecorder', {
  writable: true,
  value: MockMediaRecorder,
});

Object.defineProperty(globalThis, 'AudioContext', {
  writable: true,
  value: class MockAudioContext {
    createMediaElementSource = jest.fn(() => ({
      connect: jest.fn(),
    }));
    createMediaStreamDestination = jest.fn(() => ({
      stream: {},
    }));
  },
});

HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
HTMLMediaElement.prototype.pause = jest.fn();
HTMLAnchorElement.prototype.click = jest.fn();

const mockCanvasContext = {
  drawImage: jest.fn(),
};
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return mockCanvasContext as unknown as CanvasRenderingContext2D;
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.captureStream = jest.fn(
  () => ({}) as MediaStream
) as unknown as typeof HTMLCanvasElement.prototype.captureStream;
HTMLCanvasElement.prototype.toBlob = jest.fn((cb) => cb(new Blob(['png'])));

Object.defineProperty(globalThis, 'requestAnimationFrame', {
  writable: true,
  value: jest.fn(() => 1),
});

URL.createObjectURL = jest.fn(() => 'blob:mock');
URL.revokeObjectURL = jest.fn();
