import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = () => {};
}

global.requestAnimationFrame = (cb: FrameRequestCallback): number =>
  setTimeout(() => cb(Date.now()), 0) as unknown as number;
global.cancelAnimationFrame = (id: number): void =>
  clearTimeout(id as unknown as NodeJS.Timeout);
