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

// A no-op 2D context, complete enough that a component drawing to a canvas
// renders in jsdom without throwing. Add any method a test needs here rather
// than mocking per test.
const canvasContextMock = {
  // Transform / lifecycle
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  setTransform: jest.fn(),
  resetTransform: jest.fn(),
  drawImage: jest.fn(),
  // Path construction
  beginPath: jest.fn(),
  closePath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  arcTo: jest.fn(),
  ellipse: jest.fn(),
  rect: jest.fn(),
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  clearRect: jest.fn(),
  quadraticCurveTo: jest.fn(),
  bezierCurveTo: jest.fn(),
  // Path rendering
  stroke: jest.fn(),
  fill: jest.fn(),
  clip: jest.fn(),
  setLineDash: jest.fn(),
  getLineDash: jest.fn(() => []),
  isPointInPath: jest.fn(() => false),
  // Text
  fillText: jest.fn(),
  strokeText: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  // Style properties, assigned directly by the components under test
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  globalAlpha: 1,
  font: '',
  textAlign: 'start',
  textBaseline: 'alphabetic',
};

HTMLCanvasElement.prototype.getContext = (() =>
  canvasContextMock) as unknown as typeof HTMLCanvasElement.prototype.getContext;

HTMLMediaElement.prototype.play = () => Promise.resolve();
HTMLMediaElement.prototype.pause = () => {};
