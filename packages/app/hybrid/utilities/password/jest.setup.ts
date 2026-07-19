import '@testing-library/jest-dom';
import { webcrypto } from 'node:crypto';
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto as unknown as Crypto,
  configurable: true,
});
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
