import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(globalThis, { TextDecoder, TextEncoder });

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

if (!('PointerEvent' in globalThis)) {
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
