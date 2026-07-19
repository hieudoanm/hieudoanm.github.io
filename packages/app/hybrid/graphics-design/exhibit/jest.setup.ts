import '@testing-library/jest-dom';
import { webcrypto } from 'node:crypto';
import { TextDecoder, TextEncoder } from 'util';

// jsdom ships no crypto.subtle; the password vault needs it for TOTP and hashing
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto as unknown as Crypto,
  configurable: true,
});

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

Element.prototype.scrollIntoView = () => {};

// Polyfill URL.createObjectURL and revokeObjectURL for jsdom
if (!global.URL.createObjectURL) {
  global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
}
if (!global.URL.revokeObjectURL) {
  global.URL.revokeObjectURL = jest.fn(() => {});
}

// Polyfill structuredClone for Node.js/Jest environment
if (!global.structuredClone) {
  global.structuredClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
}

// jsdom ships no media or canvas capture APIs; the video toolbox needs them
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
