import {
  opfsAvailable,
  saveToOPFS,
  loadFromOPFS,
  listOPFSFiles,
} from '../opfs';

describe('opfsAvailable', () => {
  it('returns true when storage is available', async () => {
    const mockDir = {
      getFileHandle: jest.fn(),
      entries: jest.fn(),
    };
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.resolve(mockDir)) },
    });
    await expect(opfsAvailable()).resolves.toBe(true);
  });

  it('returns false when storage is not available', async () => {
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.reject(new Error())) },
    });
    await expect(opfsAvailable()).resolves.toBe(false);
  });
});

describe('saveToOPFS', () => {
  it('writes data to a file', async () => {
    const writable = { write: jest.fn(), close: jest.fn() };
    const fh = { createWritable: jest.fn(() => Promise.resolve(writable)) };
    const root = { getFileHandle: jest.fn(() => Promise.resolve(fh)) };
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.resolve(root)) },
    });
    await expect(
      saveToOPFS('test.db', new Uint8Array(5))
    ).resolves.toBeUndefined();
    expect(writable.write).toHaveBeenCalled();
    expect(writable.close).toHaveBeenCalled();
  });
});

describe('loadFromOPFS', () => {
  it('loads data from a file', async () => {
    const file = {
      arrayBuffer: jest.fn(() => Promise.resolve(new ArrayBuffer(5))),
    };
    const fh = { getFile: jest.fn(() => Promise.resolve(file)) };
    const root = { getFileHandle: jest.fn(() => Promise.resolve(fh)) };
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.resolve(root)) },
    });
    const result = await loadFromOPFS('test.db');
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result!.length).toBe(5);
  });

  it('returns null on error', async () => {
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.reject(new Error())) },
    });
    await expect(loadFromOPFS('test.db')).resolves.toBeNull();
  });
});

describe('listOPFSFiles', () => {
  it('lists files matching .db extension', async () => {
    const asyncEntries = (async function* () {
      yield ['test.db', {}];
      yield ['notes.txt', {}];
    })();
    const root = { entries: jest.fn(() => asyncEntries) };
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.resolve(root)) },
    });
    const files = await listOPFSFiles();
    expect(files).toEqual(['test.db']);
  });

  it('returns empty on error', async () => {
    Object.assign(navigator, {
      storage: { getDirectory: jest.fn(() => Promise.reject(new Error())) },
    });
    await expect(listOPFSFiles()).resolves.toEqual([]);
  });
});
