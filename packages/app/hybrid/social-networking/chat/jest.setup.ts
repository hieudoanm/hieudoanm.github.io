import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = () => {};
}
