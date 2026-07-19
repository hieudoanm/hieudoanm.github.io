import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = () => {};
}

if (typeof SVGElement !== 'undefined') {
  SVGElement.prototype.setPointerCapture = () => {};
  SVGElement.prototype.releasePointerCapture = () => {};
}

if (
  typeof window !== 'undefined' &&
  typeof window.PointerEvent === 'undefined'
) {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerId: number;
    readonly isPrimary: boolean;
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
      this.isPrimary = init.isPrimary ?? true;
    }
  }
  window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;
}

global.requestAnimationFrame = (cb: FrameRequestCallback): number =>
  setTimeout(() => cb(Date.now()), 0) as unknown as number;
global.cancelAnimationFrame = (id: number): void =>
  clearTimeout(id as unknown as NodeJS.Timeout);
