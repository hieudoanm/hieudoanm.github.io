import { fetchWord, groupByPartOfSpeech, wordUrl, Word } from '../utils';

describe('wordUrl', () => {
  it('builds lowercased trimmed url', () => {
    expect(wordUrl('  Hello World ')).toBe(
      'https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/data/english/words/hello%20world.json'
    );
  });
});

describe('fetchWord', () => {
  it('throws Empty Word for blank input', async () => {
    await expect(fetchWord('   ')).rejects.toThrow('Empty Word');
  });

  it('returns parsed word', async () => {
    const data: Word = { word: 'hi', results: [] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => data,
    }) as unknown as typeof global.fetch;
    await expect(fetchWord('hi')).resolves.toEqual(data);
  });

  it('maps network failure to Fetch Error', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(
        new TypeError('offline')
      ) as unknown as typeof global.fetch;
    await expect(fetchWord('hi')).rejects.toThrow('Fetch Error');
  });

  it('maps bad json to JSON Error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        throw new SyntaxError('unexpected token');
      },
    }) as unknown as typeof global.fetch;
    await expect(fetchWord('hi')).rejects.toThrow('JSON Error');
  });
});

describe('groupByPartOfSpeech', () => {
  it('groups results keeping order', () => {
    const grouped = groupByPartOfSpeech([
      {
        definition: 'd1',
        partOfSpeech: 'noun',
        synonyms: [],
        anonyms: [],
        usageOf: [],
        typeOf: [],
      },
      {
        definition: 'd2',
        partOfSpeech: 'verb',
        synonyms: [],
        anonyms: [],
        usageOf: [],
        typeOf: [],
      },
      {
        definition: 'd3',
        partOfSpeech: 'noun',
        synonyms: [],
        anonyms: [],
        usageOf: [],
        typeOf: [],
      },
    ]);
    expect(grouped.map((group) => group.partOfSpeech)).toEqual([
      'noun',
      'verb',
    ]);
    expect(grouped[0].results).toHaveLength(2);
    expect(grouped[1].results).toHaveLength(1);
  });
});
