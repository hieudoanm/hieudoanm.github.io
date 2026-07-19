import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';

if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('node:util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

// jsdom does not implement structuredClone, which fake-indexeddb requires.
if (typeof window.structuredClone !== 'function') {
  Object.defineProperty(window, 'structuredClone', {
    configurable: true,
    writable: true,
    value: (value: unknown): unknown => JSON.parse(JSON.stringify(value)),
  });
}

Element.prototype.scrollIntoView = () => {};

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

const canvasContextMock = {
  clearRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  translate: jest.fn(),
  drawImage: jest.fn(),
};

HTMLCanvasElement.prototype.getContext = (() =>
  canvasContextMock) as unknown as typeof HTMLCanvasElement.prototype.getContext;

HTMLMediaElement.prototype.play = () => Promise.resolve();
HTMLMediaElement.prototype.pause = () => {};
