import {
  formatRelativeTime,
  formatFileSize,
  copyToClipboard,
  formatSQL,
} from '@/utils/format';

describe('formatRelativeTime', () => {
  it('returns just now for < 60 seconds', () => {
    expect(formatRelativeTime(Date.now())).toBe('just now');
  });

  it('returns minutes for < 60 minutes', () => {
    expect(formatRelativeTime(Date.now() - 60 * 1000)).toBe('1 min ago');
  });

  it('returns hours for < 24 hours', () => {
    expect(formatRelativeTime(Date.now() - 3 * 3600 * 1000)).toBe('3h ago');
  });

  it('returns days for < 7 days', () => {
    expect(formatRelativeTime(Date.now() - 2 * 86400 * 1000)).toBe('2d ago');
  });

  it('returns a locale date for 7+ days', () => {
    const ts = Date.now() - 10 * 86400 * 1000;
    expect(formatRelativeTime(ts)).toBe(new Date(ts).toLocaleDateString());
  });
});

describe('formatFileSize', () => {
  it('returns bytes', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('returns KB', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });

  it('returns MB', () => {
    expect(formatFileSize(2097152)).toBe('2.0 MB');
  });
});

describe('copyToClipboard', () => {
  const originalWriteText = navigator.clipboard?.writeText;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalWriteText ? { writeText: originalWriteText } : undefined,
    });
  });

  it('returns true when writeText succeeds', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    await expect(copyToClipboard('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false when writeText rejects', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
    });
    await expect(copyToClipboard('hello')).resolves.toBe(false);
  });
});

describe('formatSQL', () => {
  it('breaks before clause keywords', () => {
    expect(formatSQL('SELECT a, b FROM t WHERE x = 1')).toBe(
      'SELECT a, b\nFROM t\nWHERE x = 1'
    );
  });

  it('trims surrounding whitespace', () => {
    expect(formatSQL('  SELECT 1  ')).toBe('SELECT 1');
  });

  it('uppercases clause keywords', () => {
    expect(formatSQL('select * from customers limit 10')).toBe(
      'SELECT *\nFROM customers\nLIMIT 10'
    );
  });

  it('preserves string literal contents', () => {
    expect(formatSQL("SELECT 'a  b' AS v")).toBe("SELECT 'a  b' AS v");
  });

  it('indents nested parenthesised clauses', () => {
    expect(
      formatSQL(
        'SELECT * FROM orders WHERE customer_id IN (SELECT id FROM customers)'
      )
    ).toContain('WHERE customer_id IN (');
  });

  it('formats INSERT statements', () => {
    expect(formatSQL('INSERT INTO t (a, b) VALUES (1, 2)')).toBe(
      'INSERT INTO t (a, b)\nVALUES (1, 2)'
    );
  });

  it('returns an empty string for empty input', () => {
    expect(formatSQL('   ')).toBe('');
  });
});
