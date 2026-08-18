import {
  buildExportCsv,
  buildVaultJson,
  decryptJson,
  downloadFile,
  encryptJson,
  parseCsvToItems,
  parseJsonToItems,
} from '@/lib/transfer';
import type { VaultItem } from '@/types';

const item = (overrides: Partial<VaultItem> = {}): VaultItem => ({
  id: 'v-1',
  type: 'login',
  title: 'GitHub',
  username: 'user@gmail.com',
  password: 'Sup3r!Secret',
  url: 'https://github.com',
  notes: 'line one\nline two',
  favorite: true,
  tags: ['dev', 'work'],
  createdAt: 1,
  updatedAt: 2,
  ...overrides,
});

describe('parseCsvToItems', () => {
  it('parses a header row into items', () => {
    const csv = [
      'type,title,username,password,url,notes,tags',
      'login,GitHub,user@gmail.com,Sup3r!Secret,https://github.com,notes here,dev;work',
      'card,Visa 4242,,,,"full, note with comma",finance',
    ].join('\n');
    const items = parseCsvToItems(csv);
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual(
      expect.objectContaining({
        type: 'login',
        title: 'GitHub',
        username: 'user@gmail.com',
        password: 'Sup3r!Secret',
        url: 'https://github.com',
        notes: 'notes here',
        tags: ['dev', 'work'],
        favorite: false,
      })
    );
    expect(items[1].type).toBe('card');
    expect(items[1].notes).toBe('full, note with comma');
  });

  it('falls back to login type for unknown types', () => {
    const items = parseCsvToItems(
      ['type,title', 'weird,Untyped Item'].join('\n')
    );
    expect(items[0].type).toBe('login');
  });

  it('parses escaped quotes inside quoted cells', () => {
    const items = parseCsvToItems(
      ['type,title', 'note,"He said ""hi"" loudly"'].join('\n')
    );
    expect(items[0].title).toBe('He said "hi" loudly');
  });

  it('returns an empty array for a header-only file', () => {
    expect(parseCsvToItems('type,title')).toEqual([]);
  });

  it('returns an empty array for blank input', () => {
    expect(parseCsvToItems('   ')).toEqual([]);
  });
});

describe('buildExportCsv', () => {
  it('writes items with quoted, escaped cells', () => {
    const csv = buildExportCsv([
      item(),
      item({
        title: 'Say "Hi"',
        notes: 'multi\nline',
        tags: ['a;b'],
      }),
    ]);
    expect(csv).toContain('type,title,username,password,url,notes,tags');
    expect(csv).toContain('"GitHub"');
    expect(csv).toContain('"Say ""Hi"""');
    expect(csv).toContain('"a;b"');
    expect(csv).not.toContain('\nline two');
  });
});

describe('parseJsonToItems', () => {
  it('parses a plain array of items', () => {
    const items = parseJsonToItems(
      JSON.stringify([
        {
          type: 'login',
          title: 'Dropbox',
          username: 'u',
          password: 'p',
          tags: ['cloud'],
        },
      ])
    );
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(
      expect.objectContaining({
        title: 'Dropbox',
        type: 'login',
        tags: ['cloud'],
      })
    );
  });

  it('parses a wrapped export object', () => {
    const items = parseJsonToItems(
      JSON.stringify({ format: 'password-vault', items: [{ title: 'A' }] })
    );
    expect(items[0].title).toBe('A');
  });

  it('returns an empty array for a wrapped export without a valid items list', () => {
    expect(parseJsonToItems(JSON.stringify({ items: {} }))).toEqual([]);
  });

  it('throws when a row is missing a title', () => {
    expect(() => parseJsonToItems('[{"username":"u"}]')).toThrow(
      'Row 1 is missing a title'
    );
  });

  it('throws on malformed json', () => {
    expect(() => parseJsonToItems('{oops')).toThrow();
  });
});

describe('buildVaultJson', () => {
  it('embeds items with format metadata', () => {
    const json = buildVaultJson([item()]);
    const parsed = JSON.parse(json);
    expect(parsed.format).toBe('password-vault');
    expect(parsed.version).toBe(1);
    expect(parsed.items).toHaveLength(1);
  });
});

describe('encryptJson / decryptJson', () => {
  it('round-trips JSON with a passphrase', () => {
    const json = JSON.stringify({ hello: 'world 🔐' });
    const encoded = encryptJson(json, 'secret');
    expect(encoded).not.toContain('world');
    expect(decryptJson(encoded, 'secret')).toBe(json);
  });

  it('does not decrypt with the wrong passphrase', () => {
    const encoded = encryptJson('data', 'right');
    expect(decryptJson(encoded, 'wrong')).not.toBe('data');
  });
});

describe('downloadFile', () => {
  it('triggers a download and revokes the object URL', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    downloadFile('out.csv', 'a,b', 'text/csv');
    expect(createObjectURL).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });
});
