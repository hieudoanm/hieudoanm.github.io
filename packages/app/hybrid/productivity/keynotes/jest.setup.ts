import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

process.env.NEXT_PUBLIC_AUTOSAVE_DEBOUNCE_MS = '20';

configure({ asyncUtilTimeout: 5000 });

const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockRouterPush, back: mockRouterBack }),
  useParams: () => ({ id: 'deck-test' }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
(globalThis as unknown as { __resetRouterMock: () => void }).__resetRouterMock =
  () => {
    mockRouterPush.mockClear();
    mockRouterBack.mockClear();
  };

const mockResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
Object.defineProperty(globalThis, 'ResizeObserver', {
  writable: true,
  value: mockResizeObserver,
});

const mockIntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  root = null;
  rootMargin = '';
  thresholds = [];
};
Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const context2d = () => {
  const ctx: Record<string, unknown> = {};
  const methods = [
    'scale',
    'save',
    'restore',
    'translate',
    'rotate',
    'beginPath',
    'moveTo',
    'lineTo',
    'arc',
    'rect',
    'fill',
    'stroke',
    'fillRect',
    'strokeRect',
    'clearRect',
    'drawImage',
    'fillText',
    'strokeText',
    'measureText',
    'setLineDash',
    'clip',
    'closePath',
    'quadraticCurveTo',
    'bezierCurveTo',
    'ellipse',
    'createLinearGradient',
    'createRadialGradient',
    'setTransform',
    'getImageData',
    'putImageData',
  ];
  for (const m of methods) ctx[m] = jest.fn();
  ctx.measureText = jest.fn(() => ({ width: 10 }));
  ctx.createLinearGradient = jest.fn(() => ({ addColorStop: jest.fn() }));
  ctx.createRadialGradient = jest.fn(() => ({ addColorStop: jest.fn() }));
  ctx.getImageData = jest.fn(() => ({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1,
  }));
  return ctx as unknown as CanvasRenderingContext2D;
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: jest.fn(() => context2d()),
});
Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  writable: true,
  value: jest.fn((cb: BlobCallback) => cb(new Blob(['png']))),
});

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  writable: true,
  value: jest.fn(),
});
Object.defineProperty(Element.prototype, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});
Object.defineProperty(Element.prototype, 'setPointerCapture', {
  writable: true,
  value: jest.fn(),
});
Object.defineProperty(Element.prototype, 'releasePointerCapture', {
  writable: true,
  value: jest.fn(),
});
Object.defineProperty(Element.prototype, 'animate', {
  writable: true,
  value: jest.fn(() => ({
    play: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    finished: Promise.resolve(),
  })),
});

Object.defineProperty(window, 'alert', { writable: true, value: jest.fn() });
Object.defineProperty(window, 'confirm', {
  writable: true,
  value: jest.fn(() => true),
});
Object.defineProperty(window, 'prompt', {
  writable: true,
  value: jest.fn(() => null),
});

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(() => 'blob:test'),
});
Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(globalThis, 'requestAnimationFrame', {
  writable: true,
  value: (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0),
});
Object.defineProperty(globalThis, 'cancelAnimationFrame', {
  writable: true,
  value: (id: number) => clearTimeout(id),
});

Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', {
  writable: true,
  value: jest.fn(),
});
Object.defineProperty(document, 'exitFullscreen', {
  writable: true,
  value: jest.fn(),
});
