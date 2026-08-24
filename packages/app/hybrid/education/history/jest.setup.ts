import '@testing-library/jest-dom';

Element.prototype.scrollIntoView = () => {};

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
