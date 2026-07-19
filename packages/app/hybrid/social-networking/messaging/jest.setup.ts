import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';
import { TextDecoder, TextEncoder } from 'util';

process.env.NEXT_PUBLIC_MOCK_DELAY = '0';

Object.assign(globalThis, { TextDecoder, TextEncoder });

if (
  typeof (globalThis as { structuredClone?: unknown }).structuredClone !==
  'function'
) {
  Object.assign(globalThis, {
    structuredClone: <T>(value: T): T =>
      value === undefined ? value : (JSON.parse(JSON.stringify(value)) as T),
  });
}

if (!('PointerEvent' in globalThis)) {
  class PointerEvent extends MouseEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.pointerType = params.pointerType ?? 'mouse';
      this.isPrimary = params.isPrimary ?? true;
    }
  }
  (
    globalThis as unknown as { PointerEvent: typeof PointerEvent }
  ).PointerEvent = PointerEvent;
}

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(() => 'blob:mock-url'),
});
Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: jest.fn(),
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
