import { base64ToBytes } from '@/lib/io/base64';

describe('base64ToBytes', () => {
  it('decodes an empty string', () => {
    const bytes = base64ToBytes('');
    expect(bytes).toEqual(new Uint8Array([]));
  });

  it('decodes base64 back to the original bytes', () => {
    const source = new Uint8Array([0, 255, 16, 32, 137, 200]);
    const encoded = btoa(String.fromCharCode(...source));
    expect(base64ToBytes(encoded)).toEqual(source);
  });

  it('decodes plain ASCII text', () => {
    const decoded = base64ToBytes('SGVsbG8gQnJhaW5ib3c=');
    expect(String.fromCharCode(...decoded)).toBe('Hello Brainbow');
  });
});
