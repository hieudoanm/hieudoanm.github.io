import {
  shuffle,
  isPalindrome,
  isEmordnilap,
  fetchDefinition,
} from '../puzzle';

describe('shuffle', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toHaveLength(arr.length);
    expect(result.sort()).toEqual(arr.sort());
  });

  it('does not mutate original', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });
});

describe('isPalindrome', () => {
  it('detects palindrome words', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('level')).toBe(true);
    expect(isPalindrome('radar')).toBe(true);
  });

  it('returns false for non-palindromes', () => {
    expect(isPalindrome('hello')).toBe(false);
    expect(isPalindrome('world')).toBe(false);
  });

  it('handles empty and single char', () => {
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
  });
});

describe('isEmordnilap', () => {
  it('returns false for empty string', () => {
    expect(isEmordnilap('')).toBe(false);
  });

  it('returns false for palindrome', () => {
    expect(isEmordnilap('racecar')).toBe(false);
  });
});

describe('fetchDefinition', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('returns word data on success', async () => {
    const mockData = {
      word: 'test',
      definitions: [{ partOfSpeech: 'noun', definition: 'a test' }],
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);
    const result = await fetchDefinition('test');
    expect(result).toEqual(mockData);
  });

  it('returns null on non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as Response);
    const result = await fetchDefinition('test');
    expect(result).toBeNull();
  });

  it('returns null on fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network error'));
    const result = await fetchDefinition('test');
    expect(result).toBeNull();
  });
});
