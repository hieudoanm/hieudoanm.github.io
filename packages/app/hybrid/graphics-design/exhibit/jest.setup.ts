import '@testing-library/jest-dom';
import { webcrypto } from 'node:crypto';
import { TextDecoder, TextEncoder } from 'util';

// jsdom ships no crypto.subtle; the password vault needs it for TOTP and hashing
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto as unknown as Crypto,
  configurable: true,
});

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

Element.prototype.scrollIntoView = () => {};

// Polyfill URL.createObjectURL and revokeObjectURL for jsdom
if (!global.URL.createObjectURL) {
  global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
}
if (!global.URL.revokeObjectURL) {
  global.URL.revokeObjectURL = jest.fn(() => {});
}

// Polyfill structuredClone for Node.js/Jest environment
if (!global.structuredClone) {
  global.structuredClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
}
