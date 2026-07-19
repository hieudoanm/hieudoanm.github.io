import { crc32, zipStore } from '@/lib/export/zip';

const ascii = (text: string): Uint8Array => new TextEncoder().encode(text);

describe('crc32', () => {
  it('matches the CRC-32 check value for "123456789"', () => {
    expect(crc32(ascii('123456789'))).toBe(0xcbf43926);
  });

  it('returns the CRC of an empty buffer', () => {
    expect(crc32(new Uint8Array(0))).toBe(0);
  });
});

describe('zipStore', () => {
  it('writes local and central headers with the expected signatures', () => {
    const zip = zipStore([{ name: 'a.txt', data: ascii('hello') }]);
    const view = new DataView(zip.buffer);
    expect(view.getUint32(0, true)).toBe(0x04034b50);
    const offset = 30 + 5 + 5;
    expect(view.getUint32(offset, true)).toBe(0x02014b50);
    expect(view.getUint32(zip.length - 22, true)).toBe(0x06054b50);
  });

  it('records the entry count and correct byte offsets in the end record', () => {
    const zip = zipStore([
      { name: 'a.txt', data: ascii('hello') },
      { name: 'b.txt', data: ascii('world!') },
    ]);
    const view = new DataView(zip.buffer);
    const end = zip.length - 22;
    expect(view.getUint16(end + 8, true)).toBe(2);
    expect(view.getUint16(end + 10, true)).toBe(2);
    expect(view.getUint32(end + 12, true)).toBeGreaterThan(0);
    expect(view.getUint32(end + 16, true)).toBe(30 + 5 + 5 + 30 + 5 + 6);
  });

  it('stores uncompressed data verbatim', () => {
    const payload = ascii('raw payload');
    const zip = zipStore([{ name: 'a.txt', data: payload }]);
    const view = new DataView(zip.buffer);
    const method = view.getUint16(8, true);
    const size = view.getUint32(18, true);
    expect(method).toBe(0);
    expect(size).toBe(payload.length);
  });
});
