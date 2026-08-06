import '@testing-library/jest-dom';

process.env.NEXT_PUBLIC_MOCK_DELAY = '0';

Object.defineProperty(navigator, 'vibrate', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

class IntersectionObserverMock {
  root = null;
  rootMargin = '';
  thresholds = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn().mockReturnValue([]);
}

global.IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  configurable: true,
  value: {
    getUserMedia: jest.fn().mockRejectedValue(new Error('camera denied')),
  },
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn().mockReturnValue('blob:mock'),
});

Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: jest.fn(),
});
